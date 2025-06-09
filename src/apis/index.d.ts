declare interface RefreshTokenApiResponse {
  accessToken: string;
}

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
declare interface MeApiResponse {
  id: number;
  nickname: string;
  teamId: string;
  createdAt: Date;
  updatedAt: Date;
  image: string | null;
}

declare type RefreshTokenApi = (refreshToken: string) => Promise<RefreshTokenApiResponse>;
declare type SignInApi = (email: string, password: string) => Promise<SignInApiResponse>;
declare type MeApi = () => Promise<MeApiResponse>;
