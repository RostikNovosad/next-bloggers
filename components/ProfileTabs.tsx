"use client";

import { useState } from "react";
import type { Blogger } from "@/lib/bloggers";
import PostTile from "./PostTile";
import PostModal from "./PostModal";
import ChatDemo from "./ChatDemo";

const tabs = [
  { id: "posts", label: "Публікації" },
  { id: "chat", label: "Діалог" },
] as const;

export default function ProfileTabs({ blogger }: { blogger: Blogger }) {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("posts");
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="container-x mt-12">
      <div role="tablist" className="inline-flex rounded-full bg-surface p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              tab === t.id ? "bg-text text-white" : "text-muted hover:text-text"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6" role="tabpanel">
        {tab === "posts" ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {blogger.posts.map((p, i) => (
              <PostTile key={p.id} post={p} hue={blogger.hue} index={i} onOpen={() => setOpen(i)} />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl md:mx-0">
            <ChatDemo blogger={blogger} />
          </div>
        )}
      </div>

      {open !== null && (
        <PostModal blogger={blogger} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
      )}
    </section>
  );
}
