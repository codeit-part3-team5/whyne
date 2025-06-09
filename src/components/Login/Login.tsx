"use client";

import { ChangeEvent, useState } from "react";

import { signIn } from "@/apis/authApi";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleClick = async () => {
    const res = await signIn(email, password);
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
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
    </div>
  );
}
