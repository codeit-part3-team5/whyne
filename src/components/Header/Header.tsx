"use client";

import { useEffect, useState } from "react";

import { cn } from "@/utils/cn";

import Spinner from "../Spinner";

const Header: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(false);
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("accessToken");
          setLogin(token !== null);
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error);
      } finally {
        setLoading(false);
      }
    };

    const DELAY_TO_SHOW_LOADING_STATE = 300;
    const timer = setTimeout(checkAuthStatus, DELAY_TO_SHOW_LOADING_STATE);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className={cn(
        "bg-black w-full flex items-center",
        "h-[4.375rem] px-[3.75rem] py-[0.6875px] rounded-2xl",
        "max-mb:h-[3.125rem] max-mb:px-[1.25rem] max-mb:py-[0.9375rem] rounded-xl"
      )}
    >
      <div className="w-full flex items-center justify-between">
        <img alt="logo image" className="w-[3.25rem]" src="/images/logo.png" />
        {loading ? (
          <Spinner className="border-white border-r-black" />
        ) : login ? (
          <div className="text-white">프로필</div>
        ) : (
          <div className="text-white">로그인</div>
        )}
      </div>
    </div>
  );
};

export default Header;
