interface Props {
  params: { dashboardId: number };
}

export default function DashboardEditPage({ params }: Props) {
  return (
    <div className="flex flex-col ">
      에딧페이지 대시보드아이디:{params.dashboardId}
    </div>
  );
}
