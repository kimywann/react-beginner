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
import Recruit from "./pages/recruit/index.tsx";
import FindTeammates from "./pages/find-teammates/index.tsx";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route index element={<App />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="sign-in" element={<SignIn />} />
              <Route path="recruit" element={<Recruit />} />
              <Route path="recruit/posts/:id" element={<PostDetail />} />
              <Route path="recruit/posts/:id/edit" element={<PostCreate />} />
              <Route path="find-teammates" element={<FindTeammates />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster richColors position="top-center" />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
