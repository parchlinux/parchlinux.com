import { buildCompositeFrame, FPS } from "@/lib/cli-art";

// Clean ANSI Terminal Sequence constants
const ESC = "\x1b";
const CLEAR_SCREEN_HOME = `${ESC}[2J${ESC}[H`;
const HIDE_CURSOR = `${ESC}[?25l`;
const SHOW_CURSOR = `${ESC}[?25h`;

// Safety caps for streaming
const FRAME_DELAY_MS = Math.floor(1000 / FPS); // ~40ms per frame (25 FPS)
const MAX_STREAM_FRAMES = 500; // ~20 seconds max stream duration to prevent orphaned processes

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const isStatic = url.searchParams.get("static") === "1";

  // If user requests ?static=1 or an environment that cannot handle streaming
  if (isStatic) {
    const staticOutput = buildCompositeFrame(0);
    return new Response(staticOutput + "\n", {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  const encoder = new TextEncoder();
  let frameIndex = 0;
  let timerId: ReturnType<typeof setInterval> | null = null;

  const stream = new ReadableStream({
    start(controller) {
      // Send initial clear screen and hide cursor
      try {
        controller.enqueue(encoder.encode(CLEAR_SCREEN_HOME + HIDE_CURSOR));
      } catch {
        return;
      }

      timerId = setInterval(() => {
        try {
          if (frameIndex >= MAX_STREAM_FRAMES) {
            if (timerId) clearInterval(timerId);
            // Restore cursor before finishing stream
            controller.enqueue(encoder.encode(SHOW_CURSOR + "\n"));
            controller.close();
            return;
          }

          const t = frameIndex / FPS;
          const frameBody = buildCompositeFrame(t);

          // Return to home position without flickering, then write frame
          const chunk = `${ESC}[H${frameBody}\n`;
          controller.enqueue(encoder.encode(chunk));

          frameIndex++;
        } catch {
          // If connection was closed by client (e.g. user pressed Ctrl+C or closed curl)
          if (timerId) clearInterval(timerId);
          try {
            controller.close();
          } catch {
            // Ignore already closed controllers
          }
        }
      }, FRAME_DELAY_MS);
    },
    cancel() {
      // Clean up timer when connection is cancelled (e.g. client disconnects or aborts)
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
