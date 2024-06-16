import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";
import { CurrentPasswordInput } from "./CurrentPasswordInput";
import { NewPasswordInput } from "./NewPasswordInput";
import { ConfirmNewPasswordInput } from "./ConfirmNewPasswordInput";

export function TPasswordForm() {
  const { pending } = useFormStatus();

  return (
    <fieldset
      disabled={pending}
      className="flex max-w-[620px] flex-col gap-6 rounded-lg bg-white px-7 py-8 font-semibold text-[#333236]"
    >
      <h2 className="text-2xl">비밀번호 변경</h2>
      <div className="mt-2 flex flex-col gap-5">
        <CurrentPasswordInput />
        <NewPasswordInput />
        <ConfirmNewPasswordInput />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="h-8 w-20 bg-[#5534DA] hover:bg-[#5534DA]/80"
        >
          {pending ? <Loader2Icon className="size-5 animate-spin" /> : "변경"}
        </Button>
      </div>
    </fieldset>
  );
}
