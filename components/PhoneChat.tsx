import type { Blogger } from "@/lib/bloggers";
import Avatar from "./Avatar";
import { ChevronIcon, SendIcon } from "./Icons";

function StatusBar() {
  return (
    <div className="flex h-[3.1rem] items-end justify-between bg-surface px-7 pb-1 text-[0.8rem] font-semibold">
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <svg viewBox="0 0 18 12" className="h-2.5" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="0.8" /><rect x="5" y="5.5" width="3" height="6.5" rx="0.8" /><rect x="10" y="3" width="3" height="9" rx="0.8" /><rect x="15" y="0" width="3" height="12" rx="0.8" /></svg>
        <svg viewBox="0 0 16 12" className="h-2.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M1.5 4.2a9.5 9.5 0 0 1 13 0M4 7a6 6 0 0 1 8 0" /><circle cx="8" cy="10" r="1.2" fill="currentColor" stroke="none" /></svg>
        <svg viewBox="0 0 27 12" className="h-3"><rect x="0.5" y="0.5" width="22" height="11" rx="3.2" fill="none" stroke="currentColor" opacity="0.4" /><rect x="2" y="2" width="19" height="8" rx="2" fill="currentColor" /><rect x="24" y="4" width="2" height="4" rx="1" fill="currentColor" opacity="0.4" /></svg>
      </span>
    </div>
  );
}

/** Decorative smartphone with a short conversation that plays once on load. */
export default function PhoneChat({ blogger }: { blogger: Blogger }) {
  const q = blogger.dialog.quick[0];
  const bubble = "msg-in rounded-[1.1rem] px-3 py-1.5 text-[0.8rem] leading-snug shadow-[0_1px_1px_rgba(0,0,0,0.08)]";

  return (
    <div aria-hidden className="relative mx-auto w-[17rem] select-none">
      <div className="absolute -inset-10 -z-10 rounded-full opacity-60 blur-3xl" style={{ background: `hsl(${blogger.hue} 80% 85%)` }} />

      {/* side buttons */}
      <span className="absolute -left-[3px] top-[6.5rem] h-7 w-[3px] rounded-l bg-[#2a2c31]" />
      <span className="absolute -left-[3px] top-[9.5rem] h-12 w-[3px] rounded-l bg-[#2a2c31]" />
      <span className="absolute -left-[3px] top-[13rem] h-12 w-[3px] rounded-l bg-[#2a2c31]" />
      <span className="absolute -right-[3px] top-[10rem] h-[4.5rem] w-[3px] rounded-r bg-[#2a2c31]" />

      <div className="aspect-[9/19.2] rounded-[3rem] bg-gradient-to-b from-[#4a4d55] via-[#16181c] to-[#3a3d44] p-[3px] shadow-[0_30px_60px_-20px_rgba(14,22,33,0.45),0_0_0_1px_rgba(0,0,0,0.5)]">
        <div className="size-full rounded-[2.85rem] bg-black p-[0.45rem]">
          <div className="relative flex size-full flex-col overflow-hidden rounded-[2.45rem] bg-bg">
            <span className="absolute left-1/2 top-2.5 z-20 h-[1.45rem] w-[5.2rem] -translate-x-1/2 rounded-full bg-black" />

            <StatusBar />

            <div className="flex items-center gap-2 border-b border-line bg-surface px-3 pb-2.5 pt-1.5">
              <ChevronIcon className="size-5 rotate-180 text-accent" />
              <Avatar blogger={blogger} size={34} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.82rem] font-bold leading-tight">{blogger.name}</p>
                <p className="text-[0.7rem] text-accent">в мережі</p>
              </div>
            </div>

            <div
              className="flex flex-1 flex-col justify-end gap-1.5 overflow-hidden px-2.5 pb-3"
              style={{ background: `hsl(${blogger.hue} 45% 91%)` }}
            >
              <div className={`${bubble} max-w-[82%] self-start rounded-bl-md bg-surface`} style={{ animationDelay: "0.5s" }}>
                {blogger.dialog.greeting}
              </div>
              <div className={`${bubble} max-w-[82%] self-end rounded-br-md bg-[#d8eeff]`} style={{ animationDelay: "1.8s" }}>
                {q.q}
              </div>
              <div
                className="msg-in self-start overflow-hidden rounded-[1.1rem] rounded-bl-md bg-surface px-3 py-2.5 shadow-[0_1px_1px_rgba(0,0,0,0.08)]"
                style={{ animation: "fade-up 0.3s 2.6s both, hide-away 0.2s 4.1s forwards", maxHeight: "2.5rem" }}
              >
                <span className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="typing-dot size-1.5 rounded-full bg-muted" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </span>
              </div>
              <div className={`${bubble} max-w-[88%] self-start rounded-bl-md bg-surface`} style={{ animationDelay: "4.2s" }}>
                {q.a}
              </div>
            </div>

            <div className="flex items-center gap-2 border-t border-line bg-surface px-3 pb-6 pt-2">
              <span className="flex-1 rounded-full bg-bg px-3.5 py-1.5 text-[0.8rem] text-muted">Повідомлення</span>
              <span className="grid size-8 place-items-center rounded-full bg-accent text-white"><SendIcon className="size-4" /></span>
            </div>
            <span className="absolute bottom-1.5 left-1/2 z-20 h-1 w-28 -translate-x-1/2 rounded-full bg-text" />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-white/15 via-transparent to-transparent" />
    </div>
  );
}
