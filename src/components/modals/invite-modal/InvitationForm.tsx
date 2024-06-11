"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import {
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const FormSchema = z.object({
  email: z.string().email(),
});

export function InvitationForm({ dashboardId }: { dashboardId: number }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await fetch("/api/dashboards/invitations", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        dashboardId: Number(dashboardId),
      }),
    });

    const d = await response.json();

    console.log(d);
  }

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>초대하기</AlertDialogTitle>
      </AlertDialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2.5 flex flex-col relative mt-4">
                <label htmlFor="dashboard-name">이메일</label>
                <FormControl>
                  <input
                    id="dashboard-name"
                    placeholder="example@email.com"
                    {...field}
                    className="px-4 py-3.5 outline-none border border-[#d9d9d9] rounded-lg grow"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <button className="px-[46px] py-3.5 border rounded-lg border-[#d9d9d9]">
                취소
              </button>
            </AlertDialogCancel>

            <AlertDialogAction
              type="submit"
              className="bg-[#5534da] text-white px-[46px] py-3.5 rounded-lg hover:bg-[#4524ca]"
              disabled={!form.formState.isValid}
            >
              초대
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </Form>
    </>
  );
}
