import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/contact/route";

function contactRequest(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const validContact = {
  name: "Recruiter Name",
  email: "recruiter@example.com",
  company: "Example Co",
  message: "I would like to discuss a consumer growth product role.",
  website: "",
  startedAt: Date.now() - 5000,
};

describe("contact API", () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = "resend-test-key";
    process.env.CONTACT_TO_EMAIL = "sam@example.com";
    vi.unstubAllGlobals();
  });

  it("rejects invalid contact details", async () => {
    const response = await POST(
      contactRequest({ ...validContact, email: "not-an-email" }) as never
    );
    expect(response.status).toBe(400);
  });

  it("silently accepts honeypot submissions without sending email", async () => {
    const send = vi.fn();
    vi.stubGlobal("fetch", send);
    const response = await POST(
      contactRequest({ ...validContact, website: "spam.example" }) as never
    );
    expect(response.status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });

  it("sends valid recruiter inquiries through Resend", async () => {
    const send = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", send);

    const response = await POST(contactRequest(validContact) as never);
    expect(response.status).toBe(200);
    expect(send).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer resend-test-key",
        }),
      })
    );
  });

  it("returns a gateway error when Resend rejects the message", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 403,
        text: vi.fn().mockResolvedValue("Sender domain is not verified"),
      })
    );

    const response = await POST(contactRequest(validContact) as never);
    expect(response.status).toBe(502);
    expect(console.error).toHaveBeenCalledWith(
      "Resend contact delivery failed",
      expect.objectContaining({ status: 403 })
    );
  });
});
