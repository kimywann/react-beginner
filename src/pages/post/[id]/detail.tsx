import supabase from "@/lib/supabase";

import { useAuthStore } from "@/stores";
import { usePostDetail } from "@/hooks/usePostDetail";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import { Editor } from "@/components/write";
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
  Separator,
  Spinner,
} from "@/components/ui";
import { toast } from "sonner";
import { Badge } from "@/components/ui";
import dayjs from "dayjs";

export default function PostDetail() {
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const { post, isLoading, isError } = usePostDetail(id);

  useEffect(() => {
    if (isError) {
      toast.error("게시글을 불러오지 못했습니다.");
    }
  }, [isError]);

  if (!post && !isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        게시글이 존재하지 않습니다.
      </div>
    );
  }

  const handleDelete = async () => {
    try {
      const { error } = await supabase.from("post").delete().eq("id", id);

      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("글을 삭제하였습니다.");
      navigate("/");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex h-screen w-full items-center justify-center">
          <Spinner className="size-20" />
        </div>
      ) : (
        <>
          {/* 수정 및 삭제 버튼 */}
          <div className="flex justify-end p-4">
            {post?.author === user?.id && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-12"
                  onClick={() => navigate(`/recruit/posts/${id}/edit`)}
                >
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
                        onClick={handleDelete}
                      >
                        삭제
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>

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

          <section className="mx-auto mt-10 flex w-[90%] max-w-2xl flex-col">
            <div className="rounded-xl border-1 p-6">
              <div className="grid grid-cols-2 gap-y-5 text-lg">
                {/* 모집 인원 */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-500 md:text-lg">
                    모집 인원
                  </span>
                  <span className="text-sm font-bold md:text-lg">
                    {post?.members}
                  </span>
                </div>

                {/* 진행 방식 */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-500 md:text-lg">
                    진행 방식
                  </span>
                  <span className="text-sm font-bold md:text-lg">
                    {post?.progress_method}
                  </span>
                </div>

                {/* 예상 기간 */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-500 md:text-lg">
                    예상 기간
                  </span>
                  <span className="text-sm font-bold md:text-lg">
                    {post?.duration}
                  </span>
                </div>

                {/* 연락 수단 */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-500 md:text-lg">
                    연락 수단
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-slate-50 text-xs font-bold text-slate-500 md:text-base"
                  >
                    <a
                      href={post?.contact_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {post?.contact}
                    </a>
                  </Badge>
                </div>
              </div>

              {/* 모집 분야 */}
              <div className="mt-5 flex flex-col gap-6">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-sm font-semibold text-gray-500 md:text-lg">
                    모집 분야
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {post?.position?.map((pos: string) => (
                      <Badge
                        key={pos}
                        variant="outline"
                        className="bg-slate-50 text-xs font-bold text-slate-500 md:text-base"
                      >
                        {pos}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* 기술 스택 */}
                <div className="flex flex-wrap items-center gap-5">
                  <span className="text-sm font-semibold text-gray-500 md:text-lg">
                    기술 스택
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {post?.tech_stack?.map((tech: string) => (
                      <img
                        key={tech}
                        src={`/images/icons/tech/${tech.toLowerCase()}.svg`}
                        alt={tech}
                        className="size-5 md:size-7"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="mx-auto mt-10 !w-[50%] border-2" />

          <div className="mt-12 mb-12 flex w-full justify-center">
            <main>
              <div className="w-full max-w-3xl">
                {post?.content && <Editor props={post?.content} readonly />}
              </div>
            </main>
          </div>
        </>
      )}
    </>
  );
}
