import supabase from "@/lib/supabase";
import { useAuthStore } from "@/stores";
import { NavLink, useNavigate } from "react-router";

import { Button, Separator } from "@/components/ui";
import { DraftDialog } from "@/components/write";
import { Archive } from "lucide-react";
import { toast } from "sonner";

function Header() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const reset = useAuthStore((state) => state.reset);

  const handleLogout = async () => {
    try {
      await reset(); // Zustand + Supabase 모두 로그아웃

      window.location.href = "/";
    } catch (error) {
      console.error(error);
      toast.error("로그아웃 중 오류가 발생했습니다.");
    }
  };

  const handleRoute = async () => {
    if (user?.id || user?.email || user?.role) {
      const { data, error } = await supabase
        .from("post")
        .insert([
          {
            title: null,
            content: null,
            category: null,
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
        toast.success("임시저장 완료되었습니다.");
        navigate(`/posts/${data[0].id}/edit`);
      }
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <header className="bg-background fixed top-0 z-20 flex w-full items-center justify-center shadow-sm">
      <div className="flex w-full max-w-[1328px] items-center justify-between px-6 py-2">
        <div className="itmes-center flex gap-20">
          <img
            src="/logo.svg"
            alt="logo"
            className="h-12 w-12 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="flex items-center gap-10">
            <NavLink
              to="/"
              className="cursor-pointer font-semibold hover:text-blue-500"
            >
              팀원 모집
            </NavLink>
            <NavLink
              to="/recruits"
              className="cursor-pointer font-semibold hover:text-blue-500"
            >
              동료 찾기
            </NavLink>
          </div>
        </div>

        <div className="flex gap-5">
          <div className="flex gap-2">
            <Button
              variant={"destructive"}
              className="rounded-xl !bg-blue-500 !px-5 !py-5"
              onClick={handleRoute}
            >
              모집 글 작성
            </Button>
            <DraftDialog>
              <div className="relative">
                <Button variant={"outline"} className="r h-10 w-10 rounded-xl">
                  <Archive />
                </Button>
                {/* <CircleSmall
                  size={14}
                  className="absolute top-0 right-0 text-blue-500"
                  fill="#1976D2"
                /> */}
              </div>
            </DraftDialog>
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              <span>{user.email}</span>
              <Separator orientation="vertical" className="!h-4" />
              <span onClick={handleLogout} className="cursor-pointer">
                로그아웃
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <NavLink to="/sign-in">로그인</NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
export { Header };
