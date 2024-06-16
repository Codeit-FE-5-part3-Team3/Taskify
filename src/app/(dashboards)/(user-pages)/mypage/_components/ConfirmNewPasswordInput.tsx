import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";

export function ConfirmNewPasswordInput() {
  return (
    <FormItem className="relative">
      <FormLabel className="text-lg">새 비밀번호 확인</FormLabel>
      <FormControl>
        <PasswordInput
          placeholder="새 비밀번호 입력"
          className="text-md h-12 font-normal placeholder:opacity-50"
        />
      </FormControl>
    </FormItem>
  );
}
