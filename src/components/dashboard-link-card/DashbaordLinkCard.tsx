import { cn } from "@/lib/utils";

export default function DashbaordLinkCard({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "px-5 py-6 border border-gray-300 w-full h-[70px] rounded-lg align-center flex",
        className,
      )}
    >
      {children}
    </div>
  );
}
