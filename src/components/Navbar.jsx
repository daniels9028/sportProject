import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { token } = useSelector((state) => state.auth);

  return (
    <nav className="w-full bg-gradient-to-r from-gray-200 via-gray-300 to-white text-gray-800 border-b-4 border-gray-200 p-4 uppercase tracking-widest font-bold shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-4xl border-4 border-gray-800 px-4 py-2 hover:bg-gray-800 hover:text-white transition-all duration-300 shadow-md"
        >
          ModernView
        </Link>
        <div className="hidden lg:flex space-x-8 text-lg">
          <Link
            to="/about"
            className="border-2 border-gray-800 px-6 py-2 hover:bg-gray-800 hover:text-white transition-all duration-300 shadow-sm"
          >
            About
          </Link>
          <Link
            to="/projects"
            className="border-2 border-gray-800 px-6 py-2 hover:bg-gray-800 hover:text-white transition-all duration-300 shadow-sm"
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className="border-2 border-gray-800 px-6 py-2 hover:bg-gray-800 hover:text-white transition-all duration-300 shadow-sm"
          >
            Contact
          </Link>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          {token ? (
            <Link
              to="/profile"
              className="border-2 border-gray-800 p-2 rounded-full hover:bg-gray-800 hover:text-white transition-all duration-300 shadow-md"
            >
              <User size={28} />
            </Link>
          ) : (
            <Link
              to="/login"
              className="border-2 border-gray-800 px-6 py-2 bg-blue-500 hover:bg-gray-800 hover:text-white transition-all duration-300 shadow-md"
            >
              Login
            </Link>
          )}
        </div>
        <button
          className="lg:hidden border-2 border-gray-800 p-2 hover:bg-gray-800 hover:text-white transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden flex flex-col space-y-4 mt-4 text-center border-t-2 border-gray-200 pt-4 animate-slide-down">
          <Link
            to="/about"
            className="border-2 border-gray-800 p-3 hover:bg-gray-800 hover:text-white transition-all duration-300 shadow-sm"
          >
            About
          </Link>
          <Link
            to="/projects"
            className="border-2 border-gray-800 p-3 hover:bg-gray-800 hover:text-white transition-all duration-300 shadow-sm"
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className="border-2 border-gray-800 p-3 hover:bg-gray-800 hover:text-white transition-all duration-300 shadow-sm"
          >
            Contact
          </Link>
          {token ? (
            <Link
              to="/profile"
              className="border-2 flex justify-center border-gray-800 p-3 rounded-full hover:bg-gray-800 hover:text-white transition-all duration-300 shadow-md"
            >
              <User size={28} />
            </Link>
          ) : (
            <Link
              to="/login"
              className="border-2 border-gray-800 p-3 bg-blue-500 hover:bg-gray-800 hover:text-white transition-all duration-300 shadow-md"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
