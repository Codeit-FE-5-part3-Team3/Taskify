import { authOptions } from "@/lib/auth";
import { serverSideFetcher } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

interface Props {
  selectedId?: number;
}

type dashboard = {
  id: number;
  title: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  createdByMe: boolean;
  userId: number;
};

async function getDashBoards() {
  const response = await serverSideFetcher(
    "https://sp-taskify-api.vercel.app/5-3/dashboards?navigationMethod=infiniteScroll&page=1&size=9999",
  );
  const data = await response?.json();
  return data.dashboards;
}

export default async function SideBar({ selectedId }: Props) {
  const dashboards = await getDashBoards();
  if (!dashboards) return;
  return (
    <div className="flex flex-col w-[300px] h-[100vh] px-[12px] border border-[#d9d9d9]">
      <Link href="/mydashboard" className="py-[20px] px-[12px]">
        <Image src="/taskify.png" width={110} height={33} alt="Taskify" />
      </Link>
      <button className="px-[12px] py-[16px]">Dummy button</button>
      <ul className="flex flex-col gap-5">
        {dashboards.map((dashboard: dashboard) => (
          <li key={dashboard.id}>
            <Link
              href={`/dashboard/${dashboard.id}`}
              className={
                selectedId == dashboard.id
                  ? "bg-[#F1EFFD] rounded px-3 py-3 flex flex-row items-center"
                  : "px-3 py-3 hover:bg-[#f1effd] flex flex-row items-center"
              }
            >
              <div
                style={{ backgroundColor: dashboard.color }}
                className={`w-[8px] h-[8px] rounded-full`}
              ></div>
              <span className="ml-[16px] mr-[6px] text-[18px] leading-[21px]  font-medium">
                {dashboard.title}
              </span>
              {dashboard.createdByMe && (
                <Image
                  src="/crown_icon.png"
                  alt="내가 생성한 대시보드"
                  width={18}
                  height={14}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
