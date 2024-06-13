import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(req: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  // req.nextUrl.pathname에서 memberId 추출
  const pathname = req.nextUrl.pathname;
  const dashboardId = pathname.split("/").pop();
  console.log(dashboardId);
  if (!dashboardId) {
    return new Response(JSON.stringify({ message: "memberId is required" }), {
      status: 400,
    });
  }

  const backendResponse = await fetch(
    `https://sp-taskify-api.vercel.app/5-3/dashboards/${dashboardId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  const text = await backendResponse.text();
  console.log(text);

  const resStatus =
    backendResponse.status === 204 ? 200 : backendResponse.status;
  const resMessage = backendResponse.status === 204 ? "삭제 성공" : "삭제 실패";
  return new Response(JSON.stringify({ message: resMessage }), {
    status: resStatus,
  });
}
