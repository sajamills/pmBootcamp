import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const { secret } = await request.json();
  const writeSecret = process.env.WRITE_SECRET;

  if (!writeSecret || secret !== writeSecret) {
    return Response.json({ error: "Wrong secret" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("pm_auth", writeSecret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  return Response.json({ ok: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("pm_auth");
  return Response.json({ ok: true });
}
