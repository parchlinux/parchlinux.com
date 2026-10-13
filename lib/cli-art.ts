/**
 * Parch Linux ASCII Artwork & Terminal Color Utilities
 * Based on the official Parch Linux logo (Boteh Jegheh / Paisley symbol).
 */

export const COLS = 42;
export const ROWS = 30;
export const FPS = 15; // Smooth but low network overhead
export const START = 0.5;
export const PASS = 2.0;
export const HEAD = 2;
export const TRAIL = 5;
export const NOISE = "#$%&*+<=>?@[]{}";

// The logo's 4 colors in 3 brightness tiers (drawn, +lighter, +highlight)
export const PALETTE_RGB: [number, number, number][] = [
  // Base Tier
  [0, 255, 136], // 0: Mint Green
  [0, 128, 255], // 1: Sky Blue
  [0, 169, 255], // 2: Parch Blue
  [0, 234, 255], // 3: Parch Cyan
  // Mid Scan Tier
  [89, 255, 178],
  [89, 172, 255],
  [89, 199, 255],
  [89, 241, 255],
  // High Scan Tier
  [179, 255, 219],
  [179, 217, 255],
  [179, 229, 255],
  [179, 249, 255],
];

export const MONO = String.raw`
                      __pppp8888"'
                  _pp88888888P"
               _p88888888888P
            _p8888888888888P
          _p888888888888888|
          88888888888888888
           "888888888888888,
      _88q__ "8888888888888p
     _8888888qq8888888888888,
    _888888888888888888888888_
   .88888888888888888888888888p
   q888888888888888888888888888q,
  .888888888888888888888888888888,
  |8888888888888888888888888888888_
  q88888888888888888888888888888888p
  d888888888888888888888888888888888p
  d8888888888888888888888888888888888(
  d8888888888888888888888888888888P"
  "88888888"\p88888888888888888P"
   8888P"'_p88888888888888888__pppppq88p
   """  _p88888888888888888888888888888b
       _88888888888888888888888888888888
      q88888888888888888888888888888888P
      888888888888888888888888888888888|
       Y8888888888888888888888888888888
        "88888888888888888888888888888'
         'Y88888888888888888888888888'
           'Y8888888888888888888888"
              "888888888888888888"
                 ""Y88888888P""
`;

export const INK = String.raw`
                      000000000000
                  0000000000000
               00000000000000
            0000000000000000
          000000000000000000
          00000000000000000
           00000000000000000
      222222 000000000000000
     222222222200000000000000
    22222222222222200000000000
   2222222222222222222200000000
   222222222222222222222222000333
  22222222222222222222222222333333
  222222222222222222222223333333333
  2222222222222222222223333333333333
  22222222222222222233333333333333333
  222222222222222233333333333333333333
  2222222222222333333333333333333333
  2222222222333333333333333333333
   2222222133333333333333333300000000000
   222  11111111111111111000000000000000
       111111111111111000000000000000000
      1111111111110000000000000000000000
      1111111110000000000000000000000000
       11110000000000000000000000000000
        1000000000000000000000000000000
         00000000000000000000000000000
           0000000000000000000000000
              00000000000000000000
                 00000000000000
`;

const parseLines = (art: string) => {
  const raw = art.split("\n");
  if (raw.length > 0 && raw[0].trim() === "") raw.shift();
  if (raw.length > 0 && raw[raw.length - 1].trim() === "") raw.pop();
  return raw.map((l) => (l || "").padEnd(COLS));
};

const monoLines = parseLines(MONO);
const inkLines = parseLines(INK);
const totalLogoRows = monoLines.length;

function hash(x: number, y: number, k: number): number {
  let h =
    Math.imul(x, 73856093) ^
    Math.imul(y, 19349663) ^
    Math.imul(k, 83492791);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return (h ^ (h >>> 16)) >>> 0;
}

let firstRow = totalLogoRows;
let lastRow = -1;
monoLines.forEach((line, y) => {
  if (line.trim()) {
    firstRow = Math.min(firstRow, y);
    lastRow = Math.max(lastRow, y);
  }
});

