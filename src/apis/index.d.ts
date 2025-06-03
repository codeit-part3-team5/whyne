declare interface UserResponse {
	id: number;
	nickname: string;
	teamId: string;
	createdAt: Date;
	updatedAt: Date;
	image: string | null;
	email: string;
}
declare interface SignInApiResponse {
	user: UserResponse;
	accessToken: string;
	refreshToken: string;
}

declare type SignInApi = (email: string, password: string) => Primise<SignInApiResponse>;
