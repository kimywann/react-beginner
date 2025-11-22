import supabase from "@/lib/supabase";

export async function findUserById(id: string) {
  const { data: user, error } = await supabase
    .from("user")
    .select("*")
    .eq("id", id);

  if (error) throw new Error(error.message);

  if (user && user.length > 0) {
    return user[0].email.split("@")[0] + "님";
  }

  return "알 수 없는 사용자";
}
