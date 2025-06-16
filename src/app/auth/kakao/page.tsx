"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { signInWithProvider } from "@/apis/authApi";
import Spinner from "@/components/Spinner";

const KakaoRedirectPage = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const callApi = async () => {
      if (searchParams.has("code") && searchParams.get("code") !== null) {
        const code = searchParams.get("code")!;
        const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/kakao`;
        const res = await signInWithProvider("KAKAO", code, redirectUri);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
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
