import apiClient from "./apiClient";
import { useMutation } from "react-query";

const usePostMutation = () => {
  return useMutation(({ method, url, values, head }) => {
    if (method === "patch") {
      console.log("from ...    ...... ", method, values);
      return apiClient.patch(url, values, head);
    }
    if (method === "delete") {
      return apiClient.delete(url);
    }
    return apiClient.post(url, values, head);
  });
};

export default usePostMutation;
