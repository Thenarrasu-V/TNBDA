/**
 * usePointerMotion — TNBDA Interactive Background System
 *
 * Unified pointer tracking (mouse / touch / stylus) via Pointer Events API.
 * Writes smoothed coordinates to CSS custom properties on <html> element.
 * Uses requestAnimationFrame + lerp — ZERO React re-renders per frame.
 *
 * CSS vars written:
 *   --mx      : 0–1 (normalised X, 0=left, 1=right)
 *   --my      : 0–1 (normalised Y, 0=top, 1=bottom)
 *   --mx-px   : px from viewport center (negative=left)
 *   --my-px   : px from viewport center (negative=top)
 *   --scroll-y: scroll progress 0–1
 *
 * Intensity levels (auto-detected):
 *   'full'    — Desktop with mouse, powerful device
 *   'medium'  — Touch laptop / tablet / mid-range
 *   'minimal' — Mobile phone / older device
 *   'none'    — prefers-reduced-motion
 */
import { useEffect, useRef } from 'react';

// ── Lerp ────────────────────────────────────────────────────────────────────
function lerp(a, b, t) {
  return a + (b - a) * t;
}

// ── Capability Detection ─────────────────────────────────────────────────────
function detectIntensity() {
  // Mandatory accessibility check first
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'none';

  const hasTouch  = navigator.maxTouchPoints > 0;
  const threads   = navigator.hardwareConcurrency || 2;
  const dpr       = window.devicePixelRatio || 1;
  const w         = window.innerWidth;

  // Very small screen — minimal
  if (w < 480) return 'minimal';

  // Tablet-range — medium
  if (w < 1024 || (hasTouch && w < 1200)) return 'medium';

  // Large screen with a proper CPU
  if (threads >= 4 && !hasTouch) return 'full';
  if (threads >= 4 && hasTouch)  return 'medium';

  return 'minimal';
}

// ── Particle count by intensity ───────────────────────────────────────────────
export const PARTICLE_COUNTS = {
  full:    60,
  medium:  30,
  minimal: 10,
  none:    0,
};

// ── Hook ─────────────────────────────────────────────────────────────────────
export function usePointerMotion() {
  const intensity  = useRef(detectIntensity());
  const rafId      = useRef(null);
  const raw        = useRef({ x: 0.5, y: 0.5 });   // raw normalised position
  const smooth     = useRef({ x: 0.5, y: 0.5 });   // lerped position
  const active     = useRef(false);                 // pointer is over page

  useEffect(() => {
    const root  = document.documentElement;
    const level = intensity.current;

    if (level === 'none') {
      // Write neutral values and bail
      root.style.setProperty('--mx',      '0.5');
      root.style.setProperty('--my',      '0.5');
      root.style.setProperty('--mx-px',   '0');
      root.style.setProperty('--my-px',   '0');
      root.style.setProperty('--scroll-y','0');
      root.style.setProperty('--intensity','0');
      return;
    }

    // Smoothing factor — slower on mobile (more subtle)
    const smoothing = level === 'full' ? 0.06 : level === 'medium' ? 0.04 : 0.025;

    // Intensity multiplier for glow/parallax strength
    const intensityVal = level === 'full' ? 1 : level === 'medium' ? 0.6 : 0.3;
    root.style.setProperty('--intensity', String(intensityVal));

    // ── Pointer move ──────────────────────────────────────────────────────
    const onPointerMove = (e) => {
      // Ignore if pointer is over a control element
      active.current = true;
      raw.current.x = e.clientX / window.innerWidth;
      raw.current.y = e.clientY / window.innerHeight;
    };

    // ── Pointer leave ─────────────────────────────────────────────────────
    const onPointerLeave = () => {
      active.current = false;
      // raw drifts back to center in the rAF loop
    };

    // ── Tap ripple (touch + mouse click) ─────────────────────────────────
    const onPointerDown = (e) => {
      // Don't fire ripple on interactive elements
      if (e.target.closest('a, button, input, textarea, select, [role="button"]')) return;

      const ripple = new CustomEvent('tnbda:ripple', {
        detail: { x: e.clientX, y: e.clientY, type: e.pointerType },
      });
      document.dispatchEvent(ripple);
    };

    // ── Scroll ────────────────────────────────────────────────────────────
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress  = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      root.style.setProperty('--scroll-y', progress.toFixed(4));
      // Raw scroll offset for parallax layers (0 = top)
      root.style.setProperty('--scroll-offset', String(window.scrollY));
    };

    // ── rAF Loop ──────────────────────────────────────────────────────────
    const tick = () => {
      const targetX = active.current ? raw.current.x : 0.5;
      const targetY = active.current ? raw.current.y : 0.5;

      smooth.current.x = lerp(smooth.current.x, targetX, smoothing);
      smooth.current.y = lerp(smooth.current.y, targetY, smoothing);

      const sx = smooth.current.x;
      const sy = smooth.current.y;
      const cx = (sx - 0.5) * window.innerWidth;   // offset from center in px
      const cy = (sy - 0.5) * window.innerHeight;

      root.style.setProperty('--mx',    sx.toFixed(4));
      root.style.setProperty('--my',    sy.toFixed(4));
      root.style.setProperty('--mx-px', cx.toFixed(1) + 'px');
      root.style.setProperty('--my-px', cy.toFixed(1) + 'px');

      rafId.current = requestAnimationFrame(tick);
    };

    // ── Attach listeners ──────────────────────────────────────────────────
    window.addEventListener('pointermove',  onPointerMove,  { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });
    window.addEventListener('pointerdown',  onPointerDown,  { passive: true });
    window.addEventListener('scroll',       onScroll,       { passive: true });

    // Init scroll value
    onScroll();

    // Start loop
    rafId.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('pointermove',  onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('pointerdown',  onPointerDown);
      window.removeEventListener('scroll',       onScroll);
    };
  }, []);

  return intensity.current;
}
