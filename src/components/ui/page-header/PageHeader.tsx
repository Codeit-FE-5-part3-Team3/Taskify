import { ReactNode } from "react";

export default function PageHeader({ children }: { children: ReactNode }) {
  return (
    <header className="px-10 py-6 flex justify-between">{children}</header>
  );
}

function HeaderTitle({ children }: { children: ReactNode }) {
  return <span className="text-xl font-bold">{children}</span>;
}

PageHeader.Title = HeaderTitle;
