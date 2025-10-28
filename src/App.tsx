import { Header, Footer } from "./components/common";
import { Sidebar } from "./components/common/Sidebar";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="page">
        <Header />
        <div className="container">
          <main className="flex h-full min-h-[720px] w-full gap-6 p-6">
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
