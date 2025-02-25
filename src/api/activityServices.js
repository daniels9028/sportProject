import axios from "../axios/axios";

const sportActivitiesRequest = async (page) => {
  const response = await axios.get(
    `sport-activities?is_paginate=true&per_page=6&page=${page}`
  );

  return response;
};

const sportActivityByIdRequest = async (sportId) => {
  const response = await axios.get(`sport-activities/${sportId}`);

  return response;
};

const createSportActivityRequest = async (credentials) => {
  const response = await axios.post("sport-activities/create", credentials);

  return response;
};

const updateSportActivityRequest = async (sportId, credentials) => {
  const response = await axios.post(
    `sport-activities/update/${sportId}`,
    credentials
  );

  return response;
};

const deleteSportActivityRequest = async (sportId) => {
  const response = await axios.delete(`sport-activities/delete/${sportId}`);

  return response;
};

export default {
  sportActivitiesRequest,
  sportActivityByIdRequest,
  createSportActivityRequest,
  updateSportActivityRequest,
  deleteSportActivityRequest,
};
