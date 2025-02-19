import axios from "../axios/axios";

const categoriesRequest = async (page) => {
  const response = await axios.get(
    `sport-categories?is_paginate=true&per_page=5&page=${page}`
  );

  return response;
};

const createCategoryRequest = async (credentials) => {
  const response = await axios.post("sport-categories/create", credentials);

  return response;
};

const updateCategoryRequest = async (categoryId, credentials) => {
  const response = await axios.post(
    `sport-categories/update/${categoryId}`,
    credentials
  );

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
