import { useQuery } from "react-query";
import apiClient from "../Utils/apiClient";
import { useCallback } from "react";

const useHelpData = (filters) => {
  const filterHelp = useCallback(
    (helps) => {
      console.log("filter helps", helps);
      //   console.log("filter system_id", filters.system_id);
      //console.log("filters obj", filters);
      if (!filters) return helps;
      let data;
      if (filters.title !== "" || filters.resolved !== "") {
        data = helps.data.helps.filter((r) => {
          console.log("single help", r);
          if (filters.title) {
            return r.title === filters.title;
          }
          if (filters.resolved !== "") {
            if (filters.resolved === "resolved") {
              return r.resolved === true;
            } else {
              return r.resolved === false;
            }
          }
        });
      }
      if (filters.resolved !== "") {
      }
      if (filters.date !== "") {
        if (filters.date === "Old-to-new") {
          data = helps.data.helps.reverse();
        } else {
          data = helps.data.helps;
        }
      }

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
    ["helps", filters],
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
