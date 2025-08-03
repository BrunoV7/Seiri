import axios from "axios";
import Cookies from "js-cookie";

const publicUrls = ["/api/v1/auth/login", "/api/v1/auth/register"];

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

// Interceptor opcional para client-side
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const isPublic = publicUrls.some((path) => config.url?.startsWith(path));
    const token = Cookies.get("token");
    
    if (!isPublic && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;