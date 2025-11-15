import { useQuery } from "@tanstack/react-query";
import { fetchPostDetail } from "@/api/post";

export function usePostDetail(id?: string) {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostDetail(id as string),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  return {
    post: data,
    isLoading,
    isError: isError || !!error,
  };
}
