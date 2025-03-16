import axios from "../axios/axios";

const uploadImageRequest = async (credentials) => {
  const response = await axios.post(
    "upload-image",
    { file: credentials },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};

const uploadFileRequest = async (credentials) => {
  const response = await axios.post(
    "upload-file",
    { file: credentials },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};

export default { uploadImageRequest, uploadFileRequest };
