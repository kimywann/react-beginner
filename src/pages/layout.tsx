import { Outlet } from "react-router";
import { Header } from "../components/common";
import { Footer } from "../components/common";

export default function RootLayout() {
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