const span = lastRow - firstRow + 1 + HEAD + TRAIL;
const every = 3.5;

/**
 * Renders a single frame of the Parch ASCII logo at time `t` (seconds).
 */
export function renderLogoFrame(t: number): string[] {
  const since = t - START;
  const at =
    since >= 0 ? firstRow + (span * (since % every)) / PASS : -Infinity;
  const tick = Math.floor((t * FPS) / 2);
  const out: string[] = [];

  for (let y = 0; y < totalLogoRows; y++) {
    const d = at - y;
    const level =
      d >= 0 && d < HEAD ? 2 : d >= HEAD && d < HEAD + TRAIL ? 1 : 0;
    let line = "";
    const mLine = monoLines[y] || "".padEnd(COLS);
    const iLine = inkLines[y] || "".padEnd(COLS);

    for (let x = 0; x < COLS; x++) {
      let ch = mLine[x] || " ";
      if (ch && ch !== " ") {
        if (level === 2) {
          const h = hash(x, y, tick);
          if (h % 4) ch = NOISE[(h >>> 2) % NOISE.length];
        }
        const inkVal = parseInt(iLine[x] || "0", 36);
        const colorIndex = level * 4 + (inkVal % 4);
        const rgb = PALETTE_RGB[colorIndex % PALETTE_RGB.length];
        line += `\x1b[38;2;${rgb[0]};${rgb[1]};${rgb[2]}m${ch}\x1b[0m`;
      } else {
        line += " ";
      }
    }
    out.push(line);
  }

  return out;
}

/**
 * Compact right-side dashboard info formatted to fit cleanly beside the 42-col logo.
 * Total line length stays strictly under 85 columns.
 */
export const COMPACT_DASHBOARD_INFO = [
  "  \x1b[1;38;2;0;234;255mPARCH GNU/LINUX\x1b[0m",
  "  \x1b[90mAn Arch-based distribution.\x1b[0m",
  "  \x1b[90mFast, elegant, and lightweight.\x1b[0m",
  "",
  "  \x1b[1;36mOFFICIAL EDITIONS:\x1b[0m",
  "    \x1b[38;2;0;234;255m• Plasma 6\x1b[0m       \x1b[90mKDE 6 desktop\x1b[0m",
  "    \x1b[38;2;0;169;255m• GNOME\x1b[0m          \x1b[90mModern and focused\x1b[0m",
  "    \x1b[38;2;0;255;136m• XFCE\x1b[0m           \x1b[90mLow-spec machines\x1b[0m",
  "    \x1b[38;2;255;180;0m• Hyprland (RC)\x1b[0m  \x1b[90mWayland tiling\x1b[0m",
  "",
  "  \x1b[1;36mDOWNLOAD RELEASES:\x1b[0m",
  "    \x1b[4mhttps://parchlinux.com/download\x1b[0m",
  "",
  "  \x1b[1;36mCOMMUNITY & DOCS:\x1b[0m",
  "    \x1b[1mForum:\x1b[0m   https://forum.parchlinux.com",
  "    \x1b[1mWiki:\x1b[0m    https://wiki.parchlinux.com",
  "    \x1b[1mGitHub:\x1b[0m  https://github.com/parchlinux",
  "    \x1b[1mBrand:\x1b[0m   https://parchlinux.com/presskit",
  "",
  "  \x1b[90m──────────────────────────────────────\x1b[0m",
  "  \x1b[33mWeb:\x1b[0m   https://parchlinux.com",
  "  \x1b[90mLive:  curl -sN parchlinux.com/live\x1b[0m",
];

/**
 * Builds the side-by-side terminal composite frame.
 */
export function buildCompositeFrame(t: number): string {
  const logoLines = renderLogoFrame(t);
  const totalRows = Math.max(logoLines.length, COMPACT_DASHBOARD_INFO.length);
  const result: string[] = [];

  for (let r = 0; r < totalRows; r++) {
    const logoPart = logoLines[r] ?? "".padEnd(COLS);
    const infoPart = COMPACT_DASHBOARD_INFO[r] ?? "";
    result.push(`${logoPart} ${infoPart}`);
  }

  return result.join("\n");
}
