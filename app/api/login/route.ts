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

function isOriginAllowed(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const host = request.headers.get("host");
  const allowedOrigin = siteUrl ?? (host ? `https://${host}` : null);

  if (origin === "http://localhost:3000") return true;
  if (origin.endsWith(".vercel.app")) return true;
  if (allowedOrigin && origin === allowedOrigin) return true;

  return false;
}

export async function POST(request: NextRequest) {
  if (!isOriginAllowed(request)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

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
