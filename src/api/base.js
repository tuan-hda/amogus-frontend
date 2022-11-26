import axios from "axios";

const appApi = axios.create({
  baseURL: "localhost:3000/api",
});

export default appApi;
