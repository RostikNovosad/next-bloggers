"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import type { Blogger } from "@/lib/bloggers";
import Avatar from "./Avatar";
import TelegramButton from "./TelegramButton";
import { postBackground } from "./PostTile";
import PostArt from "./PostArt";
import { CloseIcon } from "./Icons";

const SLIDE_MS = 4500;

export default function Stories({ bloggers }: { bloggers: Blogger[] }) {
  const [open, setOpen] = useState<{ b: number; s: number } | null>(null);
  const [seen, setSeen] = useState<string[]>([]);

  const show = (b: number, s = 0) => {
    setOpen({ b, s });
    setSeen((v) => (v.includes(bloggers[b].id) ? v : [...v, bloggers[b].id]));
  };

  const close = useCallback(() => setOpen(null), []);

  const next = useCallback(() => {
    setOpen((cur) => {
      if (!cur) return cur;
      const slides = bloggers[cur.b].posts.length;
      if (cur.s < slides - 1) return { b: cur.b, s: cur.s + 1 };
      if (cur.b < bloggers.length - 1) {
        const nb = cur.b + 1;
        setSeen((v) => (v.includes(bloggers[nb].id) ? v : [...v, bloggers[nb].id]));
        return { b: nb, s: 0 };
      }
      return null;
    });
  }, [bloggers]);

  const prev = useCallback(() => {
    setOpen((cur) => {
      if (!cur) return cur;
      if (cur.s > 0) return { b: cur.b, s: cur.s - 1 };
      if (cur.b > 0) return { b: cur.b - 1, s: 0 };
      return cur;
    });
  }, []);

  const active = open !== null;
  const key = open ? `${open.b}-${open.s}` : "";

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(next, SLIDE_MS);
    return () => clearTimeout(t);
  }, [active, key, next]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close, next, prev]);

  const blogger = open ? bloggers[open.b] : null;
  const post = blogger && open ? blogger.posts[open.s] : null;

  return (
    <>
      <ul className="grid grid-cols-4 gap-2 sm:flex sm:gap-7">
        {bloggers.map((b, i) => (
          <li key={b.id} className="sm:shrink-0">
            <button
              type="button"
              onClick={() => show(i)}
              aria-label={`Дивитися історії: ${b.name}`}
              className="group flex w-full flex-col items-center gap-2 sm:w-[4.5rem]"
            >
              <span className="transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
                <Avatar blogger={b} size={64} ring seen={seen.includes(b.id)} />
              </span>
              <span className="w-full truncate text-center text-[0.8rem] font-medium">{b.name.split(" ")[0]}</span>
            </button>
          </li>
        ))}
      </ul>

      {open && blogger && post && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" role="dialog" aria-modal="true" aria-label={`Історії: ${blogger.name}`}>
          <div
            className="relative flex h-full w-full max-w-md flex-col overflow-hidden sm:h-[min(92dvh,52rem)] sm:rounded-3xl"
            style={{ background: postBackground(blogger.hue, open.s) }}
          >
            <PostArt post={post} hue={blogger.hue} index={open.s} sizes="(min-width: 448px) 448px, 100vw" priority />
            <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-black/25 to-transparent px-3 pb-8 pt-3">
              <div className="flex gap-1">
                {blogger.posts.map((p, i) => (
                  <span key={p.id} className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/40">
                    <span
                      key={i === open.s ? key : undefined}
                      className="block h-full origin-left bg-white"
                      style={
                        i < open.s
                          ? undefined
                          : i === open.s
                            ? { animation: `story-progress ${SLIDE_MS}ms linear forwards` }
                            : { transform: "scaleX(0)" }
                      }
                    />
                  </span>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-3 text-white">
                <Avatar blogger={blogger} size={36} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold leading-tight">{blogger.name}</p>
                  <p className="text-xs opacity-80">{post.date}</p>
                </div>
                <button type="button" onClick={close} aria-label="Закрити" className="grid size-10 place-items-center rounded-full hover:bg-white/15">
                  <CloseIcon />
                </button>
              </div>
            </div>

            <div className={`relative flex flex-1 flex-col justify-end p-6 pb-4 ${post.image ? "text-white" : ""}`}>
              <h3 className="text-3xl font-bold leading-tight">{post.title}</h3>
              <p className="mt-3 text-lg leading-relaxed">{post.caption}</p>
            </div>

            <button type="button" onClick={prev} aria-label="Попередня" className="absolute left-0 top-24 bottom-40 z-[5] w-1/3" />
            <button type="button" onClick={next} aria-label="Наступна" className="absolute right-0 top-24 bottom-40 z-[5] w-2/3" />

            <div className="relative z-10 grid gap-2 p-4 sm:grid-cols-2">
              <Link href={`/${blogger.id}`} onClick={close} className="btn btn-dark">
                Відкрити профіль
              </Link>
              <TelegramButton />
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
