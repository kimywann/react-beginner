import { useQuery } from "@tanstack/react-query";
import { fetchRecentProfiles } from "@/api/profile";

export function useRecentProfiles() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["recent-profiles"],
    queryFn: () => fetchRecentProfiles(),
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  return {
    recentProfiles: data,
    isLoading,
    isError: isError || !!error,
  };
}
