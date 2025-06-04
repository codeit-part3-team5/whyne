import { axiosClient } from "./axios/axiosConfig";

export const signIn: SignInApi = async (email, password) => {
	const res = await axiosClient.post<SignInApiResponse>("/auth/signIn", { email, password });
	return res.data;
};
