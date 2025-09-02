import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://e-learning-platform-7wzv.onrender.com",
});

// Automatically add the token to all requests if it exists in localStorage
axiosInstance.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (auth?.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

export default axiosInstance;
