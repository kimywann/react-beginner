import { useEffect } from "react";
import { useParams } from "react-router";
import { useAuthStore } from "@/stores";
import { usePostDetail } from "@/hooks/usePostDetail";

import PostDetailHeader from "@/components/common/post/detail/PostDetailHeader";
import PostDetailActions from "@/components/common/post/detail/PostDetailActions";
import PostDetailMeta from "@/components/common/post/detail/PostDetailMeta";
import PostDetailContent from "@/components/common/post/detail/PostDetailContent";

import { Separator, Spinner } from "@/components/ui";
import { toast } from "sonner";

export default function PostDetail() {
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);

  const { post, isLoading, isError } = usePostDetail(id);

  useEffect(() => {
    if (isError) {
      toast.error("게시글을 불러오지 못했습니다.");
    }
  }, [isError]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner className="size-20" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        게시글이 존재하지 않습니다.
      </div>
    );
  }

  return (
    <>
      {user && <PostDetailActions post={post} user={user} />}
      <PostDetailHeader post={post} />
      <PostDetailMeta post={post} />

      <Separator className="mx-auto mt-10 !w-[55%] border-2" />

      <PostDetailContent post={post} />
    </>
  );
}
