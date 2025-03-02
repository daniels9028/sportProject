import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bounce, toast } from "react-toastify";
import {
  setSelectedProvince,
  setSelectedCategory,
  setSelectedCity,
} from "../../features/location/locationSlice";
import InputField from "../InputField";
import TextAreaField from "../TextAreaField";
import SelectField from "../SelectField";
import Select from "react-select";
import {
  formSchema,
  defaultValues,
} from "../../formSchema/sportActivitySchema";
import {
  createSportActivityThunk,
  sportActivitiesThunk,
} from "../../features/activity/activityThunks";
import { useSportActivityForm } from "../../hooks/useSportActivityForm";
import Modal from "../Modal";

const ModalCreateSportActivity = ({ isModalOpen, onClose }) => {
  const {
    dispatch,
    loading,
    currentPage,
    categories,
    provinces,
    selectedProvince,
    cities,
    selectedCategory,
    selectedCity,
    handleSelectChange,
  } = useSportActivityForm();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (data) => {
    const result = formSchema.safeParse(data);

    if (!result.success) {
      return;
    }

    dispatch(createSportActivityThunk(result.data))
      .unwrap()
      .then(() => {
        toast("Sport activity was created successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        dispatch(sportActivitiesThunk(currentPage));
        dispatch(setSelectedCategory(null));
        dispatch(setSelectedProvince(null));
        dispatch(setSelectedCity(null));
        reset();
        onClose();
      })
      .catch((response) => {
        toast(response.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      });
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={onClose}
        title="Input Sport Activity"
      >
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type="text"
            label="Title"
            name="title"
            register={register}
            errors={errors.title}
          />
          <TextAreaField
            label="Description"
            name="description"
            register={register}
            errors={errors.description}
          />
          <div className="flex flex-col md:flex-row gap-4">
            <InputField
              type="number"
              label="Slot"
              name="slot"
              register={register}
              errors={errors.slot}
              classnameHeader="w-full"
            />
            <InputField
              type="number"
              label="Price"
              name="price"
              register={register}
              errors={errors.price}
              classnameHeader="w-full"
            />
          </div>
          <TextAreaField
            label="Address"
            name="address"
            register={register}
            errors={errors.address}
          />
          <InputField
            type="date"
            label="Activity Date"
            name="activity_date"
            register={register}
            errors={errors.activity_date}
          />
          <div className="flex flex-col md:flex-row gap-4">
            <InputField
              type="time"
              label="Start Time"
              name="start_time"
              register={register}
              errors={errors.start_time}
              classnameHeader="w-full"
            />
            <InputField
              type="time"
              label="End Time"
              name="end_time"
              register={register}
              errors={errors.end_time}
              classnameHeader="w-full"
            />
          </div>
          <InputField
            type="text"
            label="Map Url"
            name="map_url"
            register={register}
            errors={errors.map_url}
          />
          <SelectField
            name="sport_category_id"
            control={control}
            options={categories}
            value={selectedCategory}
            setSelected={setSelectedCategory}
            placeholder="Choose sport category"
            errors={errors.sport_category_id}
          />
          <Select
            options={provinces}
            value={selectedProvince}
            onChange={handleSelectChange}
            className="w-full border-2 border-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Choose province"
          />
          <SelectField
            name="city_id"
            control={control}
            options={categories}
            value={selectedCity}
            setSelected={setSelectedCity}
            placeholder="Choose city"
            errors={errors.city_id}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white text-lg font-extrabold uppercase hover:bg-gray-800"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ModalCreateSportActivity;
