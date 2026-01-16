import axios from "axios";

const api = axios.create({
  baseURL: "https://api.caredesk360.com",
  withCredentials: true, // 🔥 sends cookie automatically
});

export default api;
