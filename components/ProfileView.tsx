"use client";

import { useEffect, useState } from "react";
import type { Blogger } from "@/lib/bloggers";
import Avatar from "./Avatar";
import Portrait from "./Portrait";
import PostCarousel from "./PostCarousel";
import PostModal from "./PostModal";
import ChatDemo from "./ChatDemo";
import TelegramButton from "./TelegramButton";
import { ChatIcon } from "./Icons";

export default function ProfileView({
  blogger,
}: {
  blogger: Blogger;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [liked, setLiked] = useState<string[]>([]);
  const [chatOpen, setChatOpen] = useState(false);

  const toggleLike = (id: string) =>
    setLiked((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));

  // On small screens the chat is a bottom sheet: lock page scroll and close on Escape.
  useEffect(() => {
    if (!chatOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setChatOpen(false);
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    if (!window.matchMedia("(min-width: 1024px)").matches) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [chatOpen]);

  return (
    <>
      <div className="container-x relative mt-6 grid gap-y-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-x-8">
        <div className="min-w-0 space-y-8">
          <section
            data-aos="fade-up"
            className="rounded-3xl border border-line bg-surface p-4 sm:p-6"
          >
            <div className="grid grid-cols-[7.5rem_1fr] gap-x-4 gap-y-5 sm:grid-cols-[13rem_1fr] sm:gap-x-8">
              <Portrait
                blogger={blogger}
                priority
                sizes="(min-width: 640px) 208px, 120px"
                className="aspect-[4/5] self-start rounded-2xl sm:row-span-2"
              />
              <div className="min-w-0 self-center sm:self-end">
                <h1 className="text-xl font-bold leading-tight sm:text-3xl">{blogger.name}</h1>
                <p className="mt-1 text-muted">{blogger.handle}</p>
                <p className="mt-3 text-sm font-semibold text-[var(--tone)]">{blogger.niche}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="max-w-xl leading-relaxed">{blogger.bio}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {blogger.topics.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-[var(--tone-soft)] px-3 py-1 text-sm font-medium text-[var(--tone)]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <dl className="mt-5 flex gap-8">
                  <div>
                    <dd className="text-xl font-bold">{blogger.postsCount}</dd>
                    <dt className="text-sm text-muted">публікацій</dt>
                  </div>
                  <div>
                    <dd className="text-xl font-bold">{blogger.followers}</dd>
                    <dt className="text-sm text-muted">підписників</dt>
                  </div>
                </dl>
                <div className="mt-5 grid max-w-md grid-cols-1 gap-2 sm:grid-cols-[3fr_2fr] lg:grid-cols-1">
                  <TelegramButton />
                  <div className="grid lg:hidden">
                    <button type="button" onClick={() => setChatOpen(true)} className="btn btn-ghost">
                      Написати
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div data-aos="fade-up" className="flex items-baseline justify-between">
              <h2 className="text-xl font-bold sm:text-2xl">Публікації</h2>
              <p className="text-sm text-muted">Гортайте, щоб побачити більше</p>
            </div>
            <div data-aos="fade-up" className="mt-4">
              <PostCarousel blogger={blogger} onOpen={setOpen} />
            </div>
          </section>
        </div>

        {/* Sticky column on desktop; the chat inside turns into a bottom sheet below lg. */}
        <aside className="lg:sticky lg:top-[5.5rem] lg:self-start">
          <div
            onClick={() => setChatOpen(false)}
            aria-hidden
            className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${
              chatOpen ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          />
          <div
            role="dialog"
            aria-label={`Чат з ${blogger.name}`}
            className={`fixed inset-x-0 bottom-0 z-50 h-[min(85dvh,44rem)] transition-[transform,visibility] duration-300 ease-out ${
              chatOpen ? "visible translate-y-0" : "invisible translate-y-full"
            } lg:visible lg:static lg:z-auto lg:h-[min(42rem,calc(100dvh-7rem))] lg:translate-y-0`}
          >
            <ChatDemo
              blogger={blogger}
              onClose={() => setChatOpen(false)}
              className="rounded-t-3xl shadow-2xl lg:rounded-3xl lg:shadow-none"
            />
          </div>
        </aside>
      </div>

      <button
        type="button"
        onClick={() => setChatOpen(true)}
        aria-label={`Відкрити чат з ${blogger.name}`}
        className={`fixed bottom-4 right-4 z-40 flex h-14 items-center gap-2.5 rounded-full bg-text py-1 pl-1 pr-5 font-semibold text-white shadow-xl shadow-ink/25 transition-all duration-300 active:scale-95 lg:hidden ${
          chatOpen ? "pointer-events-none translate-y-4 opacity-0" : ""
        }`}
      >
        <Avatar blogger={blogger} size={48} />
        <ChatIcon className="size-5" />
        Чат
      </button>

      {open !== null && (
        <PostModal
          blogger={blogger}
          index={open}
          liked={liked.includes(blogger.posts[open].id)}
          onLike={() => toggleLike(blogger.posts[open].id)}
          onClose={() => setOpen(null)}
          onChange={setOpen}
        />
      )}
    </>
  );
}
