import axios from "axios";
const token = localStorage.getItem("token");
console.log("token from api client", token);
// export default
// const apiClient = axios.create({
//   baseURL: "http://localhost:4000/medgrizz/api/v1/",
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });
//axios.defaults.withCredentials = true;
const apiClient = axios.create({
  baseURL: "https://medgrizz-backend.vercel.app/medgrizz/api/v1/",
  withCredentials: false,
  headers: {
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
  },
});
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Access-Control-Allow-Origin"] = "*";
    }
    // console.log("request config", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
apiClient.interceptors.response.use(
  (response) => {
    console.log("response in api client", response);
    if (response.config.parse) {
      console.log("response in api client", response);
      //perform the manipulation here and change the response object
    }
    return response;
  },
  (error) => {
    return Promise.reject(error.message);
  }
);

export default apiClient;
