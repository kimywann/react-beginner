import type { Block } from "@blocknote/core";

export enum POST_STATUS {
  TEMP = "temp",
  PUBLISH = "publish",
}

export interface PostListItem {
  id: number;
  author: string;
  title: string;
  created_at: Date | string;
  status: POST_STATUS;
  category: string;
  progress_method: string;
  duration: string;
  recruitment_deadline: Date | string;
  position: string[];
  tech_stack: string[];
}

export interface Post extends PostListItem {
  content: Block[];
  members: number | string;
  contact: string;
  contact_url: string;
}
