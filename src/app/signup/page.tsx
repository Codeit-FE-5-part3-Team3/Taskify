// app/signup/page.tsx
"use client";
import Link from 'next/link';
import Image from 'next/image';

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Checkbox } from '@/components/ui/checkbox';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { EmailInput } from '@/components/signupInput/EmailInput';
import { NicknameInput } from '@/components/signupInput/NicknameInput';
import { PasswordInput } from '@/components/signupInput/PasswordInput';
import { CheckPasswordInput } from '@/components/signupInput/CheckPasswordInput';

const FormSchema = z.object({
  email: z.string().email(),
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
        <form className="flex w-[520px] h-[50px] flex-col gap-6 rounded-lg bg-white px-7 py-8 font-bold text-gray-700 mx-auto">
          <div className="flex gap-4">
            <div className="flex grow flex-col gap-[16px]">
              <EmailInput />
              <NicknameInput />
              <PasswordInput />
              <CheckPasswordInput />
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
            <Button className="h-[50px] w-[520px] bg-violet-100 hover:bg-violet-100/80 text-[18px]">
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