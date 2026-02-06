import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:3000/api" : "/api",
  withCredentials: true, // allow client to send cookies to the server
});

export default axiosInstance;
