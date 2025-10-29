import { useNavigate } from "react-router";

import { Sidebar } from "../components/common/Sidebar";
import { Button } from "../components/ui";
import { PencilLine } from "lucide-react";

import { useAuthStore } from "@/stores";

function App() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleRoute = () => {
    if (user?.id || user?.email || user?.role) {
      navigate("/topic/write");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <main className="flex h-full min-h-[720px] w-full gap-6 p-6">
      <div className="fixed right-1/2 bottom-10 z-20 translate-x-1/2 items-center">
        <Button
          variant={"destructive"}
          className="rounded-full !bg-blue-500 !px-6 !py-5"
          onClick={handleRoute}
        >
          <PencilLine />
          나만의 토픽 작성
        </Button>
      </div>
      {/* 카테고리 사이드바 */}
      <Sidebar />
      {/* 토픽 콘텐츠 */}
      <section></section>
    </main>
  );
}

export default App;
