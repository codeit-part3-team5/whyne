import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuth = (redirectOnFail: boolean = true) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  // 인증 확인 중인지 여부
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const loginStatus = !!token;

    setIsLogin(loginStatus);
    setIsCheckingAuth(false);

    if (!loginStatus && redirectOnFail) {
      alert("로그인 후 이용이 가능합니다.");
      router.push("/signin");
    }
  }, [router, redirectOnFail]);

  return { isLogin, isCheckingAuth };
};
