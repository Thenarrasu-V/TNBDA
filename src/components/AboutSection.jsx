import React from 'react';
import { tnbdaData } from '../data/tnbdaData';
import InteractiveBackground from './InteractiveBackground';

export default function AboutSection({ lang, theme, intensity = 'medium' }) {
  const isTa = lang === 'ta';
  const lm = theme === 'light' ? ' light-mode' : '';

  const stats = [
    { num: '20', lbl: isTa ? 'முக்கிய நோக்கங்கள்' : 'Core Objectives' },
    { num: '20', lbl: isTa ? 'சட்ட திட்டங்கள்'    : 'Rules & Regulations' },
    { num: '5',  lbl: isTa ? 'வளர்ச்சி நிலைகள்'  : 'Award Tiers' },
    { num: '20', lbl: isTa ? 'சமூக சேவைகள்'       : 'Welfare Activities' },
    { num: '₹3K', lbl: isTa ? 'ஆண்டு சந்தா'      : 'Annual Fee' },
    { num: '3125', lbl: isTa ? 'உச்ச இலக்கு'      : 'Top Tier Target' },
    { num: '8',  lbl: isTa ? 'டிஜிட்டல் திட்டங்கள்' : 'Digital Roadmaps' },
    { num: '∞',  lbl: isTa ? 'வணிக வாய்ப்புகள்'  : 'Business Opportunities' },
  ];

  return (
    <section id="about" style={{ position: 'relative' }}>
      <InteractiveBackground variant="about" theme={theme} intensity={intensity} />
      <div className="container">
        <div className="about-grid">
          {/* Left: Visual stats */}
          <div className="about-visual reveal">
            <div className="about-large-text">TNBDA</div>
            <div className="about-stats-grid">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className={`about-stat-card reveal reveal-delay-${(i % 4) + 1}`}
                >
                  <div className={`num${lm}`}>{s.num}</div>
                  <div className={`lbl${lm}`}>{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Content */}
          <div className="reveal reveal-delay-2">
            <div className={`section-label${lm}`}>
              {isTa ? 'எங்களைப் பற்றி' : 'About TNBDA'}
            </div>

            <h2 className="section-h2">
              {isTa ? (
                <>தமிழக வணிகர்களின் <span className="gold-text">பலம் மற்றும் அரண்</span></>
              ) : (
                <>The Strength and <span className="gold-text">Shield of Tamil Nadu Traders</span></>
              )}
            </h2>

            <div className={`about-highlight${lm}`}>
              <p>
                {isTa
                  ? '"வணிகத்தால் உயர்வோம்! மனிதத்தால் இணைவோம்!" — Dr. E.V. தரண் ராஜா, நிறுவனர், TNBDA'
                  : '"Rise through Business! Unite through Humanity!" — Dr. E.V. Tharan Raja, Founder, TNBDA'}
              </p>
            </div>

            <p className={`about-text${lm}`}>
              {isTa ? tnbdaData.about.contentTa : tnbdaData.about.contentEn}
            </p>

            <p className={`about-text${lm}`}>
              {isTa
                ? 'Dr. E.V. தரண் ராஜா B.Com., PGDCA அவர்கள் TNBDA சங்கத்தின் தொலைநோக்குச் சிந்தனையாளர். "Givers Gain" (கொடுப்பவரே பெறுவார்) என்ற தத்துவத்தின் மீது நம்பிக்கை கொண்ட இவர், தமிழக வணிகர்கள் ஒரு வலுவான பொருளாதார சக்தியாக மாற வேண்டும் என்ற உன்னத நோக்கத்திற்காக இந்தச் சங்கத்தை நிறுவினார்.'
                : 'Dr. E.V. Tharan Raja, B.Com., PGDCA — the visionary behind TNBDA — founded this association driven by the philosophy "Givers Gain" with the noble objective of turning Tamil Nadu\'s traders into a formidable economic force.'}
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <a href="#objectives" className={`btn-gold${lm}`}>
                {isTa ? '20 நோக்கங்கள்' : 'View Objectives'} →
              </a>
              <a href="#contact" className={`btn-red${lm}`}>
                {isTa ? 'இணையுங்கள்' : 'Join Today'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
