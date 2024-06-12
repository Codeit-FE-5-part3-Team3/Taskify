import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function CheckPasswordInput() {
  return (
    <FormField
      name="name"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="text-lg">비밀번호 확인</FormLabel>
            <FormControl>
              <Input {...field} placeholder="비밀번호를 한번 더 입력해 주세요" className="text-[16px] h-12 font-normal focus:border-violet-100 focus:border-[1px] focus:border-solid" />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}