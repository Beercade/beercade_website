import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Beercade — Arcade bar in Redfern";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#7A3CE2",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px",
        }}
      >
        <div
          style={{
            color: "#F7EFE3",
            fontSize: 88,
            fontWeight: 700,
            fontFamily: "sans-serif",
            letterSpacing: "-2px",
            lineHeight: 1,
          }}
        >
          BEERCADE
        </div>
        <div
          style={{
            color: "#F7EFE3",
            opacity: 0.6,
            fontSize: 28,
            fontFamily: "sans-serif",
            marginTop: 16,
          }}
        >
          113 Regent Street, Redfern · Arcade bar
        </div>
      </div>
    ),
    { ...size }
  );
}
