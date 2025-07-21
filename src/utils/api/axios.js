import axios from "axios";

const instance = axios.create({
  baseURL: "https://62b9c510061d.ngrok-free.app/api",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
