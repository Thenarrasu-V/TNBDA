import React from 'react';
import { tnbdaData } from '../data/tnbdaData';
import InteractiveBackground from './InteractiveBackground';
import { ShieldIcon, AwardIcon, CrownIcon, ZapIcon, TrophyIcon, StarIcon } from './ThemeIcons';

const tierIcons = [
  ShieldIcon,
  AwardIcon,
  CrownIcon,
  ZapIcon,
  TrophyIcon,
];

export default function IncentivesSection({ lang, theme, intensity = 'medium' }) {
  const isTa = lang === 'ta';
  const lm = theme === 'light' ? ' light-mode' : '';
  const isLight = theme === 'light';
  const brandGold = isLight ? '#b45309' : 'var(--gold)';
  const { tiers, specialAwards } = tnbdaData.incentives;

  return (
    <section id="incentives" style={{ position: 'relative' }}>
      <InteractiveBackground variant="incentives" theme={theme} intensity={intensity} />
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className={`section-label${lm}`} style={{ display: 'inline-flex' }}>
            {isTa ? 'பரிசுகள் & ஊக்கத்தொகை' : 'Incentives & Prizes'}
          </div>
          <h2 className="section-h2">
            {isTa ? (
              <>வளர்ச்சி <span className="gold-text">நிலைகளும் விருதுகளும்</span></>
            ) : (
              <>Growth Tiers & <span className="gold-text">Honorary Awards</span></>
            )}
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            {isTa
              ? 'உறுப்பினர்களை இணைக்கும்தோறும் உயரும் 5 நிலைப் பதவிகளும் பரிசுகளும்'
              : 'A 5-level tiered achievement program rewarding every milestone from 5 to 3,125 member enrollments'}
          </p>
        </div>

        {/* 5 Tiers Row */}
        <div className="tiers-row">
          {tiers.map((tier, i) => {
            const IconComp = tierIcons[i] || TrophyIcon;
            return (
              <div
                key={tier.level}
                className={`tier-card${lm} ${tier.level === 5 ? 'level-5' : ''} reveal reveal-delay-${i + 1}`}
              >
                <div className={`tier-icon-ring${lm}`}>
                  <IconComp size={26} color={brandGold} />
                  <div className={`level-badge${lm}`}>{tier.level}</div>
                </div>
                <div className={`tier-target${lm}`}>{tier.target}</div>
                <div className={`tier-label${lm}`}>{isTa ? 'உறுப்பினர்கள்' : 'Members'}</div>
                <div className={`tier-reward${lm}`}>{isTa ? tier.rewardTa : tier.rewardEn}</div>
              </div>
            );
          })}
        </div>

        {/* Special Awards */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div className={`section-label${lm}`} style={{ display: 'inline-flex' }}>
            {isTa ? 'சிறப்பு விருதுகள்' : 'Special Category Awards'}
          </div>
        </div>

        <div className="awards-grid">
          {specialAwards.map((award, i) => (
            <div
              key={i}
              className={`award-card reveal reveal-delay-${(i % 3) + 1}`}
            >
              <div className={`award-icon${lm}`}>
                <StarIcon size={18} color={brandGold} />
              </div>
              <div className={`award-text${lm}`}>{isTa ? award.ta : award.en}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
