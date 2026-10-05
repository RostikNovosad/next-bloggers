import Link from "next/link";
import type { Blogger } from "@/lib/bloggers";
import Portrait from "./Portrait";
import Avatar from "./Avatar";
import { ArrowIcon } from "./Icons";

/** Feed-style card: author row, large portrait, caption and CTA. */
export default function BloggerCard({ blogger }: { blogger: Blogger }) {
  return (
    <article data-aos="fade-up" className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex items-center gap-3 p-4">
        <Avatar blogger={blogger} size={48} ring />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold leading-tight">{blogger.name}</h3>
          <p className="truncate text-sm text-muted">{blogger.handle}</p>
        </div>
        <span className="text-sm font-medium text-muted">{blogger.niche}</span>
      </div>

      <Link href={`/${blogger.id}`} className="group block" aria-label={`Профіль: ${blogger.name}`}>
        <Portrait
          blogger={blogger}
          sizes="(min-width: 1024px) 36rem, 100vw"
          className="aspect-[4/5] w-full sm:aspect-square [&>*]:transition-transform [&>*]:duration-700 group-hover:[&>*]:scale-[1.03]"
        />
      </Link>

      <div className="p-4 sm:p-5">
        <div className="flex gap-6 text-sm">
          <span><b className="font-bold">{blogger.followers}</b> <span className="text-muted">підписників</span></span>
          <span><b className="font-bold">{blogger.postsCount}</b> <span className="text-muted">публікацій</span></span>
        </div>
        <p className="mt-3 leading-relaxed">
          <b className="font-bold">{blogger.handle}</b> {blogger.tagline}
        </p>
        <p className="mt-1 text-sm text-muted">{blogger.topics.join(", ")}</p>
        <Link href={`/${blogger.id}`} className="btn btn-primary mt-4 w-full">
          Дивитися блог
          <ArrowIcon />
        </Link>
      </div>
    </article>
  );
}
