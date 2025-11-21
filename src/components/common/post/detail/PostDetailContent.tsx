import { Editor } from "@/components/write";
import type { Post } from "@/types/post.type";

interface Props {
  post: Post;
}

export default function PostDetailContent({ post }: Props) {
  return (
    <div className="mt-12 mb-12 flex w-full justify-center">
      <main>
        <div className="w-full max-w-3xl">
          {post?.content && <Editor props={post?.content} readonly />}
        </div>
      </main>
    </div>
  );
}
