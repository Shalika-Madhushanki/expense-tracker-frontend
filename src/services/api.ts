import axios, { AxiosRequestConfig } from "axios";
import { isTokenExpired } from "../utils/JwtUtils";

const API_BASE_URL = "https://localhost:8443/api";

const PUBLIC_ENDPOINTS = ["/auth/login", "/auth/signup"];

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const isPublicEndpoint = PUBLIC_ENDPOINTS.some((endpoint) =>
    config.url?.startsWith(endpoint),
  );
  const token = localStorage.getItem("token");
  if (!isPublicEndpoint && token) {
    if (!isTokenExpired(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      return Promise.reject({ message: "Token expired" });
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.status === 201 || response.status === 204) {
      return null;
    }
    return response.data;
  },
  (error) => {
    const errorMessage =
      error.response?.data?.errorMessage ||
      error.message ||
      "Something went wrong";
    console.error("API call failed:", errorMessage);
    return Promise.reject(new Error(errorMessage));
  },
);

export const apiCall = async (
  endpoint: string,
  method: string,
  body: any = null,
  customHeaders: Record<string, string> = {},
) => {
  const config: AxiosRequestConfig = {
    url: endpoint,
    method,
    headers: customHeaders,
  };
  if (body && method !== "GET" && method !== "HEAD") {
    config.data = body;
  }
  return api.request(config);
};
