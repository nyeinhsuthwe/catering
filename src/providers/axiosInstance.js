import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const api = axios.create({
  baseURL: "http://192.168.100.192:8000/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = Cookies.get("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      console.log("[Request]", config.method?.toUpperCase(), config.url);
      if (config.data) {
        console.log("[Payload]", config.data);
      }
    } catch (error) {
      console.log("[Request Interceptor Error]", error);
    }

    return config;
  },
  (error) => {
    console.log("[Request Setup Error]", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 404:
          toast.error("Resource not found");
          break;
        case 401:
          toast.error("Unauthorized, please login again");
          // window.location.href = "/login";
          // Cookies.remove("authToken");
          break;
        case 403:
          toast.error("Forbidden, you do not have permission to access this resource");
          break;
        case 500:
          toast.error("Server error, please try again later");
          break;
      }
    } else {
      console.log("Server Error");
    }

    return Promise.reject(error);
  }
);

export default api;
