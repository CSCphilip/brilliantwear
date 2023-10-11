import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.brilliantwear.se/",
  withCredentials: true, //TODO: Later change to true when using authentication through the API
});

export default axiosInstance;
