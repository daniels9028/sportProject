import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ handleChange, name, placeholder, value }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full mb-4">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full p-3 border-2 border-black bg-transparent placeholder-black text-black font-mono text-lg focus:outline-none"
        required
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute inset-y-0 right-3 flex items-center text-sm text-black font-bold underline"
      >
        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
      </button>
    </div>
  );
};

export default PasswordInput;
