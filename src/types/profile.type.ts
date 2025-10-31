export interface Profile {
  id: number;
  author: any; // 추후 변경
  nickname: string;
  job: string;
  position: string;
  experience: string;
  region: string;
  introduction: string;
  created_at: Date | string;
}
