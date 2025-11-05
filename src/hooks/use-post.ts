import useSWR from "swr";
import { fetcher } from "@/lib/swr";
import { toast } from "sonner";

export function usePost(id?: string) {
  const { data, error, isLoading } = useSWR(
    id ? ["post", id] : null, // id 없으면 요청 안 함
    ([, postId]: [string, string]) => fetcher(postId),
    {
      dedupingInterval: 1000 * 60 * 5, // 5분 동안 같은 요청 중복 방지
      revalidateOnFocus: false, // 탭 이동 시 refetch 안 함
      revalidateOnReconnect: false, // 네트워크 재연결 시 refetch 안 함
    },
  );

  if (error) toast.error(error.message);

  return {
    post: data,
    isLoading,
    isError: !!error,
  };
}
