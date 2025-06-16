"use client";

import { ChangeEvent, useState } from "react";

import { signIn } from "@/apis/authApi";

import Button from "../Button";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleClick = async () => {
    const res = await signIn(email, password);
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
  };

  const loginWithKakao = () => {
    if (typeof window.Kakao !== "undefined") {
      window.Kakao.Auth.authorize({
        redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/kakao`,
      });
    }
  };

  return (
    <div>
      <label htmlFor="email">email</label>
      <input
        name="email"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
        }}
      />
      <label htmlFor="password">password</label>
      <input
        name="password"
        type="password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={handleClick}>로그인</button>
      <Button size="xl" socialType="kakao" variant="social" onClick={loginWithKakao}>
        Kakao로 로그인
      </Button>
    </div>
  );
}
