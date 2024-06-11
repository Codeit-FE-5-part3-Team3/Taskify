"use client";

import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const formSchema = z.object({
  title: z.string().min(1),
});

export function AddColumnButton({ dashboardId }: { dashboardId: number }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const newBody = { title: data.title, dashboardId: Number(dashboardId) };
    const response = await fetch("/api/columns", {
      method: "POST",
      body: JSON.stringify({
        ...newBody,
      }),
    });

    const d = await response.json();
    if (response.ok) {
      console.log(JSON.stringify(d));
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="flex justify-center gap-3 px-6 py-7 bg-white border-[#5534DA]"
        >
          <span className="text-lg">새로운 컬럼 추가하기</span>
          <Image
            src="/add_box_large.svg"
            alt="add_box"
            width={22}
            height={22}
          />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <span className="text-2xl font-bold">새 컬럼 생성</span>
              </AlertDialogTitle>
            </AlertDialogHeader>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-4 mb-7">
                  <FormLabel className="text-lg font-medium">이름</FormLabel>
                  <FormControl>
                    <input
                      placeholder="새로운 프로젝트"
                      {...field}
                      className="px-4 py-3.5 outline-none border border-[#d9d9d9] rounded-lg"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel className="px-[46px] py-3.5 border rounded-lg border-[#d9d9d9]">
                취소
              </AlertDialogCancel>
              <AlertDialogAction
                type="submit"
                disabled={!form.formState.isValid}
                className="bg-[#5534da] text-white px-[46px] py-3.5 rounded-lg hover:bg-[#4524ca]"
              >
                생성
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
