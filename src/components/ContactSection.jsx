import React from 'react';
import { tnbdaData } from '../data/tnbdaData';
import InteractiveBackground from './InteractiveBackground';
import { MapPinIcon, PhoneIcon, WalletIcon, ChatIcon, TrophyIcon } from './ThemeIcons';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfojt_5Ur4r-wSwl52gkncQk9svYs6XQZSfsc7zNTk4S_w7Lg/viewform?usp=publish-editor';

export default function ContactSection({ lang, theme, intensity = 'medium' }) {
  const isTa = lang === 'ta';
  const lm = theme === 'light' ? ' light-mode' : '';
  const c = tnbdaData.contact;
  const isLight = theme === 'light';

  const gold   = isLight ? '#b45309' : 'var(--gold)';
  const red    = isLight ? '#c2410c' : 'var(--red-bright)';
  const green  = isLight ? '#059669' : '#10b981';
  const muted  = isLight ? '#78614e' : '#94a3b8';
  const body   = isLight ? '#4a3728' : '#cbd5e1';
  const cardBg = isLight ? '#ffffff' : 'rgba(245,166,35,0.04)';
  const cardBdr = isLight ? 'rgba(180,83,9,0.2)' : 'rgba(245,166,35,0.2)';
  const cardShadow = isLight ? '0 4px 24px rgba(120,60,20,0.08)' : '0 4px 24px rgba(0,0,0,0.3)';

  return (
    <section id="contact" style={{ position: 'relative' }}>
      <InteractiveBackground variant="contact" theme={theme} intensity={intensity} />
      <div className="container">

        {/* Section header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className={`section-label${lm}`} style={{ display: 'inline-flex' }}>
            {isTa ? 'தொடர்பு & உறுப்பினர் சேர்க்கை' : 'Contact & Membership'}
          </div>
          <h2 className="section-h2">
            {isTa ? (
              <>TNBDA சங்கத்தில் <span style={{ color: red }}>இணையுங்கள்!</span></>
            ) : (
              <>Join the <span style={{ color: red }}>TNBDA Network!</span></>
            )}
          </h2>
        </div>

        {/* ── Two-column layout ── */}
        <div className="contact-two-col">

          {/* LEFT — contact details */}
          <div className="reveal reveal-delay-1" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            <h3 className={`contact-tagline${lm}`}>
              {isTa ? (
                <>"வணிகத்தால் உயர்வோம்!<br /><span className="gold-text">மனிதத்தால் இணைவோம்!"</span></>
              ) : (
                <>"Rise through Business!<br /><span className="gold-text">Unite through Humanity!"</span></>
              )}
            </h3>
            <p className={`contact-sub${lm}`}>
              {isTa
                ? 'உங்கள் வணிகத்தை அடுத்த கட்டத்திற்கு எடுத்துச் செல்ல இன்றே TNBDA-யில் இணையுங்கள். ஆண்டுச் சந்தா வெறும் ₹3,000 மட்டுமே.'
                : 'Take your business to the next level by joining TNBDA today. Annual membership is just ₹3,000 — payable by April 30.'}
            </p>

            {/* Address */}
            <div className={`contact-detail-item reveal reveal-delay-2${lm}`}>
              <div className={`contact-detail-icon${lm}`}>
                <MapPinIcon size={20} color={gold} />
              </div>
              <div>
                <div className={`contact-detail-label${lm}`}>
                  {isTa ? 'தலைமையகம்' : 'Headquarters'}
                </div>
                <div className={`contact-detail-value${lm}`} style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                  {isTa ? c.addressTa : c.addressEn}
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className={`contact-detail-item reveal reveal-delay-3${lm}`}>
              <div className={`contact-detail-icon${lm}`}>
                <PhoneIcon size={20} color={gold} />
              </div>
              <div>
                <div className={`contact-detail-label${lm}`}>
                  {isTa ? 'தொடர்பு எண்' : 'Phone Contact'}
                </div>
                <div className={`contact-detail-value${lm}`}>
                  <a href={`tel:+91${c.phone}`} style={{ color: gold, textDecoration: 'none', fontSize: '1.1rem' }}>
                    +91 {c.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Fee */}
            <div className={`contact-detail-item reveal reveal-delay-4${lm}`}>
              <div className={`contact-detail-icon${lm}`}>
                <WalletIcon size={20} color={gold} />
              </div>
              <div>
                <div className={`contact-detail-label${lm}`}>
                  {isTa ? 'ஆண்டுச் சந்தா' : 'Annual Membership Fee'}
                </div>
                <div className={`contact-detail-value${lm}`} style={{ color: green }}>
                  {isTa ? c.feeTa : c.feeEn}
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/91${c.phone}?text=Hello%20TNBDA,%20I%20want%20to%20join%20the%20association`}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-btn reveal reveal-delay-5"
            >
              <ChatIcon size={18} color="#ffffff" />
              <span>{isTa ? 'WhatsApp-ல் இணையுங்கள்' : 'Chat on WhatsApp'}</span>
            </a>
          </div>

          {/* RIGHT — membership CTA card */}
          <div className="reveal reveal-delay-2" style={{
            background: cardBg,
            border: `1px solid ${cardBdr}`,
            borderRadius: '12px',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            boxShadow: cardShadow,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
          }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 1rem',
              background: isLight ? 'rgba(180,83,9,0.08)' : 'rgba(245,166,35,0.1)',
              border: `1px solid ${cardBdr}`,
              borderRadius: '999px',
              fontSize: '0.7rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: gold,
            }}>
              <TrophyIcon size={14} color={gold} />
              <span>{isTa ? 'உயரிய உறுப்பினர்' : 'Premium Membership'}</span>
            </div>

            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: gold, lineHeight: 1.2 }}>
              {isTa ? 'உறுப்பினராகுங்கள்' : 'Become a TNBDA Member'}
            </h3>

            <p style={{ color: body, lineHeight: 1.75, maxWidth: '340px' }}>
              {isTa
                ? 'உலகத் தரத்தில் வணிகம் செய்ய கற்றுக்கொள்ளுங்கள், இணைந்து வளருங்கள், மற்றும் ஒருவருக்கொருவர் ஆதரிக்கவும்.'
                : 'Learn to do business at world-class standards, grow together, and support one another in a prestigious network.'}
            </p>

            {/* Price */}
            <div style={{
              padding: '1.25rem 2rem',
              background: isLight ? 'rgba(5,150,105,0.06)' : 'rgba(16,185,129,0.06)',
              border: `1px solid ${isLight ? 'rgba(5,150,105,0.2)' : 'rgba(16,185,129,0.2)'}`,
              borderRadius: '8px',
              width: '100%',
            }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: muted, marginBottom: '0.4rem' }}>
                {isTa ? 'ஆண்டுச் சந்தா' : 'Annual Fee'}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '2.75rem', fontWeight: 900, color: green, lineHeight: 1 }}>₹3,000</span>
                <span style={{ fontSize: '0.85rem', color: muted }}>{isTa ? '/ ஆண்டு' : '/ year'}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: muted, marginTop: '0.35rem' }}>
                {isTa ? 'ஏப்ரல் 30 க்குள் செலுத்தவும்' : 'Payable by April 30'}
              </div>
            </div>

            {/* Perks */}
            <ul style={{ listStyle: 'none', width: '100%', display: 'flex', flexDirection: 'column', gap: '0.6rem', textAlign: 'left' }}>
              {[
                isTa ? '✓ 20 வணிக நோக்கங்கள்'        : '✓ 20 Core Business Objectives',
                isTa ? '✓ சிறப்பு விருதுகள் & பரிசுகள்' : '✓ Special Awards & Incentives',
                isTa ? '✓ 20 சமூக சேவைகள்'            : '✓ 20 Social Welfare Activities',
                isTa ? '✓ நெட்வொர்க் & வளர்ச்சி'      : '✓ Exclusive Network & Growth',
              ].map((perk, i) => (
                <li key={i} style={{ fontSize: '0.85rem', color: isLight ? '#4a3728' : '#94a3b8', fontWeight: 500, paddingLeft: '0.25rem' }}>
                  <span style={{ color: gold, marginRight: '0.4rem' }}>{perk.slice(0, 1)}</span>
                  {perk.slice(1)}
                </li>
              ))}
            </ul>

            <a
              href={FORM_URL}
              className={`btn-gold${lm}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {isTa ? 'உறுப்பினராக இணையுங்கள்' : 'Join TNBDA Now'} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
