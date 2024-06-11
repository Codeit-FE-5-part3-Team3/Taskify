import getInvitationList from "@/util/api/getInvitationList";
import InvitationList from "./InvitationList";

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

  return <InvitationList invitations={invitations} />;
}
