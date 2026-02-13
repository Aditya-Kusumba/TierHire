import axios from "axios";

const api = axios.create({
  baseURL: "https://tierhire.onrender.com",
  withCredentials: true,
});

export default api;
