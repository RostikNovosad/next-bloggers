import Link from "next/link";
import type { Blogger } from "@/lib/bloggers";
import Portrait from "./Portrait";
import Avatar from "./Avatar";
import { ArrowIcon, HeartIcon, CommentIcon, SendIcon } from "./Icons";

/** Portrait-first card: tall photo with the name and niche underneath. */
export default function BloggerCardTall({ blogger, index }: { blogger: Blogger; index: number }) {
  return (
    <Link
      href={`/${blogger.id}`}
      data-aos="fade-up"
      data-aos-delay={(index % 4) * 80}
      className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/10"
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <Avatar blogger={blogger} size={40} ring />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold leading-tight">{blogger.handle.replace(/^@/, "")}</p>
          <p className="truncate text-xs text-muted">{blogger.niche}</p>
        </div>
      </div>
      <div className="relative aspect-[4/5] overflow-hidden">
        <Portrait
          blogger={blogger}
          sizes="(min-width: 896px) 448px, (min-width: 640px) 50vw, 100vw"
          className="size-full transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface to-transparent" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 pt-3">
        <div className="flex items-center gap-4">
          <HeartIcon className="size-6" />
          <CommentIcon className="size-6" />
          <SendIcon className="size-6" />
        </div>
        <p className="text-sm font-bold">{blogger.followers} підписників</p>
        <p className="line-clamp-2 min-h-[2lh] text-sm leading-relaxed">
          <span className="font-bold">{blogger.name}</span> <span className="text-muted">{blogger.tagline}</span>
        </p>
        <span className="mt-auto inline-flex items-center justify-between gap-2 border-t border-line pt-3 text-sm font-semibold">
          Дивитися блог
          <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
