import { ImageResponse } from "next/og";
import { hero, site } from "@/data/portfolio";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0a0f",
          color: "#f4f4f8",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -80,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "radial-gradient(circle at 35% 35%, #8b5cf6, #3b82f6 45%, transparent 70%)",
            opacity: 0.75,
          }}
        />
        <div style={{ display: "flex", fontSize: 40, fontWeight: 800 }}>
          {site.initials}
          <span style={{ color: "#8b5cf6" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, color: "#a3a3b8" }}>{hero.greeting}</div>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>{site.name}</div>
          <div
            style={{
              marginTop: 24,
              fontSize: 34,
              backgroundImage: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {hero.roles.join(" · ")}
          </div>
        </div>
      </div>
    ),
    size
  );
}
