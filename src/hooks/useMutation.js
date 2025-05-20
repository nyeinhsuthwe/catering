// hooks/useMutation.js
import { useMutation } from "@tanstack/react-query";
import api from "../providers/axiosInstance";

export const useApiMutation = (options) => {
  return useMutation({
    mutationFn: async ({ endpoint, method, body }) => {
      const res = await api.request({
        url: endpoint,
        method,
        data: body,
        // headers: formdata
        //   ? { "Content-Type": "multipart/form-data" }
        //   : undefined,
      });

      return res;
    },
    ...options,
  });
};
