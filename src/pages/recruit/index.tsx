import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { PostCard, PostSkeleton } from "@/components/common/post";
import { CategoryTabs } from "@/components/common";

import { CATEGORY_META } from "@/components/constants/category";
import { POST_STATUS, type POST } from "@/types/post.type";
import { toast } from "sonner";

export default function Recruit() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  const [posts, setPosts] = useState<POST[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCategoryChange = (value: string) => {
    if (value === category) return;

    if (value === "") {
      setSearchParams({});
    } else setSearchParams({ category: value });
  };

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const query = supabase
        .from("post")
        .select("*")
        .eq("status", POST_STATUS.PUBLISH);

      if (category && category !== "") {
        query.eq("category", category);
      }
      const { data: posts, error } = await query;

      if (error) {
        toast.error(error.message);
        return;
      }

      if (posts) setPosts(posts);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [category]);
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
                <PostSkeleton key={index} />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {posts
                .sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime(),
                )
                .map((post: POST) => (
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
