// hooks/useMutation.js
import { useMutation } from "@tanstack/react-query";
import api from "../providers/axiosInstance";

export const useApiMutation = (options) => {
  return useMutation({
    mutationFn: async ({ endpoint, method, body, formdata }) => {
      const res = await api.request({
        url: endpoint,
        method,
        data: body ?? formdata ,
        headers: {
          "Content-Type": formdata ? "multipart/form-data" : "application/json",
          ...options?.headers,
        },
      });

      return res;
    },
    ...options,
  });
};
