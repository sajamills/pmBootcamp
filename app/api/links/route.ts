import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getProgressFromKV, saveProgressToKV } from "@/lib/kv";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("pm_auth");
  const writeSecret = process.env.WRITE_SECRET;

  if (!writeSecret || authCookie?.value !== writeSecret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { week, url } = await request.json();
  const progress = await getProgressFromKV();

  if (!progress.portfolioLinks) progress.portfolioLinks = {};

  if (url) {
    progress.portfolioLinks[String(week)] = url;
  } else {
    delete progress.portfolioLinks[String(week)];
  }

  await saveProgressToKV(progress);
  return Response.json({ ...progress, isOwner: true });
}
