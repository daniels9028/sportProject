import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import DashboardNavbar from "../components/DashboardNavbar";
import { useDispatch, useSelector } from "react-redux";
import { sportActivitiesThunk } from "../features/activity/activityThunks";
import { categoriesThunk } from "../features/category/categoryThunks";
import { citiesThunk } from "../features/location/locationThunks";
import ExploreList from "../components/ExploreList";
import ExplorePagination from "../components/ExplorePagination";
import { setPaginate } from "../features/category/categorySlice";
import {
  setSelectedCategory,
  setSelectedCity,
} from "../features/activity/activitySlice";
import Select from "react-select";

const ExplorePage = () => {
  const dispatch = useDispatch();

  const activity = useSelector((state) => state.activity.activity);
  const currentPage = useSelector((state) => state.activity.currentPage);
  const selectedCategory = useSelector(
    (state) => state.activity.selectedCategory
  );
  const selectedCity = useSelector((state) => state.activity.selectedCity);
  const category = useSelector((state) => state.category.category);
  const paginate = useSelector((state) => state.category.paginate);
  const limit = useSelector((state) => state.category.limit);
  const cities = useSelector((state) => state.location.cities);

  const categories = category.slice().map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    dispatch(setPaginate({ paginate: false, limit: 100 }));
    dispatch(sportActivitiesThunk({ page: currentPage }));
    dispatch(citiesThunk());
  }, []);

  useEffect(() => {
    if (paginate === false && limit === 100) {
      dispatch(categoriesThunk({ paginate: paginate, limit: limit, page: 1 }));
    }
  }, [paginate, limit]);

  useEffect(() => {
    dispatch(
      sportActivitiesThunk({
        page: currentPage,
        category: selectedCategory,
        city: selectedCity,
      })
    );
  }, [selectedCategory, selectedCity]);

  return (
    <div className="bg-white min-h-screen font-mono relative">
      <ToastContainer />
      <DashboardNavbar />

      <section className="px-6 md:px-12 py-12 md:py-16 bg-white border-b-4 border-black mt-12">
        <h2 className="text-2xl md:text-4xl font-bold uppercase text-center">
          Explore
        </h2>

        {/* Dropdown Selection */}

        <div className="px-6 md:px-12 py-8 border-black bg-gray-100 mt-8">
          <div className="flex justify-center flex-col gap-4">
            <Select
              options={categories}
              value={selectedCategory}
              onChange={(selected) => {
                dispatch(setSelectedCategory(selected));
              }}
              className="border-4 border-black bg-white text-black text-lg font-bold uppercase w-full cursor-pointer shadow-[4px_4px_0px_black] transition-all hover:bg-black focus:outline-none focus:bg-black"
              placeholder="Select Category"
            />

            <Select
              options={cities}
              value={selectedCity}
              onChange={(selected) => {
                dispatch(setSelectedCity(selected));
              }}
              className="border-4 border-black bg-white text-black text-lg font-bold uppercase w-full cursor-pointer shadow-[4px_4px_0px_black] transition-all hover:bg-black focus:outline-none focus:bg-black"
              placeholder="Select City"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {activity?.map((item, index) => (
              <ExploreList item={item} key={item.id} index={index} />
            ))}
          </div>
        </div>
        <ExplorePagination />
      </section>
    </div>
  );
};

export default ExplorePage;
