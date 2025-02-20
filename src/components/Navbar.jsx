import React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-black text-white border-b-4 border-white p-4 uppercase tracking-wide font-extrabold">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl border-2 border-white p-2 hover:bg-white hover:text-black transition-all duration-200"
        >
          BrutalUI
        </Link>
        <div className="hidden md:flex space-x-8 text-lg">
          <Link
            to="/about"
            className="border-2 border-white px-4 py-2 hover:bg-white hover:text-black transition-all duration-200"
          >
            About
          </Link>
          <Link
            to="/projects"
            className="border-2 border-white px-4 py-2 hover:bg-white hover:text-black transition-all duration-200"
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className="border-2 border-white px-4 py-2 hover:bg-white hover:text-black transition-all duration-200"
          >
            Contact
          </Link>
        </div>
        <button
          className="md:hidden border-2 border-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4 text-center border-t-2 border-white pt-4">
          <Link
            to="/about"
            className="border-2 border-white p-2 hover:bg-white hover:text-black transition-all duration-200"
          >
            About
          </Link>
          <Link
            to="/projects"
            className="border-2 border-white p-2 hover:bg-white hover:text-black transition-all duration-200"
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className="border-2 border-white p-2 hover:bg-white hover:text-black transition-all duration-200"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
