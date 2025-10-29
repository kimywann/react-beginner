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
  Skeleton,
} from "@/components/ui";
import {
  ArrowLeft,
  Asterisk,
  BookOpenCheck,
  ImageOff,
  Save,
} from "lucide-react";
import { Editor } from "@/components/common";

export default function WriteTopic() {
  return (
    <main className="flex h-full min-h-[1024px] w-full gap-6 p-6">
      <div className="fixed right-1/2 bottom-10 z-20 flex translate-x-1/2 items-center gap-2">
        <Button variant={"outline"} size={"icon"}>
          <ArrowLeft />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          className="w-22 !border-slate-400 !bg-slate-400 !text-white"
        >
          <Save />
          임시저장
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          className="w-22 !border-blue-400 !bg-blue-400 !text-white"
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
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Asterisk size={14} className="text-blue-500" />
            <Label className="text-muted-foreground">본문</Label>
          </div>
          {/* BlockNote Text Editor UI */}
          <Editor />
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
          <Select>
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
          <Skeleton className="aspect-video w-full" />
          <Button variant={"outline"} className="border-0">
            <ImageOff />
            썸네일 제거
          </Button>
        </div>
      </section>
    </main>
  );
}
