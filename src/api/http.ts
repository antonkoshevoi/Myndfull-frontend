import axios from "axios";
import { handleAwait } from "utils/handleAwait";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.method === "post" && config.url === "/login") {
      const { email, password } = config.data;
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      if (email !== "aleksei@example.com" || password !== "lkJlkn8hj") {
        return {
          ...config,
          method: "get",
          url: "login-error",
          data: undefined,
        };
      }
      return { ...config, method: "get", data: undefined };
    }

    if (config.method === "delete" && config.url === "/logout") {
      return { ...config, method: "get", data: {} };
    }

    if (config.url && config.url.startsWith("/author")) {
      await handleAwait();
    }

    if (config.url && config.url.startsWith("/quote")) {
      await handleAwait();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
