import { ImageResponse } from "next/og";
import { BRAND_NAME, BRAND_SUFFIX, siteConfig } from "@/data/site";

export const alt = `${BRAND_NAME} — bespoke men's tailoring in ${siteConfig.address.locality}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The default social card. Rendered at build time, so it costs nothing at
 * request time and never depends on a font or image fetch succeeding.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Warm directional light, matching the site's hero. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(120% 90% at 82% 6%, rgba(180,148,94,0.20) 0%, rgba(10,10,10,0) 62%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 80,
            right: 80,
            top: 150,
            height: 1,
            backgroundColor: "#2a2a25",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 40,
              color: "#f5f2ea",
              letterSpacing: "0.04em",
            }}
          >
            {BRAND_NAME}
          </div>
          <div
            style={{
              marginTop: 14,
              fontSize: 17,
              letterSpacing: "0.34em",
              textTransform: "uppercase",
              color: "#98938a",
            }}
          >
            {BRAND_SUFFIX}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.02,
              color: "#f5f2ea",
              letterSpacing: "-0.02em",
              maxWidth: 900,
            }}
          >
            Tailored for your presence.
          </div>
          <div
            style={{
              marginTop: 30,
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div style={{ width: 54, height: 2, backgroundColor: "#b4945e" }} />
            <div
              style={{
                fontSize: 19,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#cdb78e",
              }}
            >
              {`${siteConfig.address.locality}, ${siteConfig.address.region}`}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
