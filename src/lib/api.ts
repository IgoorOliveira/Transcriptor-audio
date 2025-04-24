import axios from "axios";
import { getToken } from "../utils";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

const token = getToken();
if (token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}
