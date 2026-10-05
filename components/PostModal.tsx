"use client";

import { useEffect } from "react";
import type { Blogger } from "@/lib/bloggers";
import { postBackground } from "./PostTile";
import Avatar from "./Avatar";
import TelegramButton from "./TelegramButton";
import { CloseIcon, CommentIcon, HeartFillIcon, ArrowIcon, BackIcon } from "./Icons";

export default function PostModal({
  blogger,
  index,
  liked,
  onLike,
  onClose,
  onChange,
}: {
  blogger: Blogger;
  index: number;
  liked: boolean;
  onLike: () => void;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const post = blogger.posts[index];
  const total = blogger.posts.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onChange((index - 1 + total) % total);
      if (e.key === "ArrowRight") onChange((index + 1) % total);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [index, total, onClose, onChange]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={post.title}>
      <button type="button" aria-label="Закрити" onClick={onClose} className="absolute inset-0 bg-black/70" />
      <div className="msg-in relative flex max-h-[94dvh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-surface sm:rounded-2xl md:max-w-4xl md:flex-row">
        <div className="flex aspect-[4/5] items-end p-6 md:aspect-auto md:min-h-[32rem] md:w-[55%]" style={{ background: postBackground(blogger.hue, index) }}>
          <h3 className="text-3xl font-bold leading-tight">{post.title}</h3>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-center gap-3 border-b border-line p-4">
            <Avatar blogger={blogger} size={40} ring />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{blogger.handle}</p>
              <p className="text-xs text-muted">{post.date}</p>
            </div>
            <button type="button" onClick={onClose} aria-label="Закрити" className="grid size-10 place-items-center rounded-full hover:bg-black/5">
              <CloseIcon />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <p className="leading-relaxed"><b className="font-bold">{blogger.handle}</b> {post.caption}</p>
          </div>

          <div className="border-t border-line p-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onLike}
                aria-pressed={liked}
                aria-label={liked ? "Прибрати вподобання" : "Вподобати"}
                className={`transition-transform active:scale-90 ${liked ? "text-[#f5338f]" : ""}`}
              >
                <HeartFillIcon filled={liked} />
              </button>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted"><CommentIcon className="size-5" /> {post.comments}</span>
              <span className="ml-auto text-sm font-semibold">{post.likes} вподобань</span>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button type="button" onClick={() => onChange((index - 1 + total) % total)} aria-label="Попередня публікація" className="btn btn-ghost !min-h-11 !px-3">
                <BackIcon />
              </button>
              <button type="button" onClick={() => onChange((index + 1) % total)} aria-label="Наступна публікація" className="btn btn-ghost !min-h-11 !px-3">
                <ArrowIcon />
              </button>
              <span className="text-sm text-muted">{index + 1} / {total}</span>
              <TelegramButton label="Telegram" className="ml-auto !min-h-11" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
