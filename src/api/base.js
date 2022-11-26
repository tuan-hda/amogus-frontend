import axios from "axios";

const appApi = axios.create({
  baseURL: "http://localhost:4000/api",
});

export default appApi;
