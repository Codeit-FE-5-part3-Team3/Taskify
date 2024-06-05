import PageHeader from "@/components/ui/page-header/PageHeader";

export default function MyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <PageHeader>
        <PageHeader.Title>내 대시보드</PageHeader.Title>
      </PageHeader>
      {children}
    </div>
  );
}
