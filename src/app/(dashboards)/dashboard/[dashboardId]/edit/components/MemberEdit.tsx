import PaginationButtonBar from "@/components/pagination-button-bar/PaginationButtonBar";
import { getPageMembers } from "@/util/api/getPageMember";
import { Avatar } from "@/components/ui/avatar";
import CustomAvatar from "@/components/custom-avatar/CustomAvatar";

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
  const maxPage = Math.max(1, Math.ceil(totalCount / 4));

  const isLastMemberPage = memberPage === maxPage;
  const isFirstMemberPage = memberPage === 1;
  const currentUrl = `/dashboard/${dashboardId}/edit`;

  return (
    <div className="rounded-lg bg-blue-100 p-7 flex flex-col h-[460px]">
      <div className="w-full flex justify-between items-center">
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
      <span className="text-gray-400 mt-7">이름</span>
      <ul>
        {members.map((member: any, index: number) => (
          <li
            key={index}
            className={`py-4 flex justify-between ${
              index !== members.length - 1 ? "border-b border-gray-300" : ""
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

            <button className="text-violet-100 px-7 py-2 border border-gray-300 rounded">
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
