import { useNavigate, useSearchParams } from "react-router";

import { Sidebar } from "../components/common/Sidebar";
import { Button } from "../components/ui";
import { CircleSmall, NotebookPen, PencilLine } from "lucide-react";

import { useAuthStore } from "@/stores";
import supabase from "@/lib/supabase";
import { toast } from "sonner";
import { DraftDialog } from "@/components/common/DraftDialog";
import { TOPIC_STATUS, type Topic } from "@/types/topic.type";
import { useEffect, useState } from "react";
import { SkeletonHotTopic } from "@/components/skeleton";
import { NewTopicCard } from "@/components/topics";
import { validators } from "tailwind-merge";

function App() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

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

  const handleRoute = async () => {
    if (user?.id || user?.email || user?.role) {
      const { data, error } = await supabase
        .from("topic")
        .insert([
          {
            status: null,
            title: null,
            content: null,
            category: null,
            thumbnail: null,
            author: user.id,
          },
        ])
        .select();

      if (error) {
        toast.error(error.message);
        return;
      }

      console.log(data);

      if (data) {
        toast.success("토픽 작성에 성공하였습니다.");
        navigate(`/topic/${data[0].id}/write`);
      }
    } else {
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [category]);

  return (
    <main className="flex h-full min-h-[720px] w-full gap-6 p-6">
      <div className="fixed right-1/2 bottom-10 z-20 flex translate-x-1/2 items-center gap-2">
        <Button
          variant={"destructive"}
          className="rounded-full !bg-blue-500 !px-6 !py-5"
          onClick={handleRoute}
        >
          <PencilLine />
          나만의 토픽 작성
        </Button>
        <DraftDialog>
          <div className="relative">
            <Button variant={"outline"} className="h-10 w-10 rounded-full">
              <NotebookPen />
            </Button>
            <CircleSmall
              size={14}
              className="absolute top-0 right-0 text-blue-500"
              fill="#1976D2"
            />
          </div>
        </DraftDialog>
      </div>
      {/* 카테고리 사이드바 */}
      <Sidebar category={category} setCategory={handleCategoryChange} />
      {/* 토픽 콘텐츠 */}
      <section className="flex w-full flex-col gap-12 lg:w-[calc(100%-264px)]">
        {/* 핫 토픽 */}
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <img
                src="/assets/gifs/gif-001.gif"
                alt="@IMG"
                className="h-7 w-7"
              />
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                HOT 토픽
              </h4>
            </div>
            <p className="text-muted-foreground md:text-base">
              지금 가장 주목받는 주제들을 살펴보고, 다양한 관점의 인사이트를
              얻어보세요.
            </p>
          </div>
          <div className="flex w-full items-center gap-6 overflow-auto">
            <SkeletonHotTopic />
            <SkeletonHotTopic />
            <SkeletonHotTopic />
            <SkeletonHotTopic />
          </div>
        </div>
        {/* NEW 토픽 */}
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <img
                src="/assets/gifs/gif-002.gif"
                alt="@IMG"
                className="h-7 w-7"
              />
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                NEW 토픽
              </h4>
            </div>
            <p className="text-muted-foreground md:text-base">
              새로운 시선으로, 새로운 이야기를 시작하세요. 지금 바로 당신만의
              토픽을 작성해보세요.
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
                조회 가능한 토픽이 없습니다.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
