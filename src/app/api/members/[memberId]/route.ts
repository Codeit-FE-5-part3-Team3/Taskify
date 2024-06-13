import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(req: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  // req.nextUrl.pathname에서 memberId 추출
  const pathname = req.nextUrl.pathname;
  const memberId = pathname.split("/").pop();
  console.log(memberId);
  if (!memberId) {
    return new Response(JSON.stringify({ message: "memberId is required" }), {
      status: 400,
    });
  }

  const backendResponse = await fetch(
    `https://sp-taskify-api.vercel.app/5-3/members/${memberId}`,
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
