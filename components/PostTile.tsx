import type { Post } from "@/lib/bloggers";
import { CommentIcon, HeartIcon } from "./Icons";

export function postBackground(hue: number, i: number) {
  const h = (hue + i * 18) % 360;
  const angle = 140 + i * 35;
  return `linear-gradient(${angle}deg, hsl(${h} 80% 90%) 0%, hsl(${h} 70% 72%) 100%)`;
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
      className="group relative flex aspect-[4/5] items-end overflow-hidden rounded-xl p-4 text-left sm:p-5"
      style={{ background: postBackground(hue, index) }}
    >
      <span className="text-base font-bold leading-snug sm:text-lg">{post.title}</span>
      <span className="absolute inset-0 flex items-center justify-center gap-5 bg-black/35 text-sm font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <span className="inline-flex items-center gap-1.5"><HeartIcon /> {post.likes}</span>
        <span className="inline-flex items-center gap-1.5"><CommentIcon /> {post.comments}</span>
      </span>
    </button>
  );
}
