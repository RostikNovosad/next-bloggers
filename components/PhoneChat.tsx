import type { Blogger } from "@/lib/bloggers";
import Avatar from "./Avatar";
import { SendIcon } from "./Icons";

/** Decorative device with a short conversation that plays once on load. */
export default function PhoneChat({ blogger }: { blogger: Blogger }) {
  const q = blogger.dialog.quick[0];
  return (
    <div
      aria-hidden
      className="mx-auto w-full max-w-[19rem] rounded-[2.5rem] border-[10px] border-text bg-text shadow-2xl shadow-black/15"
    >
      <div className="overflow-hidden rounded-[1.9rem] bg-bg">
        <div className="flex items-center gap-3 bg-surface px-4 py-3">
          <Avatar blogger={blogger} size={36} />
          <div>
            <p className="text-sm font-bold leading-tight">{blogger.name}</p>
            <p className="text-xs text-accent">в мережі</p>
          </div>
        </div>
        <div
          className="flex h-[24rem] flex-col justify-end gap-2 px-3 pb-3"
          style={{ background: `hsl(${blogger.hue} 45% 91%)` }}
        >
          <div className="msg-in max-w-[85%] self-start rounded-2xl rounded-bl-md bg-surface px-3 py-2 text-sm leading-snug shadow-sm" style={{ animationDelay: "0.4s" }}>
            {blogger.dialog.greeting}
          </div>
          <div className="msg-in max-w-[85%] self-end rounded-2xl rounded-br-md bg-[#d8eeff] px-3 py-2 text-sm leading-snug shadow-sm" style={{ animationDelay: "1.6s" }}>
            {q.q}
          </div>
          <div
            className="msg-in self-start overflow-hidden rounded-2xl rounded-bl-md bg-surface px-3 py-2.5 shadow-sm"
            style={{ animation: "fade-up 0.3s 2.4s both, hide-away 0.2s 3.8s forwards", maxHeight: "3rem" }}
          >
            <span className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="typing-dot size-1.5 rounded-full bg-muted" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </span>
          </div>
          <div className="msg-in max-w-[90%] self-start rounded-2xl rounded-bl-md bg-surface px-3 py-2 text-sm leading-snug shadow-sm" style={{ animationDelay: "3.9s" }}>
            {q.a}
          </div>
        </div>
        <div className="flex items-center gap-2 bg-surface px-3 py-2.5">
          <span className="flex-1 rounded-full bg-bg px-4 py-2 text-sm text-muted">Повідомлення</span>
          <span className="grid size-9 place-items-center rounded-full bg-accent text-white"><SendIcon /></span>
        </div>
      </div>
    </div>
  );
}
