import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputField = ({
  label,
  name,
  type,
  classnameHeader,
  register,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={classnameHeader}>
      <label htmlFor={name} className="block font-bold text-gray-800 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          {...register(name)}
          className="w-full p-3 border-2 border-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black pr-10"
          // required
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {errors && <p className="text-red-600">{errors.message}</p>}
    </div>
  );
};

export default InputField;
