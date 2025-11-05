import supabase from "./supabase";

export const fetcher = async (id: string) => {
  const { data, error } = await supabase.from("post").select("*").eq("id", id);
  if (error) throw error;

  const post = data?.[0];
  if (!post) return null;

  // JSON 문자열로 저장된 필드들을 배열로 파싱
  return {
    ...post,
    position: post.position
      ? typeof post.position === "string"
        ? JSON.parse(post.position)
        : post.position
      : [],
    tech_stack: post.tech_stack
      ? typeof post.tech_stack === "string"
        ? JSON.parse(post.tech_stack)
        : post.tech_stack
      : [],
    content: post.content
      ? typeof post.content === "string" && post.content.startsWith("[")
        ? JSON.parse(post.content)
        : typeof post.content === "string" && post.content.startsWith("{")
          ? JSON.parse(post.content)
          : post.content
      : [],
  };
};
