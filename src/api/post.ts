import supabase from "@/lib/supabase";
import { RECENT_POSTS_LIMIT } from "@/components/constants/post";
import { POST_STATUS, type PostListItem, type Post } from "@/types/post.type";
import type { Block } from "@blocknote/core";

const parseJsonField = <T>(value: unknown, defaultValue: T): T => {
  if (!value) return defaultValue;

  if (typeof value !== "string") return value as T;

  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.error(error);
    return defaultValue;
  }
};

export const fetchPosts = async (
  category?: string,
): Promise<PostListItem[] | null> => {
  let query = supabase
    .from("post")
    .select(
      "id, category, title, recruitment_deadline, progress_method, duration, position, tech_stack, author, created_at, status",
    )
    .eq("status", POST_STATUS.PUBLISH);

  if (category && category !== "") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data?.map((post) => ({
    ...post,
    position: parseJsonField<string[]>(post?.position, []),
    tech_stack: parseJsonField<string[]>(post?.tech_stack, []),
  }));
};

export const fetchPostDetail = async (id: string): Promise<Post | null> => {
  const { data, error } = await supabase
    .from("post")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return {
    ...data,
    position: parseJsonField<string[]>(data.position, []),
    tech_stack: parseJsonField<string[]>(data.tech_stack, []),
    content: parseJsonField<Block[]>(data.content, []),
  };
};

export const fetchRecentPosts = async (): Promise<PostListItem[] | null> => {
  const { data, error } = await supabase
    .from("post")
    .select(
      "id, category, title, recruitment_deadline, progress_method, duration, position, tech_stack, author, created_at, status",
    )
    .eq("status", POST_STATUS.PUBLISH)
    .order("created_at", { ascending: false })
    .limit(RECENT_POSTS_LIMIT);

  if (error) throw error;

  return (
    data?.map((post) => ({
      ...post,
      position: parseJsonField<string[]>(post?.position, []),
      tech_stack: parseJsonField<string[]>(post?.tech_stack, []),
    })) || null
  );
};
