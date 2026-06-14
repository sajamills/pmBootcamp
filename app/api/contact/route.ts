import { NextRequest } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanSingleLine(value: unknown, maxLength: number) {
  return clean(value, maxLength).replace(/[\r\n]+/g, " ");
}

export async function POST(request: NextRequest) {
  let input: Record<string, unknown>;
  try {
    input = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = cleanSingleLine(input.name, 100);
  const email = clean(input.email, 200);
  const company = cleanSingleLine(input.company, 150);
  const message = clean(input.message, 3000);
  const website = clean(input.website, 200);
  const startedAt = Number(input.startedAt);

  if (website) return Response.json({ ok: true });
  if (!name || !EMAIL_PATTERN.test(email) || message.length < 20) {
    return Response.json(
      { error: "Please include your name, work email, and a short message." },
      { status: 400 }
    );
  }
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 1500) {
    return Response.json({ error: "Please try again." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Growth in Practice <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return Response.json(
      { error: "Email is not configured yet. Please use the scheduling link." },
      { status: 503 }
    );
  }

  let resendResponse: Response;
  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Recruiter inquiry from ${name}${company ? ` at ${company}` : ""}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${company || "Not provided"}`,
          "",
          message,
        ].join("\n"),
      }),
    });
  } catch {
    return Response.json(
      { error: "The message could not be sent. Please try again shortly." },
      { status: 502 }
    );
  }

  if (!resendResponse.ok) {
    const providerError = await resendResponse.text();
    console.error("Resend contact delivery failed", {
      status: resendResponse.status,
      error: providerError.slice(0, 500),
    });
    return Response.json(
      { error: "The message could not be sent. Please try again shortly." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
