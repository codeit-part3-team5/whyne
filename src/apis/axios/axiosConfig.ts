import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { jwtDecode } from "jwt-decode";

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
  let authValue = token ?? localStorage.getItem("accessToken");
  if (authValue !== null) {
    const jwtToken = jwtDecode(authValue);
    if (jwtToken.exp !== undefined && jwtToken.exp < Date.now() / 1000) {
      const responseData = (
        await axiosClient.post<RefreshTokenApiResponse>("/auth/refresh-token", {
          refreshToken: localStorage.getItem("refreshToken"),
        })
      ).data;
      authValue = responseData.accessToken;
    }
  }
  return `Bearer ${authValue}`;
};

axiosAuthClient.interceptors.request.use(async (config) => {
  const token = await getAuthValue(null);
  config.headers.Authorization = token;
  console.log("[Auth] 요청 헤더:", {
    Authorization: token ? `${token.substring(0, 15)}...` : "없음", // 토큰 일부만 로깅
    url: config.url,
    method: config.method,
  });
  return config;
});

export { axiosAuthClient, axiosClient };
