import Link from "next/link";
import type { Blogger } from "@/lib/bloggers";
import Portrait from "./Portrait";

const offsets = ["md:mt-0", "md:mt-14", "md:mt-6", "md:mt-20"];
const offsetsSm = ["mt-0", "mt-6", "mt-2", "mt-9"];

export default function HeroArches({ bloggers }: { bloggers: Blogger[] }) {
  return (
    <ul className="grid grid-cols-4 gap-2.5 sm:gap-5">
      {bloggers.map((b, i) => (
        <li
          key={b.id}
          data-aos="fade-up"
          data-aos-delay={i * 110}
          className={`${offsetsSm[i]} ${offsets[i]}`}
        >
          <Link href={`/${b.id}`} className="group block" aria-label={`${b.name}, ${b.niche}`}>
            <Portrait
              blogger={b}
              sizes="(min-width: 1024px) 18rem, 25vw"
              className="arch aspect-[3/5] w-full transition-transform duration-500 ease-out group-hover:-translate-y-2"
            />
            <p className="mt-3 hidden text-xs text-muted sm:block">{b.handle}</p>
            <p className="hidden font-display text-sm font-medium sm:block">{b.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
