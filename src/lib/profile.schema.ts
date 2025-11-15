import { z } from "zod";

export const ProfileSchema = z.object({
  contactMethod: z.string().min(1, "연락 수단을 입력해 주세요."),
  job: z.string().min(1, "직무를 선택해 주세요."),
  position: z.string().min(1, "희망 포지션을 선택해 주세요."),
  domain: z.string().min(1, "희망 도메인을 선택해 주세요."),
  experience: z.string().min(1, "관련 경력을 선택해 주세요."),
  region: z.string().min(1, "활동 지역을 선택해 주세요."),
  introduction: z.string().min(10, "10자 이상 입력해 주세요."),
  externalUrl: z
    .url("올바른 URL 형식으로 입력해 주세요.")
    .optional()
    .or(z.literal("")),
});

export type ProfileFormData = z.infer<typeof ProfileSchema>;
