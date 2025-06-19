// hooks/useAuthGuard.ts
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "./useAuth";

export const useAuthGuard = (redirectPath: string = "/signin") => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      alert("로그인 후 이용이 가능합니다.");

      setTimeout(() => {
        router.push(redirectPath);
      }, 100);
    }
  }, [isLoading, isAuthenticated, router, redirectPath]);

  return { isAuthenticated, isLoading };
};
