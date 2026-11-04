"use client";

import { useEffect } from "react";

/**
 * Calm breakpoint changes.
 *
 * Tailwind's breakpoints reshape a page all at once when the window crosses one: columns
 * reflow, blocks stack, type changes size. Resizing a window, snapping it to half the screen or
 * turning a tablet then reads as a jump. This keeps a fresh record of where every block sits;
 * when a breakpoint is crossed it eases each visible block from where it was to where it now is
 * (FLIP), grows or shrinks headings whose size changed, and fades in what just appeared.
 *
 * Layout is never delayed or recalculated by this: the page is already in its new shape and
 * only a transform and opacity ease it there, so links and text stay where the browser put
 * them. Nothing runs for people who ask their system for reduced motion.
 */

const BREAKPOINTS = [640, 768, 1024, 1280, 1536]; // Tailwind: sm md lg xl 2xl
const DURATION = 650;
const FADE = 450;
const EASE = "cubic-bezier(0.33, 1, 0.68, 1)"; // ease-out, soft enough that the last third is still seen
const MAX_TRACKED = 2500;
const MAX_ANIMATED = 400;
const TEXT_TAGS = new Set(["H1", "H2", "H3", "H4", "P", "IMG", "VIDEO", "PICTURE", "FIGURE", "LI", "BLOCKQUOTE", "PRE", "TABLE"]);
const SCALE_TAGS = new Set(["H1", "H2", "H3", "H4", "P"]);
const MEDIA_TAGS = new Set(["IMG", "VIDEO", "PICTURE"]);
const LAYOUT_DISPLAY = /^(inline-)?(flex|grid)$/;
const KEY = "responsive-motion";

type Box = { x: number; y: number; w: number; h: number; fs: number; fixed: boolean };

const bucket = (w: number) => BREAKPOINTS.filter((b) => w >= b).length;

function trackable(): HTMLElement[] {
  const out: HTMLElement[] = [];
  for (const el of document.body.querySelectorAll<HTMLElement>("*")) {
    if (out.length >= MAX_TRACKED) break;
    if (!(el instanceof HTMLElement) || el.closest("svg, script, style, noscript, template")) continue;
    const parent = el.parentElement;
    if (TEXT_TAGS.has(el.tagName) || (parent && LAYOUT_DISPLAY.test(getComputedStyle(parent).display))) out.push(el);
  }
  return out;
}

let fixedCache = new WeakMap<HTMLElement, boolean>();       // reset whenever the page is re-read

function inFixed(el: HTMLElement, cache = fixedCache): boolean {
  const known = cache.get(el);
  if (known !== undefined) return known;
  const parent = el.parentElement;
  const fixed = getComputedStyle(el).position === "fixed" || (!!parent && parent !== document.body && inFixed(parent, cache));
  cache.set(el, fixed);
  return fixed;
}

// A transform on any ancestor of a fixed element makes that ancestor its containing block, so
// the fixed header would ride along with the page instead of staying on the window. Those
// ancestors are never moved or faded; their children move instead.
function holdsFixed(): Set<Element> {
  const held = new Set<Element>();
  for (const el of document.body.querySelectorAll<HTMLElement>("*"))
    if (getComputedStyle(el).position === "fixed")
      for (let p = el.parentElement; p && !held.has(p); p = p.parentElement) held.add(p);
  return held;
}

// where each element is: page coordinates, or window coordinates inside a fixed header
function measure(els: HTMLElement[]): Map<HTMLElement, Box> {
  const boxes = new Map<HTMLElement, Box>();
  const sx = window.scrollX, sy = window.scrollY;
  for (const el of els) {
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;               // hidden at this width
    const fixed = inFixed(el);
    const fs = SCALE_TAGS.has(el.tagName) ? parseFloat(getComputedStyle(el).fontSize) || 0 : 0;
    boxes.set(el, { x: r.left + (fixed ? 0 : sx), y: r.top + (fixed ? 0 : sy), w: r.width, h: r.height, fs, fixed });
  }
  return boxes;
}

