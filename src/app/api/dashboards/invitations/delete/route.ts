import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const url = new URL(req.url);
  const invitationId = url.searchParams.get("invitationId");
  const dashboardId = url.searchParams.get("dashboardId");

  if (!invitationId || !dashboardId) {
    return new Response(
      JSON.stringify({ message: "invitationId and dashboardId are required" }),
      {
        status: 400,
      },
    );
  }

  const backendResponse = await fetch(
    `https://sp-taskify-api.vercel.app/5-3/dashboards/${dashboardId}/invitations/${invitationId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  const resStatus =
    backendResponse.status === 204 ? 201 : backendResponse.status;
  const resMessage = backendResponse.status === 204 ? "삭제 성공" : "삭제 실패";
  return NextResponse.json({ message: resMessage }, { status: resStatus });
}
