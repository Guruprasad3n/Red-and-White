import axios from "axios";
// const baseUrl = "https://kryzen-assignment-4d0z.onrender.com/";

const axiosInstance = axios.create({
  baseURL: `https://kryzen-assignment-4d0z.onrender.com/`,
});

export default axiosInstance;
