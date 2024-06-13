import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function NicknameInput() {
  return (
    <FormField
      name="name"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="text-lg">닉네임</FormLabel>
            <FormControl>
              <Input {...field} placeholder="닉네임을 입력해 주세요" className="text-[16px] h-12 font-normal focus:border-violet-100 focus:border-[1px] focus:border-solid" />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}