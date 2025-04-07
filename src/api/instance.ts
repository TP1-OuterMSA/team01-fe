import axios from "axios";

export const api_instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 2000,
});
