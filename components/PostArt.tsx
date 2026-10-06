import Image from "next/image";
import type { Post } from "@/lib/bloggers";
import { postBackground } from "./PostTile";

/** Fills its (relative, overflow-hidden) parent with the post photo, or a tinted placeholder. */
export default function PostArt({
  post,
  hue,
  index,
  sizes,
  priority = false,
}: {
  post: Post;
  hue: number;
  index: number;
  sizes: string;
  priority?: boolean;
}) {
  if (!post.image) {
    return <span aria-hidden className="absolute inset-0" style={{ background: postBackground(hue, index) }} />;
  }
  return (
    <>
      <Image
        src={post.image}
        alt={post.title}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: post.imagePosition }}
      />
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
    </>
  );
}
