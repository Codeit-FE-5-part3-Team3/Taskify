"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import revalidate from "@/util/revalidate";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TagsInput } from "react-tag-input-component";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import {
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { useRef } from "react";

type CardCreateFormProps = {
  dashboardId: number;
  columnId: number;
};

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string()).optional(),
  dueDate: z.date().optional(),
  imageUrl: z.string().optional(),
});

export function CardCreateForm({ dashboardId, columnId }: CardCreateFormProps) {
  const [date, setDate] = React.useState<Date | undefined>();
  const [image, setImage] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: [],
      imageUrl: undefined,
    },
  });
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile);
    }
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", data.title);
    formData.append("description", data.description);

    console.log("Original date:", date);

    const dueDateString = date
      ? `${format(date, "yyyy-MM-dd", { locale: ko })} 00:00`
      : undefined;

    console.log("Due date string:", dueDateString);

    if (dueDateString) {
      formData.append("dueDate", dueDateString);
    } else {
      console.log("Due date is undefined or null");
    }

    // if (dueDateString) {
    //   formData.append("dueDate", dueDateString);
    // }

    if (data.tags) {
      formData.append("tags", JSON.stringify(data.tags));
    }

    formData.append("dashboardId", dashboardId.toString());
    formData.append("columnId", columnId.toString());

    const response = await fetch("/api/cards/image", {
      method: "POST",
      body: formData,
    });

    const imgData = await response.json();

    const reqBody = {
      dashboardId: Number(dashboardId),
      columnId: Number(columnId),
      title: data.title,
      description: data.description,
      dueDate: dueDateString,
      tags: data.tags,
      imageUrl: imgData.imageUrl,
    };

    const response2 = await fetch("/api/cards", {
      method: "POST",
      body: JSON.stringify(reqBody),
    });

    const d = await response2.json();
    if (response2.ok) {
      revalidate();
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-4 mb-7">
                <FormLabel className="text-lg font-medium">담당자</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="px-4 py-3.5 outline-none border border-[#d9d9d9] rounded-lg"
                  >
                    <option disabled hidden selected>
                      플레이스홀더
                    </option>
                    <option value="옵션1">옵션1</option>
                    <option value="옵션2">옵션2</option>
                  </select>
                </FormControl>
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-4 mb-7">
                <FormLabel className="text-lg font-medium">제목 *</FormLabel>
                <FormControl>
                  <input
                    placeholder="제목을 입력해주세요"
                    {...field}
                    className="px-4 py-3.5 outline-none border border-[#d9d9d9] rounded-lg"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-4 mb-7">
                <FormLabel className="text-lg font-medium">설명 *</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="설명을 입력해주세요"
                    {...field}
                    className="px-4 py-3.5 outline-none border border-[#d9d9d9] rounded-lg"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-4 mb-7">
                <FormLabel className="text-lg font-medium">마감일</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "PPP", { locale: ko })
                      ) : (
                        <span>날짜를 입력해주세요</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate || undefined);
                      }}
                      initialFocus
                      locale={ko}
                      {...field}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-4 mb-7">
                <FormLabel className="text-lg font-medium">태그</FormLabel>
                <FormControl>
                  <TagsInput
                    value={field.value}
                    onChange={field.onChange}
                    name="tags"
                    placeHolder="입력 후 Enter"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* <FormItem className="flex flex-col mt-4 mb-7">
            <FormLabel className="text-lg font-medium">이미지</FormLabel>
            <Input type="file" onChange={handleFileChange} />
          </FormItem> */}

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => {
              const imageUrl = field.value || "/add_box_large.svg";
              return (
                <FormItem className="flex flex-col mt-4 mb-7">
                  <FormLabel className="text-lg font-medium">이미지</FormLabel>
                  <FormControl>
                    <div
                      role="button"
                      className="group relative aspect-square size-[76px] min-w-[76px] cursor-pointer overflow-hidden rounded-md"
                      onClick={() => {
                        fileRef.current?.click();
                      }}
                    >
                      <Image
                        className="size-full object-cover"
                        src={imageUrl}
                        unoptimized
                        alt="Profile"
                        width={76}
                        height={76}
                      />
                      <div className="absolute inset-0 hidden size-full bg-black/20 group-hover:block" />
                      <Input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileRef}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              );
            }}
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
    </>
  );
}
