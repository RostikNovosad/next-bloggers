"use client";

import { useEffect } from "react";
import type { Blogger } from "@/lib/bloggers";
import { postBackground } from "./PostTile";
import Avatar from "./Avatar";
import PostArt from "./PostArt";
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
      <div className="msg-in relative flex max-h-[94dvh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-surface sm:rounded-2xl md:grid md:max-w-4xl md:grid-cols-[55%_1fr] md:grid-rows-[auto_minmax(0,1fr)_auto]">
        <div className="flex items-center gap-3 border-b border-line px-3 py-2 md:col-start-2 md:row-start-1 md:p-4">
          <Avatar blogger={blogger} size={32} ring />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{blogger.handle}</p>
            <p className="text-xs text-muted">{post.date}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Закрити" className="grid size-9 place-items-center rounded-full hover:bg-black/5">
            <CloseIcon />
          </button>
        </div>

        <div className="relative flex aspect-[5/4] shrink-0 items-end overflow-hidden p-4 sm:p-6 md:col-start-1 md:row-span-3 md:row-start-1 md:aspect-auto md:min-h-[32rem]" style={{ background: postBackground(blogger.hue, index) }}>
          <PostArt post={post} hue={blogger.hue} index={index} sizes="(min-width: 768px) 520px, 100vw" priority />
          <h3 className={`relative text-2xl font-bold leading-tight sm:text-3xl ${post.image ? "text-white" : ""}`}>{post.title}</h3>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4 md:col-start-2 md:row-start-2">
          <p className="leading-relaxed"><b className="font-bold">{blogger.handle}</b> {post.caption}</p>
        </div>

        <div className="border-t border-line px-3 py-2.5 md:p-4 md:col-start-2 md:row-start-3">
          <div className="flex items-center gap-3 md:gap-4">
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
          <div className="mt-2 flex items-center gap-2 md:mt-4">
            <button type="button" onClick={() => onChange((index - 1 + total) % total)} aria-label="Попередня публікація" className="btn btn-ghost !min-h-9 !px-3 md:!min-h-11">
              <BackIcon />
            </button>
            <button type="button" onClick={() => onChange((index + 1) % total)} aria-label="Наступна публікація" className="btn btn-ghost !min-h-9 !px-3 md:!min-h-11">
              <ArrowIcon />
            </button>
            <span className="text-sm text-muted">{index + 1} / {total}</span>
            <TelegramButton label="Telegram" className="ml-auto !min-h-9 !px-4 !text-sm md:!min-h-11" />
          </div>
        </div>
      </div>
    </div>
  );
}
