import { Controller } from "react-hook-form";
import Select from "react-select";

const SelectField = ({
  name,
  control,
  options,
  value,
  setSelected,
  placeholder,
  errors,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            value={value}
            onChange={(selected) => {
              field.onChange(selected.value);
              dispatch(setSelected(selected));
            }}
            className="w-full border-2 border-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder={placeholder}
          />
        )}
      />
      {errors && <p className="text-red-600">{errors.message}</p>}
    </>
  );
};

export default SelectField;
