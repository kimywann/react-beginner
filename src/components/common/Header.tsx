import { useAuthStore } from "@/stores";
import { Separator } from "../ui";
import { NavLink, useNavigate } from "react-router";
import { toast } from "sonner";

function Header() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const reset = useAuthStore((state) => state.reset);

  const handleLogout = async () => {
    try {
      await reset(); // Zustand + Supabase 모두 로그아웃

      toast.success("로그아웃 되었습니다.");
      navigate("/sign-in");
    } catch (error) {
      console.error(error);
      toast.error("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <header className="bg-background fixed top-0 z-20 flex w-full items-center justify-center">
      <div className="flex w-full max-w-[1328px] items-center justify-between px-6 py-2">
        <div className="itmes-center flex gap-5">
          <img
            src="/logo.svg"
            alt="logo"
            className="h-8 w-8 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="flex items-center gap-5">
            <div className="cursor-pointer font-semibold hover:text-blue-500">
              토픽 인사이트
            </div>
            <Separator orientation="vertical" className="!h-4" />
            <div className="cursor-pointer font-semibold hover:text-blue-500">
              추후 예정
            </div>
          </div>
        </div>

        {user?.email ? (
          <div className="flex items-center gap-2">
            <span>{user.email}</span>
            <Separator orientation="vertical" className="!h-4" />
            <span onClick={handleLogout}>로그아웃</span>
          </div>
        ) : (
          <NavLink to="/sign-in">로그인</NavLink>
        )}
      </div>
    </header>
  );
}
export { Header };
