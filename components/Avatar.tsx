import type { Blogger } from '@/lib/bloggers';
import Portrait from './Portrait';

/** Round avatar, optionally wrapped in a story ring. */
export default function Avatar({
  blogger,
  size = 56,
  ring = false,
  seen = false,
}: {
  blogger: Blogger;
  size?: number;
  ring?: boolean;
  seen?: boolean;
}) {
  // A dedicated square avatar is used as is; otherwise the portrait is cropped around the face.
  const portrait = blogger.avatar ? (
    <Portrait
      blogger={{ ...blogger, photo: blogger.avatar }}
      sizes={`${size * 2}px`}
      className="size-full rounded-full"
    />
  ) : (
    <Portrait
      blogger={blogger}
      sizes={`${Math.ceil(size * (blogger.face?.zoom ?? 1))}px`}
      className="size-full rounded-full"
      crop="avatar"
    />
  );
  if (!ring) {
    return (
      <div className="shrink-0" style={{ width: size, height: size }}>
        {portrait}
      </div>
    );
  }
  return (
    <div
      className={`shrink-0 rounded-full p-0.5 ${
        seen ? 'story-ring-seen' : 'story-ring'
      }`}
      style={{ width: size, height: size }}
    >
      <div className="size-full rounded-full bg-bg p-0.5">{portrait}</div>
    </div>
  );
}
