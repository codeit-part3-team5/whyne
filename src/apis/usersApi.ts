import { axiosAuthClient } from "./axios/axiosConfig";

export const me: MeApi = async () => {
  const res = await axiosAuthClient.get<MeApiResponse>("/users/me");
  return res.data;
};
