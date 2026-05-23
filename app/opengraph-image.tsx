import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Beercade — Arcade bar in Redfern";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadSpaceGroteskBold(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0" } }
    ).then((r) => r.text());

    const url = css.match(/src: url\((.+?)\) format\('woff2'\)/)?.[1];
    if (!url) return null;

    return fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image() {
  const fontData = await loadSpaceGroteskBold();

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
            fontFamily: fontData ? "Space Grotesk" : "sans-serif",
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
            fontFamily: fontData ? "Space Grotesk" : "sans-serif",
            marginTop: 16,
          }}
        >
          113 Regent Street, Redfern · Arcade bar
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: "Space Grotesk", data: fontData, weight: 700 }]
        : [],
    }
  );
}
