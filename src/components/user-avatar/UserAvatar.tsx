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

const getBackgroundClass = (userId: number) => {
  const classes = [
    "bg-[#ffc85a]",
    "bg-[#fdd446]",
    "bg-[#9dd7ed]",
    "bg-[#c4b1a2]",
    "bg-[#a3c4a2]",
    "bg-[#034694]",
    "bg-[#e876ea]",
    "bg-[#000]",
    "bg-[#c3102b]",
    "bg-[#7AC555]",
  ];
  return classes[userId % 10];
};

export default async function UserAvatar({}) {
  const userData = await getUserInfo();
  const fallback = getFirstCharacter(userData.nickname);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="outline-none">
        <button className="flex gap-3 pl-6 items-center border-l border-[#d9d9d9]">
          <Avatar className="rounded">
            <AvatarImage src={userData.profileImgUrl} width={38} height={38} />
            <AvatarFallback
              className={`text-white font-semibold ${getBackgroundClass(
                userData.id,
              )}`}
            >
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
