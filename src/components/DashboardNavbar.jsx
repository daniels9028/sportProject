import React, { useState } from "react";
import { Menu, User, X, LogOut, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Link as LINK } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Bounce, toast } from "react-toastify";
import { logoutThunk } from "../features/auth/authThunks";

const menus = [
  {
    label: "HOME",
    link: "/",
    id: "home",
  },
  {
    label: "CATEGORY",
    link: "/",
    id: "category",
  },
  {
    label: "EXPLORE",
    link: "/",
    id: "explore",
  },
  {
    label: "ABOUT",
    link: "/",
    id: "about",
  },
];

const DashboardNavbar = () => {
  const { user } = useSelector((state) => state.profile);

  const [isOpen, setIsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

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
    <header className="border-b-4 border-black bg-gray-100 px-6 py-6 md:px-12 uppercase fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="text-4xl font-extrabold tracking-tight bg-black text-white px-3 py-1 cursor-pointer"
        >
          SPORT NEWS
        </Link>

        {/* Burger Icon for Mobile */}
        <button
          className="lg:hidden border-2 border-black p-2 bg-black text-white cursor-pointer"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex flex-wrap justify-center gap-12 text-lg font-bold">
          {menus.map((item) => (
            <LINK
              key={item.label}
              smooth={true}
              duration={500}
              offset={-80}
              to={item.id}
              className="relative group hover:text-gray-800 cursor-pointer"
            >
              {item.label}
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-black transition-all group-hover:w-full"></span>
            </LINK>
          ))}
        </nav>

        {user ? (
          <div className="relative hidden lg:block">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center gap-3  rounded-full border-black bg-black text-white p-2 hover:bg-gray-800 transition cursor-pointer"
            >
              <User size={22} />
            </button>
            {profileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-50 right-0 mt-2 w-56 bg-black text-white border border-black shadow-lg uppercase"
              >
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-3 hover:bg-gray-800"
                >
                  <User size={18} /> Profile
                </Link>
                <Link
                  to="/transactions"
                  className="flex items-center gap-2 px-4 py-3 hover:bg-gray-800"
                >
                  <FileText size={18} /> Transactions
                </Link>
                <button
                  className="flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-gray-800 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut size={18} /> Logout
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="hidden lg:block border-2 border-black bg-black text-white px-6 py-2 hover:bg-gray-800 transition font-bold"
          >
            LOGIN
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="flex flex-col items-center w-full gap-6 mt-6 lg:hidden border-t-4 border-black pt-6 bg-gray-100">
          {menus.map((item) => (
            <LINK
              key={item.label}
              smooth={true}
              duration={500}
              offset={-80}
              to={item.id}
              onClick={toggleMenu}
              className="text-xl font-bold hover:text-gray-800 cursor-pointer"
            >
              {item.label}
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-black transition-all group-hover:w-full"></span>
            </LINK>
          ))}
          {user ? (
            <div className="flex flex-col w-full text-center border-t-4 border-black pt-4">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center gap-2 justify-center border-2 border-black bg-black text-white px-6 py-2 hover:bg-gray-800 transition cursor-pointer"
              >
                <User size={22} /> PROFILE
              </button>
              {profileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full bg-black text-white border border-black shadow-lg uppercase mt-2"
                >
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-800"
                  >
                    <User size={18} /> Profile
                  </Link>
                  <Link
                    to="/transactions"
                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-800"
                  >
                    <FileText size={18} /> Transactions
                  </Link>
                  <button
                    className="flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-gray-800 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="border-2 w-full border-black bg-black text-white px-6 py-2 hover:bg-gray-800 transition font-bold"
            >
              LOGIN
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default DashboardNavbar;
