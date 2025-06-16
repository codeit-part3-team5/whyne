import { axiosClient } from "./axios/axiosConfig";

export const signIn: SignInApi = async (email, password) => {
  const res = await axiosClient.post<SigningApiResponse>("/auth/signIn", { email, password });
  return res.data;
};

export const signUp: SignUpApi = async (email, nickname, password, passwordConfirmation) => {
  const res = await axiosClient.post<SigningApiResponse>("/auth/signUp", {
    email,
    nickname,
    password,
    passwordConfirmation,
  });
  return res.data;
};

export const signInWithProvider: signInWithProviderApi = async (
  provider,
  token,
  redirectUri,
  state
) => {
  const res = await axiosClient.post<SigningApiResponse>(`/auth/signIn/${provider}`, {
    token,
    redirectUri,
    state,
  });
  return res.data;
};
