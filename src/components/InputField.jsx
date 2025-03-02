import React from "react";

const InputField = ({
  label,
  name,
  type,
  classnameHeader,
  register,
  errors,
}) => {
  return (
    <div className={classnameHeader}>
      <label className="block text-lg font-bold">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="w-full p-3 border-2 border-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
        required
      />
      {errors && <p className="text-red-600">{errors.message}</p>}
    </div>
  );
};

export default InputField;
