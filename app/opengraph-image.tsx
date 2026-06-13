import { ImageResponse } from "next/og";
import { getProgressFromKV } from "@/lib/kv";
import { totalTasks } from "@/data/curriculum";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 3600;

export default async function Image() {
  const progress = await getProgressFromKV();
  const completed = Object.keys(progress.completedTasks).length;
  const pct = Math.round((completed / totalTasks) * 100);
  const barWidth = Math.round((pct / 100) * 640);

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
        <div
          style={{
            color: "#C75D3A",
            fontSize: 16,
            letterSpacing: "0.2em",
            fontFamily: "monospace",
            textTransform: "uppercase",
          }}
        >
          PM Field Log · 10-Week Consumer / Growth Bootcamp
        </div>

        <div>
          <div
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: "#1A1A1A",
              lineHeight: 1.05,
              marginBottom: 32,
            }}
          >
            10 weeks. 50 days.{"\n"}
            <span style={{ color: "#2D5F4F" }}>One PM portfolio.</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div
                style={{
                  background: "#DDD6C8",
                  borderRadius: 8,
                  height: 14,
                  width: 640,
                  overflow: "hidden",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    background: "#2D5F4F",
                    height: "100%",
                    width: barWidth,
                  }}
                />
              </div>
              <span
                style={{
                  color: "#2D5F4F",
                  fontSize: 28,
                  fontWeight: "bold",
                  fontFamily: "monospace",
                }}
              >
                {pct}%
              </span>
            </div>
            <span
              style={{
                color: "#1A1A1A",
                opacity: 0.45,
                fontSize: 18,
                fontFamily: "monospace",
              }}
            >
              {completed} of {totalTasks} tasks logged
            </span>
          </div>
        </div>

        <div
          style={{
            color: "#1A1A1A",
            opacity: 0.4,
            fontSize: 16,
            fontFamily: "monospace",
            letterSpacing: "0.1em",
          }}
        >
          pm-bootcamp-mu.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
