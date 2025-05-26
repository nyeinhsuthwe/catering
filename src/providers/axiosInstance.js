import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: "http://192.168.100.170:8000/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(

  async (config) => {
    console.log("config", config)
    try {
      const token = Cookies.get("authToken");
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
    console.log("[API Error]", error.message);

    if (error.response) {
      console.log("[Response Error Data]", error.response.data);
      console.log("[Status]", error.response.status);
    } else {
      console.log("[No response from server]");
    }

    return Promise.reject(error); 
  }
);

export default api;
