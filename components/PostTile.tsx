import type { Post } from "@/lib/bloggers";

export function postBackground(hue: number, i: number) {
  const h = (hue + i * 22) % 360;
  const angle = 140 + i * 35;
  return `linear-gradient(${angle}deg, hsl(${h} 45% 30%) 0%, hsl(${h} 40% 12%) 100%)`;
}

export default function PostTile({
  post,
  hue,
  index,
  onOpen,
}: {
  post: Post;
  hue: number;
  index: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Відкрити публікацію: ${post.title}`}
      className="group relative flex aspect-square items-end overflow-hidden rounded-2xl border border-line p-4 text-left transition-transform duration-300 hover:-translate-y-0.5 sm:p-5"
      style={{ background: postBackground(hue, index) }}
    >
      <span className="text-base font-semibold leading-snug sm:text-lg">{post.title}</span>
    </button>
  );
}
