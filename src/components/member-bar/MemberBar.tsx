import { serverSideFetcher } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type member = {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  isOwner: boolean;
};

async function getMembers(dashboardId: number) {
  const res = await serverSideFetcher(
    `https://sp-taskify-api.vercel.app/5-3/members?page=1&size=9999&dashboardId=${dashboardId}`,
  );
  const data = await res?.json();
  return data.members;
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

export default async function MemberBar({
  dashboardId,
}: {
  dashboardId: number;
}) {
  let members = await getMembers(dashboardId);
  members = [
    {
      id: 0,
      userId: 0,
      email: "string",
      nickname: "힘",
      profileImageUrl: "string",
      createdAt: "2024-06-06T08:03:33.357Z",
      updatedAt: "2024-06-06T08:03:33.357Z",
      isOwner: true,
    },
    {
      id: 1,
      userId: 1,
      email: "string",
      nickname: "들",
      profileImageUrl: "string",
      createdAt: "2024-06-06T08:03:33.357Z",
      updatedAt: "2024-06-06T08:03:33.357Z",
      isOwner: true,
    },
    {
      id: 2,
      userId: 2,
      email: "string",
      nickname: "구",
      profileImageUrl: "string",
      createdAt: "2024-06-06T08:03:33.357Z",
      updatedAt: "2024-06-06T08:03:33.357Z",
      isOwner: true,
    },
    {
      id: 3,
      userId: 3,
      email: "string",
      nickname: "나",
      profileImageUrl: "string",
      createdAt: "2024-06-06T08:03:33.357Z",
      updatedAt: "2024-06-06T08:03:33.357Z",
      isOwner: true,
    },
    {
      id: 3,
      userId: 4,
      email: "string",
      nickname: "그",
      profileImageUrl: "string",
      createdAt: "2024-06-06T08:03:33.357Z",
      updatedAt: "2024-06-06T08:03:33.357Z",
      isOwner: true,
    },
    {
      id: 3,
      userId: 5,
      email: "string",
      nickname: "만",
      profileImageUrl: "string",
      createdAt: "2024-06-06T08:03:33.357Z",
      updatedAt: "2024-06-06T08:03:33.357Z",
      isOwner: true,
    },
    {
      id: 3,
      userId: 7,
      email: "string",
      nickname: "할",
      profileImageUrl: "string",
      createdAt: "2024-06-06T08:03:33.357Z",
      updatedAt: "2024-06-06T08:03:33.357Z",
      isOwner: true,
    },
    {
      id: 3,
      userId: 8,
      email: "string",
      nickname: "까",
      profileImageUrl: "string",
      createdAt: "2024-06-06T08:03:33.357Z",
      updatedAt: "2024-06-06T08:03:33.357Z",
      isOwner: true,
    },
    {
      id: 3,
      userId: 10,
      email: "string",
      nickname: "까",
      profileImageUrl: "string",
      createdAt: "2024-06-06T08:03:33.357Z",
      updatedAt: "2024-06-06T08:03:33.357Z",
      isOwner: true,
    },
    {
      id: 3,
      userId: 6,
      email: "string",
      nickname: "까",
      profileImageUrl: "string",
      createdAt: "2024-06-06T08:03:33.357Z",
      updatedAt: "2024-06-06T08:03:33.357Z",
      isOwner: true,
    },
    {
      id: 3,
      userId: 4123,
      email: "string",
      nickname: "까",
      profileImageUrl: "string",
      createdAt: "2024-06-06T08:03:33.357Z",
      updatedAt: "2024-06-06T08:03:33.357Z",
      isOwner: true,
    },
    {
      id: 3,
      userId: 9,
      email: "string",
      nickname: "까",
      profileImageUrl: "string",
      createdAt: "2024-06-06T08:03:33.357Z",
      updatedAt: "2024-06-06T08:03:33.357Z",
      isOwner: true,
    },
  ];
  const firstFourMembers = members.slice(0, 4);
  const afterFourMembers = members.slice(4);

  //   const firstTwoMembers = members.slice(0, 2);
  //   const afterTwoMembers = members.slice(2);

  return (
    <ul className="flex">
      {firstFourMembers.map((member: member) => (
        <li key={member.userId}>
          <Avatar className="-ml-2">
            <AvatarImage src={member.profileImageUrl} width={38} height={38} />
            <AvatarFallback
              className={`text-white font-semibold ${getBackgroundClass(
                member.userId,
              )}`}
            >
              {getFirstCharacter(member.nickname)}
            </AvatarFallback>
          </Avatar>
        </li>
      ))}
      {afterFourMembers && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <li
              key={0}
              className="bg-[#f4d7da] text-[#de5b68] flex justify-center items-center w-10 h-10 z-40 -ml-2 border-2 border-white rounded-full font-medium"
            >
              +{afterFourMembers.length}
            </li>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="px-4 py-4">
            <ul className="flex flex-wrap w-40">
              {afterFourMembers.map((member: member) => (
                <li key={member.userId}>
                  <Avatar className="-mr-2">
                    <AvatarImage
                      src={member.profileImageUrl}
                      width={38}
                      height={38}
                    />
                    <AvatarFallback
                      className={`text-white font-semibold ${getBackgroundClass(
                        member.userId,
                      )}`}
                    >
                      {getFirstCharacter(member.nickname)}
                    </AvatarFallback>
                  </Avatar>
                </li>
              ))}
            </ul>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </ul>
  );
}
