import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

const TEAM_ID: string = "15-5";
const DEFAULT_CONFIG: CreateAxiosDefaults = {
  baseURL: `https://winereview-api.vercel.app/${TEAM_ID}`,
  timeout: 3000,
  validateStatus: (status: number) => {
    return status >= 200 && status < 300;
  },
  signal: new AbortController().signal,
};

const getAuthValue = (token: string | undefined | null): string => {
  const authValue = token ?? localStorage.getItem("accessToken");
  return `Bearer ${authValue}`;
};

const axiosAuthClient: AxiosInstance = axios.create(DEFAULT_CONFIG);
axiosAuthClient.interceptors.request.use((config) => {
  config.headers.Authorization = getAuthValue(null);
  return config;
});

const axiosClient: AxiosInstance = axios.create(DEFAULT_CONFIG);

export { axiosAuthClient, axiosClient };
