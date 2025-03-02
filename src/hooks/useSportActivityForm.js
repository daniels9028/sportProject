import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPaginate } from "../features/category/categorySlice";
import { categoriesThunk } from "../features/category/categoryThunks";
import {
  citiesByProvinceIdThunk,
  provincesThunk,
} from "../features/location/locationThunks";
import {
  setSelectedCity,
  setSelectedProvince,
} from "../features/location/locationSlice";

export const useSportActivityForm = (selectedItem) => {
  const dispatch = useDispatch();

  const { currentPage, loading } = useSelector((state) => state.activity);

  const { category, paginate, limit } = useSelector((state) => state.category);

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
      dispatch(citiesByProvinceIdThunk(selectedProvince))
        .unwrap()
        .then(({ result }) => {
          if (selectedItem) {
            const matchedCity = result.find(
              (city) => city.city_id === selectedItem.city_id
            );

            if (matchedCity) {
              dispatch(
                setSelectedCity({
                  value: matchedCity.city_id,
                  label: matchedCity.city_name_full,
                })
              );
            }
          }
        });
    }
  }, [selectedProvince]);

  const categories = category.slice().map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return {
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
  };
};
