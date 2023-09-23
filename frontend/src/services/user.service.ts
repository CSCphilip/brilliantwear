import axiosInstance from "./axios.config.service";

const URL_PATH = "test/";

const getPublicContent = () => {
  return axiosInstance.get(URL_PATH + "all");
};

const getUserBoard = () => {
  return axiosInstance.get(URL_PATH + "user");
};

const getModeratorBoard = () => {
  return axiosInstance.get(URL_PATH + "mod");
};

const getAdminBoard = () => {
  return axiosInstance.get(URL_PATH + "admin");
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default UserService;
