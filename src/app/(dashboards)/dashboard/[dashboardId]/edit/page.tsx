import ReturnButton from "@/components/return-button/ReturnButton";
import { DashboardEditForm } from "./components/DashboardEditForm";
import getDashboardData from "@/util/api/getDashboardData";
import MemberEdit from "./components/MemberEdit";
import InvitedList from "./components/InvitedList";

interface Props {
  params: { dashboardId: number };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function DashboardEditPage({
  params,
  searchParams,
}: Props) {
  const dashboardData = await getDashboardData(params.dashboardId);
  const currentMemberPage = Number(searchParams?.memberPage) || 1;
  const currentInvitationPage = Number(searchParams?.invitationPage) || 1;

  return (
    <main className="flex flex-col p-5 bg-gray-600 gap-3 h-full">
      <ReturnButton href={`/dashboard/${params.dashboardId}`} />
      <div className="w-[620px] flex flex-col gap-3">
        <DashboardEditForm
          dashboardTitle={dashboardData.title}
          currentColor={dashboardData.color}
          dashboardId={params.dashboardId}
        />
        <MemberEdit
          memberPage={currentMemberPage}
          invitationPage={currentInvitationPage}
          dashboardId={params.dashboardId}
        />

        <InvitedList
          memberPage={currentMemberPage}
          invitationPage={currentInvitationPage}
          dashboardId={params.dashboardId}
        />
      </div>
    </main>
  );
}
