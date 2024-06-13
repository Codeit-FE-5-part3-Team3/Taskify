import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { serverSideFetcher } from "@/lib/utils";
import { cn } from "@/lib/utils";
import CustomAvatar from "../custom-avatar/CustomAvatar";
import { Avatar } from "@/components/ui/avatar";

async function getUserInfo() {
  const response = await serverSideFetcher(
    "https://sp-taskify-api.vercel.app/5-3/users/me",
  );
  const data = await response?.json();
  return data;
}

export default async function UserAvatar({}) {
  const userData = await getUserInfo();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="outline-none">
        <button className="flex gap-3 pl-6 items-center border-l border-[#d9d9d9]">
          <Avatar>
            <CustomAvatar
              imgUrl={userData.profileImageUrl}
              nickname={userData.nickname}
              userId={userData.id}
              size={38}
            />
          </Avatar>
          <span className="font-medium">{userData.nickname}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>계정</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={cn("focus:bg-[#f1effd] focus:text-[#5534da]")}
        >
          마이페이지
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(" focus:bg-[#f1effd] focus:text-[#5534da]")}
        >
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
