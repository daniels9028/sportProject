import axios from "../axios/axios";

const categoriesRequest = async (credentials) => {
  const response = await axios.get(
    `sport-categories?is_paginate=${credentials.paginate}&per_page=${credentials.limit}&page=${credentials.page}`
  );

  return response;
};

const createCategoryRequest = async (credentials) => {
  const response = await axios.post("sport-categories/create", credentials);

  return response;
};

const updateCategoryRequest = async (id, name) => {
  const response = await axios.post(`sport-categories/update/${id}`, {
    name: name,
  });

  return response;
};

const deleteCategoryRequest = async (categoryId) => {
  const response = await axios.delete(`sport-categories/delete/${categoryId}`);

  return response;
};

export default {
  categoriesRequest,
  createCategoryRequest,
  updateCategoryRequest,
  deleteCategoryRequest,
};
