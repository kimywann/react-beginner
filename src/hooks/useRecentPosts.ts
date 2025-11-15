import { useQuery } from "@tanstack/react-query";
import { fetchRecentPosts } from "@/api/post";

export function useRecentPosts() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["recent-posts"],
    queryFn: () => fetchRecentPosts(),
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  return {
    recentPosts: data,
    isLoading,
    isError: isError || !!error,
  };
}
