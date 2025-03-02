import axios from "../axios/axios";

const paymentMethodsRequest = async () => {
  const response = await axios.get("payment-methods");

  return response;
};

export default { paymentMethodsRequest };
