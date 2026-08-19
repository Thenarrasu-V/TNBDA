import React from 'react';
import { tnbdaData } from '../data/tnbdaData';
import InteractiveBackground from './InteractiveBackground';
import { LandmarkIcon } from './ThemeIcons';

export default function SocialWelfareSection({ lang, theme, intensity = 'medium' }) {
  const isTa = lang === 'ta';
  const lm = theme === 'light' ? ' light-mode' : '';
  const isLight = theme === 'light';
  const brandGold = isLight ? '#b45309' : 'var(--gold)';

  return (
    <section id="social" style={{ position: 'relative' }}>
      <InteractiveBackground variant="welfare" theme={theme} intensity={intensity} />
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className={`section-label${lm}`} style={{ display: 'inline-flex' }}>
            {isTa ? '20 சமூக நலப்பணிகள்' : '20 Social Welfare Activities'}
          </div>
          <h2 className="section-h2">
            {isTa ? (
              <>சமூகப் பொறுப்பு & <span className="gold-text">மனிதநேயம்</span></>
            ) : (
              <>Social Responsibility & <span className="gold-text">Humanitarian Service</span></>
            )}
          </h2>
        </div>

        {/* Foundation Banner */}
        <div className={`welfare-intro reveal reveal-delay-1${lm}`}>
          <div>
            <div
              className={`section-label${lm}`}
              style={{
                background: 'rgba(192,57,43,0.1)',
                borderColor: 'rgba(192,57,43,0.3)',
                color: theme === 'light' ? '#ef4444' : 'var(--red-bright)'
              }}
            >
              {isTa ? 'நிறுவன நோக்கம்' : 'Core Mission'}
            </div>
            <p style={{ marginTop: '0.75rem', lineHeight: '1.7' }}>
              {isTa
                ? 'வணிகம் மட்டுமல்லாது, மனிதநேயத்துடன் தமிழகம் முழுவதும் TNBDA ஆற்றும் 20 உன்னதமான சமூக சேவைகள். இரத்ததானம், மருத்துவ முகாம், கல்வி உதவி, இயற்கை பாதுகாப்பு மற்றும் ஆதரவற்றோர் நலன் — இவை அனைத்தும் உறுப்பினர்களின் திரட்டிய சக்தியால்.'
                : 'Beyond business, TNBDA actively serves communities across Tamil Nadu through 20 dedicated welfare activities — from blood donation camps and free medical check-ups to education grants and disaster relief efforts.'}
            </p>
          </div>
          <div className={`foundation-badge${lm}`}>
            <div className="fb-icon">
              <LandmarkIcon size={32} color={brandGold} />
            </div>
            <div className={`fb-title${lm}`}>TNBDA {isTa ? 'அறக்கட்டளை' : 'Foundation'}</div>
            <div className={`fb-sub${lm}`}>
              {isTa ? 'நிரந்தரச் சமூக சேவைக்கான அரண்' : 'Permanent Philanthropic Institution'}
            </div>
          </div>
        </div>

        {/* 20 Welfare Activities */}
        <div className="welfare-grid">
          {tnbdaData.socialWelfare.map((item, i) => (
            <div
              key={item.id}
              className={`welfare-card reveal reveal-delay-${(i % 4) + 1}`}
            >
              <div className="welfare-card-top">
                <span className={`welfare-id${lm}`}>#{String(item.id).padStart(2, '0')}</span>
                <span className={`welfare-date${lm}`}>{isTa ? item.date : item.dateEn}</span>
              </div>
              <div className={`welfare-text${lm}`}>{isTa ? item.ta : item.en}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
