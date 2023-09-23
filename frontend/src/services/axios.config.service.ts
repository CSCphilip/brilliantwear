import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost/", // port: 80 implicit
  withCredentials: true,
});

export default axiosInstance;
