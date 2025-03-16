import React from "react";

const DetailList = ({ label, value, image }) => {
  return (
    <div className="flex flex-col">
      <p className="font-bold text-base uppercase">{label}</p>
      {value && <p className="text-lg font-medium">{value}</p>}
      {image && <img src={image} className="w-10 h-10" />}
    </div>
  );
};

export default DetailList;
