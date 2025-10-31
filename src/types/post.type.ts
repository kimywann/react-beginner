export enum POST_STATUS {
  TEMP = "temp",
  PUBLISH = "publish",
}

export interface POST {
  id: number;
  author: any; // 추후 변경
  title: string;
  content: string;
  created_at: Date | string;
  status: POST_STATUS;

  category: string;
  progress_method: string; // 진행 방식
  members: number | string; // 모집 인원
  contact: string; // 연락 방법
  contact_url: string; // 연락 방법 URL
  duration: string; // 진행 기간
  recruitment_deadline: Date | string; // 모집 마감일
}
