'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowDown, Sparkles, BookOpen, Mic } from 'lucide-react';
import dynamic from 'next/dynamic';

const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), {
  ssr: false,
  loading: () => null,
});

const BADGE_ICONS = [Sparkles, BookOpen, Mic];

export default function Hero() {
  const t = useTranslations('hero');

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  const badges = [t('badge1'), t('badge2'), t('badge3')];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Three.js canvas */}
      <HeroCanvas />

      {/* Gradient orbs */}
      <div
        className="orb w-[600px] h-[600px] left-[-200px] top-[-100px] opacity-20"
        style={{ background: 'radial-gradient(circle, #f5a623 0%, transparent 70%)' }}
      />
      <div
        className="orb w-[500px] h-[500px] right-[-150px] bottom-[-100px] opacity-15"
        style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#94a3b8] text-lg mb-4 tracking-wider font-medium"
        >
          {t('greeting')}
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 leading-none"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          <span className="text-gold-gradient">{t('name')}</span>
        </motion.h1>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-4"
        >
          <span className="text-xl md:text-2xl text-[#a78bfa] font-semibold tracking-widest uppercase">
            {t('title')}
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="text-2xl md:text-3xl text-white/80 mb-6 font-light italic"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          "{t('subtitle')}"
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="text-[#94a3b8] text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('description')}
        </motion.p>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {badges.map((badge, i) => {
            const Icon = BADGE_ICONS[i];
            return (
              <span key={i} className="badge animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
                <Icon size={12} className="text-[#f5a623]" />
                {badge}
              </span>
            );
          })}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              const el = document.getElementById('portfolio');
              if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
            }}
            className="btn-primary text-base px-8 py-4"
          >
            {t('cta')}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
            }}
            className="btn-outline text-base px-8 py-4"
          >
            {t('ctaSecondary')}
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#64748b] hover:text-[#f5a623] transition-colors group"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={22} />
        </motion.div>
      </motion.button>
    </section>
  );
}
