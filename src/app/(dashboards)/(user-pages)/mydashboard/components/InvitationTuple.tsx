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

export default function InvitationTuple({
  invitation,
}: {
  invitation: invitation;
}) {
  return (
    <div className="w-full grid grid-cols-3 items-center py-5">
      <span>{invitation.dashboard.title}</span>
      <span>{invitation.inviter.nickname}</span>
      <div className="flex gap-3 text-sm">
        <button className="text-white px-7 bg-violet-100 rounded h-8">
          수락
        </button>
        <button className="rounded border border-gray-300 px-7 h-8">
          거절
        </button>
      </div>
    </div>
  );
}
