import { ImageResponse } from "next/og";

export const alt = "Safe to Merge: Building Reliable Software in the Age of AI Agents";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f5f4ef", // Exact --color-paper token
          padding: "72px 84px",
          fontFamily: "serif",
          color: "#1e2530", // Exact --color-ink token
        }}
      >
        {/* Top Header: Logo + Domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Exact Landing Page Logo Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "2px solid #1e2530",
              boxShadow: "3px 3px 0px 0px #1e2530",
              padding: "6px 14px",
              backgroundColor: "#f5f4ef",
              fontFamily: "monospace",
              fontSize: "14px",
              fontWeight: 800,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#1e2530",
            }}
          >
            SAFETOMERGE
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "monospace",
              fontSize: "15px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#62697a", // Exact --color-muted token
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#3b6e52", // Exact --color-verified token
              }}
            />
            safetomerge.com
          </div>
        </div>

        {/* Hero Section Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "1020px",
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "14px",
              color: "#62697a",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            A handbook for software teams
          </div>

          <div
            style={{
              fontSize: "52px",
              fontWeight: 600,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#1e2530",
            }}
          >
            Building Reliable Software in the Age of AI Agents
          </div>

          <div
            style={{
              fontSize: "21px",
              lineHeight: 1.5,
              color: "#62697a",
              maxWidth: "940px",
            }}
          >
            A practical handbook for building reliable software when AI agents write and ship more of the code. Learn how teams are rethinking software engineering, code review, testing, verification, observability, agent harnesses, and safe autonomy.
          </div>
        </div>

        {/* Footer Attribution Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #d8d4c8", // Exact --color-rule token
            paddingTop: "20px",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "15px",
              color: "#62697a",
              letterSpacing: "0.05em",
            }}
          >
            By Sourav Kumar Nanda
          </span>

          <span
            style={{
              fontFamily: "monospace",
              fontSize: "14px",
              color: "#3b6e52",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Read the Handbook &rarr;
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
