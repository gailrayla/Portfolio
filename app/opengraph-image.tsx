import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

/*
 * The link preview, generated at build time so it can never drift from the
 * positioning again. Fonts are committed under app/_og so this needs no
 * network access during a build.
 */

export const alt = `${profile.name}, software engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#faf8f7";
const INK = "#221c20";
const INK_FAINT = "#9a8c93";
const ACCENT = "#d63a72";
const ACCENT_DEEP = "#b82e60";
const FUR = "#e8d4ae";
const FUR_DARK = "#d6bb8d";
const CREAM = "#faf3e6";

const loadFont = (file: string): Promise<Buffer> =>
  readFile(path.join(process.cwd(), "app", "_og", file));

export default async function OpenGraphImage() {
  const [medium, semibold, mono] = await Promise.all([
    loadFont("Outfit-Medium.ttf"),
    loadFont("Outfit-SemiBold.ttf"),
    loadFont("SourceCodePro-Regular.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          padding: "64px 72px",
          fontFamily: "Outfit",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "SourceCode", fontSize: 22, color: INK_FAINT }}>
            {profile.name.toLowerCase()}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 92,
              fontWeight: 600,
              color: INK,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Software engineer
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 40,
              color: INK,
              opacity: 0.72,
              maxWidth: 820,
              lineHeight: 1.3,
            }}
          >
            {/* The headline already says the noun, so this carries the rest
                of the same sentence rather than restating it. */}
            {profile.tagline.replace("a software engineer ", "")}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "SourceCode", fontSize: 21, color: INK_FAINT }}>
            {[profile.credentials[0], profile.credentials[2]].join("  ·  ")}
          </div>
          {/* Marla, the same mark as the favicon. */}
          <svg width="150" height="110" viewBox="0 0 225 165">
            <path d="M44 80 C 20 78, 8 60, 13 44 C 24 52, 34 62, 52 70 Z" fill={FUR_DARK} />
            <path d="M60 104 h16 v38 a8 8 0 0 1 -16 0 Z" fill={FUR_DARK} />
            <path d="M128 104 h16 v38 a8 8 0 0 1 -16 0 Z" fill={FUR_DARK} />
            <ellipse cx="99" cy="88" rx="60" ry="45" fill={FUR} />
            <path
              d="M50 104 C 66 128, 132 130, 150 100 C 154 120, 130 133, 99 133 C 70 133, 48 122, 50 104 Z"
              fill={CREAM}
            />
            <path
              d="M126 62 C 141 72, 147 88, 143 104"
              stroke={ACCENT_DEEP}
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M74 54 C 74 45, 80 40, 90 40 h22 c10 0 16 5 16 14 v20 c0 9 -6 14 -16 14 h-22 c-10 0 -16 -5 -16 -14 Z"
              fill={ACCENT}
            />
            <path
              d="M74 54 C 74 45, 80 40, 90 40 h22 c10 0 16 5 16 14 v3 h-54 Z"
              fill={ACCENT_DEEP}
            />
            <path d="M72 106 h17 v40 a8.5 8.5 0 0 1 -17 0 Z" fill={FUR} />
            <path d="M140 106 h17 v40 a8.5 8.5 0 0 1 -17 0 Z" fill={FUR} />
            <circle cx="160" cy="56" r="31" fill={FUR} />
            <path
              d="M173 58 C 192 53, 209 58, 211 67 C 213 78, 198 84, 179 81 C 170 79, 168 67, 173 58 Z"
              fill={CREAM}
            />
            <path d="M159 34 C 167 36, 171 45, 168 53 C 163 50, 159 43, 159 34 Z" fill={CREAM} />
            <ellipse cx="207" cy="65" rx="7.5" ry="6" fill="#2c2320" />
            <circle cx="169" cy="46" r="4.8" fill="#2c2320" />
            <path
              d="M147 30 C 133 33, 127 49, 132 68 C 136 81, 149 81, 151 68 C 154 52, 154 39, 147 30 Z"
              fill={FUR_DARK}
            />
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Outfit", data: medium, weight: 500, style: "normal" },
        { name: "Outfit", data: semibold, weight: 600, style: "normal" },
        { name: "SourceCode", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
