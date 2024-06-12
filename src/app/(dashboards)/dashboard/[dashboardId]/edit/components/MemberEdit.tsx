import PaginationButtonBar from "@/components/pagination-button-bar/PaginationButtonBar";
import { getPageMembers } from "@/util/api/getPageMember";

interface Props {
  memberPage: number;
  invitationPage: number;
  dashboardId: number;
}

export default async function MemberEdit({
  memberPage,
  invitationPage,
  dashboardId,
}: Props) {
  const { members, totalCount } = await getPageMembers(memberPage, dashboardId);
  const maxPage = Math.max(1, totalCount / 4);

  const isLastMemberPage = memberPage === maxPage;
  const isFirstMemberPage = memberPage === 1;
  const currentUrl = `/dashboard/${dashboardId}/edit`;
  return (
    <div className=" space-y-6 rounded-lg bg-blue-100 p-7 flex flex-col h-[404px]">
      <div className="w-full flex justify-between">
        <span className="text-2xl font-bold">구성원</span>

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
      </div>
    </div>
  );
}
