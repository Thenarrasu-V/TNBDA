import React, { useState } from 'react';
import { tnbdaData } from '../data/tnbdaData';
import InteractiveBackground from './InteractiveBackground';

export default function ObjectivesSection({ lang, theme, intensity = 'medium' }) {
  const isTa = lang === 'ta';
  const lm = theme === 'light' ? ' light-mode' : '';
  const [filter, setFilter] = useState('all');

  const cats = [
    { id: 'all',     ta: 'அனைத்தும்',           en: 'All (20)'         },
    { id: 'tech',    ta: 'தொழில்நுட்பம் & AI',  en: 'Tech & AI'        },
    { id: 'finance', ta: 'நிதி',                  en: 'Finance'          },
    { id: 'growth',  ta: 'வணிக வளர்ச்சி',        en: 'Business Growth'  },
    { id: 'women',   ta: 'பெண்கள் & இளைஞர்கள்', en: 'Women & Youth'    },
    { id: 'network', ta: 'நெட்வொர்க்',            en: 'Networking'       },
  ];

  const filtered = tnbdaData.objectives.filter(o => {
    if (filter === 'all') return true;
    if (filter === 'finance') return o.category === 'finance' || o.category === 'govt';
    if (filter === 'women')   return o.category === 'women'   || o.category === 'youth';
    return o.category === filter;
  });

  return (
    <section id="objectives" style={{ position: 'relative' }}>
      <InteractiveBackground variant="objectives" theme={theme} intensity={intensity} />
      <div className="container">
        <div className="objectives-header reveal">
          <div className={`section-label${lm}`} style={{ display: 'inline-flex', justifyContent: 'center' }}>
            {isTa ? '20 முக்கிய நோக்கங்கள்' : '20 Core Objectives'}
          </div>
          <h2 className="section-h2">
            {isTa ? (
              <>சங்கத்தின் <span className="gold-text">உன்னத இலக்குகள்</span></>
            ) : (
              <>The Association's <span className="gold-text">Strategic Objectives</span></>
            )}
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginTop: '0.5rem', maxWidth: '600px', margin: '0.5rem auto 0' }}>
            {isTa
              ? 'தமிழக வணிகர்களை பொருளாதாரச் சக்தியாக மாற்றும் 20 உன்னத திட்டங்கள்'
              : '20 strategic goals to unite, modernize & empower Tamil Nadu\'s business community'}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="obj-filters reveal reveal-delay-1">
          {cats.map(c => (
            <button
              key={c.id}
              className={`obj-filter-btn${lm} ${filter === c.id ? 'active' : ''}`}
              onClick={() => setFilter(c.id)}
            >
              {isTa ? c.ta : c.en}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="objectives-grid">
          {filtered.map((obj, i) => (
            <div
              key={obj.id}
              className={`obj-card reveal reveal-delay-${(i % 4) + 1}`}
            >
              <div className={`obj-num${lm}`}>#{obj.id}</div>
              <div className={`obj-text${lm}`}>{isTa ? obj.ta : obj.en}</div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-muted)' }}>
            {isTa ? 'முடிவுகள் எதுவும் இல்லை' : 'No matching objectives found.'}
          </div>
        )}
      </div>
    </section>
  );
}
