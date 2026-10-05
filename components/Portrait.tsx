import Image from "next/image";
import type { Blogger } from "@/lib/bloggers";

/** Portrait with a tinted placeholder until the generated photo is added. */
export default function Portrait({
  blogger,
  className = "",
  sizes = "(min-width: 768px) 33vw, 100vw",
  priority = false,
  crop,
}: {
  blogger: Blogger;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** "avatar": tight crop for round avatars. "portrait": 4:5 frame with the face at a steady spot. */
  crop?: "avatar" | "portrait";
}) {
  const { hue, photo, name, face } = blogger;
  const framing = face && crop ? faceCrop(face, crop) : null;
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(180deg, hsl(${hue} 80% 88%) 0%, hsl(${hue} 70% 68%) 100%)`,
      }}
    >
      {photo ? (
        framing ? (
          <Image
            src={photo}
            alt={name}
            width={928}
            height={1152}
            priority={priority}
            sizes={crop === "portrait" ? "(min-width: 640px) 928px, 100vw" : sizes}
            className="absolute max-w-none"
            style={framing}
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

/**
 * Positions the 4:5 photo inside its box.
 * avatar: face centred in a square, scaled by `zoom`.
 * portrait: face at 50% / 36% of a 4:5 frame, zoomed so faces end up a similar size.
 */
function faceCrop({ x, y, zoom }: { x: number; y: number; zoom: number }, mode: "avatar" | "portrait") {
  if (mode === "avatar") {
    return {
      width: `${zoom * 100}%`,
      height: `${zoom * 125}%`,
      left: `${(0.5 - (x / 100) * zoom) * 100}%`,
      top: `${(0.5 - (y / 100) * 1.25 * zoom) * 100}%`,
    };
  }
  const z = Math.max(1, zoom * 0.6);
  const clamp = (v: number) => Math.min(0, Math.max(1 - z, v));
  return {
    width: `${z * 100}%`,
    height: `${z * 100}%`,
    left: `${clamp(0.5 - (x / 100) * z) * 100}%`,
    top: `${clamp(0.36 - (y / 100) * z) * 100}%`,
  };
}
