"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { signInWithProvider } from "@/apis/authApi";
import useLogin from "@/components/Login/useLogin";
import Spinner from "@/components/Spinner";

const KakaoRedirectPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setToken, setImageUrl } = useLogin();

  useEffect(() => {
    const callApi = async () => {
      if (searchParams.has("code") && searchParams.get("code") !== null) {
        const code = searchParams.get("code")!;
        const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/kakao`;
        const res = await signInWithProvider("KAKAO", code, redirectUri);
        setToken(res.accessToken, res.refreshToken);
        setImageUrl(res.user.image);
        router.push("/");
      }
    };
    callApi();
  }, []);

  return (
    <div className="flex justify-center">
      <Spinner size={80} />
    </div>
  );
};

export default KakaoRedirectPage;
