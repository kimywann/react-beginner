import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { usePosts } from "@/hooks/usePosts";

import { PostCard, PostCardSkeleton } from "@/components/common/post";
import { CategoryTabs } from "@/components/common";

import { CATEGORY_META } from "@/components/constants/category";
import type { PostListItem } from "@/types/post.type";
import { toast } from "sonner";

export default function Recruit() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  const { posts, isLoading, isError } = usePosts(category || undefined);

  const handleCategoryChange = (value: string) => {
    if (value === category) return;

    if (value === "") {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error("게시글을 불러오지 못했습니다.");
    }
  }, [isError]);

  return (
    <main className="flex w-full flex-col items-center justify-center gap-6 p-6">
      {/* 카테고리 메뉴 */}
      <div className="mt-6">
        <CategoryTabs category={category} setCategory={handleCategoryChange} />
      </div>

      {/* 콘텐츠 */}
      <section className="flex w-full flex-col gap-12">
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                {
                  CATEGORY_META.find((meta) => meta.category === category)
                    ?.title
                }
              </h4>
            </div>
            <p className="text-muted-foreground md:text-base">
              {
                CATEGORY_META.find((meta) => meta.category === category)
                  ?.description
              }
            </p>
          </div>
          {isLoading ? (
            <div className="flex flex-col gap-6 md:grid md:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <PostCardSkeleton key={index} />
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {posts
                .sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                )
                .map((post: PostListItem) => (
                  <PostCard key={post.id} props={post} />
                ))}
            </div>
          ) : (
            <div className="flex h-120 w-full items-center justify-center">
              <p className="text-muted-foreground/50">
                조회 가능한 글이 없습니다.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
