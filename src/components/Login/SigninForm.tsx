"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { signIn } from "@/apis/authApi";

import Button from "../Button";
import Input from "../input/Input";

interface LoginFormInput {
  email: string;
  password: string;
}
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const SigninForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    setError,
    handleSubmit,
  } = useForm<LoginFormInput>({ mode: "all" });
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    const res = await signIn(data.email, data.password, () =>
      setError("email", { type: "custom", message: "이메일 혹은 비밀번호를 확인해주세요." })
    );
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    router.push("/");
  };

  return (
    <div className="w-full mt-[4rem]">
      <form className="flex flex-col gap-[1.5rem]" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email", {
            required: "이메일은 필수 입력입니다.",
            pattern: {
              value: EMAIL_REGEX,
              message: "이메일 형식으로 작성해 주세요.",
            },
          })}
          aria-invalid={errors.email ? "true" : "false"}
          error={errors.email?.message}
          label="이메일"
        />
        <Input
          {...register("password", {
            required: "비밀번호는 필수 입력입니다.",
          })}
          aria-invalid={errors.password ? "true" : "false"}
          error={errors.password?.message}
          label="비밀번호"
          type="password"
        />
        <Button
          className="w-full mt-[2rem]"
          disabled={isSubmitting}
          loading={isSubmitting}
          type="submit"
          variant="primary"
        >
          로그인
        </Button>
      </form>
    </div>
  );
};

export default SigninForm;
