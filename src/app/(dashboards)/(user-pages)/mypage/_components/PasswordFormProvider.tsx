"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordForm } from "./TPasswordForm";
import { change } from "./change";

const FormSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "8자 이상 입력해 주세요.",
    }),
    newPassword: z.string().min(8, {
      message: "8자 이상 입력해 주세요.",
    }),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type FormValues = z.infer<typeof FormSchema>;

export function PasswordFormProvider() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: FormValues) => {
    await change(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PasswordForm control={control} />
      </form>
    </Form>
  );
}
