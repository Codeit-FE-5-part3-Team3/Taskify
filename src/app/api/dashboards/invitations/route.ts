import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const body = await req.json();
  const dashboardId = Number(body.dashboardId);

  const backendResponse = await fetch(
    `https://sp-taskify-api.vercel.app/5-3/dashboards/${dashboardId}/invitations`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: body.email }),
    },
  );

  const data = await backendResponse.json();

  return new Response(JSON.stringify(data), {
    status: backendResponse.status,
  });
}

export async function PUT(req: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const body = await req.json();
  console.log(body);
  const invitationId = Number(body.invitationId);
  const invitedAccepted = body.accepted;
  console.log(invitedAccepted);

  const backendResponse = await fetch(
    `https://sp-taskify-api.vercel.app/5-3/invitations/${invitationId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inviteAccepted: invitedAccepted }),
    },
  );

  const data = await backendResponse.json();

  return new Response(JSON.stringify(data), {
    status: backendResponse.status,
  });
}
