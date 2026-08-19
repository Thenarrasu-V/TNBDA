import React, { useRef, useEffect } from 'react';
import { tnbdaData } from '../data/tnbdaData';
import InteractiveBackground from './InteractiveBackground';
import { PhoneIcon } from './ThemeIcons';

export default function HeroSection({ lang, theme, intensity = 'medium' }) {
  const isTa = lang === 'ta';
  const f = tnbdaData.founder;
  const cardRef = useRef(null);

  // ── Founder card subtle parallax ─────────────────────────────────────────
  useEffect(() => {
    if (intensity === 'none' || !cardRef.current) return;

    // Max translation and rotation — deliberately smaller for premium subtlety
    const maxT  = intensity === 'full' ? 5   : intensity === 'medium' ? 2.5  : 1.2;
    const maxR  = intensity === 'full' ? 1.2 : intensity === 'medium' ? 0.6  : 0.25;

    let rafId;
    let cx = 0, cy = 0;

    const tick = () => {
      const root = document.documentElement;
      const mx   = parseFloat(root.style.getPropertyValue('--mx') || '0.5');
      const my   = parseFloat(root.style.getPropertyValue('--my') || '0.5');

      // Subtle depth illusion — card moves opposite to pointer
      const tx = (mx - 0.5) * -maxT;
      const ty = (my - 0.5) * -maxT;
      const rx = (my - 0.5) *  maxR;
      const ry = (mx - 0.5) * -maxR;

      // Lerp — slow enough to feel like mass, fast enough to be responsive
      cx = cx + (tx - cx) * 0.04;
      cy = cy + (ty - cy) * 0.04;

      const card = cardRef.current;
      if (card) {
        card.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px) rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [intensity]);

  return (
    <section id="hero" style={{ position: 'relative' }}>
      {/* Interactive background */}
      <InteractiveBackground variant="hero" theme={theme} intensity={intensity} />

      {/* Static background layers (existing design preserved) */}
      <div className="hero-bg">
        <div className="hero-bg-image" style={{ backgroundImage: `url('/hero_bg.png')` }} />
        <div className="hero-grid-overlay" />
        <div className="hero-diagonal" />
        <div className="hero-stripe-1" />
        {/* Floating CSS particles */}
        <div className="hero-particles" aria-hidden="true">
          <span className="hero-particle" />
          <span className="hero-particle" />
          <span className="hero-particle" />
          <span className="hero-particle" />
          <span className="hero-particle" />
          <span className="hero-particle" />
          <span className="hero-particle" />
          <span className="hero-particle" />
        </div>
      </div>

      <div className="hero-content">
        <div className="container">
          <div className="hero-layout">

            {/* ── LEFT TOP: Text & CTAs ── */}
            <div className="hero-text-box">
              <div className="hero-eyebrow animate-up delay-1">
                <div className="hero-eyebrow-line" />
                <span className="hero-eyebrow-text">
                  {isTa ? 'தமிழ்நாடு வணிக மேம்பாட்டு சங்கம்' : 'Tamil Nadu Business Development Association'}
                </span>
              </div>

              <h1 className="hero-main-title animate-up delay-2">
                {isTa ? (
                  <>வணிகத்தால் <span className="gold-text">உயர்வோம்!</span><br />மனிதத்தால் <span className="red-text">இணைவோம்!</span></>
                ) : (
                  <>Rise through <span className="gold-text">Business!</span><br />Unite through <span className="red-text">Humanity!</span></>
                )}
              </h1>

              <div className="hero-slogan animate-up delay-3">
                {isTa
                  ? '"கொடுப்பவரே பெறுவார்" — Givers Gain'
                  : '"Givers Gain" — கொடுப்பவரே பெறுவார்'
                }
              </div>

              <p className="hero-description animate-up delay-3">
                {isTa
                  ? 'தமிழகத்தின் சிறு மற்றும் குறு தொழில்முனைவோரை உலகத்தரம் வாய்ந்த வணிகர்களாக மாற்ற உருவாக்கப்பட்ட ஒரு வலிமையான அமைப்பு. வணிகர்களின் உரிமைகளைப் பாதுகாக்கும் அரணாகவும், ஒருவருக்கொருவர் தோள் கொடுக்கும் குடும்பமாகவும் செயல்படுகிறோம்.'
                  : "A powerful organization established to transform Tamil Nadu's micro and small entrepreneurs into world-class business leaders. We serve as a fortress protecting traders' rights and as a supportive family where members stand by one another."
                }
              </p>

              <div className="hero-cta-row animate-up delay-4">
                <a href="#objectives" className="btn-gold">
                  {isTa ? '20 நோக்கங்களை காண்க' : 'Explore 20 Objectives'}
                  <span>→</span>
                </a>
                <a href="#contact" className="btn-red">
                  {isTa ? 'உறுப்பினராகுங்கள்' : 'Become a Member'}
                </a>
              </div>
            </div>

            {/* ── RIGHT: Premium Founder Card (On Mobile: Appears immediately after CTAs) ── */}
            <div className="founder-card-perspective">
              <article
                ref={cardRef}
                className="founder-card animate-up delay-3"
                aria-label={isTa ? 'நிறுவனர் சுயவிவர அட்டை' : 'Founder Profile Card'}
                style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
              >

                {/* Portrait Area — visual anchor */}
                <div className="founder-portrait-wrap">
                  <img
                    src="/Photo.jpeg"
                    alt={isTa
                      ? `Dr. E.V. தரண் ராஜா — TNBDA நிறுவனர் & மாநிலத் தலைவர்`
                      : `Dr. E.V. Tharan Raja — TNBDA Founder & State President`
                    }
                    className="founder-portrait-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const wrap = e.target.closest('.founder-portrait-wrap');
                      if (wrap) wrap.style.background = 'linear-gradient(160deg, #0e1d3a 0%, #1a2c52 100%)';
                    }}
                  />
                  {/* Portrait → card body gradient transition */}
                  <div className="founder-portrait-fade" aria-hidden="true" />
                  {/* Role tag anchored to portrait bottom */}
                  <div className="founder-role-anchor">
                    <span className="founder-role-tag">
                      {isTa ? 'நிறுவனர் & மாநிலத் தலைவர்' : 'Founder & State President'}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="founder-card-body">

                  {/* Identity: Name + Credentials */}
                  <header className="founder-identity">
                    <h2 className="founder-name">
                      {isTa ? 'Dr. E.V. தரண் ராஜா' : 'Dr. E.V. Tharan Raja'}
                    </h2>
                    <p className="founder-credentials">B.Com., PGDCA</p>
                  </header>

                  {/* Bio */}
                  <p className="founder-bio">
                    {isTa ? f.bioTa : f.bioEn}
                  </p>

                  {/* Philosophy — signature element */}
                  <div className="givers-gain-badge" aria-label={isTa ? 'தத்துவம்' : 'Founding Philosophy'}>
                    <span className="gg-label">{isTa ? 'சங்க தத்துவம்' : 'Founding Philosophy'}</span>
                    <span className="gg-philosophy">"Givers Gain"</span>
                    <span className="gg-translation">
                      {isTa ? 'கொடுப்பவரே பெறுவார்' : 'Those who Give, Receive'}
                    </span>
                  </div>

                  {/* Phone CTA */}
                  <a
                    href={`tel:+91${tnbdaData.contact.phone}`}
                    className="founder-cta-tel"
                    aria-label={`${isTa ? 'அழைக்கவும்' : 'Call'} +91 ${tnbdaData.contact.phone}`}
                  >
                    <PhoneIcon size={16} color="#000000" />
                    <span className="founder-cta-number">+91 {tnbdaData.contact.phone}</span>
                  </a>
                </div>
              </article>
            </div>

            {/* ── LEFT BOTTOM: Hero Stats ── */}
            <div className="hero-stats animate-up delay-5">
              <div className="hero-stat">
                <div className="number">20</div>
                <div className="label">{isTa ? 'முக்கிய நோக்கங்கள்' : 'Core Objectives'}</div>
              </div>
              <div className="hero-stat">
                <div className="number">20</div>
                <div className="label">{isTa ? 'சட்ட திட்டங்கள்' : 'Rules'}</div>
              </div>
              <div className="hero-stat">
                <div className="number">20</div>
                <div className="label">{isTa ? 'சமூக சேவைகள்' : 'Welfare Drives'}</div>
              </div>
              <div className="hero-stat">
                <div className="number">5</div>
                <div className="label">{isTa ? 'வளர்ச்சி நிலைகள்' : 'Growth Tiers'}</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-dot" />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
