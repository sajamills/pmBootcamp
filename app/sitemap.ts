import type { MetadataRoute } from "next";
import { curriculum } from "@/data/curriculum";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/day-0", "/hire-me", "/portfolio", "/share"];
  const weeklyRoutes = curriculum.map((week) => `/week/${week.week}`);

  return [...staticRoutes, ...weeklyRoutes].map((path) => ({
    url: absoluteUrl(path || "/"),
    changeFrequency: path === "" || path === "/share" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/portfolio" ? 0.9 : 0.7,
  }));
}
