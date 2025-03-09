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
  updateSportActivityThunk,
} from "../../features/activity/activityThunks";
import { useSportActivityForm } from "../../hooks/useSportActivityForm";
import Modal from "../Modal";
import { useEffect } from "react";
import { clearSelectedItem } from "../../features/activity/activitySlice";

const ModalCreateSportActivity = ({
  isModalOpen,
  onClose,
  selectedItem,
  title,
}) => {
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
  } = useSportActivityForm(selectedItem);

  const handleCloseModal = () => dispatch(clearSelectedItem());

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

    const action = selectedItem
      ? updateSportActivityThunk
      : createSportActivityThunk;

    dispatch(action({ id: selectedItem?.id, ...result.data }))
      .unwrap()
      .then(() => {
        toast(
          `Sport activity was ${
            selectedItem ? "updated" : "created"
          } successfully`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          }
        );

        dispatch(sportActivitiesThunk({ page: currentPage }));
        dispatch(setSelectedCategory(null));
        dispatch(setSelectedProvince(null));
        dispatch(setSelectedCity(null));
        reset();
        onClose();
        selectedItem && handleCloseModal();
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

  useEffect(() => {
    if (selectedItem) {
      reset({
        title: selectedItem?.title || "",
        description: selectedItem?.description || "",
        slot: selectedItem?.slot || 0,
        price: selectedItem?.price || 0,
        address: selectedItem?.address || "",
        activity_date: selectedItem?.activity_date || "",
        start_time: selectedItem?.start_time.slice(0, 5) || "",
        end_time: selectedItem?.end_time.slice(0, 5) || "",
        map_url: selectedItem?.map_url || "",
        sport_category_id: selectedItem?.sport_category_id || "",
        city_id: selectedItem?.city_id || "",
      });

      if (selectedItem?.sport_category) {
        dispatch(
          setSelectedCategory({
            value: selectedItem?.sport_category.id,
            label: selectedItem?.sport_category.name,
          })
        );
      }

      if (selectedItem?.city?.province) {
        dispatch(
          setSelectedProvince({
            value: selectedItem?.city?.province?.province_id,
            label: selectedItem?.city?.province?.province_name_id,
          })
        );
      }

      if (selectedItem?.city) {
        dispatch(
          setSelectedCity({
            value: selectedItem?.city?.city_id,
            label: selectedItem?.city?.city_name_full,
          })
        );
      }
    } else {
      reset(defaultValues);
      dispatch(setSelectedCategory(null));
      dispatch(setSelectedProvince(null));
      dispatch(setSelectedCity(null));
    }
  }, [selectedItem, reset, dispatch]);

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={onClose} title={title}>
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
            options={cities}
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
