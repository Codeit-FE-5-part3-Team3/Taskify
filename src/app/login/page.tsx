// app/login/page.tsx
"use client";
import Link from 'next/link';
import Image from 'next/image';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { EmailInput } from "@/components/loginInput/EmailInput";
import { PasswordInput } from '@/components/loginInput/PasswordInput';

const FormSchema = z.object({
  email: z.string().email(),
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
        <form className="flex w-[520px] h-[50px] flex-col gap-6 rounded-lg bg-white px-7 py-8 font-bold text-gray-700 mx-auto">
          <div className="flex gap-4">
            <div className="flex grow flex-col gap-[16px]">
              <EmailInput />
              <PasswordInput />
            </div>
          </div>
          <div className="flex">
            <Button className="h-[50px] w-[520px] bg-violet-100 hover:bg-violet-100/80 text-[18px]">
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
    /*
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
    */
  );
};

export default LoginPage;
