import axios from "../axios/axios";

const loginRequest = async (credentials) => {
  const response = await axios.post("login", credentials);

  return response;
};

const registerRequest = async (credentials) => {
  const response = await axios.post("register", credentials);

  return response;
};

const logoutRequest = async () => {
  const response = await axios.get("logout");

  return response;
};

export default { loginRequest, registerRequest, logoutRequest };
