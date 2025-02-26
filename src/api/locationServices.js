import axios from "../axios/axios";

const provinciesRequest = async () => {
  const response = await axios.get(
    `location/provinces?is_paginate=false&per_page=100&page=1`
  );

  return response;
};

const citiesByProvinceIdRequest = async (provinceId) => {
  const response = await axios.get(
    `location/cities/${provinceId}?is_paginate=false&per_page=100&page=1`
  );

  return response;
};

const citiesRequest = async () => {
  const response = await axios.get(
    `location/cities?is_paginate=false&per_page=100&page=1`
  );

  return response;
};

export default { provinciesRequest, citiesByProvinceIdRequest, citiesRequest };
