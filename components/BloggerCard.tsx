import Link from "next/link";
import type { Blogger } from "@/lib/bloggers";
import Portrait from "./Portrait";
import { ArrowIcon } from "./Icons";

export default function BloggerCard({ blogger, index }: { blogger: Blogger; index: number }) {
  return (
    <Link
      href={`/${blogger.id}`}
      data-aos="fade-up"
      data-aos-delay={(index % 4) * 80}
      className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-colors duration-300 hover:border-white/25"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Portrait
          blogger={blogger}
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="size-full transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface to-transparent" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div>
          <p className="text-xs text-muted">{blogger.niche}</p>
          <h3 className="mt-1 text-lg font-semibold leading-tight tracking-tight sm:text-xl">{blogger.name}</h3>
          <p className="text-sm text-muted">{blogger.handle}</p>
        </div>
        <p className="line-clamp-2 hidden text-sm leading-relaxed text-muted sm:block">{blogger.tagline}</p>
        <span className="mt-auto inline-flex items-center justify-between gap-2 border-t border-line pt-3 text-sm font-semibold">
          Дивитися блог
          <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
