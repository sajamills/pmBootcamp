import { ImageResponse } from "next/og";
import { getProgressFromKV } from "@/lib/kv";
import { totalTasks } from "@/data/curriculum";
import { siteUrl } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 3600;

export default async function Image() {
  const progress = await getProgressFromKV();
  const completed = Object.keys(progress.completedTasks).length;
  const pct = Math.round((completed / totalTasks) * 100);
  const barWidth = Math.round((pct / 100) * 620);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAF8F3",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
        }}
      >
        {/* Label */}
        <div
          style={{
            display: "flex",
            color: "#C75D3A",
            fontSize: 16,
            letterSpacing: "0.2em",
            fontFamily: "monospace",
          }}
        >
          GROWTH IN PRACTICE · CONSUMER GROWTH / AI / PRODUCT
        </div>

        {/* Headline + progress */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", fontSize: 72, fontWeight: "bold", color: "#1A1A1A", lineHeight: 1.05 }}>
              Real product thinking.
            </div>
            <div style={{ display: "flex", fontSize: 72, fontWeight: "bold", color: "#2D5F4F", lineHeight: 1.05 }}>
              Built in public.
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div
                style={{
                  background: "#DDD6C8",
                  borderRadius: 8,
                  height: 14,
                  width: 620,
                  display: "flex",
                }}
              >
                <div
                  style={{
                    background: "#2D5F4F",
                    height: "100%",
                    width: barWidth,
                    borderRadius: 8,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  color: "#2D5F4F",
                  fontSize: 28,
                  fontWeight: "bold",
                  fontFamily: "monospace",
                }}
              >
                {pct}%
              </div>
            </div>
            <div
              style={{
                display: "flex",
                color: "#1A1A1A",
                opacity: 0.45,
                fontSize: 18,
                fontFamily: "monospace",
              }}
            >
              {completed} of {totalTasks} tasks logged
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            color: "#1A1A1A",
            opacity: 0.35,
            fontSize: 16,
            fontFamily: "monospace",
            letterSpacing: "0.1em",
          }}
        >
          {new URL(siteUrl).host}
        </div>
      </div>
    ),
    { ...size }
  );
}
