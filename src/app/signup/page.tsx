// app/signup/page.tsx
"use client";
import Link from 'next/link';
import Image from 'next/image';

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Checkbox } from '@/components/ui/checkbox';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { z } from "zod";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import InputComponent from '@/components/Inputs/InputComponent';
import PasswordInputComponent from '@/components/Inputs/PasswordInput';

const FormSchema = z.object({
  email: z.string().email({ message: "이메일 형식으로 작성해 주세요." }),
  password: z
  .string()
  .min(8, { message: "8자리 이상 입력해 주세요." }),
  nickname: z.string().max(10, { message: "열 자 이하로 작성해 주세요." })
});

export type FormValues = z.infer<typeof FormSchema>;

type Props = {
  defaultValues: FormValues;
};

const SignupPage = ({ defaultValues }: Props) => {

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email,
      nickname,
      password,
    };

    try {
      const response = await fetch('https://sp-taskify-api.vercel.app/5-3/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify((data)),
      });

      if (response.ok) {
        router.push(`/login`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='mx-auto flex-col pt-[223px] text-center'>
        <Link href='/'>
          <div className='mx-auto my-0 inline-block justify-center'>
            <Image src={"/taskify-logo-with-letter.png"} alt='taskify' width={200} height={279} />
          </div>
        </Link>
        <h1 className='mt-[10px] text-lg text-[20px]'>첫 방문을 환영합니다!</h1>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="flex w-[520px] h-[50px] flex-col gap-6 rounded-lg bg-white px-7 py-8 font-bold text-gray-700 mx-auto">
          <div className="flex gap-4">
            <div className="flex grow flex-col gap-[16px]">
              <InputComponent
                label="이메일"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력해 주세요"
              />
              <InputComponent
                label="닉네임"
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력해 주세요"
              />
              <PasswordInputComponent
                label="비밀번호"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해 주세요"
              />
              <PasswordInputComponent
                label="비밀번호 확인"
                id="checkPassword"
                type="password"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
                placeholder="비밀번호를 한번 더 입력해 주세요"
              />
            </div>
          </div>
          <div className="items-top flex space-x-2">
            <Checkbox id="terms1" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-[16px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                이용약관에 동의합니다.
              </label>
            </div>
          </div>
          <div className="flex">
            <Button type="submit" className="h-[50px] w-[520px] bg-violet-100 hover:bg-violet-100/80 text-[18px]">
              가입하기
            </Button>
          </div>
          <p className="font-normal flex justify-center"> 이미 가입하셨나요?&nbsp;
            <Link href="/login" className="underline text-violet-100">
              로그인하기
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
};

export default SignupPage;