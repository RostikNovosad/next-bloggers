"use client";

import { useEffect } from "react";
import type { Blogger } from "@/lib/bloggers";
import { postBackground } from "./PostTile";
import { CloseIcon, CommentIcon, HeartIcon, ArrowIcon, BackIcon } from "./Icons";

export default function PostModal({
  blogger,
  index,
  onClose,
  onChange,
}: {
  blogger: Blogger;
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const post = blogger.posts[index];
  const total = blogger.posts.length;
  const prev = () => onChange((index - 1 + total) % total);
  const next = () => onChange((index + 1) % total);

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
      <button type="button" aria-label="Закрити" onClick={onClose} className="absolute inset-0 bg-[#0f1224]/50 backdrop-blur-sm" />
      <div className="msg-in relative flex max-h-[92dvh] w-full max-w-md flex-col overflow-hidden rounded-t-[2rem] bg-surface sm:rounded-[2rem]">
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <p className="text-sm font-semibold">{blogger.name}</p>
            <p className="text-xs text-muted">{post.date}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Закрити" className="grid size-10 place-items-center rounded-full hover:bg-black/5">
            <CloseIcon />
          </button>
        </div>
        <div
          className="flex aspect-square items-end p-6"
          style={{ background: postBackground(blogger.hue, index) }}
        >
          <h3 className="font-display text-2xl font-semibold leading-tight">{post.title}</h3>
        </div>
        <div className="overflow-y-auto p-5">
          <p className="leading-relaxed text-text">{post.caption}</p>
          <div className="mt-4 flex items-center gap-5 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5"><HeartIcon /> {post.likes}</span>
            <span className="inline-flex items-center gap-1.5"><CommentIcon /> {post.comments}</span>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
            <button type="button" onClick={prev} className="btn btn-ghost !min-h-10 !px-4 !text-sm">
              <BackIcon /> Назад
            </button>
            <span className="text-sm text-muted">{index + 1} / {total}</span>
            <button type="button" onClick={next} className="btn btn-ghost !min-h-10 !px-4 !text-sm">
              Далі <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
