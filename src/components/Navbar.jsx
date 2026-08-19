import React, { useState } from 'react';
import { SunIcon, MoonIcon, GlobeIcon, StarIcon } from './ThemeIcons';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfojt_5Ur4r-wSwl52gkncQk9svYs6XQZSfsc7zNTk4S_w7Lg/viewform?usp=publish-editor';

export default function Navbar({ lang, setLang, activeSection, theme, toggleTheme, scrolled }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isTa = lang === 'ta';
  const isLight = theme === 'light';
  const brandGold = isLight ? '#b45309' : 'var(--gold)';

  const links = [
    { id: 'about',      labelTa: 'எங்களைப் பற்றி', labelEn: 'About'      },
    { id: 'objectives', labelTa: 'நோக்கங்கள்',      labelEn: 'Objectives' },
    { id: 'rules',      labelTa: 'விதிகள்',          labelEn: 'Rules'      },
    { id: 'incentives', labelTa: 'விருதுகள்',         labelEn: 'Incentives' },
    { id: 'social',     labelTa: 'சமூக சேவை',        labelEn: 'Welfare'    },
    { id: 'roadmap',    labelTa: 'திட்டங்கள்',        labelEn: 'Roadmap'    },
    { id: 'contact',    labelTa: 'தொடர்பு',           labelEn: 'Contact'    },
  ];

  const navClass = [
    isLight ? 'light-mode' : '',
    scrolled ? 'scrolled' : '',
    isTa ? 'nav-ta' : ''
  ].filter(Boolean).join(' ');

  return (
    <>
      <nav id="navbar" className={navClass}>
        <div className="container nav-inner">
          <a href="#hero" className="nav-brand">
            <img src={isLight ? '/Logo - light.png' : '/Logo - dark.png'} alt="TNBDA Logo" className="nav-logo-img" />
          </a>

          <ul className="nav-links">
            {links.map(l => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={activeSection === l.id ? 'active' : ''}
                >
                  {isTa ? l.labelTa : l.labelEn}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            {/* Theme toggle */}
            <button
              className={`theme-toggle${isLight ? ' light-mode' : ''}`}
              onClick={toggleTheme}
              aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
              title={isLight ? 'Dark Mode' : 'Light Mode'}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              {theme === 'dark' ? (
                <>
                  <SunIcon size={14} color={brandGold} />
                  <span>{isTa ? 'ஒளி' : 'Light'}</span>
                </>
              ) : (
                <>
                  <MoonIcon size={14} color={brandGold} />
                  <span>{isTa ? 'இரவு' : 'Dark'}</span>
                </>
              )}
            </button>

            {/* Language toggle */}
            <button
              className={`lang-toggle${isLight ? ' light-mode' : ''}`}
              onClick={() => setLang(isTa ? 'en' : 'ta')}
              aria-label={isTa ? 'Switch to English' : 'தமிழுக்கு மாறு'}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <GlobeIcon size={14} color={brandGold} />
              <span>{isTa ? 'English' : 'தமிழ்'}</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              className={`mobile-toggle${isLight ? ' light-mode' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav${mobileOpen ? ' open' : ''}${isLight ? ' light-mode' : ''}`}>
        {links.map(l => (
          <a
            key={l.id}
            href={`#${l.id}`}
            onClick={() => setMobileOpen(false)}
            className={activeSection === l.id ? 'active' : ''}
          >
            {isTa ? l.labelTa : l.labelEn}
          </a>
        ))}

        <button
          className="mobile-theme-toggle"
          onClick={() => { toggleTheme(); setMobileOpen(false); }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
        >
          {theme === 'dark' ? (
            <>
              <SunIcon size={16} color={brandGold} />
              <span>{isTa ? 'ஒளி பயன்முறை' : 'Light Mode'}</span>
            </>
          ) : (
            <>
              <MoonIcon size={16} color={brandGold} />
              <span>{isTa ? 'இரவு பயன்முறை' : 'Dark Mode'}</span>
            </>
          )}
        </button>

        <button
          className="mobile-lang-toggle"
          onClick={() => { setLang(isTa ? 'en' : 'ta'); setMobileOpen(false); }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
        >
          <GlobeIcon size={16} color={brandGold} />
          <span>{isTa ? 'Switch to English' : 'தமிழுக்கு மாறு'}</span>
        </button>

        <a
          href={FORM_URL}
          onClick={() => setMobileOpen(false)}
          className="join-btn mobile-join-btn"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
        >
          <StarIcon size={14} color="#000000" />
          <span>{isTa ? 'உறுப்பினராக இணையுங்கள்' : 'Become a Member'}</span>
        </a>
      </div>
    </>
  );
}
