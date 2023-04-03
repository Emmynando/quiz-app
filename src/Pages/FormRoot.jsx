import { Outlet } from "react-router-dom";
import Navbar from "../components/UI/Navbar";

function FormRoot() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default FormRoot;
