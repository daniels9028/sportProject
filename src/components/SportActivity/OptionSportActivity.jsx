import React from "react";

const OptionSportActivity = ({ id, name }) => {
  return (
    <option key={id} value={id}>
      {name}
    </option>
  );
};

export default OptionSportActivity;
