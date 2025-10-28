import { Separator } from "../ui";

function Header() {
  return (
    <header className="fixed top-0 z-20 flex w-full items-center justify-center">
      <div className="flex w-full max-w-[1328px] items-center justify-between px-6 py-3">
        {/* 로고 & 내비게이션 메뉴 UI */}
        <div className="itmes-center flex gap-5">
          <img
            src="/logo.svg"
            alt="logo"
            className="h-12 w-12 cursor-pointer"
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
        {/* 로그인 UI */}
        <div className="text-muted-foreground cursor-pointer font-semibold hover:text-blue-500">
          로그인
        </div>
      </div>
    </header>
  );
}
export { Header };
