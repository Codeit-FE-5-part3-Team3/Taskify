import DashboardCreateButton from "./components/DashboardCreateButton";

export default function MyDashboardPage() {
  return (
    <main className="p-10">
      <ul className="grid grid-cols-3 gap-3">
        <li>
          <DashboardCreateButton />
        </li>
      </ul>
    </main>
  );
}
