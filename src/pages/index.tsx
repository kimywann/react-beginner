import { useSearchParams } from "react-router";

import supabase from "@/lib/supabase";
import { toast } from "sonner";
import { TOPIC_STATUS, type Topic } from "@/types/topic.type";
import { useEffect, useState } from "react";
import { NewTopicCard } from "@/components/topics";
import { CATEGORY_META } from "@/components/constants/category";
import { CategoryTabs } from "@/components/common";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  const [topics, setTopics] = useState<Topic[]>([]);

  const handleCategoryChange = (value: string) => {
    if (value === category) return;

    if (value === "") {
      setSearchParams({});
    } else setSearchParams({ category: value });
  };

  const fetchTopics = async () => {
    try {
      const query = supabase
        .from("topic")
        .select("*")
        .eq("status", TOPIC_STATUS.PUBLISH);

      if (category && category !== "") {
        query.eq("category", category);
      }
      const { data: topics, error } = await query;

      if (error) {
        toast.error(error.message);
        return;
      }

      if (topics) setTopics(topics);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [category]);

  return (
    <main className="flex h-full min-h-[720px] w-full flex-col items-center justify-center gap-6 p-6">
      {/* 카테고리 메뉴 */}
      <div>
        <CategoryTabs category={category} setCategory={handleCategoryChange} />
      </div>

      {/* 콘텐츠 */}
      <section className="flex w-full flex-col gap-12 lg:w-[calc(100%-264px)]">
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
          {topics.length > 0 ? (
            <div className="flex min-h-120 flex-col gap-6 md:grid md:grid-cols-2">
              {topics
                .sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime(),
                )
                .map((topic: Topic) => {
                  return <NewTopicCard key={topic.id} props={topic} />;
                })}
            </div>
          ) : (
            <div className="flex min-h-120 w-full items-center justify-center">
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

export default App;
