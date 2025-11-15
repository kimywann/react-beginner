import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/api/post";

export function usePosts(category?: string) {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["posts", category],
    queryFn: () => fetchPosts(category),
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  return {
    posts: data,
    isLoading,
    isError: isError || !!error,
  };
}
