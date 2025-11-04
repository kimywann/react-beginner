import {
  SelectExperience,
  SelectJob,
  SelectPositionRole,
  SelectRegion,
} from "./select";

import { useAuthStore } from "@/stores";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Asterisk } from "lucide-react";
import { Input, Label, Separator, Textarea, Button } from "@/components/ui";

interface Props {
  defaultValues?: Partial<ProfileFormData>;
  buttonLabel: string;
  onSubmit: (data: ProfileFormData) => Promise<void>;
  onSuccess?: () => void;
}

const ProfileSchema = z.object({
  contactMethod: z.string().min(1, "연락 수단을 입력해 주세요."),
  job: z.string().min(1, "직무를 선택해 주세요."),
  position: z.string().min(1, "희망 포지션을 선택해 주세요."),
  experience: z.string().min(1, "관련 경력을 선택해 주세요."),
  region: z.string().min(1, "활동 지역을 선택해 주세요."),
  introduction: z.string().min(10, "10자 이상 입력해 주세요."),
  externalUrl: z
    .url("올바른 URL 형식으로 입력해 주세요.")
    .optional()
    .or(z.literal("")),
});

export type ProfileFormData = z.infer<typeof ProfileSchema>;

export function ProfileForm({
  defaultValues,
  buttonLabel,
  onSubmit,
  onSuccess,
}: Props) {
  const user = useAuthStore((state) => state.user);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: defaultValues || {
      contactMethod: "",
      job: "",
      position: "",
      experience: "",
      region: "",
      introduction: "",
      externalUrl: "",
    },
  });

  const { register, handleSubmit, setValue, watch } = form;

  const handleFormSubmit = async (data: ProfileFormData) => {
    await onSubmit(data);
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="grid gap-4">
      <div className="grid gap-3">
        <Label>닉네임</Label>
        <Input defaultValue={user?.email?.split("@")[0]} disabled />
      </div>

      <div className="grid gap-3">
        <div className="flex items-center gap-1">
          <Asterisk size={12} className="text-blue-500" />
          <Label>연락 수단</Label>
        </div>
        <Input
          placeholder="오픈채팅 링크 또는 이메일 주소"
          {...register("contactMethod")}
          defaultValue={defaultValues?.contactMethod}
        />
      </div>

      <Separator />

      <div className="flex justify-between gap-3">
        <div className="grid w-full gap-3">
          <div className="flex items-center gap-1">
            <Asterisk size={12} className="text-blue-500" />
            <Label>현재 직무</Label>
          </div>
          <SelectJob
            value={watch("job") || ""}
            onValueChange={(v) => setValue("job", v || "")}
          />
        </div>
        <div className="grid w-full gap-3">
          <div className="flex items-center gap-1">
            <Asterisk size={12} className="text-blue-500" />
            <Label>희망 포지션</Label>
          </div>
          <SelectPositionRole
            value={watch("position") || ""}
            onValueChange={(v) => setValue("position", v || "")}
          />
        </div>
      </div>

      <div className="flex justify-between gap-3">
        <div className="grid w-full gap-3">
          <div className="flex items-center gap-1">
            <Asterisk size={12} className="text-blue-500" />
            <Label>관련 경력</Label>
          </div>
          <SelectExperience
            value={watch("experience") || ""}
            onValueChange={(v) => setValue("experience", v || "")}
          />
        </div>
        <div className="grid w-full gap-3">
          <div className="flex items-center gap-1">
            <Asterisk size={12} className="text-blue-500" />
            <Label>활동 지역</Label>
          </div>
          <SelectRegion
            value={watch("region") || ""}
            onValueChange={(v) => setValue("region", v || "")}
          />
        </div>
      </div>

      <Separator />

      <div className="grid gap-3">
        <div className="flex items-center gap-1">
          <Asterisk size={12} className="text-blue-500" />
          <Label>자기소개</Label>
        </div>
        <Textarea
          placeholder="간단히 역량 어필해 주세요."
          {...register("introduction")}
          defaultValue={defaultValues?.introduction}
        />
      </div>

      <div className="grid gap-3">
        <Label>
          외부 링크
          <p className="text-muted-foreground text-sm">
            (GitHub, 이력서, 포트폴리오 등)
          </p>
        </Label>
        <Input
          placeholder="https://example.com"
          {...register("externalUrl")}
          defaultValue={defaultValues?.externalUrl}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={() => onSuccess?.()}>
          닫기
        </Button>
        <Button type="submit" className="bg-blue-500 text-white">
          {buttonLabel}
        </Button>
      </div>
    </form>
  );
}
