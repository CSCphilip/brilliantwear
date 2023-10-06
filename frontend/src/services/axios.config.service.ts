import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.brilliantwear.se/",
  withCredentials: true,
});

export default axiosInstance;
