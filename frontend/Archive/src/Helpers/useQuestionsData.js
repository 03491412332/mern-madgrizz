import { useQuery } from "react-query";
import apiClient from "../Utils/apiClient";
import { useCallback } from "react";

const useQuestionData = (exam_id, filters) => {
  const filterQuestions = useCallback(
    (ques) => {
      console.log("filter question", ques);
      console.log("filter system_id", filters.system_id);
      console.log("filters obj", filters);
      if (!filters) return ques;
      let data;
      if (filters.date === "") {
        data = ques.data.questions.filter((q) => {
          if (
            filters.title &&
            filters.system_id === "" &&
            filters.subject_id === "" &&
            filters.date === ""
          ) {
            return q.title === filters.title;
          }
          if (
            filters.title === "" &&
            filters.system_id &&
            filters.subject_id === ""
          ) {
            return q.system_id === filters.system_id;
          }
          if (
            filters.title === "" &&
            filters.system_id === "" &&
            filters.subject_id
          ) {
            return q.subject_id === filters.subject_id;
          }

          if (filters.title && filters.system_id && filters.subject_id === "") {
            return (
              q.system_id === filters.system_id && q.title === filters.title
            );
          }
          if (filters.title && filters.system_id === "" && filters.subject_id) {
            return (
              q.subject_id === filters.subject_id && q.title === filters.title
            );
          }
          if (filters.title === "" && filters.system_id && filters.subject_id) {
            return (
              q.subject_id === filters.subject_id &&
              q.system_id === filters.system_id
            );
          }
          if (filters.title && filters.system_id && filters.subject_id) {
            return (
              q.title === filters.title &&
              q.subject_id === filters.subject_id &&
              q.system_id === filters.system_id
            );
          }
        });
      } else {
        data = ques.data.questions.reverse();
      }

      return {
        status: "success",
        data: {
          questions: [...data],
        },
      };
      console.log("filtered data", data);
    },
    [filters]
  );
  return useQuery(
    ["questions", filters],
    async () => {
      const { data } = await apiClient.get(`questions/${exam_id}`);
      console.log("useQuestionData", data);
      return data;
    },
    {
      refetchOnWindowFocus: false,
      select: filterQuestions,
    }
  );
};

export default useQuestionData;
