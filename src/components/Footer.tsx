'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Link2, AtSign, Globe, Heart } from 'lucide-react';

const SOCIAL = [
  { href: '#', Icon: Link2, label: 'LinkedIn' },
  { href: 'mailto:alaya.martinez@example.com', Icon: AtSign, label: 'Email' },
  { href: '#', Icon: Globe, label: 'Website' },
];

const NAV_LINKS = [
  { key: 'about', href: '#about' },
  { key: 'services', href: '#services' },
  { key: 'experience', href: '#experience' },
  { key: 'skills', href: '#skills' },
  { key: 'portfolio', href: '#portfolio' },
  { key: 'contact', href: '#contact' },
] as const;

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const locale = useLocale();
  const year = new Date().getFullYear();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden border-t border-[rgba(255,255,255,0.06)]">
      <div
        className="orb w-[400px] h-[400px] left-1/2 -translate-x-1/2 bottom-0 opacity-06"
        style={{ background: 'radial-gradient(circle, #f5a623 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f5a623] to-[#f59e0b] flex items-center justify-center shadow-lg">
                <span className="text-black font-bold font-['Playfair_Display']">A</span>
              </div>
              <span className="font-bold text-white text-xl" style={{ fontFamily: 'var(--font-playfair)' }}>
                Alaya<span className="text-[#f5a623]">.</span>
              </span>
            </Link>
            <p className="text-[#64748b] text-sm leading-relaxed mb-6">
              {t('tagline')}
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {SOCIAL.map(({ href, Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-[#64748b] hover:text-[#f5a623] hover:border-[rgba(245,166,35,0.3)] transition-colors"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="text-[#64748b] hover:text-[#f5a623] text-sm transition-colors"
                  >
                    {nav(key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Ready to start?
            </h4>
            <p className="text-[#64748b] text-sm leading-relaxed mb-5">
              Let's create something extraordinary together.
            </p>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              onClick={() => scrollTo('#contact')}
              className="btn-primary py-3 px-6 text-sm"
            >
              Get In Touch
            </motion.button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[rgba(255,255,255,0.06)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#475569] text-sm">
          <p>
            © {year} Alaya Zaaraoui. {t('rights')}
          </p>
          <p className="flex items-center gap-1.5">
            {t('builtWith')} <Heart size={12} className="text-[#f5a623]" />
          </p>
        </div>
      </div>
    </footer>
  );
}
