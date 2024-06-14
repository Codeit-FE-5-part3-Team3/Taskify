import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { commentId: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const commentId = params.commentId;
  const body = await req.json();
  console.log(commentId);
  console.log(body);

  const backendResponse = await fetch(
    `https://sp-taskify-api.vercel.app/5-3/comments/${commentId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  const data = await backendResponse.json();

  return NextResponse.json(data, { status: backendResponse.status });
}