export default function ResponsiveMotion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let tracked: HTMLElement[] = [];
    let before = new Map<HTMLElement, Box>();
    let lastBucket = bucket(window.innerWidth);
    let lastScroll = { x: window.scrollX, y: window.scrollY };
    let rebuildTimer = 0;
    let watchUntil = 0;

    const baseline = () => {
      fixedCache = new WeakMap();
      tracked = trackable();
      before = measure(tracked);
      lastScroll = { x: window.scrollX, y: window.scrollY };
    };
    const later = () => {
      window.clearTimeout(rebuildTimer);
      rebuildTimer = window.setTimeout(baseline, 400);
    };

    const running = () =>
      document.getAnimations().filter((a) => (a as Animation & { id: string }).id === KEY);

    const nearView = (b: Box, sx: number, sy: number) => {
      const top = b.fixed ? b.y : b.y - sy, left = b.fixed ? b.x : b.x - sx;
      return top < window.innerHeight + 120 && top + b.h > -120 && left < window.innerWidth + 120 && left + b.w > -120;
    };

    const fadeIn = (el: HTMLElement) =>
      Object.assign(el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: FADE, easing: EASE }), { id: KEY });

    const glide = () => {
      const old = before, oldScroll = lastScroll;
      running().forEach((a) => a.cancel());                     // a second crossing restarts from where things are seen
      tracked = trackable();
      const now = measure(tracked);
      const sx = window.scrollX, sy = window.scrollY;
      const held = holdsFixed();
      // `whole`: this element moves (or fades) as one piece, so nothing inside it needs its own motion
      const moved = new Map<HTMLElement, { dx: number; dy: number; whole: boolean }>();
      let count = 0;

      for (const el of tracked) {
        const b = now.get(el);
        if (!b || held.has(el) || !nearView(b, sx, sy) || count >= MAX_ANIMATED) continue;
        const a = old.get(el);

        // the nearest ancestor that is already moving carries this one along
        let carrier: { dx: number; dy: number; whole: boolean } | undefined;
        for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
          carrier = moved.get(p);
          if (carrier) break;
        }
        if (carrier?.whole) continue;

        if (!a) {                                                // shown at this width only: fade it in
          if (!carrier) { fadeIn(el); moved.set(el, { dx: 0, dy: 0, whole: true }); count++; }
          continue;
        }
        // where it was on screen a moment ago, against where it is now
        // measured from the reading edge (left, or right in Persian), so a block whose width changed
        // stays anchored where its first word is
        const rtl = getComputedStyle(el).direction === "rtl";
        const ax = (a.fixed ? a.x : a.x - oldScroll.x) + (rtl ? a.w : 0), ay = a.fixed ? a.y : a.y - oldScroll.y;
        const bx = (b.fixed ? b.x : b.x - sx) + (rtl ? b.w : 0), by = b.fixed ? b.y : b.y - sy;
        const pageDx = ax - bx, pageDy = ay - by;
        const dx = pageDx - (carrier?.dx ?? 0), dy = pageDy - (carrier?.dy ?? 0);
        // text whose size changed grows or shrinks back; a picture whose width changed does too
        const s = a.fs && b.fs && Math.abs(a.fs - b.fs) > 0.5 ? a.fs / b.fs
          : MEDIA_TAGS.has(el.tagName) && Math.abs(a.w - b.w) > 1 ? a.w / b.w : 1;
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1 && s === 1) continue;

        const frames: Keyframe[] = s === 1
          ? [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }]
          : [{ transform: `translate(${dx}px, ${dy}px) scale(${s})` }, { transform: "none" }];
        // `add`: on top of any transform the element already has, never instead of it
        Object.assign(el.animate(frames, { duration: DURATION, easing: EASE, composite: "add" }), { id: KEY });
        if (s !== 1) {
          // the origin must replace the element's own (added to `50% 50%` it would still be the centre)
          const origin = `${rtl ? b.w : 0}px 0px`;
          Object.assign(el.animate([{ transformOrigin: origin }, { transformOrigin: origin }], { duration: DURATION }), { id: KEY });
        }
        moved.set(el, { dx: pageDx, dy: pageDy, whole: s !== 1 });
        count++;
      }
      before = now;
      lastScroll = { x: sx, y: sy };
      watchUntil = performance.now() + 600;                     // React swaps the header a moment later
    };

    const onResize = () => {
      if (reduce.matches) return;
      const b = bucket(window.innerWidth);
      if (b !== lastBucket) {
        lastBucket = b;
        glide();
      } else {
        before = measure(tracked);                              // keep the record fresh while dragging
        lastScroll = { x: window.scrollX, y: window.scrollY };
      }
    };
    const onScroll = () => {
      lastScroll = { x: window.scrollX, y: window.scrollY };
    };

    // what React adds right after a crossing (the menu button replacing the links) fades in too
    const mo = new MutationObserver((records) => {
      if (performance.now() < watchUntil && !reduce.matches) {
        const held = holdsFixed();
        for (const r of records)
          for (const n of r.addedNodes)
            if (n instanceof HTMLElement && !held.has(n) && n.getBoundingClientRect().width > 0) fadeIn(n);
      }
      later();
    });

    baseline();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("load", later);
    mo.observe(document.body, { childList: true, subtree: true });
    const ro = new ResizeObserver(later);                       // images loading change the page's height
    ro.observe(document.body);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("load", later);
      mo.disconnect();
      ro.disconnect();
      window.clearTimeout(rebuildTimer);
    };
  }, []);

  return null;
}
