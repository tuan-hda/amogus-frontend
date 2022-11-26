import axios from "axios";

const appApi = axios.create({
  baseURL: "https://amogus-guh.herokuapp.com/api",
});

export default appApi;
