export enum POST_STATUS {
  TEMP = "temp",
  PUBLISH = "publish",
}

export interface POST {
  id: number;
  created_at: Date | string;
  author: any; // 추후 변경
  title: string;
  content: string;
  category: string;
  status: POST_STATUS;
}
