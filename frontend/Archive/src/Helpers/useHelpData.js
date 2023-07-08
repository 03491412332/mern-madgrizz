import { useQuery } from "react-query";
import apiClient from "../Utils/apiClient";
import { useCallback } from "react";

const useHelpData = (filters) => {
  const filterHelp = useCallback(
    (reports) => {
      //   console.log("filter question", reports);
      //   console.log("filter system_id", filters.system_id);
      //   console.log("filters obj", filters);
      if (!filters) return reports;
      let data;
      if (filters.date === "") {
        data = reports.data.helps.filter((r) => {
          console.log("single help", r);
          if (
            filters.title &&
            filters.system_id === "" &&
            filters.subject_id === "" &&
            filters.date === ""
          ) {
            return r.title === filters.title;
          }
          if (
            filters.title === "" &&
            filters.system_id &&
            filters.subject_id === ""
          ) {
            return r.question_id.system_id._id === filters.system_id;
          }
          if (
            filters.title === "" &&
            filters.system_id === "" &&
            filters.subject_id
          ) {
            return r.question_id.subject_id._id === filters.subject_id;
          }

          if (filters.title && filters.system_id && filters.subject_id === "") {
            return (
              r.question_id.system_id._id === filters.system_id &&
              r.title === filters.title
            );
          }
          if (filters.title && filters.system_id === "" && filters.subject_id) {
            return (
              r.question_id.subject_id._id === filters.subject_id &&
              r.title === filters.title
            );
          }
          if (filters.title === "" && filters.system_id && filters.subject_id) {
            return (
              r.question_id.subject_id._id === filters.subject_id &&
              r.question_id.system_id._id === filters.system_id
            );
          }
          if (filters.title && filters.system_id && filters.subject_id) {
            return (
              r.title === filters.title &&
              r.question_id.subject_id._id === filters.subject_id &&
              r.question_id.system_id._id === filters.system_id
            );
          }
          if (filters.resolved !== "") {
            if (filters.resolved === "resolved") {
              return r.resolved === true;
            } else {
              return r.resolved === false;
            }
          }
        });
      } else {
        data = reports.data.helps.reverse();
      }
      //   if (filters.resolved !== "") {
      //     data = reports.data.reports.filter((r) => {

      //     });
      //   }

      return {
        status: "success",
        data: {
          helps: [...data],
        },
      };
    },
    [filters]
  );
  return useQuery(
    ["questions", filters],
    async () => {
      const { data } = await apiClient.get("/help");
      console.log("use Help Data ", data);
      return data;
    },
    {
      select: filterHelp,
    }
  );
};

export default useHelpData;
