import { describe, it, expect } from "vitest";
import { ProfileSchema } from "../src/lib/profile.schema";

describe("프로필 폼 유효성 검사", () => {
  it("유효한 데이터 통과", () => {
    const validData = {
      contactMethod: "test@test.com",
      job: "Frontend",
      position: "Junior",
      experience: "1년 이상",
      region: "서울",
      domain: "커머스", // 추가
      introduction: "안녕하세요. React 개발자입니다.",
      externalUrl: "https://github.com/test",
    };
    expect(() => ProfileSchema.parse(validData)).not.toThrow();
  });

  it("이메일 유효성 검사 실패", () => {
    const invalidData = {
      contactMethod: "",
      job: "Frontend",
      position: "Junior",
      experience: "1년 이상",
      region: "서울",
      domain: "커머스", // 추가
      introduction: "안녕하세요. React 개발자입니다.",
      externalUrl: "https://github.com/test",
    };
    expect(() => ProfileSchema.parse(invalidData)).toThrow();
  });

  it("희망 도메인이 없으면 에러 발생", () => {
    const invalidData = {
      contactMethod: "test@test.com",
      job: "Frontend",
      position: "Junior",
      experience: "1년 이상",
      region: "서울",
      // domain 필드 누락
      introduction: "안녕하세요. React 개발자입니다.",
      externalUrl: "https://github.com/test",
    };
    expect(() => ProfileSchema.parse(invalidData)).toThrow();
  });

  it("외부 링크는 선택사항이다", () => {
    const validData = {
      contactMethod: "test@test.com",
      job: "대학생",
      position: "프론트엔드",
      experience: "신입 (1년 이하)",
      region: "서울",
      domain: "커머스",
      introduction: "안녕하세요. 프론트엔드 개발자입니다.",
      externalUrl: "", // 빈 문자열 가능
    };

    const result = ProfileSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("자기소개는 10자 이하면 에러가 발생", () => {
    const invalidData = {
      contactMethod: "test@test.com",
      job: "대학생",
      position: "프론트엔드",
      experience: "신입 (1년 이하)",
      region: "서울",
      domain: "커머스",
      introduction: "짧음", // 5자 - 10자 미만이므로 에러 발생해야 함
      externalUrl: "", // optional 필드 추가
    };
    expect(() => ProfileSchema.parse(invalidData)).toThrow();
  });
});
