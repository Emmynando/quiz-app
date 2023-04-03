import { Outlet } from "react-router-dom";
import Navbar from "../components/UI/Navbar";
function RootLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
