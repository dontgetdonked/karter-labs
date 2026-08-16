import { ImageResponse } from "next/og";

import { site } from "@/config/site";

export const alt = `${site.name} — Software pentru business-uri`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social preview card. Typography only, monochrome, no external assets —
 * so it renders identically wherever the build runs.
 * Text is intentionally free of diacritics: the default font shipped with
 * `next/og` covers plain Latin reliably.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          color: "#ffffff",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: "#a4a4ad",
          }}
        >
          Karter Labs
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 82,
            lineHeight: 1.05,
            letterSpacing: -3,
            maxWidth: 900,
            fontWeight: 600,
          }}
        >
          Software care rezolva probleme reale.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #3a3a41",
            paddingTop: 28,
            fontSize: 24,
            color: "#a4a4ad",
          }}
        >
          <div style={{ display: "flex" }}>
            Website-uri · Aplicatii web · Automatizari · Software custom
          </div>
          <div style={{ display: "flex" }}>Moldova</div>
        </div>
      </div>
    ),
    size,
  );
}
