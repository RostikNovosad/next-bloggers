const blobs = [
  { pos: "-left-24 top-10", size: "size-72", hue: "28 90% 85%", o: "opacity-70" },
  { pos: "-right-20 top-0 lg:right-1/4", size: "size-72", hue: "335 85% 88%", o: "opacity-70" },
  { pos: "-left-16 top-[34rem]", size: "size-56", hue: "160 70% 85%", o: "opacity-60" },
  { pos: "-right-24 top-[52rem]", size: "size-72", hue: "215 85% 87%", o: "opacity-70" },
  { pos: "-left-20 top-[82rem]", size: "size-72", hue: "335 85% 90%", o: "opacity-60" },
  { pos: "-right-16 top-[112rem]", size: "size-64", hue: "28 90% 87%", o: "opacity-60" },
];

const dots = [
  { pos: "right-[8%] top-[38rem]", size: "size-8", hue: "335 80% 82%", d: "0s" },
  { pos: "left-[7%] top-[62rem]", size: "size-12", hue: "215 85% 80%", d: "-3s" },
  { pos: "right-[6%] top-[92rem]", size: "size-6", hue: "160 60% 78%", d: "-5s" },
];

/** One shared background layer for the whole page, so sections never show seams. */
export default function PageDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {blobs.map((b) => (
        <span
          key={b.pos}
          className={`absolute ${b.pos} ${b.size} ${b.o} rounded-full blur-3xl`}
          style={{ background: `hsl(${b.hue})` }}
        />
      ))}
      {dots.map((d) => (
        <span
          key={d.pos}
          className={`float absolute hidden lg:block ${d.pos} ${d.size} rounded-full`}
          style={{ background: `hsl(${d.hue})`, animationDelay: d.d }}
        />
      ))}
    </div>
  );
}
