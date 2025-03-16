import React from "react";
import { useDispatch } from "react-redux";
import { logoutThunk } from "../features/auth/authThunks";
import { Bounce, toast } from "react-toastify";

const AdminNavbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutThunk())
      .unwrap()
      .then(() => {
        toast("Successfully Logout", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      })
      .catch(() => {
        toast("Error on logout", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      });
  };
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 bg-white border-b-4 border-black shadow-lg rounded-lg mb-6 gap-4 sm:gap-0">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight uppercase text-black">
        Admin Dashboard
      </h1>
      <button
        className="bg-black text-white border-2 border-black rounded-md px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-bold hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ease-in-out w-full sm:w-auto cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
};

export default AdminNavbar;
