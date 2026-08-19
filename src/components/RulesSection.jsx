import React from 'react';
import { tnbdaData } from '../data/tnbdaData';
import InteractiveBackground from './InteractiveBackground';

export default function RulesSection({ lang, theme, intensity = 'medium' }) {
  const isTa = lang === 'ta';
  const lm = theme === 'light' ? ' light-mode' : '';

  const getBadge = (id) => {
    if (id === 2)  return { text: isTa ? 'கட்டாயம்'         : 'Mandatory',      cls: 'badge-mandatory' };
    if (id === 6)  return { text: isTa ? '₹3,000 / ஏப்ரல்'  : '₹3,000 / Apr 30', cls: 'badge-fee'       };
    if (id === 19) return { text: isTa ? 'ஒரு துறை-ஒருவர்'  : '1 Per Category',  cls: 'badge-exclusive' };
    return null;
  };

  return (
    <section id="rules" style={{ position: 'relative' }}>
      <InteractiveBackground variant="rules" theme={theme} intensity={intensity} />
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className={`section-label${lm}`} style={{ display: 'inline-flex' }}>
            {isTa ? '20 சட்ட திட்டங்கள்' : '20 Rules & Regulations'}
          </div>
          <h2 className="section-h2">
            {isTa ? (
              <>ஒழுக்கமும் <span className="gold-text">நெறிமுறையும்</span></>
            ) : (
              <>Discipline & <span className="gold-text">Ethics</span></>
            )}
          </h2>
        </div>

        {/* Key Highlights Banner */}
        <div className={`rules-banner reveal reveal-delay-1${lm}`}>
          <div className={`rules-banner-item${lm}`}>
            <div className={`icon-val${lm}`}>100%</div>
            <div className={`icon-label${lm}`}>
              {isTa ? 'வருகைப்பதிவு' : 'Attendance Required'}
            </div>
          </div>
          <div className={`rules-banner-item${lm}`}>
            <div className={`icon-val${lm}`}>₹3,000</div>
            <div className={`icon-label${lm}`}>
              {isTa ? 'ஆண்டு சந்தா (ஏப்ரல் 30)' : 'Annual Fee (By Apr 30)'}
            </div>
          </div>
          <div className={`rules-banner-item${lm}`}>
            <div className={`icon-val${lm}`}>1 Rule</div>
            <div className={`icon-label${lm}`}>
              {isTa ? 'ஒரு தொழிலுக்கு ஒருவர்' : 'One Member Per Category'}
            </div>
          </div>
        </div>

        {/* All 20 Rules */}
        <div className="rules-grid">
          {tnbdaData.rules.map((rule, i) => {
            const badge = getBadge(rule.id);
            return (
              <div
                key={rule.id}
                className={`rule-card reveal reveal-delay-${(i % 3) + 1}`}
              >
                <div className={`rule-num${lm}`}>{rule.id}</div>
                <div className={`rule-text${lm}`}>{isTa ? rule.ta : rule.en}</div>
                {badge && (
                  <span className={`rule-badge ${badge.cls}${lm}`}>{badge.text}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
