"use client";

import { useEffect, useRef, useState } from "react";
import type { Blogger, Message } from "@/lib/bloggers";
import { SendIcon } from "./Icons";
import TelegramButton from "./TelegramButton";

export default function ChatDemo({ blogger }: { blogger: Blogger }) {
  const [messages, setMessages] = useState<Message[]>([{ from: "ai", text: blogger.dialog.greeting }]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const ask = (q: string, a?: string) => {
    if (typing || !q.trim()) return;
    setMessages((m) => [...m, { from: "user", text: q }]);
    setTyping(true);
    timer.current = setTimeout(() => {
      setMessages((m) => [
        ...m,
        { from: "ai", text: a ?? "Гарне запитання. Детальну відповідь надішлю в Telegram, там зручніше продовжити розмову." },
      ]);
      setTyping(false);
    }, 900);
  };

  const unused = blogger.dialog.quick.filter((c) => !messages.some((m) => m.text === c.q));

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-line bg-surface">
      <div ref={scroller} className="flex h-[22rem] flex-col gap-3 overflow-y-auto p-4 sm:h-[26rem] sm:p-6">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`msg-in max-w-[85%] rounded-2xl px-4 py-3 text-[0.95rem] leading-relaxed ${
              m.from === "ai"
                ? "self-start rounded-bl-md bg-surface-2"
                : "self-end rounded-br-md bg-accent text-accent-ink"
            }`}
          >
            {m.text}
          </div>
        ))}
        {typing && (
          <div className="msg-in self-start rounded-2xl rounded-bl-md bg-surface-2 px-4 py-3 text-muted" aria-label="Блогер друкує">
            Друкує…
          </div>
        )}
      </div>

      <div className="border-t border-line p-4">
        {unused.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {unused.map((c) => (
              <button
                key={c.q}
                type="button"
                onClick={() => ask(c.q, c.a)}
                disabled={typing}
                className="rounded-full border border-line px-4 py-2 text-left text-sm transition-colors hover:border-white/30 disabled:opacity-50"
              >
                {c.q}
              </button>
            ))}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(draft);
            setDraft("");
          }}
          className="flex items-center gap-2"
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={`Напишіть ${blogger.name.split(" ")[0]}`}
            aria-label="Повідомлення"
            className="h-12 min-w-0 flex-1 rounded-full border border-line bg-bg px-5 text-base outline-none placeholder:text-muted focus:border-accent"
          />
          <button
            type="submit"
            aria-label="Надіслати"
            disabled={typing || !draft.trim()}
            className="grid size-12 shrink-0 place-items-center rounded-full bg-accent text-accent-ink transition-opacity disabled:opacity-40"
          >
            <SendIcon />
          </button>
        </form>
        <TelegramButton label="Продовжити в Telegram" variant="ghost" className="mt-3 w-full" />
      </div>
    </div>
  );
}
