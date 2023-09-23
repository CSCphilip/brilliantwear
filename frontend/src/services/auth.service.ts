import axiosInstance from "./axios.config.service";

const URL_PATH = "auth/"; // port: 80 implicit

const register = (username: string, email: string, password: string) => {
  return axiosInstance.post(URL_PATH + "signup", {
    username,
    email,
    password,
  });
};

const login = (email: string, password: string) => {
  return axiosInstance
    .post(URL_PATH + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.email) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axiosInstance.post(URL_PATH + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user") as string);
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
