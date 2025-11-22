import axios from "axios";

const baseURL =
  (process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "") // enlève le slash final si présent
    : "http://127.0.0.1:8000") + "/api/"; // fallback local

const api = axios.create({
  baseURL,
});

export default api;

