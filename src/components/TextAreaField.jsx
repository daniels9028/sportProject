import React from "react";

const TextAreaField = ({ label, name, register, errors }) => {
  return (
    <div>
      <label className="block text-lg font-bold">{label}</label>
      <textarea
        name={name}
        {...register(name)}
        rows="4"
        className="w-full p-3 border-2 border-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
        required
      />
      {errors && <p className="text-red-600">{errors.message}</p>}
    </div>
  );
};

export default TextAreaField;
