import type { Post } from "@/types/post.type";
import { Separator } from "@/components/ui";
import dayjs from "dayjs";

interface Props {
  post: Post;
}

export default function PostDetailHeader({ post }: Props) {
  return (
    <header className="mt-12 flex w-full flex-col items-center">
      <div className="flex h-full w-full flex-col items-center">
        <span className="mb-4 text-lg"># {post?.category}</span>
        <h1 className="scroll-m-20 text-center text-xl font-extrabold tracking-tight sm:text-2xl md:text-4xl">
          {post?.title}
        </h1>

        <Separator className="bg-foreground my-6 !w-6" />

        <span className="text-md md:text-lg">
          {dayjs(post?.created_at).format("YYYY. MM. DD")}
        </span>
      </div>
    </header>
  );
}
