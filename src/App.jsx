import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ObjectivesSection from './components/ObjectivesSection';
import RulesSection from './components/RulesSection';
import IncentivesSection from './components/IncentivesSection';
import SocialWelfareSection from './components/SocialWelfareSection';
import RoadmapSection from './components/RoadmapSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { usePointerMotion } from './hooks/usePointerMotion';

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('tnbda-lang') || 'en');
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [navScrolled, setNavScrolled] = useState(false);
  const revealObserverRef = useRef(null);

  // ── Mount unified pointer/touch motion system ─────────────────────────
  const intensity = usePointerMotion();

  // ── Apply theme to document ──────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem('theme', theme);
    const isLight = theme === 'light';

    document.body.className = isLight
      ? 'light-mode theme-transition'
      : 'theme-transition';
    document.documentElement.className = isLight ? 'light-mode' : '';
  }, [theme]);

  // ── Persist language ──────────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem('tnbda-lang', lang);
    document.documentElement.lang = lang === 'ta' ? 'ta' : 'en';
  }, [lang]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // ── Active section on scroll ──────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'objectives', 'rules', 'incentives', 'social', 'roadmap', 'contact'];
      const scrollY = window.scrollY + 200;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
      // Navbar scroll state
      setNavScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Scroll-reveal via IntersectionObserver ───────────────────
  useEffect(() => {
    if (revealObserverRef.current) revealObserverRef.current.disconnect();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Immediately show all reveal elements
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
      return;
    }

    revealObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserverRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    // Observe after a short delay to let DOM settle
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => {
        revealObserverRef.current?.observe(el);
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      revealObserverRef.current?.disconnect();
    };
  }, [lang]); // Re-run on lang change so new DOM elements get observed

  return (
    <div style={{ fontFamily: "'Inter', 'Noto Sans Tamil', sans-serif" }}>
      <Navbar
        lang={lang}
        setLang={setLang}
        activeSection={activeSection}
        theme={theme}
        toggleTheme={toggleTheme}
        scrolled={navScrolled}
      />
      <main>
        <HeroSection   lang={lang} theme={theme} intensity={intensity} />
        <AboutSection  lang={lang} theme={theme} intensity={intensity} />
        <ObjectivesSection  lang={lang} theme={theme} intensity={intensity} />
        <RulesSection       lang={lang} theme={theme} intensity={intensity} />
        <IncentivesSection  lang={lang} theme={theme} intensity={intensity} />
        <SocialWelfareSection lang={lang} theme={theme} intensity={intensity} />
        <RoadmapSection   lang={lang} theme={theme} intensity={intensity} />
        <ContactSection   lang={lang} theme={theme} intensity={intensity} />
      </main>
      <Footer lang={lang} theme={theme} intensity={intensity} />
    </div>
  );
}
