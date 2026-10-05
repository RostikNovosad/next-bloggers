"use client";

import { useEffect, useRef, useState } from "react";
import type { Blogger } from "@/lib/bloggers";
import Avatar from "./Avatar";
import { CloseIcon, SendIcon } from "./Icons";
import TelegramButton from "./TelegramButton";

type Msg = { from: "user" | "ai"; text: string; time?: string };

const now = () => new Date().toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });

export default function ChatDemo({
  blogger,
  className = "",
  onClose,
}: {
  blogger: Blogger;
  className?: string;
  onClose?: () => void;
}) {
  const [messages, setMessages] = useState<Msg[]>([{ from: "ai", text: blogger.dialog.greeting }]);
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
    setMessages((m) => [...m, { from: "user", text: q, time: now() }]);
    setTyping(true);
    timer.current = setTimeout(() => {
      setMessages((m) => [
        ...m,
        { from: "ai", text: a ?? "Гарне запитання. Детальну відповідь надішлю в Telegram, там зручніше продовжити розмову.", time: now() },
      ]);
      setTyping(false);
    }, 1100);
  };

  const unused = blogger.dialog.quick.filter((c) => !messages.some((m) => m.text === c.q));

  return (
    <div className={`flex h-full flex-col overflow-hidden border border-line bg-surface ${className}`}>
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <Avatar blogger={blogger} size={40} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-bold leading-tight">{blogger.name}</p>
          <p className="text-sm text-[var(--tone,var(--accent))]">{typing ? "друкує…" : "в мережі"}</p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрити чат"
            className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-bg hover:text-text"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      <div
        ref={scroller}
        className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-3 sm:p-4"
        style={{ background: `hsl(${blogger.hue} 45% 91%)` }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`msg-in max-w-[85%] rounded-2xl px-3.5 py-2 leading-snug shadow-sm ${
              m.from === "ai" ? "self-start rounded-bl-md bg-surface" : "self-end rounded-br-md bg-[#d8eeff]"
            }`}
          >
            {m.text}
            {m.time && <span className="ml-3 inline-block translate-y-1 text-xs text-muted">{m.time}</span>}
          </div>
        ))}
        {typing && (
          <div className="msg-in self-start rounded-2xl rounded-bl-md bg-surface px-4 py-3.5 shadow-sm" aria-label="Блогер друкує">
            <span className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="typing-dot size-1.5 rounded-full bg-muted" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </span>
          </div>
        )}
        {!typing && (
          <div className="msg-in mt-1 flex max-w-[85%] flex-col gap-1.5 self-start">
            {unused.map((c) => (
              <button
                key={c.q}
                type="button"
                onClick={() => ask(c.q, c.a)}
                className="rounded-xl bg-white/80 px-4 py-2.5 text-left text-[0.95rem] font-medium text-[var(--tone,var(--accent))] backdrop-blur transition-colors hover:bg-white"
              >
                {c.q}
              </button>
            ))}
            <TelegramButton label="Продовжити в Telegram" className="!min-h-11 !text-[0.95rem]" />
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(draft);
          setDraft("");
        }}
        className="flex items-center gap-2 border-t border-line p-3"
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Повідомлення"
          aria-label="Повідомлення"
          className="h-11 min-w-0 flex-1 rounded-full bg-bg px-5 text-base outline-none placeholder:text-muted focus:ring-2 focus:ring-accent/40"
        />
        <button
          type="submit"
          aria-label="Надіслати"
          disabled={typing || !draft.trim()}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--tone,var(--accent))] text-white transition-opacity disabled:opacity-40"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
}
