import { buildCompositeFrame, FPS } from "@/lib/cli-art";

const ESC = "\x1b";
const ENTER_ALT_SCREEN = `${ESC}[?1049h`;
const EXIT_ALT_SCREEN = `${ESC}[?1049l`;
const HIDE_CURSOR = `${ESC}[?25l`;
const SHOW_CURSOR = `${ESC}[?25h`;
const CLEAR_SCREEN = `${ESC}[2J`;
const HOME = `${ESC}[H`;

// Animation config
const FRAME_DELAY_MS = Math.floor(1000 / FPS); // ~66ms
const MAX_STREAM_FRAMES = 300; // ~20 seconds max stream

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const isLive = url.searchParams.get("live") === "1" || url.pathname.endsWith("/live");

  // Default: Return the clean, single-frame dashboard with logo!
  // This behaves identically to wttr.in and cheat.sh, instantly printing without infinite scroll bugs.
  if (!isLive) {
    const frame = buildCompositeFrame(0);
    return new Response(frame + "\n", {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  // Live animation mode (?live=1 or /live) with full alternate screen buffer protection
  const encoder = new TextEncoder();
  let frameIndex = 0;
  let timerId: ReturnType<typeof setInterval> | null = null;

  const stream = new ReadableStream({
    start(controller) {
      // Enter alternate screen buffer, clear it, and hide cursor
      try {
        controller.enqueue(
          encoder.encode(ENTER_ALT_SCREEN + CLEAR_SCREEN + HOME + HIDE_CURSOR)
        );
      } catch {
        return;
      }

      timerId = setInterval(() => {
        try {
          if (frameIndex >= MAX_STREAM_FRAMES) {
            if (timerId) clearInterval(timerId);
            // Restore cursor and exit alternate screen buffer
            controller.enqueue(
              encoder.encode(SHOW_CURSOR + EXIT_ALT_SCREEN + "\n")
            );
            controller.close();
            return;
          }

          const t = frameIndex / FPS;
          const frameBody = buildCompositeFrame(t);

          // Write directly from top-left (HOME) with clear to prevent line tearing
          const chunk = `${HOME}${frameBody}`;
          controller.enqueue(encoder.encode(chunk));

          frameIndex++;
        } catch {
          if (timerId) clearInterval(timerId);
          try {
            controller.close();
          } catch {
            // Controller might already be closed
          }
        }
      }, FRAME_DELAY_MS);
    },
    cancel() {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Content-Type-Options": "nosniff",
      Connection: "keep-alive",
    },
  });
}
