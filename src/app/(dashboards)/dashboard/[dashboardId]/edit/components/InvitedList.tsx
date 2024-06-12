import PaginationButtonBar from "@/components/pagination-button-bar/PaginationButtonBar";
import { getPageInvited } from "@/util/api/getPageInvited";
import { Avatar } from "@/components/ui/avatar";
import CustomAvatar from "@/components/custom-avatar/CustomAvatar";
import MemberDeleteButton from "./MemberDeleteButton";
import Image from "next/image";
import NoInvitations from "@/app/(dashboards)/(user-pages)/mydashboard/components/NoInvitations";

interface Props {
  memberPage: number;
  invitationPage: number;
  dashboardId: number;
}

export default async function InvitedList({
  memberPage,
  invitationPage,
  dashboardId,
}: Props) {
  const { invitations, totalCount } = await getPageInvited(
    memberPage,
    dashboardId,
  );
  const maxPage = Math.max(1, Math.ceil(totalCount / 4));

  const isLastMemberPage = memberPage === maxPage;
  const isFirstMemberPage = memberPage === 1;
  const currentUrl = `/dashboard/${dashboardId}/edit`;

  return (
    <div className="rounded-lg bg-blue-100 p-7 flex flex-col h-[460px]">
      <div className="w-full flex justify-between items-center">
        <span className="text-2xl font-bold">초대내역</span>

        {invitations.length > 0 && (
          <div className="flex items-center gap-4">
            <span>
              {memberPage} / {maxPage}
            </span>
            <div className="flex">
              <PaginationButtonBar
                isFirstPage={isFirstMemberPage}
                isLastPage={isLastMemberPage}
                prevPage={`${currentUrl}?memberPage=${
                  memberPage - 1
                }&invitationPage=${invitationPage}`}
                nextPage={`${currentUrl}?memberPage=${
                  memberPage + 1
                }&invitationPage=${invitationPage}`}
              />
            </div>
          </div>
        )}
      </div>
      {invitations.length > 0 ? (
        <>
          <span className="text-gray-400 mt-7">이메일</span>
          <ul>
            {invitations.map((member: any, index: number) => (
              <li
                key={index}
                className={`py-4 flex justify-between ${
                  index !== invitations.length - 1
                    ? "border-b border-gray-300"
                    : ""
                }`}
              >
                <div className="flex gap-3 items-center">
                  <Avatar>
                    <CustomAvatar
                      imgUrl={member.profileImageUrl}
                      nickname={member.nickname}
                      userId={member.userId}
                      size={38}
                    />
                  </Avatar>
                  <span>{member.nickname}</span>
                </div>
                {member.isOwner ? (
                  <div className="relative px-7 py-4">
                    <Image
                      src={"/crown_icon.png"}
                      width={18}
                      height={14}
                      alt="얘가 방장"
                    />
                  </div>
                ) : (
                  <MemberDeleteButton
                    nickname={member.nickname}
                    memberId={member.id}
                  />
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <NoInvitations message="초대한 내역이 존재하지 않습니다" />
      )}
    </div>
  );
}
