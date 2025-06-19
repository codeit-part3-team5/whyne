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
declare interface SigningApiResponse {
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

type ProviderType = "KAKAO" | "GOOGLE" | "NAVER";
type CallbackFunction = (...args: any[]) => void;

declare type RefreshTokenApi = (refreshToken: string) => Promise<RefreshTokenApiResponse>;
declare type SignInApi = (
  email: string,
  password: string,
  callback?: CallbackFunction
) => Promise<SigningApiResponse>;
declare type signInWithProviderApi = (
  provider: ProviderType,
  token: string,
  redirectUri?: string,
  state?: string
) => Promise<SigningApiResponse>;
declare type SignUpApi = (
  email: string,
  nickname: string,
  password: string,
  passwordConfirmation: string,
  callback?: CallbackFunction
) => Promise<SigningApiResponse>;
declare type MeApi = () => Promise<MeApiResponse>;
