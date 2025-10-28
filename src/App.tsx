import { PencilLine } from "lucide-react";
import { Header, Footer } from "./components/common";
import { Sidebar } from "./components/common/Sidebar";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="page">
        <Header />
        <div className="container">
          <main className="flex h-full min-h-[720px] w-full gap-6 p-6">
            <div className="fixed right-1/2 bottom-10 z-20 translate-x-1/2 items-center">
              <Button
                variant={"destructive"}
                className="rounded-full !bg-blue-500 !px-6 !py-5"
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
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
