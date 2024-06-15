// app/login/page.tsx
"use client";
import Link from 'next/link';
import Image from 'next/image';

import { signIn } from "next-auth/react";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import InputComponent from '@/components/Inputs/InputComponent';
import PasswordInputComponent from '@/components/Inputs/PasswordInput';

const FormSchema = z.object({
  email: z.string().email({ message: "이메일 형식으로 작성해 주세요." }),
  password: z
  .string()
  .min(8, { message: "8자리 이상 입력해 주세요." })
});

export type FormValues = z.infer<typeof FormSchema>;

type Props = {
  defaultValues: FormValues;
};

const LoginPage = ({ defaultValues }: Props) => {

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/");
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
        <h1 className='mt-[10px] text-lg text-[20px]'>오늘도 만나서 반가워요!</h1>
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
              <PasswordInputComponent
                label="비밀번호"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해 주세요"
              />
            </div>
          </div>
          {error && <p>{error}</p>}
          <div className="flex">
            <Button type="submit" className="h-[50px] w-[520px] bg-violet-100 hover:bg-violet-100/80 text-[18px]">
              로그인
            </Button>
          </div>
          <p className="font-normal flex justify-center"> 회원이 아니신가요?&nbsp;
            <Link href="/signup" className="underline text-violet-100">
              회원가입하기
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
};

export default LoginPage;
