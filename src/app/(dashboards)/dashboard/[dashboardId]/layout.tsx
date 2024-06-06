import DashboardToolBar from "@/components/dashboard-tool-bar/DashboardToolBar";
import SideBar from "@/components/side-bar/SideBar";
import PageHeader from "@/components/ui/page-header/PageHeader";
import UserAvatar from "@/components/user-avatar/UserAvatar";
import { serverSideFetcher } from "@/lib/utils";
import Image from "next/image";

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
    <div className="flex flex-row">
      <SideBar selectedId={params?.dashboardId} />
      <div className="flex flex-col grow">
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
            <DashboardToolBar />
          </div>
          <UserAvatar />
        </PageHeader>
        {children}
      </div>
    </div>
  );
}
