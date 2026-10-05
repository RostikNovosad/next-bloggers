import Image from "next/image";
import type { Blogger } from "@/lib/bloggers";

/** Portrait with a tinted placeholder until the generated photo is added. */
export default function Portrait({
  blogger,
  className = "",
  sizes = "(min-width: 768px) 33vw, 100vw",
  priority = false,
}: {
  blogger: Blogger;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const { hue, photo, name } = blogger;
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(180deg, hsl(${hue} 80% 88%) 0%, hsl(${hue} 70% 68%) 100%)`,
      }}
    >
      {photo ? (
        <Image src={photo} alt={name} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <svg viewBox="0 0 100 125" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 size-full" aria-hidden>
          <circle cx="50" cy="52" r="17" fill={`hsl(${hue} 55% 28%)`} opacity="0.3" />
          <path d="M12 125c0-26 17-40 38-40s38 14 38 40Z" fill={`hsl(${hue} 55% 28%)`} opacity="0.3" />
        </svg>
      )}
    </div>
  );
}
