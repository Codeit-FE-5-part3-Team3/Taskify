import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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

  console.log(invitationId, dashboardId);

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

  const data = await backendResponse.json();

  return new Response(JSON.stringify(data), {
    status: backendResponse.status,
  });
}
