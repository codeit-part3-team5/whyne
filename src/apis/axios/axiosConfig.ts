import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { jwtDecode } from "jwt-decode";

import useLogin from "@/components/Login/useLogin";

const TEAM_ID: string = "15-5";
const DEFAULT_CONFIG: CreateAxiosDefaults = {
  baseURL: `https://winereview-api.vercel.app/${TEAM_ID}`,
  timeout: 3000,
  validateStatus: (status: number) => {
    return status >= 200 && status < 300;
  },
  signal: new AbortController().signal,
};

const axiosClient: AxiosInstance = axios.create(DEFAULT_CONFIG);
const axiosAuthClient: AxiosInstance = axios.create(DEFAULT_CONFIG);

const getAuthValue = async (token: string | undefined | null): Promise<string> => {
  const accessToken = token ?? useLogin.getState().accessToken;
  let authValue = accessToken;
  if (authValue && authValue.trim() !== "") {
    const jwtToken = jwtDecode(authValue);
    if (jwtToken.exp !== undefined && jwtToken.exp < Date.now() / 1000) {
      const responseData = (
        await axiosClient.post<RefreshTokenApiResponse>("/auth/refresh-token", {
          refreshToken: useLogin.getState().refreshToken,
        })
      ).data;
      useLogin.setState({ accessToken: responseData.accessToken });
      authValue = responseData.accessToken;
    }
  }
  return `Bearer ${authValue}`;
};

axiosAuthClient.interceptors.request.use(async (config) => {
  config.headers.Authorization = await getAuthValue(null);
  return config;
});

export { axiosAuthClient, axiosClient };
