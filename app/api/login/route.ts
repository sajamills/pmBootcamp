import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";
import { kv } from "@vercel/kv";

function hmacDigest(value: string): Buffer {
  return createHmac("sha256", "pm-field-log").update(value).digest();
}

function getIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

export async function POST(request: NextRequest) {
  const ip = getIp(request);
  const rateLimitKey = `ratelimit:login:${ip}`;

  const attempts = await kv.get<number>(rateLimitKey);
  if ((attempts ?? 0) >= 5) {
    return Response.json(
      { error: "Too many attempts. Try again in 15 minutes." },
      { status: 429 }
    );
  }

  const { secret } = await request.json();
  const writeSecret = process.env.WRITE_SECRET;

  if (
    !writeSecret ||
    !timingSafeEqual(hmacDigest(secret ?? ""), hmacDigest(writeSecret))
  ) {
    await kv.incr(rateLimitKey);
    await kv.expire(rateLimitKey, 900);
    return Response.json({ error: "Wrong secret" }, { status: 401 });
  }

  await kv.del(rateLimitKey);

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
