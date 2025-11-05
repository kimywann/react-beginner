import supabase from "@/lib/supabase";

import { useAuthStore } from "@/stores";

import { useEffect, useState } from "react";
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
} from "@/components/ui";
import { toast } from "sonner";
import { Badge } from "@/components/ui";
import dayjs from "dayjs";

export default function PostDetail() {
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const [author, setAuthor] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [members, setMembers] = useState<number>(0);
  const [duration, setDuration] = useState<string>("");
  const [progress_method, setProgressMethod] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [contact_url, setContactUrl] = useState<string>("");
  const [position, setPosition] = useState<string[]>([]);
  const [tech_stack, setTechStack] = useState<string[]>([]);

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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data: post, error } = await supabase
          .from("post")
          .select("*")
          .eq("id", id);

        if (error) {
          toast.error(error.message);
          return;
        }

        if (post) {
          setAuthor(post[0].author);
          setCategory(post[0].category);
          setTitle(post[0].title);
          setCreatedAt(post[0].created_at);
          setContent(post[0].content);
          setMembers(post[0].members);
          setDuration(post[0].duration);
          setProgressMethod(post[0].progress_method);
          setContact(post[0].contact);
          setContactUrl(post[0].contact_url);
          setPosition(
            post[0].position ? JSON.parse(post[0].position as string) : [],
          );
          setTechStack(
            post[0].tech_stack ? JSON.parse(post[0].tech_stack as string) : [],
          );
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    fetchPost();
  }, [id]);

  return (
    <div className="">
      {/* 글을 작성한 사람의 user_id와 로그인한 사람의 user_id가 같은 경우에만
      보이도록 한다. */}
      <div className="flex justify-end p-4">
        {author === user?.id && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-12"
              onClick={() => navigate(`/posts/${id}/edit`)}
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
          <span className="mb-4 text-lg"># {category}</span>
          <h1 className="scroll-m-20 text-center text-xl font-extrabold tracking-tight sm:text-2xl md:text-4xl">
            {title}
          </h1>

          <Separator className="bg-foreground my-6 !w-6" />

          <span className="text-md md:text-lg">
            {dayjs(createdAt).format("YYYY. MM. DD")}
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
              <span className="text-sm font-bold md:text-lg">{members}</span>
            </div>

            {/* 진행 방식 */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-500 md:text-lg">
                진행 방식
              </span>
              <span className="text-sm font-bold md:text-lg">
                {progress_method}
              </span>
            </div>

            {/* 예상 기간 */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-500 md:text-lg">
                예상 기간
              </span>
              <span className="text-sm font-bold md:text-lg">{duration}</span>
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
                  href={contact_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {contact}
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
                {position.map((pos) => (
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
                {tech_stack.map((tech) => (
                  <img
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
            {content && <Editor props={JSON.parse(content)} readonly />}{" "}
          </div>
        </main>
      </div>
    </div>
  );
}
