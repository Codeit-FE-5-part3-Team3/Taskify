import SideBar from "@/components/side-bar/SideBar";

export default function DashboardPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <SideBar />
      <div>{children}</div>
    </div>
  );
}
