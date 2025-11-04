export interface Profile {
  id: number;
  author: any; // 추후 변경
  nickname: string;
  contact_method: string;
  job: string;
  position: string;
  experience: string;
  region: string;
  introduction: string;
  external_url: string | null;
  created_at: Date | string;
}
