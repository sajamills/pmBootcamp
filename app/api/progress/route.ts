import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getProgressFromKV, saveProgressToKV } from "@/lib/kv";

function isOwnerRequest(authValue: string | undefined): boolean {
  const secret = process.env.WRITE_SECRET;
  return !!secret && authValue === secret;
}

export async function GET() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("pm_auth");
  const progress = await getProgressFromKV();
  return Response.json({ ...progress, isOwner: isOwnerRequest(authCookie?.value) });
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("pm_auth");

  if (!isOwnerRequest(authCookie?.value)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { taskId } = await request.json();
  const progress = await getProgressFromKV();

  if (progress.completedTasks[taskId]) {
    delete progress.completedTasks[taskId];
  } else {
    progress.completedTasks[taskId] = new Date().toISOString();
    if (!progress.startDate) {
      progress.startDate = new Date().toISOString();
    }
  }

  await saveProgressToKV(progress);
  return Response.json({ ...progress, isOwner: true });
}
