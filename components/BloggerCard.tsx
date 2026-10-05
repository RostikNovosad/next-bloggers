import Link from "next/link";
import type { Blogger } from "@/lib/bloggers";
import Portrait from "./Portrait";
import { ArrowIcon } from "./Icons";

export default function BloggerCard({ blogger, index, wide = true }: { blogger: Blogger; index: number; wide?: boolean }) {
  const reversed = index % 2 === 1;
  return (
    <Link
      href={`/${blogger.id}`}
      data-aos="fade-up"
      className={`group grid gap-6 rounded-[2rem] p-3 sm:p-4 ${
        wide ? "md:grid-cols-[5fr_7fr] md:items-center md:gap-10 md:p-5" : ""
      }`}
      style={{ background: `hsl(${blogger.hue} 75% 93%)` }}
    >
      <Portrait
        blogger={blogger}
        sizes="(min-width: 768px) 40vw, 100vw"
        className={`arch aspect-[4/5] w-full transition-transform duration-700 ease-out group-hover:scale-[1.015] ${
          wide ? `md:aspect-[4/5] ${reversed ? "md:order-2" : ""}` : ""
        }`}
      />
      <div className={`flex flex-col px-2 pb-3 md:px-4 md:pb-0 ${wide && reversed ? "md:order-1" : ""}`}>
        <p className="text-xs text-muted">{blogger.niche}</p>
        <h3 className="mt-3 font-display text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
          {blogger.name}
        </h3>
        <p className="mt-1 text-sm text-muted">{blogger.handle}</p>
        <p className="mt-5 max-w-md text-base leading-relaxed sm:text-lg">{blogger.tagline}</p>
        <p className="mt-4 text-sm text-muted">{blogger.topics.join("  ·  ")}</p>

        <dl className="mt-6 flex gap-10 border-t border-black/10 pt-5">
          <div>
            <dt className="text-xs text-muted">Підписники</dt>
            <dd className="mt-1 font-display text-xl font-semibold">{blogger.followers}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Публікації</dt>
            <dd className="mt-1 font-display text-xl font-semibold">{blogger.postsCount}</dd>
          </div>
        </dl>

        <span className="btn btn-dark mt-7 w-full self-start md:w-auto">
          Дивитися блог
          <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
