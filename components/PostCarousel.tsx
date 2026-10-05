"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Blogger } from "@/lib/bloggers";
import PostTile from "./PostTile";
import { ArrowIcon, BackIcon } from "./Icons";

/** Swipe on touch screens, arrow buttons on desktop; three tiles fit at once from sm up. */
export default function PostCarousel({
  blogger,
  onOpen,
}: {
  blogger: Blogger;
  onOpen: (i: number) => void;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft < 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    const tile = el?.firstElementChild as HTMLElement | null;
    if (!el || !tile) return;
    el.scrollBy({ left: dir * (tile.offsetWidth + 16), behavior: "smooth" });
  };

  const arrow =
    "hidden size-11 place-items-center rounded-full border border-line bg-surface text-text shadow-md transition-opacity hover:bg-bg disabled:pointer-events-none disabled:opacity-0 sm:grid";

  return (
    <div className="relative">
      <div
        ref={track}
        onScroll={update}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 sm:scroll-px-0 [&::-webkit-scrollbar]:hidden"
      >
        {blogger.posts.map((p, i) => (
          <div key={p.id} className="w-[72%] shrink-0 snap-start sm:w-[calc((100%-2rem)/3)]">
            <PostTile post={p} hue={blogger.hue} index={i} onOpen={() => onOpen(i)} />
          </div>
        ))}
      </div>
      <button
        type="button"
        aria-label="Попередні публікації"
        disabled={edge.start}
        onClick={() => scrollBy(-1)}
        className={`${arrow} absolute -left-5 top-1/2 -translate-y-1/2`}
      >
        <BackIcon />
      </button>
      <button
        type="button"
        aria-label="Наступні публікації"
        disabled={edge.end}
        onClick={() => scrollBy(1)}
        className={`${arrow} absolute -right-5 top-1/2 -translate-y-1/2`}
      >
        <ArrowIcon />
      </button>
    </div>
  );
}
