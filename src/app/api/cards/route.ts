import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const formData = await req.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const tags = formData.get("tags") as string; // this will be JSON string
  const dashboardId = formData.get("dashboardId") as string;
  const columnId = formData.get("columnId") as string;
  const image = formData.get("image") as File;

  // Forward the formData including the image to the backend
  const backendFormData = new FormData();
  backendFormData.append("title", title);
  backendFormData.append("description", description);
  backendFormData.append("tags", tags);
  backendFormData.append("dashboardId", dashboardId);
  backendFormData.append("columnId", columnId);
  backendFormData.append("image", image);

  const response = await fetch(
    `https://sp-taskify-api.vercel.app/5-3/columns/${columnId}/card-image`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: backendFormData,
    },
  );

  if (!response.ok) {
    return new Response(JSON.stringify({ message: "Failed to create card" }), {
      status: response.status,
    });
  }

  const data = await response.json();
  console.log(data);

  return new Response(JSON.stringify(data), {
    status: response.status,
  });
}
