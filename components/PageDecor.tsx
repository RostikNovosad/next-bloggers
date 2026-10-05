const hues = ["28 90% 85%", "335 85% 88%", "160 70% 85%", "215 85% 87%"];

/** Blobs spread by percentage so the decor covers the page at any height. */
const blobs = Array.from({ length: 16 }, (_, i) => ({
  top: `${(i * 5.6 + 1).toFixed(1)}%`,
  side: i % 2 === 0 ? "-left-10 sm:-left-24" : "-right-10 sm:-right-24",
  hue: hues[i % hues.length],
  opacity: i % 3 === 0 ? 0.8 : 0.65,
}));

const dots = [
  { top: "9%", side: "right-[8%]", size: "size-8", hue: "335 80% 82%", d: "0s" },
  { top: "17%", side: "left-[7%]", size: "size-12", hue: "215 85% 80%", d: "-3s" },
  { top: "29%", side: "right-[6%]", size: "size-6", hue: "160 60% 78%", d: "-5s" },
  { top: "41%", side: "left-[6%]", size: "size-8", hue: "28 90% 82%", d: "-2s" },
  { top: "53%", side: "right-[8%]", size: "size-12", hue: "335 80% 82%", d: "-4s" },
  { top: "65%", side: "left-[9%]", size: "size-6", hue: "215 85% 80%", d: "-1s" },
  { top: "77%", side: "right-[7%]", size: "size-8", hue: "160 60% 78%", d: "-6s" },
  { top: "89%", side: "left-[8%]", size: "size-10", hue: "28 90% 82%", d: "-3s" },
];

/** One shared background layer for the whole page, so sections never show seams. */
export default function PageDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {blobs.map((b) => (
        <span
          key={b.top}
          className={`absolute ${b.side} size-64 rounded-full blur-3xl sm:size-72`}
          style={{ top: b.top, background: `hsl(${b.hue})`, opacity: b.opacity }}
        />
      ))}
      {dots.map((d) => (
        <span
          key={d.top}
          className={`float absolute ${d.side} ${d.size} rounded-full`}
          style={{ top: d.top, background: `hsl(${d.hue})`, animationDelay: d.d }}
        />
      ))}
    </div>
  );
}
