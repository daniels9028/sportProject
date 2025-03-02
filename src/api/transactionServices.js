import axios from "../axios/axios";

const createTransactionRequest = async (credentials) => {
  const response = await axios.post("transaction/create", credentials);

  return response;
};

const myTransactionRequest = async (credentials) => {
  const response = await axios.get(
    `my-transaction?is_paginate=${credentials.paginate}&per_page=${credentials.limit}&page=${credentials.page}&search`
  );

  return response;
};

const allTransactionsRequest = async (credentials) => {
  const response = await axios.get(
    `all-transaction?is_paginate=${credentials.paginate}&per_page=${credentials.limit}&page=${credentials.page}&search`
  );

  return response;
};

const transactionByIdRequest = async (credentials) => {
  const response = await axios.get(`transaction/${credentials.id}`);

  return response;
};

const updateProofPaymentUrlRequest = async (credentials) => {
  const response = await axios.post(
    `transaction/update-proof-payment/${credentials.id}`,
    credentials
  );

  return response;
};

const updateStatusRequest = async (credentials) => {
  const response = await axios.post(
    `transaction/update-status/${credentials.id}`,
    credentials
  );

  return response;
};

const cancelTransactionRequest = async (credentials) => {
  const response = await axios.post(
    `transaction/cancel/${credentials.id}`,
    credentials
  );

  return response;
};

export default {
  createTransactionRequest,
  myTransactionRequest,
  allTransactionsRequest,
  transactionByIdRequest,
  updateProofPaymentUrlRequest,
  updateStatusRequest,
  cancelTransactionRequest,
};
