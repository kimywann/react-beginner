export interface Profile {
  id: number;
  author: string;
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
