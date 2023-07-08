import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4000/medgrizz/api/v1/",
  headers: {
    Authorization: `Bearer token`,
  },
});
//headers: {
//     'Content-Type': 'application/json'
// }
