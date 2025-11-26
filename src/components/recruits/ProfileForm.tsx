import {
  SelectExperience,
  SelectJob,
  SelectPositionRole,
  SelectRegion,
  SelectDomain,
} from "./select";

import { useAuthStore } from "@/stores";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Asterisk } from "lucide-react";
import { Input, Label, Separator, Textarea, Button } from "@/components/ui";
import { ProfileSchema, type ProfileFormData } from "@/lib/profile.schema";

interface Props {
  defaultValues?: Partial<ProfileFormData>;
  buttonLabel: string;
  onSubmit: (data: ProfileFormData) => Promise<void>;
  onSuccess?: () => void;
}

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
      domain: "",
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
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="grid w-full max-w-full gap-4"
    >
      <div className="grid gap-3">
        <Label>닉네임</Label>
        <Input
          defaultValue={user?.email?.split("@")[0]}
          disabled
          className="w-full"
        />
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
          className="w-full"
        />
      </div>

      <Separator />

      <div className="flex flex-col justify-between gap-3 sm:flex-row">
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

      <div className="flex flex-col justify-between gap-3 sm:flex-row">
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

      <div className="flex flex-col justify-between gap-3">
        <div className="grid w-full gap-3">
          <div className="flex items-center gap-1">
            <Asterisk size={12} className="text-blue-500" />
            <Label>희망 도메인</Label>
          </div>
        </div>
        <SelectDomain
          value={watch("domain") || ""}
          onValueChange={(v) => setValue("domain", v || "")}
        />
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
          className="w-full"
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
          className="w-full"
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
