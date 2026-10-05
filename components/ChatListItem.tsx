import Link from "next/link";
import type { Blogger } from "@/lib/bloggers";
import Avatar from "./Avatar";
import { ChevronIcon } from "./Icons";

export default function ChatListItem({ blogger }: { blogger: Blogger }) {
  return (
    <Link
      href={`/${blogger.id}`}
      className="flex items-center gap-4 rounded-2xl bg-surface p-3 transition-colors hover:bg-white/60 sm:p-4"
    >
      <Avatar blogger={blogger} size={56} ring />
      <div className="min-w-0 flex-1">
        <p className="font-bold">{blogger.name}</p>
        <p className="truncate text-sm text-muted">{blogger.tagline}</p>
      </div>
      <ChevronIcon className="size-5 text-muted" />
    </Link>
  );
}
