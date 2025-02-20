// Button.js
import React from "react";

export const Button = ({ children, className = "", ...props }) => (
  <button
    className={`uppercase font-bold border-4 border-black bg-white text-black px-6 py-3 rounded-none hover:bg-black hover:text-white transition ${className}`}
    {...props}
  >
    {children}
  </button>
);
