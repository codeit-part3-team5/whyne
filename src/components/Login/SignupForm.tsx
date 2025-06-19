"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { signUp } from "@/apis/authApi";

import Button from "../Button";
import Input from "../input/Input";
import useLogin from "./useLogin";

interface FormInput {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$/;

const SignupForm: React.FC = () => {
  const {
    register,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormInput>({ mode: "all" });
  const password = watch("password");
  const router = useRouter();
  const { login, setToken } = useLogin();

  useEffect(() => {
    if (login()) {
      router.push("/");
    }
  }, []);

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const res = await signUp(
      data.email,
      data.nickname,
      data.password,
      data.passwordConfirmation,
      (message?: string) => {
        alert(message ?? "회원가입에 실패하였습니다.");
      }
    );
    setToken(res.accessToken, res.refreshToken);
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
          {...register("nickname", {
            required: "닉네임은 필수 입력입니다.",
            maxLength: {
              value: 20,
              message: "닉네임은 최대 20자까지 가능합니다.",
            },
          })}
          aria-invalid={errors.nickname ? "true" : "false"}
          error={errors.nickname?.message}
          label="닉네임"
        />
        <Input
          {...register("password", {
            required: "비밀번호는 필수 입력입니다.",
            minLength: {
              value: 8,
              message: "비밀번호 최소 8자 이상입니다.",
            },
            pattern: {
              value: PASSWORD_REGEX,
              message: "비밀번호는 숫자, 영문, 특수문자로만 가능합니다.",
            },
          })}
          aria-invalid={errors.password ? "true" : "false"}
          error={errors.password?.message}
          label="비밀번호"
          type="password"
        />
        <Input
          {...register("passwordConfirmation", {
            required: "비밀번호 확인을 입력해주세요.",
            validate: (value) => value === password || "비밀번호가 일치하지 않습니다.",
          })}
          aria-invalid={errors.passwordConfirmation ? "true" : "false"}
          error={errors.passwordConfirmation?.message}
          label="비밀번호 확인"
          type="password"
        />
        <Button
          className="w-full mt-[0.5rem]"
          disabled={isSubmitting}
          loading={isSubmitting}
          type="submit"
          variant="primary"
        >
          가입하기
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
