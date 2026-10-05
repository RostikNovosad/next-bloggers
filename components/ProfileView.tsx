"use client";

import { useEffect, useState } from "react";
import type { Blogger } from "@/lib/bloggers";
import Avatar from "./Avatar";
import Portrait from "./Portrait";
import PostCarousel from "./PostCarousel";
import PostModal from "./PostModal";
import ChatDemo from "./ChatDemo";
import TelegramButton from "./TelegramButton";

export default function ProfileView({ blogger }: { blogger: Blogger }) {
  const [open, setOpen] = useState<number | null>(null);
  const [liked, setLiked] = useState<string[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const firstName = blogger.name.split(" ")[0];

  const toggleLike = (id: string) =>
    setLiked((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));

  // A short nudge from the blogger a few seconds after arrival, until the chat is opened.
  useEffect(() => {
    const t = setTimeout(() => setTeaser(true), 3500);
    return () => clearTimeout(t);
  }, []);

  // Phones get a bottom sheet: lock page scroll behind it. Escape closes on every size.
  useEffect(() => {
    if (!chatOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setChatOpen(false);
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    if (!window.matchMedia("(min-width: 640px)").matches) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [chatOpen]);

  const openChat = () => {
    setTeaser(false);
    setChatOpen(true);
  };

  return (
    <>
      <div className="container-x relative mt-6 space-y-10">
        <section data-aos="fade-up" className="rounded-3xl border border-line bg-surface p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-[7.5rem_1fr] gap-x-4 gap-y-5 sm:grid-cols-[13rem_1fr] sm:gap-x-8 sm:gap-y-0 lg:grid-cols-[16rem_1fr] lg:gap-x-12">
            <Portrait
              blogger={blogger}
              priority
              sizes="(min-width: 1024px) 256px, (min-width: 640px) 208px, 120px"
              className="aspect-[4/5] self-start rounded-2xl sm:row-span-2"
            />
            <div className="min-w-0 self-center sm:self-end">
              <h1 className="text-xl font-bold leading-tight sm:text-3xl">{blogger.name}</h1>
              <p className="mt-1 text-muted">{blogger.handle}</p>
              <dl className="mt-3 flex gap-6 sm:mt-5 sm:gap-10">
                <div>
                  <dd className="text-lg font-bold sm:text-xl">{blogger.postsCount}</dd>
                  <dt className="text-sm text-muted">публікацій</dt>
                </div>
                <div>
                  <dd className="text-lg font-bold sm:text-xl">{blogger.followers}</dd>
                  <dt className="text-sm text-muted">підписників</dt>
                </div>
              </dl>
            </div>
            <div className="col-span-2 sm:col-span-1 sm:pt-5">
              <ul className="flex flex-wrap gap-2">
                {blogger.topics.map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-[var(--tone-soft)] px-3 py-1 text-sm font-medium text-[var(--tone)]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-3 max-w-2xl leading-relaxed">{blogger.bio}</p>
              <div className="mt-5 grid max-w-lg grid-cols-1 gap-2 sm:grid-cols-2">
                <TelegramButton />
                <div className="grid">
                  <button type="button" onClick={openChat} className="btn btn-ghost">
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

      {/* Chat widget: bottom sheet on phones, floating window from sm up. */}
      <div
        onClick={() => setChatOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 sm:hidden ${
          chatOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-label={`Чат з ${blogger.name}`}
        className={`fixed inset-x-0 bottom-0 z-50 h-[min(85dvh,44rem)] transition-[transform,opacity,visibility] duration-300 ease-out sm:inset-x-auto sm:bottom-6 sm:right-6 sm:origin-bottom-right sm:h-[min(36rem,calc(100dvh-7rem))] sm:w-[24rem] ${
          chatOpen
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible translate-y-full sm:translate-y-3 sm:scale-95 sm:opacity-0"
        }`}
      >
        <ChatDemo
          blogger={blogger}
          onClose={() => setChatOpen(false)}
          className="rounded-t-3xl shadow-2xl shadow-ink/25 sm:rounded-3xl"
        />
      </div>

      {teaser && !chatOpen && (
        <button
          type="button"
          onClick={openChat}
          className="msg-in fixed bottom-[6.5rem] max-sm:hidden right-4 z-40 max-w-[16rem] rounded-2xl rounded-br-md bg-surface px-4 py-3 text-left text-sm leading-snug shadow-xl shadow-ink/15 sm:right-6"
        >
          <span className="font-bold">{firstName}</span>
          <span className="mt-0.5 block text-muted">Привіт! Напишіть мені, відповім одразу.</span>
        </button>
      )}

      <button
        type="button"
        onClick={openChat}
        aria-label={`Відкрити чат з ${blogger.name}`}
        className={`group fixed bottom-4 right-4 z-40 size-16 origin-bottom-right transition-all duration-300 sm:bottom-6 sm:right-6 ${
          chatOpen ? "pointer-events-none scale-75 opacity-0" : "hover:scale-105 active:scale-95"
        }`}
      >
        <span
          aria-hidden
          className="absolute inset-0 animate-ping rounded-full bg-[var(--tone)] opacity-30"
          style={{ animationIterationCount: 3 }}
        />
        <span className="relative block size-full rounded-full bg-surface p-1 shadow-xl shadow-ink/25">
          <Avatar blogger={blogger} size={56} />
        </span>
        <span
          aria-hidden
          className="absolute bottom-0.5 right-0.5 size-4 rounded-full bg-[#22c55e] ring-2 ring-surface"
        />
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
