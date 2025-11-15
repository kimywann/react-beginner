import supabase from "@/lib/supabase";
import { RECENT_PROFILES_LIMIT } from "@/components/constants/profile";
import type { Profile } from "@/types/profile.type";

export const fetchRecentProfiles = async (): Promise<Profile[] | null> => {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(RECENT_PROFILES_LIMIT);

  if (error) throw error;

  return data;
};
