'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Globe } from 'lucide-react';
import Link from 'next/link';

const NAV_LINKS = [
  { key: 'about', href: '#about' },
  { key: 'services', href: '#services' },
  { key: 'experience', href: '#experience' },
  { key: 'skills', href: '#skills' },
  { key: 'portfolio', href: '#portfolio' },
  { key: 'contact', href: '#contact' },
] as const;

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const switchLocale = () => {
    const next = locale === 'en' ? 'es' : 'en';
    const withoutLocale = pathname.replace(/^\/(en|es)/, '') || '/';
    router.push(`/${next}${withoutLocale}`);
  };

  const handleCVDownload = () => {
    const link = document.createElement('a');
    link.href = '/cv/resume.pdf';
    link.download = 'Alaya_Zaaraoui_CV.pdf';
    link.click();
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = (el as HTMLElement).offsetTop - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div
          className={`mx-auto max-w-7xl px-6 flex items-center justify-between rounded-2xl transition-all duration-300 ${
            scrolled ? 'bg-[#080812] border border-[rgba(255,255,255,0.1)] shadow-xl py-3 mx-4 lg:mx-8' : 'py-2'
          }`}
        >
          {/* Logo */}
          <div className="flex flex-col items-start justify-center">
            <Link href={`/${locale}`} className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#f5a623] to-[#f59e0b] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-black font-bold text-sm font-['Playfair_Display']">A</span>
              </div>
              <span className="font-bold text-white text-lg tracking-wide font-['Playfair_Display'] ml-1">
                Alaya<span className="text-[#f5a623]">.</span>
              </span>
            </Link>
          </div>

          {/* Desktop nav links & actions */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <button
                    onClick={() => handleNavClick(href)}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                      activeSection === href.slice(1)
                        ? 'text-[#f5a623]'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {t(key)}
                    <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-[#f5a623] rounded-full transition-all duration-300 ${activeSection === href.slice(1) ? 'w-1/2' : 'w-0 group-hover:w-1/2 opacity-50'}`} />
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="w-px h-5 bg-white/10" />
            
            <div className="flex items-center gap-4">
              <button
                onClick={switchLocale}
                className="flex items-center gap-1.5 text-sm font-semibold text-white/70 hover:text-white transition-colors"
              >
                <Globe size={14} />
                {locale === 'en' ? 'ES' : 'EN'}
              </button>
              <button
                onClick={handleCVDownload}
                className="flex items-center gap-1.5 text-sm font-semibold text-[#f5a623] hover:text-[#f59e0b] transition-colors"
              >
                <Download size={14} />
                {t('downloadCV')}
              </button>
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg glass text-white/80 hover:text-white transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[80px] left-4 right-4 z-40 bg-[#080812] shadow-2xl rounded-2xl p-6 lg:hidden border border-[rgba(255,255,255,0.08)]"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <button
                    onClick={() => handleNavClick(href)}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-[#94a3b8] hover:text-white hover:bg-white/5 transition-all"
                  >
                    {t(key)}
                  </button>
                </li>
              ))}
              <li className="pt-3 pb-1 border-t border-[rgba(255,255,255,0.06)] flex flex-col gap-2 mt-2">
                <button
                  onClick={switchLocale}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Globe size={16} />
                  {locale === 'en' ? 'Cambiar a Español' : 'Switch to English'}
                </button>
                <button
                  onClick={handleCVDownload}
                  className="w-full btn-primary justify-center text-sm py-3"
                >
                  <Download size={16} />
                  {t('downloadCV')}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden file input for CV upload trigger */}
      <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" />
    </>
  );
}
