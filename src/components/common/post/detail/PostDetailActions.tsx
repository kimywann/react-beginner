import { useCallback } from "react";
import { usePostDelete } from "@/hooks/usePostDelete";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@/components/ui";

import type { Post } from "@/types/post.type";
import type { User } from "@/types/user.type";

interface Props {
  post: Post;
  user: User;
}

export default function PostDetailActions({ post, user }: Props) {
  const { handleDelete } = usePostDelete();

  const handleDeleteClick = useCallback(() => {
    handleDelete(post.id);
  }, [post.id]);

  return (
    <div className="flex justify-end p-4">
      {post?.author === user?.id && (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-12">
            수정
          </Button>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-12 !bg-red-300"
              >
                삭제
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  해당 모집 게시글을 삭제하시겠습니까?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  삭제하시면 영구적으로 삭제되어 복구할 수 없습니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>닫기</AlertDialogCancel>
                <AlertDialogAction
                  className="text-foreground bg-red-300 hover:bg-red-700/40"
                  onClick={handleDeleteClick}
                >
                  삭제
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}
