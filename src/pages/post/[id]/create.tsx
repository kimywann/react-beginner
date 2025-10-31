import supabase from "@/lib/supabase";

import { Button, Input, Label } from "@/components/ui";

import { Asterisk, BookOpenCheck, Save, Trash2 } from "lucide-react";
import { Editor } from "@/components/write";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuthStore } from "@/stores";
import { toast } from "sonner";

import type { Block } from "@blocknote/core";
import { POST_STATUS } from "@/types/post.type";
import { PostInfo } from "@/components/common/post/PostInfo";

export default function PostCreate() {
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<Block[]>([]);

  const [postInfo, setPostInfo] = useState({
    category: "",
    progressMethod: "",
    members: "",
    duration: "",
    recruitmentDeadline: new Date(),
    contact: "",
    contactUrl: "",
  });

  const updatePostInfo = (field: keyof typeof postInfo, value: any) => {
    setPostInfo((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    fetchPost();
  }, []);

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

      if (post?.[0]) {
        setTitle(post[0].title);
        setContent(JSON.parse(post[0].content));

        setPostInfo({
          category: post[0].category || "",
          progressMethod: post[0].progressMethod || "",
          members: post[0].members || "",
          contact: post[0].contact || "",
          duration: post[0].duration || "",
          recruitmentDeadline: post[0].recruitmentDeadline
            ? new Date(post[0].recruitmentDeadline)
            : new Date(),
          contactUrl: post[0].contactUrl || "",
        });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleSave = async () => {
    if (!title || !content || !postInfo.category) {
      toast.warning("제목, 본문, 카테고리는 필수값입니다.");
      return;
    }

    const { data, error } = await supabase
      .from("post")
      .update({
        status: POST_STATUS.TEMP,
        title,
        content: JSON.stringify(content),
        ...postInfo,
        author: user?.id,
      })
      .eq("id", id)
      .select();

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data) {
      toast.success("작성 중인 글을 저장하였습니다.");
    }
  };

  const handlePublish = async () => {
    if (!title && !content && !postInfo.category) {
      toast.warning("제목, 본문, 카테고리은 필수값입니다.");
      return;
    }

    const { data, error } = await supabase
      .from("post")
      .update([
        {
          status: POST_STATUS.PUBLISH,
          title,
          content: JSON.stringify(content),
          ...postInfo,
          author: user?.id,
        },
      ])
      .eq("id", id)
      .select();

    if (error) {
      toast.error(error.message);
      console.log(error);
      return;
    }

    if (data) {
      toast.success("작성 중인 글을 발행하였습니다.");
      navigate("/");
      return;
    }
  };

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
    <div className="flex flex-col items-center justify-center px-4 py-8">
      <div className="flex w-full max-w-[700px] flex-col gap-6 border-1 p-4">
        {/* PostInfo 섹션 */}
        <section className="w-full">
          <PostInfo info={postInfo} onUpdate={updatePostInfo} />
        </section>

        {/* 제목 섹션 */}
        <section className="flex w-full flex-col gap-2">
          <div className="flex items-center gap-1">
            <Asterisk size={14} className="text-blue-500" />
            <Label className="text-muted-foreground text-lg">제목</Label>
          </div>
          <Input
            placeholder="제목을 입력하세요."
            className="h-16 border-none pl-6 !text-4xl font-semibold shadow-none placeholder:text-4xl placeholder:font-semibold"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </section>

        {/* 본문 섹션 */}
        <section className="flex w-full flex-col gap-2">
          <div className="flex items-center gap-1">
            <Asterisk size={14} className="text-blue-500" />
            <Label className="text-muted-foreground text-lg">본문</Label>
          </div>
          <div className="min-h-[500px] w-full">
            <Editor props={content} setContent={setContent} />
          </div>
        </section>

        {/* 버튼 섹션 */}
        <section className="flex w-full justify-end gap-2 pt-6">
          <Button
            type="button"
            variant={"outline"}
            size={"icon"}
            className="w-35 gap-4 !border-slate-400 !bg-slate-400 !text-white"
            onClick={handleSave}
          >
            <Save />
            임시저장
          </Button>
          <Button
            type="button"
            variant={"outline"}
            size={"icon"}
            className="w-28 gap-3 !border-blue-400 !bg-blue-400 !text-white"
            onClick={handlePublish}
          >
            <BookOpenCheck />
            작성하기
          </Button>
          <Button
            variant={"outline"}
            size={"icon"}
            className="w-11 !border-none !bg-red-400 !text-white"
            onClick={handleDelete}
          >
            <Trash2 />
          </Button>
        </section>
      </div>
    </div>
  );
}
