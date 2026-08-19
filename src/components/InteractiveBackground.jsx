/**
 * InteractiveBackground — TNBDA
 *
 * Section-variant layered background canvas.
 * All layers have pointer-events: none.
 *
 * Variants:
 *   hero        — strongest: particles + grid + glow
 *   about       — soft radial + floating shapes
 *   objectives  — fine grid + glow
 *   rules       — line pattern
 *   incentives  — progression glow
 *   welfare     — warm ambient + shapes
 *   roadmap     — timeline glow
 *   contact     — minimal ambient
 *   footer      — slow movement only
 */
import React, { useEffect, useRef } from 'react';
import { PARTICLE_COUNTS } from '../hooks/usePointerMotion';

// ── Particle Canvas ───────────────────────────────────────────────────────────
function ParticleCanvas({ variant, theme, intensity }) {
  const canvasRef = useRef(null);
  const stateRef  = useRef(null);

  useEffect(() => {
    const canvas  = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const count = PARTICLE_COUNTS[intensity] || 0;

    if (count === 0) return;

    // Scale particle count per variant (less in contact/footer)
    const variantScale = {
      hero: 1, about: 0.7, objectives: 0.6, rules: 0.5,
      incentives: 0.6, welfare: 0.7, roadmap: 0.5, contact: 0.3, footer: 0.2,
    };
    const numParticles = Math.floor(count * (variantScale[variant] || 0.5));

    let W = 0, H = 0;
    let animId = null;
    let mx = 0.5, my = 0.5; // smoothed from CSS vars

    // Theme-aware colours
    const isDark = theme === 'dark';
    const goldRGBA   = isDark ? '245,166,35'  : '180,83,9';
    const redRGBA    = isDark ? '231,76,60'   : '234,88,12';
    const connectOpa = isDark ? 0.07          : 0.05;

    // Build particle pool
    function mkParticle() {
      const r = Math.random();
      return {
        x:   Math.random(),       // normalised 0-1
        y:   Math.random(),
        vx:  (Math.random() - 0.5) * 0.0002,
        vy:  (Math.random() - 0.5) * 0.0002,
        r:   1.5 + Math.random() * 2,
        opa: 0.08 + Math.random() * 0.18,
        col: r > 0.85 ? redRGBA : goldRGBA,
      };
    }

    // Resize
    function resize() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
    }

    // Observe parent size
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement || canvas);
    resize();

    const particles = Array.from({ length: numParticles }, mkParticle);

    // ── Draw Loop ─────────────────────────────────────────────────────────
    const maxDist   = W * 0.18 || 120;  // connection distance
    const pointerR  = intensity === 'full' ? 0.25 : 0.15; // normalised repel radius

    function draw() {
      if (!W || !H) { animId = requestAnimationFrame(draw); return; }

      // Read current pointer position from CSS var (already smoothed)
      const rootStyle = getComputedStyle(document.documentElement);
      const rawMx = parseFloat(rootStyle.getPropertyValue('--mx') || 0.5);
      const rawMy = parseFloat(rootStyle.getPropertyValue('--my') || 0.5);
      // Secondary lerp for particle system (slower than glow)
      mx = mx + (rawMx - mx) * 0.03;
      my = my + (rawMy - my) * 0.03;

      ctx.clearRect(0, 0, W, H);

      const pxX = mx * W;
      const pxY = my * H;
      const repelR = pointerR * Math.min(W, H);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pointer interaction — gentle push/pull
        const dx = p.x * W - pxX;
        const dy = p.y * H - pxY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < repelR && dist > 1) {
          const force = (1 - dist / repelR) * 0.0003;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Base drift
        p.x += (Math.random() - 0.5) * 0.00008;
        p.y += (Math.random() - 0.5) * 0.00008;

        // Wrap
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;

        const px = p.x * W;
        const py = p.y * H;

        // Draw particle
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.col},${p.opa})`;
        ctx.fill();

        // Connection lines (only full/medium, not too many)
        if (intensity !== 'minimal') {
          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const ldx = px - q.x * W;
            const ldy = py - q.y * H;
            const ld  = Math.sqrt(ldx * ldx + ldy * ldy);
            if (ld < maxDist) {
              const opa = connectOpa * (1 - ld / maxDist);
              ctx.beginPath();
              ctx.moveTo(px, py);
              ctx.lineTo(q.x * W, q.y * H);
              ctx.strokeStyle = `rgba(${goldRGBA},${opa})`;
              ctx.lineWidth   = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    stateRef.current = { particles, animId };

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [variant, theme, intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:       'absolute',
        inset:          0,
        width:          '100%',
        height:         '100%',
        pointerEvents:  'none',
        display:        'block',
      }}
    />
  );
}

// ── Ripple Manager ────────────────────────────────────────────────────────────
function RippleLayer({ theme }) {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const isDark = theme === 'dark';
    const color  = isDark ? 'rgba(245,166,35,' : 'rgba(180,83,9,';

    const onRipple = (e) => {
      const { x, y } = e.detail;
      const rect = layer.getBoundingClientRect();
      const rx = x - rect.left;
      const ry = y - rect.top;

      const div = document.createElement('div');
      div.style.cssText = `
        position: absolute;
        left: ${rx}px;
        top: ${ry}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        background: radial-gradient(circle, ${color}0.15) 0%, transparent 70%);
        animation: tnbdaRippleAnim 0.8s ease-out forwards;
        pointer-events: none;
      `;
      layer.appendChild(div);
      setTimeout(() => div.remove(), 850);
    };

    document.addEventListener('tnbda:ripple', onRipple);
    return () => document.removeEventListener('tnbda:ripple', onRipple);
  }, [theme]);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function InteractiveBackground({ variant = 'hero', theme = 'dark', intensity = 'medium' }) {
  const isDark = theme === 'dark';

  // Variant-specific glow colours (dark / light)
  const glowColors = {
    hero:       isDark ? '245,166,35' : '180,83,9',
    about:      isDark ? '245,166,35' : '180,83,9',
    objectives: isDark ? '245,166,35' : '180,83,9',
    rules:      isDark ? '231,76,60'  : '234,88,12',
    incentives: isDark ? '245,166,35' : '180,83,9',
    welfare:    isDark ? '245,166,35' : '180,83,9',
    roadmap:    isDark ? '231,76,60'  : '234,88,12',
    contact:    isDark ? '245,166,35' : '180,83,9',
    footer:     isDark ? '245,166,35' : '180,83,9',
  };

  const glowColor = glowColors[variant] || glowColors.hero;

  // Glow opacity by variant and intensity
  const glowOpa = {
    hero: 0.18, about: 0.12, objectives: 0.10, rules: 0.10,
    incentives: 0.12, welfare: 0.12, roadmap: 0.10, contact: 0.08, footer: 0.05,
  };
  const glowOpacity = intensity === 'none' ? 0 : (glowOpa[variant] || 0.10);

  // Glow radius
  const glowRadius = variant === 'hero' ? '35vw' : '28vw';

  const showParticles = intensity !== 'none' && variant !== 'footer';

  return (
    <div
      aria-hidden="true"
      className={`ibg ibg--${variant}`}
      style={{
        position:      'absolute',
        inset:         0,
        overflow:      'hidden',
        pointerEvents: 'none',
        zIndex:        0,
      }}
    >
      {/* Layer 1: slow ambient gradient — pure CSS keyframe, no JS */}
      <div className="ibg-ambient" />

      {/* Layer 2: particle canvas */}
      {showParticles && (
        <ParticleCanvas variant={variant} theme={theme} intensity={intensity} />
      )}

      {/* Layer 3: pointer-reactive radial glow */}
      {intensity !== 'none' && (
        <div
          className="ibg-glow"
          style={{
            // Glow tracks the smoothed CSS vars
            background: `radial-gradient(
              ${glowRadius} ${glowRadius} at calc(var(--mx, 0.5) * 100%) calc(var(--my, 0.5) * 100%),
              rgba(${glowColor},${glowOpacity}) 0%,
              transparent 70%
            )`,
          }}
        />
      )}

      {/* Layer 4: subtle dot/grid pattern */}
      <div className={`ibg-grid ibg-grid--${variant}`} />

      {/* Layer 5: tap ripple layer */}
      {intensity !== 'none' && <RippleLayer theme={theme} />}
    </div>
  );
}
