import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoriesThunk } from "../../features/category/categoryThunks";
import {
  provincesThunk,
  citiesByProvinceIdThunk,
} from "../../features/location/locationThunks";
import { setPaginate } from "../../features/category/categorySlice";
import {
  setSelectedProvince,
  setSelectedCategory,
  setSelectedCity,
} from "../../features/location/locationSlice";
import InputSportActivity from "./InputSportActivity";
import TextAreaSportActivity from "./TextAreaSportActivity";
import Select from "react-select";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .nonempty("Title is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .nonempty("Description is required"),
  slot: z.coerce.number().min(1, "Slot must be at least 1"),
  price: z.coerce.number().min(0, "Price must be at least 0"),
  activity_date: z.string().nonempty("Activity date is required"),
  start_time: z.string().nonempty("Start time is required"),
  end_time: z.string().nonempty("End time is required"),
  map_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  sport_category_id: z.number(),
  city_id: z.number(),
});

const ModalCreateSportActivity = ({ isModalOpen, onClose }) => {
  // const [formData, setFormData] = useState({
  //   title: "",
  //   description: "",
  //   slot: 0,
  //   price: 0,
  //   address: "",
  //   activity_date: "",
  //   start_time: "",
  //   end_time: "",
  //   map_url: "",
  //   sport_category_id: "",
  //   city_id: "",
  // });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      slot: 0,
      price: 0,
      address: "",
      activity_date: "",
      start_time: "",
      end_time: "",
      map_url: "",
      sport_category_id: "",
      city_id: "",
    },
  });

  const dispatch = useDispatch();

  const { category, paginate, limit } = useSelector((state) => state.category);

  const categories = category.slice().map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const {
    provinces,
    selectedProvince,
    cities,
    selectedCategory,
    selectedCity,
  } = useSelector((state) => state.location);

  const handleSelectChange = (selected) => {
    dispatch(setSelectedProvince(selected));
  };
  const onSubmit = (data) => {
    const result = formSchema.safeParse(data);
    if (!result.success) {
      // If validation fails, log or handle the errors as needed
      console.error("Validation errors:", result.error.issues);
      // Optionally, display errors to the user or set form errors manually
      return;
    }

    // If validation succeeds, result.data contains the valid data
    console.log("Validated Data:", result.data);

    // Proceed with further processing, e.g., dispatching an action or sending an API request
  };

  useEffect(() => {
    dispatch(setPaginate({ paginate: false, limit: 100 }));
    dispatch(provincesThunk());
  }, []);

  useEffect(() => {
    if (paginate === false && limit === 100) {
      dispatch(categoriesThunk({ paginate: paginate, limit: limit, page: 1 }));
    }
  }, [paginate, limit]);

  useEffect(() => {
    if (selectedProvince) {
      dispatch(citiesByProvinceIdThunk(selectedProvince));
    }
  }, [selectedProvince]);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 px-4 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white text-black p-8 w-full max-w-3xl border-4 border-black rounded-none shadow-none overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-300"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-4">
              <h2 className="md:text-2xl text-lg font-extrabold uppercase">
                Input Sport Activity
              </h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-black hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <InputSportActivity
                type="text"
                label="Title"
                name="title"
                register={register}
                errors={errors.title}
              />
              <TextAreaSportActivity
                label="Description"
                name="description"
                register={register}
                errors={errors.description}
              />
              <div className="flex flex-col md:flex-row gap-4">
                <InputSportActivity
                  type="number"
                  label="Slot"
                  name="slot"
                  register={register}
                  errors={errors.slot}
                  classnameHeader="w-full"
                />
                <InputSportActivity
                  type="number"
                  label="Price"
                  name="price"
                  register={register}
                  errors={errors.price}
                  classnameHeader="w-full"
                />
              </div>
              <TextAreaSportActivity
                label="Address"
                name="address"
                register={register}
                errors={errors.address}
              />
              <InputSportActivity
                type="date"
                label="Activity Date"
                name="activity_date"
                register={register}
                errors={errors.activity_date}
              />
              <div className="flex flex-col md:flex-row gap-4">
                <InputSportActivity
                  type="time"
                  label="Start Time"
                  name="start_time"
                  register={register}
                  errors={errors.start_time}
                  classnameHeader="w-full"
                />
                <InputSportActivity
                  type="time"
                  label="End Time"
                  name="end_time"
                  register={register}
                  errors={errors.end_time}
                  classnameHeader="w-full"
                />
              </div>
              <InputSportActivity
                type="text"
                label="Map Url"
                name="map_url"
                register={register}
                errors={errors.map_url}
              />
              <Controller
                name="sport_category_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={categories}
                    value={selectedCategory}
                    onChange={(selected) => {
                      field.onChange(selected.value);
                      dispatch(setSelectedCategory(selected));
                    }}
                    className="w-full border-2 border-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Choose sport category"
                  />
                )}
              />
              {errors.sport_category_id && (
                <p className="text-red-600">
                  {errors.sport_category_id.message}
                </p>
              )}
              <Select
                options={provinces}
                value={selectedProvince}
                onChange={handleSelectChange}
                className="w-full border-2 border-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Choose province"
              />
              <Controller
                name="city_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={cities}
                    value={selectedCity}
                    onChange={(selected) => {
                      field.onChange(selected.value);
                      dispatch(setSelectedCity(selected));
                    }}
                    className="w-full border-2 border-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Choose sport category"
                  />
                )}
              />
              {errors.city_id && (
                <p className="text-red-600">{errors.city_id?.message}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-black text-white text-lg font-extrabold uppercase hover:bg-gray-800"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalCreateSportActivity;
