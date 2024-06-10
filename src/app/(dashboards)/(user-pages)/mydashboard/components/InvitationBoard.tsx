import getInvitationList from "@/util/api/getInvitationList";
import SearchBar from "./SearchBar";
import InvitationTuple from "./InvitationTuple";

interface Props {
  page?: string;
  keyword?: string;
}

type invitation = {
  id: number;
  inviter: {
    id: number;
    email: string;
    nickname: string;
  };
  teamId: string;
  dashboard: {
    id: number;
    title: string;
  };
  invitee: {
    id: number;
    email: string;
    nickname: string;
  };
  inviteAccepted: boolean | null;
  createdAt: Date;
  updatedAt: Date;
};

export default async function InvitationBoard({ page, keyword }: Props) {
  const invitations = await getInvitationList();
  return (
    <div className="px-7 py-8 flex flex-col gap-5 bg-white rounded-lg h-[600px]">
      <span className="text-2xl font-bold">초대받은 대시보드</span>
      <SearchBar page={page} />
      <div className="w-full grid grid-cols-3 text-gray-400">
        <span>대시보드 이름</span>
        <span>초대자</span>
        <span>수락여부</span>
      </div>
      <ul className="flex flex-col h-full overflow-y-scroll">
        {invitations.map((invitation: invitation, index: number) => (
          <li
            key={invitation.id}
            className={`${
              index !== invitations.length - 1 ? "border-b" : ""
            } border-gray-300 py-2`}
          >
            <InvitationTuple invitation={invitation} />
          </li>
        ))}
      </ul>
    </div>
  );
}
