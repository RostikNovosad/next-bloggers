import Image from "next/image";
import type { Blogger } from "@/lib/bloggers";

/** Portrait with a tinted placeholder until the generated photo is added. */
export default function Portrait({
  blogger,
  className = "",
  sizes = "(min-width: 768px) 33vw, 100vw",
  priority = false,
  face,
}: {
  blogger: Blogger;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Crop tightly around the face (for round avatars). */
  face?: { x: number; y: number; zoom: number };
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
        face ? (
          <Image
            src={photo}
            alt={name}
            width={928}
            height={1152}
            sizes={sizes}
            className="absolute max-w-none"
            style={faceCrop(face)}
          />
        ) : (
          <Image src={photo} alt={name} fill sizes={sizes} priority={priority} className="object-cover" />
        )
      ) : (
        <svg viewBox="0 0 100 125" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 size-full" aria-hidden>
          <circle cx="50" cy="52" r="17" fill={`hsl(${hue} 55% 28%)`} opacity="0.3" />
          <path d="M12 125c0-26 17-40 38-40s38 14 38 40Z" fill={`hsl(${hue} 55% 28%)`} opacity="0.3" />
        </svg>
      )}
    </div>
  );
}

/** Places the 4:5 image so the face sits at the centre of a square box, scaled by `zoom`. */
function faceCrop({ x, y, zoom }: { x: number; y: number; zoom: number }) {
  return {
    width: `${zoom * 100}%`,
    height: `${zoom * 125}%`,
    left: `${(0.5 - (x / 100) * zoom) * 100}%`,
    top: `${(0.5 - (y / 100) * 1.25 * zoom) * 100}%`,
  };
}
