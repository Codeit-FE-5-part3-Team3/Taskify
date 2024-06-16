import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";

export function CurrentPasswordInput() {
  return (
    <FormItem className="relative">
      <FormLabel className="text-lg">현재 비밀번호</FormLabel>
      <FormControl>
        <PasswordInput
          placeholder="현재 비밀번호 입력"
          className=" text-md h-12 font-normal placeholder:opacity-50"
        />
      </FormControl>
    </FormItem>
  );
}
