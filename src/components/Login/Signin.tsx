"use client";

import Button from "../Button";
import SigninForm from "./SigninForm";

export default function Login() {
  const loginWithKakao = () => {
    if (typeof window.Kakao !== "undefined") {
      window.Kakao.Auth.authorize({
        redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/kakao`,
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white border border-solid border-gray300 px-[3rem] py-[5rem] rounded-2xl">
        <div className="w-[25rem] flex flex-col items-center">
          <img alt="logo-image" className="w-[6.5rem]" src="/images/logo-2x.png" />
          <SigninForm />
          <Button
            className="w-full mt-[0.5rem] border border-solid border-gray300"
            size="xl"
            socialType="kakao"
            variant="social"
            onClick={loginWithKakao}
          >
            Kakao로 로그인
          </Button>
          <div className="mt-[2rem] text-gray500">
            계정이 없으신가요?{" "}
            <a className="text-purple underline font-medium" href="/signup">
              회원가입하기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
