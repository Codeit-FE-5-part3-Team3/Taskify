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

  const data = await backendResponse.json();

  return new Response(JSON.stringify(data), {
    status: backendResponse.status,
  });
}
