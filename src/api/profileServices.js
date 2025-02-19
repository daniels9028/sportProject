import axios from "../axios/axios";

const updateUserRequest = async (userId, credentials) => {
  const response = await axios.post(`update-user/${userId}`, credentials);

  return response;
};

const myProfile = async () => {
  const response = await axios.get("me");

  return response;
};

export default { updateUserRequest, myProfile };
