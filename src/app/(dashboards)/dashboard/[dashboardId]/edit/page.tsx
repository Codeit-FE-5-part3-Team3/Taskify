import ReturnButton from "@/components/return-button/ReturnButton";

interface Props {
  params: { dashboardId: number };
}

export default function DashboardEditPage({ params }: Props) {
  return (
    <div className="flex flex-col p-5">
      <ReturnButton href={`/dashboard/${params.dashboardId}`} />
    </div>
  );
}
