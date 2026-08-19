import React from 'react';
import { tnbdaData } from '../data/tnbdaData';
import InteractiveBackground from './InteractiveBackground';
import { MapPinIcon, PhoneIcon, WalletIcon } from './ThemeIcons';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfojt_5Ur4r-wSwl52gkncQk9svYs6XQZSfsc7zNTk4S_w7Lg/viewform?usp=publish-editor';

export default function Footer({ lang, theme, intensity = 'medium' }) {
  const isTa = lang === 'ta';
  const lm = theme === 'light' ? ' light-mode' : '';
  const isLight = theme === 'light';
  const brandGold = isLight ? '#b45309' : 'var(--gold)';

  const navLinks = [
    { href: '#about',      ta: 'எங்களைப் பற்றி',      en: 'About Us'           },
    { href: '#objectives', ta: '20 நோக்கங்கள்',        en: '20 Objectives'      },
    { href: '#rules',      ta: '20 விதிகள்',            en: '20 Rules'           },
    { href: '#incentives', ta: 'ஊக்கத்தொகை',           en: 'Incentives & Awards' },
    { href: '#social',     ta: 'சமூக சேவைகள்',         en: 'Social Welfare'     },
    { href: '#roadmap',    ta: 'எதிர்காலத் திட்டங்கள்', en: 'Roadmap'            },
    { href: '#contact',    ta: 'தொடர்புக்கு',           en: 'Contact Us'         },
  ];

  const slogan = isTa
    ? tnbdaData.header.sloganTa
    : tnbdaData.header.sloganEn;

  return (
    <footer className={isLight ? 'light-mode' : ''} style={{ position: 'relative' }}>
      <InteractiveBackground variant="footer" theme={theme} intensity={intensity} />
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={isLight ? '/Logo - light.png' : '/Logo - dark.png'} alt="TNBDA Logo" className="footer-logo-img" />
            <div className={`fb-tagline${lm}`}>"{slogan}"</div>
            <p className={`fb-desc${lm}`}>
              {isTa ? tnbdaData.about.contentTa : tnbdaData.about.contentEn}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className={`footer-links-title${lm}`}>
              {isTa ? 'விரைவு இணைப்புகள்' : 'Quick Links'}
            </div>
            <ul className="footer-links">
              {navLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} className={isLight ? 'light-mode' : ''}>
                    {isTa ? l.ta : l.en}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className={`footer-contact-title${lm}`}>
              {isTa ? 'தொடர்பு விவரங்கள்' : 'Contact Details'}
            </div>

            <div className="footer-contact-item">
              <MapPinIcon size={18} color={brandGold} />
              <p className={lm.trim()}>
                {isTa ? tnbdaData.contact.addressTa : tnbdaData.contact.addressEn}
              </p>
            </div>

            <div className="footer-contact-item">
              <PhoneIcon size={18} color={brandGold} />
              <p>
                <a
                  href={`tel:+91${tnbdaData.contact.phone}`}
                  className={isLight ? 'light-mode' : ''}
                >
                  +91 {tnbdaData.contact.phone}
                </a>
              </p>
            </div>

            <div className="footer-contact-item">
              <WalletIcon size={18} color={isLight ? '#059669' : '#10b981'} />
              <p style={{ color: isLight ? '#059669' : '#10b981', fontWeight: 600 }}>
                {isTa ? 'ஆண்டுச் சந்தா: ₹3,000' : 'Annual Fee: ₹3,000'}
              </p>
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <a
                href={FORM_URL}
                className={`btn-gold${lm}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.75rem', padding: '0.6rem 1.25rem' }}
              >
                {isTa ? 'உறுப்பினராகுங்கள்' : 'Join TNBDA'} →
              </a>
            </div>
          </div>
        </div>

        <div className={`footer-bottom${lm}`}>
          <p className={lm.trim()}>
            © {new Date().getFullYear()} TNBDA — Tamil Nadu Business Development Association. All rights reserved.
          </p>
          <p className={`footer-bottom-slogan${lm}`}>
            {isTa
              ? `நிறுவனர்: ${tnbdaData.founder.nameTa}`
              : `Founder: ${tnbdaData.founder.nameEn}`}
          </p>
        </div>
      </div>
    </footer>
  );
}
