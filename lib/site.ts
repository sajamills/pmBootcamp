export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pm-bootcamp-mu.vercel.app"
).replace(/\/$/, "");

export const siteName = "Growth in Practice";

export const siteDescription =
  "Real product thinking about consumer growth, experimentation, and AI — built and published in public.";

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}
