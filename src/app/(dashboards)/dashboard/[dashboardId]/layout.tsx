import SideBar from "@/components/side-bar/SideBar";

interface Props {
  params: { dashboardId: number };
  children: React.ReactNode;
}

export default function DashboardPageLayout({ params, children }: Props) {
  return (
    <div className="flex flex-row">
      <SideBar selectedId={params?.dashboardId} />
      {children}
    </div>
  );
}
