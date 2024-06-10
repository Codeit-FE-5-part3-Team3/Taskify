import DashboardCreateButton from "./components/DashboardCreateButton";
import DashboardPagination from "./components/DashboardPagination";

interface MyDashboardPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function MyDashboardPage({
  searchParams,
}: MyDashboardPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <main className="p-10">
      <DashboardPagination pageNumber={currentPage} />
    </main>
  );
}
