import { Header, Footer } from "./components/common";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="page">
        <Header />
        <div className="container"></div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
