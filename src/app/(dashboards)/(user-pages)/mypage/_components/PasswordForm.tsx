"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
  newPasswordConfirmation: z.string(),
});

type FormValues = z.infer<typeof FormSchema>;

export function PasswordForm() {
  const form = useForm<FormValues>();

  return (
    <Form {...form}>
      <form className="flex max-w-[620px] flex-col gap-6 rounded-lg bg-white px-7 py-8 font-semibold text-[#333236]">
        <h2 className="text-2xl">비밀번호 변경</h2>
        <div className="mt-2 flex flex-col gap-5">
          <FormItem>
            <FormLabel className="text-lg">현재 비밀번호</FormLabel>
            <FormControl>
              <Input
                className="text-md h-12 font-normal placeholder:opacity-50"
                placeholder="현재 비밀번호 입력"
              />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel className="text-lg">새 비밀번호</FormLabel>
            <FormControl>
              <Input
                className="text-md h-12 font-normal placeholder:opacity-50"
                placeholder="새 비밀번호 입력"
              />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel className="text-lg">새 비밀번호 확인</FormLabel>
            <FormControl>
              <Input
                className="text-md h-12 font-normal placeholder:opacity-50"
                placeholder="새 비밀번호 입력"
              />
            </FormControl>
          </FormItem>
        </div>
        <div className="flex justify-end">
          <Button className="h-8 w-20 bg-[#5534DA] hover:bg-[#5534DA]/80">
            변경
          </Button>
        </div>
      </form>
    </Form>
  );
}
