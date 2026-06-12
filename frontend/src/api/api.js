import axios from "axios";

const api = axios.create({
    // Use relative path in production, environment variable in development
    baseURL: import.meta.env.MODE === "production" ? "/api" : import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
});

export default api;