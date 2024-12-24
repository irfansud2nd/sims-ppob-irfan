// axiosInstance.ts
import axios from "axios";
import { getServerSession } from "./auth/authActions";
import { baseApiUrl } from "./constants";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: baseApiUrl,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getServerSession();
    if (session) {
      config.headers.Authorization = `Bearer ${session}`;
    } else {
      throw new Error("Not logged in");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
