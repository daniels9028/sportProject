// Card.js
import React from "react";

export const Card = ({ children, className = "" }) => (
  <div
    className={`border-4 border-black bg-white rounded-none shadow-lg ${className}`}
  >
    {children}
  </div>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);
