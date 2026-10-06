import type { Post } from "@/lib/bloggers";
import PostArt from "./PostArt";
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
      className="group relative flex aspect-[4/5] w-full items-end overflow-hidden rounded-2xl p-3 text-left sm:p-4"
      style={{ background: postBackground(hue, index) }}
    >
      <PostArt post={post} hue={hue} index={index} sizes="(min-width: 1024px) 360px, (min-width: 640px) 33vw, 72vw" />
      <span className={`relative text-base font-bold leading-snug sm:text-lg ${post.image ? "text-white" : ""}`}>{post.title}</span>
      <span className="absolute inset-0 flex items-center justify-center gap-5 bg-black/35 text-sm font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <span className="inline-flex items-center gap-1.5"><HeartIcon /> {post.likes}</span>
        <span className="inline-flex items-center gap-1.5"><CommentIcon /> {post.comments}</span>
      </span>
    </button>
  );
}
