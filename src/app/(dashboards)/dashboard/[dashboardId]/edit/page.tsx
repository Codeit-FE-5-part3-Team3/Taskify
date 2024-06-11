import ReturnButton from "@/components/return-button/ReturnButton";
import { DashboardEditForm } from "./components/DashboardEditForm";
import getDashboardData from "@/util/api/getDashboardData";

interface Props {
  params: { dashboardId: number };
}

export default async function DashboardEditPage({ params }: Props) {
  const dashboardData = await getDashboardData(params.dashboardId);

  return (
    <div className="flex flex-col p-5 bg-gray-600 gap-3 h-full">
      <ReturnButton href={`/dashboard/${params.dashboardId}`} />
      <DashboardEditForm
        dashboardTitle={dashboardData.title}
        currentColor={dashboardData.color}
        dashboardId={params.dashboardId}
      />
    </div>
  );
}
