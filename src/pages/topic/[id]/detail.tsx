import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuthStore } from "@/stores";
import supabase from "@/lib/supabase";

import { Editor } from "@/components/common";
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
import { ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function TopicDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);

  const [author, setAuthor] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleDelete = async () => {
    try {
      const { error } = await supabase.from("topic").delete().eq("id", id);

      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("토픽을 삭제하였습니다.");
      navigate("/");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const { data: topic, error } = await supabase
          .from("topic")
          .select("*")
          .eq("id", id);

        if (error) {
          toast.error(error.message);
          return;
        }

        if (topic) {
          setAuthor(topic[0].author);
          setCategory(topic[0].category);
          setTitle(topic[0].title);
          setThumbnail(topic[0].thumbnail);
          setContent(topic[0].content);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    fetchTopic();
  }, [id]);

  return (
    <main className="flex h-full min-h-[720px] w-full flex-col">
      <div
        className="bg-accent relative h-60 w-full bg-cover bg-[50%_35%] md:h-100"
        style={{ backgroundImage: `url(${thumbnail})` }}
      >
        {/* 뒤로 가기 */}
        <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft />
          </Button>
          {/* 토픽을 작성한 사람의 user_id와 로그인한 사람의 user_id가 같은 경우에만 보이도록 한다. */}
          {author === user?.id && (
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="outline" size="icon" className="!bg-red-400">
                  <Trash2 />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    해당 토픽을 삭제하시겠습니까?
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
          )}
        </div>
      </div>
      <section className="relative -mt-40 flex w-full flex-col items-center">
        <span className="mb-4"># {category}</span>
        <h1 className="scroll-m-20 text-center text-xl font-extrabold tracking-tight sm:text-2xl md:text-4xl">
          {title}
        </h1>
        <Separator className="bg-foreground my-6 !w-6" />
        <span>2025. 10. 03.</span>
      </section>
      {/* 에디터 내용을 불러와 렌더링 */}
      <div className="w-full pt-12 pb-6">
        {content && <Editor props={JSON.parse(content)} readonly />}{" "}
      </div>
    </main>
  );
}
