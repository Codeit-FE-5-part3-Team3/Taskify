import { serverSideFetcher } from "@/lib/utils";

export async function getPageDashbaords(pageNumber: number) {
  const res = await serverSideFetcher(
    `https://sp-taskify-api.vercel.app/5-3/dashboards?navigationMethod=pagination&page=${pageNumber}&size=5`,
  );
  const data = await res?.json();
  return data;
}
