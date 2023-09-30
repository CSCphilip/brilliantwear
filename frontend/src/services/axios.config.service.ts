import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://brilliantwear.se:7000/",
  withCredentials: true,
});

export default axiosInstance;
