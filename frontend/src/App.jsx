/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  let cookies = document.cookie;
  let allCookies = cookies.split(";");

  let jwt = false;
  allCookies.forEach((item) => {
    const [name, value] = item.split("=");
    if (name === "jwt") jwt = true;
  });

  useEffect(() => {
    if (!jwt) {
      localStorage.removeItem("userInfo");
    }
  }, [jwt]);

  return (
    <>
      <ToastContainer />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
