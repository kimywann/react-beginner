import supabase from "@/lib/supabase";

import { TOPIC_CATEGORY } from "@/components/constants/category";
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
import {
  ArrowLeft,
  Asterisk,
  BookOpenCheck,
  ImageOff,
  Save,
} from "lucide-react";
import { Editor, FileUpload } from "@/components/common";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuthStore } from "@/stores";
import { nanoid } from "nanoid";
import { toast } from "sonner";

import type { Block } from "@blocknote/core";
import { TOPIC_STATUS } from "@/types/topic.type";

export default function WriteTopic() {
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<Block[]>([]);
  const [category, setCategory] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | string | null>(null);

  useEffect(() => {
    fetchTopic();
  }, []);

  const fetchTopic = async () => {
    try {
      const { data: topic, error } = await supabase
        .from("topic")
        .select("*")
        .eq("id", id);

      console.log(topic);

      if (error) {
        toast.error(error.message);
        return;
      }

      if (topic) {
        setTitle(topic[0].title);
        setContent(JSON.parse(topic[0].content));
        setCategory(topic[0].category);
        setThumbnail(topic[0].thumbnail);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleSave = async () => {
    if (!title && !content && !category && !thumbnail) {
      toast.warning("제목, 본문, 카테고리, 썸네일은 필수값입니다.");
      return;
    }

    // 파일 업로드 시, Supabase의 Stroage 즉, bucket 폴더에 이미지를 먼저 업로드 한 후
    // 이미지가 저장된 bucket 폴더의 경로 URL 주소를 우리가 관리하고 있는 Topic 테이블 thumbnail 컬럼에 문자열 형태
    // 즉, string 타입 (DB에서는 Text 타입)으로 저장한다.

    let thumbnailUrl: string | null = null;

    if (thumbnail && thumbnail instanceof File) {
      const fileExt = thumbnail.name.split(".").pop();
      const fileName = `${nanoid()}.${fileExt}`;
      const filePath = `topics/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("files")
        .upload(filePath, thumbnail);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("files").getPublicUrl(filePath);

      if (!data)
        throw new Error("썸네일 Public URL 주소를 가져오는데 실패하였습니다.");
      thumbnailUrl = data.publicUrl;
    } else if (typeof thumbnail === "string") {
      thumbnailUrl = thumbnail;
    }

    const { data, error } = await supabase
      .from("topic")
      .update([
        {
          status: TOPIC_STATUS.TEMP,
          title,
          content: JSON.stringify(content),
          category,
          thumbnail: thumbnailUrl,
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
      toast.success("작성 중인 토픽을 저장하였습니다.");
      return;
    }
  };

  const handlePublish = async () => {
    if (!title && !content && !category && !thumbnail) {
      toast.warning("제목, 본문, 카테고리, 썸네일은 필수값입니다.");
      return;
    }

    // 파일 업로드 시, Supabase의 Stroage 즉, bucket 폴더에 이미지를 먼저 업로드 한 후
    // 이미지가 저장된 bucket 폴더의 경로 URL 주소를 우리가 관리하고 있는 Topic 테이블 thumbnail 컬럼에 문자열 형태
    // 즉, string 타입 (DB에서는 Text 타입)으로 저장한다.

    let thumbnailUrl: string | null = null;

    if (thumbnail && thumbnail instanceof File) {
      const fileExt = thumbnail.name.split(".").pop();
      const fileName = `${nanoid()}.${fileExt}`;
      const filePath = `topics/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("files")
        .upload(filePath, thumbnail);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("files").getPublicUrl(filePath);

      if (!data)
        throw new Error("썸네일 Public URL 주소를 가져오는데 실패하였습니다.");
      thumbnailUrl = data.publicUrl;
    } else if (typeof thumbnail === "string") {
      thumbnailUrl = thumbnail;
    }

    const { data, error } = await supabase
      .from("topic")
      .update([
        {
          status: TOPIC_STATUS.PUBLISH,
          title,
          content: JSON.stringify(content),
          category,
          thumbnail: thumbnailUrl,
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
      toast.success("작성 중인 토픽을 발행하였습니다.");
      navigate("/");
      return;
    }
  };

  return (
    <main className="flex h-full min-h-[1024px] w-full gap-6 p-6">
      <div className="fixed right-1/2 bottom-10 z-20 flex translate-x-1/2 items-center gap-2">
        <Button variant={"outline"} size={"icon"}>
          <ArrowLeft />
        </Button>
        <Button
          type="button"
          variant={"outline"}
          size={"icon"}
          className="w-22 !border-slate-400 !bg-slate-400 !text-white"
          onClick={handleSave}
        >
          <Save />
          임시저장
        </Button>
        <Button
          type="button"
          variant={"outline"}
          size={"icon"}
          className="w-22 !border-blue-400 !bg-blue-400 !text-white"
          onClick={handlePublish}
        >
          <BookOpenCheck />
          출간하기
        </Button>
      </div>
      {/* 토픽 작성하기 */}
      <section className="flex h-full w-3/4 flex-col gap-6">
        <div className="flex flex-col border-b pb-6">
          <span className="font-semibold text-blue-500">Step 1</span>
          <span className="text-base font-semibold">토픽 작성하기</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Asterisk size={14} className="text-blue-500" />
            <Label className="text-muted-foreground">제목</Label>
          </div>
          <Input
            placeholder="제목을 입력하세요."
            className="h-16 border-none pl-6 !text-lg shadow-none placeholder:text-lg placeholder:font-semibold"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Asterisk size={14} className="text-blue-500" />
            <Label className="text-muted-foreground">본문</Label>
          </div>

          {/* BlockNote Text Editor UI */}
          <Editor props={content} setContent={setContent} />
        </div>
      </section>
      {/* 카테고리 및 썸네일 등록 */}
      <section className="flex h-full w-1/4 flex-col gap-6">
        <div className="flex flex-col border-b pb-6">
          <span className="font-semibold text-blue-500">Step 2</span>
          <span className="text-base font-semibold">
            카테고리 및 썸네일 등록
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Asterisk size={14} className="text-blue-500" />
            <Label className="text-muted-foreground">카테고리</Label>
          </div>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="토픽(주제) 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>카테고리(주제)</SelectLabel>
                {TOPIC_CATEGORY.map((item) => {
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
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Asterisk size={14} className="text-blue-500" />
            <Label className="text-muted-foreground">썸네일</Label>
          </div>
          <FileUpload file={thumbnail} onChange={setThumbnail} />
          <Button
            variant={"outline"}
            className="border-0"
            onClick={() => setThumbnail(null)}
          >
            <ImageOff />
            썸네일 제거
          </Button>
        </div>
      </section>
    </main>
  );
}
