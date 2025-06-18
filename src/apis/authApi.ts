import { axiosClient } from "./axios/axiosConfig";

export const signIn: SignInApi = async (email, password, callback = undefined) => {
  try {
    const res = await axiosClient.post<SigningApiResponse>("/auth/signIn", { email, password });
    return res.data;
  } catch (error) {
    if (callback !== undefined) {
      callback();
    }
    throw error;
  }
};

export const signUp: SignUpApi = async (
  email,
  nickname,
  password,
  passwordConfirmation,
  callback = undefined
) => {
  try {
    const res = await axiosClient.post<SigningApiResponse>("/auth/signUp", {
      email,
      nickname,
      password,
      passwordConfirmation,
    });
    return res.data;
  } catch (error) {
    if (callback !== undefined) {
      callback();
    }
    throw error;
  }
};

export const signInWithProvider: signInWithProviderApi = async (
  provider,
  token,
  redirectUri = undefined,
  state = undefined
) => {
  const res = await axiosClient.post<SigningApiResponse>(`/auth/signIn/${provider}`, {
    token,
    redirectUri,
    state,
  });
  return res.data;
};
