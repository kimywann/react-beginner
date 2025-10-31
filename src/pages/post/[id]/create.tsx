import supabase from "@/lib/supabase";

import { POST_CATEGORY } from "@/components/constants/category";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

import { Asterisk, BookOpenCheck, Save, Trash2 } from "lucide-react";
import { Editor } from "@/components/write";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuthStore } from "@/stores";
import { toast } from "sonner";

import type { Block } from "@blocknote/core";
import { POST_STATUS } from "@/types/post.type";

export default function PostCreate() {
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<Block[]>([]);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
        const { data: post, error } = await supabase
        .from("post")
        .select("*")
        .eq("id", id);

      console.log(post);

      if (error) {
        toast.error(error.message);
        return;
      }

      if (post) {
        setTitle(post[0].title);
        setContent(JSON.parse(post[0].content));
        setCategory(post[0].category);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleSave = async () => {
    if (!title && !content && !category) {
      toast.warning("제목, 본문, 카테고리은 필수값입니다.");
      return;
    }

    const { data, error } = await supabase
      .from("post")
      .update([
        {
          status: POST_STATUS.TEMP,
          title,
          content: JSON.stringify(content),
          category,
          author: user?.id,
        },
      ])
      .eq("id", id)
      .select();

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data) {
      toast.success("작성 중인 글을 저장하였습니다.");
      return;
    }
  };

  const handlePublish = async () => {
    if (!title && !content && !category) {
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
          category,
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
    <main className="flex h-full min-h-[1024px] w-full gap-6 p-6">
      {/* 본문 */}
      <section className="mt-8 flex h-full w-3/4 flex-col gap-6">
        <div className="flex flex-col gap-2">
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
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Asterisk size={14} className="text-blue-500" />
            <Label className="text-muted-foreground text-lg">본문</Label>
          </div>

          <Editor props={content} setContent={setContent} />
        </div>
      </section>

      {/* 카테고리 */}
      <section className="mt-8 flex h-full w-1/4 flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Asterisk size={14} className="text-blue-500" />
            <Label className="text-muted-foreground text-lg">카테고리</Label>
          </div>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="글(주제) 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>카테고리</SelectLabel>
                {POST_CATEGORY.map((item) => {
                  return (
                    <SelectItem key={item.id} value={item.category}>
                      {item.lable}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 border-t pt-6">
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
            className="w-35 gap-4 !border-blue-400 !bg-blue-400 !text-white"
            onClick={handlePublish}
          >
            <BookOpenCheck />
            출간하기
          </Button>
          <Button
            variant={"outline"}
            size={"icon"}
            className="w-11 !border-none !bg-red-400 !text-white"
            onClick={handleDelete}
          >
            <Trash2 />
          </Button>
        </div>
      </section>
    </main>
  );
}
