import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { PasswordForm } from "./_components/PasswordForm";
import { ProfileFormData } from "./_components/ProfileFormData";

export default function MyDashboardPage() {
  return (
    <main className="h-dvh w-full bg-[#FAFAFA] p-5">
      <Button className="gap-1 px-0 pr-1 text-base" variant="ghost">
        <ChevronLeftIcon className="size-6 stroke-[1.5]" />
        돌아가기
      </Button>
      <div className="mt-6 flex flex-col gap-3">
        <ProfileFormData />
        <PasswordForm />
      </div>
    </main>
  );
}
