import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleAwait = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res("");
    }, 5000);
  });
};

axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.method === "post" && config.url === "/login") {
      const { email, password } = config.data;
      if (!email || !password) {
        throw new Error("Email and password are required");
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
