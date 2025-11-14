import supabase from "@/lib/supabase";
import { useAuthStore } from "@/stores";
import { NavLink, useNavigate } from "react-router";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Separator,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui";
import { DraftDialog } from "@/components/write";
import { ChevronDown, Menu } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

function Header() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
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
    if (isHamburgerOpen) {
      setIsHamburgerOpen(false);
    }

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
        navigate(`/recruit/posts/${data[0].id}/edit`);
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

          <div className="hidden items-center gap-10 md:flex">
            <NavLink
              to="/recruit"
              className="cursor-pointer font-semibold hover:text-blue-500"
            >
              팀원 모집
            </NavLink>
            <NavLink
              to="/find-teammates"
              className="cursor-pointer font-semibold hover:text-blue-500"
            >
              동료 찾기
            </NavLink>
          </div>
        </div>

        {/* 오른쪽 영역: 로그인/로그아웃 + 버튼들 */}
        <div className="hidden items-center gap-2 md:flex">
          {user && (
            <Button
              variant={"destructive"}
              className="rounded-xl !bg-blue-500 !px-5 !py-5"
              onClick={handleRoute}
            >
              모집 글 작성
            </Button>
          )}

          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 focus:outline-none focus-visible:ring-0"
                  >
                    {user.email}
                    <ChevronDown className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-30" align="start">
                  <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DraftDialog onNavigate={() => setIsHamburgerOpen(false)}>
                      <DropdownMenuItem
                        onSelect={(e: Event) => e.preventDefault()}
                      >
                        임시 저장 목록
                      </DropdownMenuItem>
                    </DraftDialog>
                    <DropdownMenuItem>
                      <span onClick={handleLogout} className="cursor-pointer">
                        로그아웃
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <NavLink to="/sign-in">
              <Button variant="outline" className="">
                로그인
              </Button>
            </NavLink>
          )}
        </div>

        <div className="md:hidden">
          <Sheet open={isHamburgerOpen} onOpenChange={setIsHamburgerOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                {user ? (
                  <SheetTitle className="text-lg">{user?.email}</SheetTitle>
                ) : (
                  <SheetTitle className="text-muted-foreground text-lg">
                    로그인이 필요합니다.
                  </SheetTitle>
                )}
              </SheetHeader>

              <Separator />

              <nav className="flex flex-col gap-2 p-4">
                <NavLink
                  to="/recruit"
                  className="cursor-pointer rounded-md p-2 text-lg font-semibold duration-300 hover:bg-gray-100"
                  onClick={() => {
                    setIsHamburgerOpen(false);
                  }}
                >
                  팀원 모집
                </NavLink>
                <NavLink
                  to="/find-teammates"
                  className="cursor-pointer rounded-md p-2 text-lg font-semibold duration-300 hover:bg-gray-100"
                  onClick={() => {
                    setIsHamburgerOpen(false);
                  }}
                >
                  동료 찾기
                </NavLink>
                <Button
                  variant="ghost"
                  className="h-11 cursor-pointer justify-start rounded-md p-2 text-lg font-semibold duration-300 hover:bg-gray-100"
                  onClick={handleRoute}
                >
                  모집 글 작성
                </Button>

                <DraftDialog onNavigate={() => setIsHamburgerOpen(false)}>
                  <Button
                    variant="ghost"
                    className="h-11 cursor-pointer justify-start rounded-md p-2 text-lg font-semibold duration-300 hover:bg-gray-100"
                  >
                    임시 저장 목록
                  </Button>
                </DraftDialog>
              </nav>
              <SheetFooter>
                {user ? (
                  <Button type="submit" onClick={handleLogout}>
                    로그아웃
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => {
                      navigate("/sign-in");
                      setIsHamburgerOpen(false);
                    }}
                    className="w-full border-1 border-gray-300"
                  >
                    로그인
                  </Button>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
export { Header };
