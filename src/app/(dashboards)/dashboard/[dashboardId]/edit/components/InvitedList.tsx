import PaginationButtonBar from "@/components/pagination-button-bar/PaginationButtonBar";
import { getPageInvited } from "@/util/api/getPageInvited";

import NoInvitations from "@/app/(dashboards)/(user-pages)/mydashboard/components/NoInvitations";
import DashboardInvitedTuple from "./DashboardInvitedTuple";

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
    invitationPage,
    dashboardId,
  );
  const maxPage = Math.max(1, Math.ceil(totalCount / 4));

  const isLastInvitationPage = invitationPage === maxPage;
  const isFirstInvtationPage = invitationPage === 1;
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
                isFirstPage={isFirstInvtationPage}
                isLastPage={isLastInvitationPage}
                prevPage={`${currentUrl}?memberPage=${memberPage}&invitationPage=${
                  invitationPage - 1
                }`}
                nextPage={`${currentUrl}?memberPage=${memberPage}&invitationPage=${
                  invitationPage + 1
                }`}
              />
            </div>
          </div>
        )}
      </div>
      {invitations.length > 0 ? (
        <>
          <span className="text-gray-400 mt-7">이메일</span>
          <ul>
            {invitations.map((invitation: any, index: number) => (
              <li
                key={index}
                className={`py-4 flex justify-between ${
                  index !== invitations.length - 1
                    ? "border-b border-gray-300"
                    : ""
                }`}
              >
                <DashboardInvitedTuple
                  email={invitation.invitee.email}
                  invitationId={invitation.id}
                  dashboardId={dashboardId}
                />
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
