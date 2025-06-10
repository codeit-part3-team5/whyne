"use client";

import { useEffect, useState } from "react";

import { cn } from "@/utils/cn";

import Spinner from "../Spinner";

const Header: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(false);
  useEffect(() => {
    setLoading(false);
    if (localStorage.getItem("accessToken") !== null) {
      setLogin(true);
    }
  }, []);
  return (
    <div
      className={cn(
        "bg-black w-full flex items-center",
        "md:h-[4.375rem] md:px-[3.75rem] md:py-[0.6875px] md:rounded-2xl",
        "h-[3.125rem] px-[1.25rem] py-[0.9375rem] rounded-xl"
      )}
    >
      <div className="w-full flex items-center justify-between">
        <img className="w-[3.25rem]" src="/images/logo.png" />
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
