"use client";

import { useState } from "react";
import type { Blogger } from "@/lib/bloggers";
import Avatar from "./Avatar";
import PostTile from "./PostTile";
import PostModal from "./PostModal";
import ChatDemo from "./ChatDemo";
import TelegramButton from "./TelegramButton";
import { ChatIcon, GridIcon } from "./Icons";

const tabs = [
  { id: "posts", label: "Публікації", Icon: GridIcon },
  { id: "chat", label: "Діалог", Icon: ChatIcon },
] as const;

export default function ProfileView({ blogger }: { blogger: Blogger }) {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("posts");
  const [open, setOpen] = useState<number | null>(null);
  const [liked, setLiked] = useState<string[]>([]);

  const toggleLike = (id: string) =>
    setLiked((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));

  return (
    <>
      <section className="container-x mt-6">
        <div data-aos="fade-up" className="grid items-center gap-5 sm:gap-8 md:grid-cols-[auto_1fr] md:gap-14">
          <div className="flex items-center gap-5 md:block">
            <span className="md:hidden"><Avatar blogger={blogger} size={92} ring /></span>
            <span className="hidden md:block"><Avatar blogger={blogger} size={176} ring /></span>
            <dl className="flex flex-1 justify-around text-center md:hidden">
              <div><dd className="text-xl font-bold">{blogger.postsCount}</dd><dt className="text-sm text-muted">публікацій</dt></div>
              <div><dd className="text-xl font-bold">{blogger.followers}</dd><dt className="text-sm text-muted">підписників</dt></div>
            </dl>
          </div>

          <div>
            <h1 className="text-xl font-bold sm:text-3xl">{blogger.name}</h1>
            <p className="text-muted">{blogger.handle}</p>
            <dl className="mt-5 hidden gap-10 md:flex">
              <div className="flex items-baseline gap-1.5"><dd className="text-lg font-bold">{blogger.postsCount}</dd><dt className="text-muted">публікацій</dt></div>
              <div className="flex items-baseline gap-1.5"><dd className="text-lg font-bold">{blogger.followers}</dd><dt className="text-muted">підписників</dt></div>
            </dl>
            <p className="mt-4 text-sm font-semibold text-muted">{blogger.niche}</p>
            <p className="mt-1 max-w-xl leading-relaxed">{blogger.bio}</p>
            <p className="mt-2 text-sm text-muted">{blogger.topics.join(", ")}</p>
            <div className="mt-5 grid max-w-md grid-cols-[3fr_2fr] gap-2">
              <TelegramButton />
              <button type="button" onClick={() => setTab("chat")} className="btn btn-ghost">
                Написати
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x mt-8">
        <div role="tablist" className="grid grid-cols-2 border-b border-line">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`-mb-px inline-flex items-center justify-center gap-2 border-b-2 py-3.5 text-sm font-semibold transition-colors ${
                tab === id ? "border-text text-text" : "border-transparent text-muted hover:text-text"
              }`}
            >
              <Icon className="size-5" /> {label}
            </button>
          ))}
        </div>

        <div className="mt-4 sm:mt-6" role="tabpanel">
          {tab === "posts" ? (
            <div className="grid grid-cols-2 gap-1.5 sm:gap-3 md:grid-cols-4">
              {blogger.posts.map((p, i) => (
                <PostTile key={p.id} post={p} hue={blogger.hue} index={i} onOpen={() => setOpen(i)} />
              ))}
            </div>
          ) : (
            <ChatDemo blogger={blogger} />
          )}
        </div>
      </section>

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
