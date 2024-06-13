import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function POST(req: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const body = await req.json();

  const backendResponse = await fetch(
    "https://sp-taskify-api.vercel.app/5-3/dashboards",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json", // Use the appropriate session token or access token
      },
      body: JSON.stringify(body),
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

  const newBody = {
    title: body.title,
    color: body.color,
  };
  console.log(newBody);
  const backendResponse = await fetch(
    `https://sp-taskify-api.vercel.app/5-3/dashboards/${body.dashboardId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBody),
    },
  );

  const data = await backendResponse.json();

  return new Response(JSON.stringify(data), {
    status: backendResponse.status,
  });
}
