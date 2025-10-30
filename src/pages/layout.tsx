import { Outlet } from "react-router";
import { Header } from "../components/common";
import { Footer } from "../components/common";
import useAuthListener from "@/components/hooks/use-auth";

export default function RootLayout() {
  useAuthListener();

  return (
    <div className="page">
      <Header />
      <div className="container mt-2">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
