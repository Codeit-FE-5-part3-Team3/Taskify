import { serverSideFetcher } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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

export default async function MemberBar({
  dashboardId,
}: {
  dashboardId: number;
}) {
  let members = await getMembers(dashboardId);
  members = [
    ...members,
    ...members,
    ...members,
    ...members,
    ...members,
    ...members,
    ...members,
    ...members,
    ...members,
  ];
  const firstFourMembers = members.slice(0, 4);
  const afterFourMembers = members.slice(4);

  const firstTwoMembers = members.slice(0, 2);
  const afterTwoMembers = members.slice(2);

  return (
    <ul className="flex">
      {firstFourMembers.map((member: member) => (
        <li key={member.userId}>
          <Avatar className="-ml-2">
            <AvatarImage src={member.profileImageUrl} width={38} height={38} />
            <AvatarFallback className="bg-blue-400 text-white font-semibold">
              {getFirstCharacter(member.nickname)}
            </AvatarFallback>
          </Avatar>
        </li>
      ))}
      {afterFourMembers && (
        <li
          key={0}
          className="bg-[#f4d7da] text-[#de5b68] flex justify-center items-center w-10 h-10 z-10 -ml-2 border-2 border-white rounded-full font-medium"
        >
          +{afterFourMembers.length}
        </li>
      )}
    </ul>
  );
}
