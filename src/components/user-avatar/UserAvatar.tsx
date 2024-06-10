import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { serverSideFetcher } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type User = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

async function getUserInfo() {
  const response = await serverSideFetcher(
    "https://sp-taskify-api.vercel.app/5-3/users/me",
  );
  const data = await response?.json();
  return data;
}
function getFirstCharacter(str: string) {
  if (str.length > 0) {
    return str.charAt(0);
  } else {
    return "";
  }
}

export default async function UserAvatar({}) {
  const userData = await getUserInfo();
  const fallback = getFirstCharacter(userData.nickname);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="outline-none">
        <button className="flex gap-3 pl-6 items-center border-l border-[#d9d9d9]">
          <Avatar className="rounded">
            <AvatarImage src={userData.profileImgUrl} width={38} height={38} />
            <AvatarFallback className="bg-blue-400 text-white font-semibold">
              {fallback}
            </AvatarFallback>
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
