import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
export const API_ORIGIN = new URL(API_BASE).origin;

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function assetUrl(path) {
  if (!path) return null;
  return `${API_ORIGIN}${path}`;
}

export default api;
