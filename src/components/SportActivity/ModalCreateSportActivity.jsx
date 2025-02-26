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
import { setSelectedProvince } from "../../features/location/locationSlice";

const ModalCreateSportActivity = ({ isModalOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();

  const {
    category: categories,
    paginate,
    limit,
  } = useSelector((state) => state.category);

  const { provinces, selectedProvince, cities } = useSelector(
    (state) => state.location
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e) => {
    dispatch(setSelectedProvince(e.target.value));
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
            <form className="space-y-4">
              <div>
                <label className="block text-lg font-bold">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-bold">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-3 border-2 border-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <label className="block text-lg font-bold">Slot</label>
                  <input
                    type="number"
                    name="slot"
                    min={0}
                    value={formData.slot}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-lg font-bold">Price</label>
                  <input
                    type="number"
                    name="price"
                    min={0}
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-lg font-bold">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-3 border-2 border-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-bold">Activity Date</label>
                <input
                  type="date"
                  name="activity_date"
                  min={0}
                  value={formData.activity_date}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <label className="block text-lg font-bold">Start Time</label>
                  <input
                    type="time"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-lg font-bold">End Time</label>
                  <input
                    type="time"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-lg font-bold">Map Url</label>
                <input
                  type="text"
                  name="map_url"
                  value={formData.map_url}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-bold">
                  Sport Category
                </label>
                <select
                  type="text"
                  name="sport_category"
                  value={formData.sport_category}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                >
                  <option value="" disabled selected>
                    Choose...
                  </option>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-lg font-bold">Province</label>
                <select
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleSelectChange}
                  className="w-full p-3 border-2 border-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                >
                  <option value="" disabled selected>
                    Choose...
                  </option>
                  {provinces?.map((province) => (
                    <option
                      key={province.province_id}
                      value={province.province_id}
                    >
                      {province.province_name_id}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-lg font-bold">City</label>
                <select
                  type="text"
                  name="city"
                  value={formData.city}
                  className="w-full p-3 border-2 border-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                >
                  <option value="" disabled selected>
                    Choose...
                  </option>
                  {cities?.map((city) => (
                    <option key={city.city_id} value={city.city_id}>
                      {city.city_name_full}
                    </option>
                  ))}
                </select>
              </div>
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
