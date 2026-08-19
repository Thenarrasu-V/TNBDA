import React from 'react';
import { tnbdaData } from '../data/tnbdaData';
import InteractiveBackground from './InteractiveBackground';
import {
  GlobeIcon,
  VideoIcon,
  SummitIcon,
  MapPinIcon,
  CpuIcon,
  LandmarkIcon,
  SmartphoneIcon,
  TrophyIcon
} from './ThemeIcons';

const phaseIcons = [
  GlobeIcon,
  VideoIcon,
  SummitIcon,
  MapPinIcon,
  CpuIcon,
  LandmarkIcon,
  SmartphoneIcon,
  TrophyIcon
];

export default function RoadmapSection({ lang, theme, intensity = 'medium' }) {
  const isTa = lang === 'ta';
  const lm = theme === 'light' ? ' light-mode' : '';
  const isLight = theme === 'light';
  const brandGold = isLight ? '#b45309' : 'var(--gold)';

  return (
    <section id="roadmap" style={{ position: 'relative' }}>
      <InteractiveBackground variant="roadmap" theme={theme} intensity={intensity} />
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className={`section-label${lm}`} style={{ display: 'inline-flex' }}>
            {isTa ? 'எதிர்காலத் திட்டங்கள்' : 'Strategic Roadmap'}
          </div>
          <h2 className="section-h2">
            {isTa ? (
              <>டிஜிட்டல் மற்றும் <span className="gold-text">வளர்ச்சி திட்டங்கள்</span></>
            ) : (
              <>Digital & <span className="gold-text">Growth Initiatives</span></>
            )}
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginTop: '0.5rem', maxWidth: '600px', margin: '0.5rem auto 0' }}>
            {isTa
              ? 'AI, மொபைல் ஆப், YouTube, மண்டல மாநாடுகள் மற்றும் அரசு மானியங்கள் மூலம் சர்வதேச நிலை எட்டும் திட்டங்கள்.'
              : 'Technology, media, government liaison, and national convention plans to elevate TNBDA to an international standard.'}
          </p>
        </div>

        <div className="roadmap-grid">
          {tnbdaData.roadmap.map((item, idx) => {
            const IconComp = phaseIcons[idx] || GlobeIcon;
            return (
              <div
                key={idx}
                className={`roadmap-card reveal reveal-delay-${(idx % 4) + 1}`}
              >
                <div className={`phase-num${lm}`}>PHASE {String(idx + 1).padStart(2, '0')}</div>
                <span className="roadmap-icon">
                  <IconComp size={28} color={brandGold} />
                </span>
                <div className={`roadmap-title${lm}`}>{isTa ? item.titleTa : item.titleEn}</div>
                <div className={`roadmap-desc${lm}`}>{isTa ? item.descTa : item.descEn}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
