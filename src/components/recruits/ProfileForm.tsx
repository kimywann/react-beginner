import supabase from "@/lib/supabase";

import { Asterisk } from "lucide-react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Separator,
  Textarea,
} from "../ui";

import {
  SelectExperience,
  SelectJob,
  SelectPositionRole,
  SelectRegion,
} from "./select";

import { useAuthStore } from "@/stores";
import { toast } from "sonner";
import { useNavigate } from "react-router";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ProfileSchema = z.object({
  contactMethod: z.string().min(1, "연락 수단을 입력해 주세요."),
  job: z.string().min(1, "직무를 선택해 주세요."),
  position: z.string().min(1, "희망 포지션을 선택해 주세요."),
  experience: z.string().min(1, "관련 경력을 선택해 주세요."),
  region: z.string().min(1, "활동 지역을 선택해 주세요."),
  introduction: z.string().min(10, "10자 이상 입력해 주세요."),
  externalUrl: z.url("올바른 URL 형식으로 입력해 주세요.").optional(),
});

type ProfileFormData = z.infer<typeof ProfileSchema>;

export function ProfileForm() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileSchema),
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const { error } = await supabase.from("profile").insert([
        {
          author: user?.id,
          nickname: user?.email?.split("@")[0],
          contact_method: data.contactMethod,
          job: data.job,
          position: data.position,
          experience: data.experience,
          region: data.region,
          introduction: data.introduction,
          external_url: data.externalUrl ?? null,
        },
      ]);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("프로필 등록이 완료되었습니다.");
      navigate("/recruits");
    } catch (error) {
      console.error(error);
      toast.error("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">프로필 등록</Button>
      </DialogTrigger>
      <DialogContent className="h-[650px] overflow-y-auto sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle>프로필 등록</DialogTitle>
          <DialogDescription>
            프로필을 등록하면 팀빌딩 제안을 받을 수 있어요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
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
            />
            {errors.contactMethod && (
              <p className="text-sm text-red-500">
                {errors.contactMethod.message}
              </p>
            )}
          </div>

          <Separator />

          <div className="flex justify-between gap-3">
            <div className="grid w-full gap-3">
              <Label>현재 직무</Label>
              <SelectJob onValueChange={(v) => setValue("job", v)} />
              {errors.job && (
                <p className="text-sm text-red-500">{errors.job.message}</p>
              )}
            </div>
            <div className="grid w-full gap-3">
              <Label>희망 포지션</Label>
              <SelectPositionRole
                onValueChange={(v) => setValue("position", v)}
              />
              {errors.position && (
                <p className="text-sm text-red-500">
                  {errors.position.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-3">
            <div className="grid w-full gap-3">
              <Label>관련 경력</Label>
              <SelectExperience
                onValueChange={(v) => setValue("experience", v)}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>
            <div className="grid w-full gap-3">
              <Label>활동 지역</Label>
              <SelectRegion onValueChange={(v) => setValue("region", v)} />
              {errors.region && (
                <p className="text-sm text-red-500">{errors.region.message}</p>
              )}
            </div>
          </div>

          <Separator />

          <div className="grid gap-3">
            <Label>자기소개</Label>
            <Textarea
              placeholder="간단히 역량 어필해 주세요."
              {...register("introduction")}
            />
            {errors.introduction && (
              <p className="text-sm text-red-500">
                {errors.introduction.message}
              </p>
            )}
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
            />
            {errors.externalUrl && (
              <p className="text-sm text-red-500">
                {errors.externalUrl.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">닫기</Button>
            </DialogClose>
            <Button type="submit" className="bg-blue-500 text-white">
              등록하기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
