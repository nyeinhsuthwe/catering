import { useQuery } from "@tanstack/react-query";
import api from "../providers/axiosInstance";

export const useApiQuery = ({ endpoint, params, queryKey }, options) => {
  return useQuery({
    queryKey: queryKey ?? [endpoint, params],
    queryFn: async () => {
  const res = await api.get(endpoint, { params });
  const responseData = res.data;

  // Fallback if res.data.data doesn't exist
  return responseData?.data ?? responseData;
},

    ...options,
  });
};
