import { useEffect, useState } from "react";
import { useParams } from "react-router";
import supabase from "@/lib/supabase";

import { Editor } from "@/components/write";
import { Separator } from "@/components/ui";
import { toast } from "sonner";

export default function PostDetail() {
  const { id } = useParams();

  // const [author, setAuthor] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // const handleDelete = async () => {
  //   try {
  //     const { error } = await supabase.from("post").delete().eq("id", id);

  //     if (error) {
  //       toast.error(error.message);
  //       return;
  //     }
  //     toast.success("글을 삭제하였습니다.");
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // };

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
          // setAuthor(post[0].author);
          setCategory(post[0].category);
          setTitle(post[0].title);
          setContent(post[0].content);
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
      {/* 글을 작성한 사람의 user_id와 로그인한 사람의 user_id가 같은 경우에만 보이도록 한다. */}
      {/* {author === user?.id && (
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="outline" size="icon" className="!bg-red-400">
              <Trash2 />
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
      )} */}

      <header className="mt-40 flex w-full flex-col items-center">
        <div>
          <span className="mb-4"># {category}</span>
          <h1 className="scroll-m-20 text-center text-xl font-extrabold tracking-tight sm:text-2xl md:text-4xl">
            {title}
          </h1>
          <Separator className="bg-foreground my-6 !w-6" />
          <span>2025. 10. 03.</span>
        </div>
      </header>

      <div className="flex w-full justify-center pt-12 pb-6">
        <main>
          <div className="w-full max-w-4xl">
            {content && <Editor props={JSON.parse(content)} readonly />}{" "}
          </div>
        </main>
      </div>
    </div>
  );
}
