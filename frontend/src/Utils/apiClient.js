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
  baseURL: "https://medgrizz-project-api.vercel.app/medgrizz/api/v1/",
  headers: {
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "https://medgrizz-project-api.vercel.app"
  },
 
});
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      
    }
    // console.log("request config", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
