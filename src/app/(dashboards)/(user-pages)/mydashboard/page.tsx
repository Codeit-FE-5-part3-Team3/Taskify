import DashboardCreateButton from "./components/DashboardCreateButton";
import DashboardPagination from "./components/DashboardPagination";
import InvitationBoard from "./components/InvitationBoard";

interface MyDashboardPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function MyDashboardPage({
  searchParams,
}: MyDashboardPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <main className="p-10 bg-gray-100 w-full flex flex-col gap-11 grow ">
      <DashboardPagination pageNumber={currentPage} />
      <InvitationBoard />
    </main>
  );
}
