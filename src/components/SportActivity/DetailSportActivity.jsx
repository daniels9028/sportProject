import React from "react";

const DetailSportActivity = ({ label, value }) => {
  return (
    <div className="flex flex-col">
      <p className="font-bold text-base uppercase">{label}</p>
      <p className="text-lg font-medium">{value}</p>
    </div>
  );
};

export default DetailSportActivity;
