"use client";

import Image from "next/image";
import { UploadIcon } from "lucide-react";
import { Control, useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { FormValues } from "./ProfileFormProvider";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  control: Control<FormValues>;
};

export function ImageTest({ control }: Props) {
  const { setValue } = useFormContext<FormValues>();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    setValue("profileURL", url);
  };

  return (
    <>
      <Avatar className="w-24 h-24">
        <AvatarImage src={preview} />
        <AvatarFallback>BU</AvatarFallback>
      </Avatar>
      <FormField
        control={control}
        name="profileURL"
        render={({ field }) => (
          <>
            <FormItem>
              <FormLabel>프로필</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  {...rest}
                  onChange={(event) => {
                    const { files, displayUrl } = getImageData(event);
                    setPreview(displayUrl);
                    onChange(files);
                  }}
                />
              </FormControl>
              {/* <Input
            ref={fileRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            /> */}
            </FormItem>
          </>
        )}
      />
    </>
  );
}
