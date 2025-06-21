"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { me } from "@/apis/usersApi";
import { cn } from "@/utils/cn";

import useLogin from "../Login/useLogin";
import ProfileCircle from "../profile/ProfileCircle";
import Spinner from "../Spinner";
import ProfileDropDown from "./ProfileDropDown";

const Header: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { accessToken } = useLogin();
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthStatus = () => {
      setLoading(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    const DELAY_TO_SHOW_LOADING_STATE = 300;
    const timer = setTimeout(checkAuthStatus, DELAY_TO_SHOW_LOADING_STATE);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchUserImage = async () => {
      if (accessToken) {
        try {
          const user = await me();
          if (user && user.image) {
            setImgSrc(user.image);
          }
        } catch (error) {
          console.log("사용자 정보를 가져오는 중 오류 발생:", error);
          setImgSrc(null);
        }
      }
    };
    fetchUserImage();
  }, [accessToken]);

  return (
    <div
      className={cn(
        "bg-black w-full flex items-center",
        "h-[4.375rem] px-[3.75rem] py-[0.6875px] rounded-2xl",
        "max-mb:h-[3.125rem] max-mb:px-[1.25rem] max-mb:py-[0.9375rem] rounded-xl"
      )}
    >
      <div className="w-full flex items-center justify-between">
        <Link href="/">
          <img
            alt="logo image"
            className="w-[3.25rem] select-none pointer-events-none"
            src="/images/logo.png"
          />
        </Link>
        {loading ? (
          <Spinner className="border-white border-r-black" />
        ) : accessToken !== undefined ? (
          <div className="max-mb:flex max-mb:w-[1.25rem]">
            <div
              aria-expanded={isOpen}
              aria-haspopup="true"
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={() => setIsOpen((prev) => !prev)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsOpen((prev) => !prev);
                }
              }}
            >
              <ProfileCircle imageUrl={imgSrc} size="mobile" />
            </div>
            <div ref={containerRef} aria-expanded={isOpen} className="relative">
              {isOpen && <ProfileDropDown />}
            </div>
          </div>
        ) : (
          <div className="flex gap-[2.5rem]">
            <Link className="text-white" href="/signin">
              로그인
            </Link>
            <Link className="text-white" href="/signup">
              회원가입
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
