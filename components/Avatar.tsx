import type { Blogger } from "@/lib/bloggers";
import Portrait from "./Portrait";

/** Round avatar, optionally wrapped in a story ring. */
export default function Avatar({
  blogger,
  size = 56,
  ring = false,
  seen = false,
}: {
  blogger: Blogger;
  size?: number;
  ring?: boolean;
  seen?: boolean;
}) {
  const portrait = <Portrait blogger={blogger} sizes={`${size}px`} className="size-full rounded-full" />;
  if (!ring) {
    return <div className="shrink-0" style={{ width: size, height: size }}>{portrait}</div>;
  }
  return (
    <div
      className={`shrink-0 rounded-full p-[3px] ${seen ? "story-ring-seen" : "story-ring"}`}
      style={{ width: size, height: size }}
    >
      <div className="size-full rounded-full bg-bg p-[3px]">{portrait}</div>
    </div>
  );
}
