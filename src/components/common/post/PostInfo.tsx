import {
  POST_CATEGORY,
  POST_CONTACT,
  POST_DURATION,
  POST_MEMBERS,
  POST_PROGRESS_METHOD,
} from "@/components/constants/post";
import { Button, Calendar, Input, Label } from "@/components/ui";
import { CustomSelect } from "@/components/write/CustomSelect";
import { Calendar1 } from "lucide-react";
import { useState } from "react";

interface PostInfoProps {
  info: {
    category: string;
    progress_method: string;
    members: string;
    duration: string;
    recruitment_deadline: Date | string;
    contact: string;
    contact_url: string;
  };
  onUpdate: (field: keyof PostInfoProps["info"], value: any) => void;
}

export function PostInfo({ info, onUpdate }: PostInfoProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleCalendarClose = () => {
    setIsCalendarOpen(false);
  };

  return (
    <section className="mt-8 flex h-full flex-col gap-6">
      <section className="flex gap-10">
        <CustomSelect
          label="모집 구분"
          value={info.category}
          items={POST_CATEGORY}
          onChange={(value) => onUpdate("category", value)}
        />

        <CustomSelect
          label="진행 방식"
          value={info.progress_method}
          items={POST_PROGRESS_METHOD}
          onChange={(value) => onUpdate("progress_method", value)}
        />
      </section>

      <section className="flex gap-10">
        <CustomSelect
          label="모집 인원"
          value={info.members}
          items={POST_MEMBERS}
          onChange={(value) => onUpdate("members", value)}
        />

        <CustomSelect
          label="진행 기간"
          value={info.duration}
          items={POST_DURATION}
          onChange={(value) => onUpdate("duration", value)}
        />
      </section>

      <section className="flex gap-10">
        {/* 모집 마감일 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Label className="text-primary text-base">모집 마감일</Label>
          </div>
          <Button
            variant="outline"
            className="flex w-[300px] items-center justify-between border-1 !bg-white shadow-xs"
            onClick={() => {
              setIsCalendarOpen(!isCalendarOpen);
            }}
          >
            <span className="text-muted-foreground">
              {date?.toLocaleDateString()}
            </span>
            <Calendar1 className="text-muted-foreground ml-2" />
          </Button>
          {isCalendarOpen && (
            <div className="absolute z-20 mt-20">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                onDayClick={handleCalendarClose}
                className="w-[260px] rounded-md border shadow-sm"
                captionLayout="dropdown"
              />
            </div>
          )}
        </div>

        {/* 연락 방법 */}
        <CustomSelect
          label="연락 방법"
          value={info.contact}
          items={POST_CONTACT}
          onChange={(value) => onUpdate("contact", value)}
        />
      </section>
      <section className="flex gap-10">
        <div className="w-[300px]"></div>
        <Input
          placeholder="경로를 입력해 주세요."
          value={info.contact_url}
          onChange={(e) => onUpdate("contact_url", e.target.value)}
          className="w-[300px]"
        />
      </section>
    </section>
  );
}
