import {
  POST_CATEGORY,
  POST_CONTACT,
  POST_DURATION,
  POST_MEMBERS,
  POST_PROGRESS_METHOD,
  POST_ROLES,
  POST_TECH_STACK,
} from "@/components/constants/post";
import { Input } from "@/components/ui";
import { CustomSelect, MultiSelect, DatePicker } from "@/components/write";

interface Props {
  info: {
    category: string;
    progress_method: string;
    members: string;
    duration: string;
    recruitment_deadline: Date | string;
    contact: string;
    contact_url: string;
    position: string[];
    tech_stack: string[];
  };
  onUpdate: (
    field: keyof Props["info"],
    value: string | string[] | Date,
  ) => void;
}

export function PostInfo({ info, onUpdate }: Props) {
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
        <DatePicker
          label="모집 마감일"
          value={info.recruitment_deadline}
          onChange={(value) => onUpdate("recruitment_deadline", value)}
        />

        <MultiSelect
          label="포지션"
          value={info.position}
          items={POST_ROLES}
          onChange={(value) => onUpdate("position", value)}
        />
      </section>

      <section className="flex gap-10">
        <MultiSelect
          label="기술 스택"
          value={info.tech_stack}
          items={POST_TECH_STACK}
          onChange={(value) => onUpdate("tech_stack", value)}
        />

        <div className="flex flex-col gap-4">
          <CustomSelect
            label="연락 방법"
            value={info.contact}
            items={POST_CONTACT}
            onChange={(value) => onUpdate("contact", value)}
          />

          <Input
            placeholder="경로를 입력해 주세요."
            value={info.contact_url}
            onChange={(e) => onUpdate("contact_url", e.target.value)}
            className="h-[40px] w-[300px]"
          />
        </div>
      </section>
    </section>
  );
}
