import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "./components/ui";

import RootLayout from "./pages/layout.tsx";
import App from "./pages";
import SignUp from "./pages/sign-up";
import SignIn from "./pages/sign-in";
import PostCreate from "./pages/post/[id]/create.tsx";
import PostDetail from "./pages/post/[id]/detail.tsx";

import "./index.css";
import Recruits from "./pages/recruits/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<App />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="posts/:id/edit" element={<PostCreate />} />
            <Route path="posts/:id" element={<PostDetail />} />
            <Route path="recruits" element={<Recruits />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  </StrictMode>,
);
