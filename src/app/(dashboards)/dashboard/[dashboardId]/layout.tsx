import DashboardToolBar from "@/components/dashboard-tool-bar/DashboardToolBar";
import MemberBar from "@/components/member-bar/MemberBar";
import SideBar from "@/components/side-bar/SideBar";
import PageHeader from "@/components/ui/page-header/PageHeader";
import UserAvatar from "@/components/user-avatar/UserAvatar";
import { serverSideFetcher } from "@/lib/utils";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";
interface Props {
  params: { dashboardId: number };
  children: React.ReactNode;
}

async function getDashboardTitle(dashboardId: number) {
  const response = await serverSideFetcher(
    `https:///sp-taskify-api.vercel.app/5-3/dashboards/${dashboardId}`,
  );
  const data = await response?.json();
  return data;
}

export default async function DashboardPageLayout({ params, children }: Props) {
  const dashboard = await getDashboardTitle(params.dashboardId);

  return (
    <div className="flex flex-row h-full">
      <SideBar selectedId={params?.dashboardId} />
      <div className="w-full overflow-scroll">
        <div className="flex flex-col h-screen">
          <PageHeader>
            <div className="flex grow justify-between pr-8">
              <PageHeader.Title>
                {dashboard.title}
                {dashboard.createdByMe && (
                  <Image
                    src={"/crown_icon.png"}
                    width={20}
                    height={16}
                    alt="created by me"
                  />
                )}
              </PageHeader.Title>
              <div className="flex gap-10 items-center">
                <DashboardToolBar dashboardId={params.dashboardId} />
                <MemberBar dashboardId={params.dashboardId} />
              </div>
            </div>
            <UserAvatar />
          </PageHeader>
          <div className="h-full overflow-scroll">
            {" "}
            {children}
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
}
