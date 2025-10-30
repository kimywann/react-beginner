import { useNavigate } from "react-router";

import { Sidebar } from "../components/common/Sidebar";
import { Button } from "../components/ui";
import { CircleSmall, NotebookPen, PencilLine } from "lucide-react";

import { useAuthStore } from "@/stores";
import supabase from "@/lib/supabase";
import { toast } from "sonner";
import { DraftDialog } from "@/components/common/DraftDialog";

function App() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

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
      <Sidebar />
      {/* 토픽 콘텐츠 */}
      <section></section>
    </main>
  );
}

export default App;
