'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Award, GraduationCap, Users, Briefcase } from 'lucide-react';

const stats = [
  { key: 'stat1Label', value: '10+', icon: Briefcase },
  { key: 'stat2Label', value: '500+', icon: Award },
  { key: 'stat3Label', value: '200+', icon: Users },
  { key: 'stat4Label', value: '4', icon: GraduationCap },
] as const;

export default function About() {
  const t = useTranslations('about');
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="section-padding relative overflow-hidden">
      {/* Background orb */}
      <div
        className="orb w-[400px] h-[400px] right-0 top-1/2 -translate-y-1/2 opacity-10"
        style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-16"
        >
          <span className="section-label">✦ {t('sectionLabel')}</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Photo frame */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden gradient-border">
                <div
                  className="w-full h-full rounded-3xl flex items-center justify-center relative overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(245,166,35,0.15) 0%, rgba(167,139,250,0.15) 50%, rgba(56,189,248,0.1) 100%)',
                  }}
                >
                  {/* Picture placeholder for Alaya */}
                  <div className="absolute inset-0 flex items-center justify-center flex-col text-[#f5a623]/80 border-2 border-dashed border-[#f5a623]/30 rounded-3xl m-4">
                    <span className="text-4xl mb-2">📸</span>
                    <span className="text-sm font-medium text-center px-4">Your Photo Here<br/><span className="text-xs text-white/50">(Replace with Image)</span></span>
                  </div>
                </div>
                {/* Inner border glow */}
                <div className="absolute inset-0 rounded-3xl border border-[rgba(245,166,35,0.2)] pointer-events-none" />
              </div>

              {/* Floating card – ATA Certified */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-8 top-8 glass rounded-2xl px-4 py-3 border border-[rgba(245,166,35,0.2)] shadow-xl min-w-[140px]"
              >
                <p className="text-xs text-[#94a3b8] mb-1">Certification</p>
                <p className="text-sm font-bold text-[#f5a623]">ATA Certified</p>
                <p className="text-xs text-[#94a3b8]">Translator</p>
              </motion.div>

              {/* Floating card – MA Linguistics */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -left-8 bottom-12 glass rounded-2xl px-4 py-3 border border-[rgba(167,139,250,0.2)] shadow-xl min-w-[150px]"
              >
                <p className="text-xs text-[#94a3b8] mb-1">Education</p>
                <p className="text-sm font-bold text-[#a78bfa]">MA Linguistics</p>
                <p className="text-xs text-[#94a3b8]">UCM Madrid</p>
              </motion.div>

              {/* Pulse ring */}
              <div className="absolute inset-0 rounded-3xl border-2 border-[rgba(245,166,35,0.2)] pulse-ring" />
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-8 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {t('title').split('Language').map((part, i) => (
                <span key={i}>
                  {part}
                  {i === 0 && <span className="text-gold-gradient">Language</span>}
                </span>
              ))}
            </h2>

            <div className="space-y-5 text-[#94a3b8] leading-relaxed mb-10">
              <p>{t('bio1')}</p>
              <p>{t('bio2')}</p>
              <p>{t('bio3')}</p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ key, value, icon: Icon }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="glass glass-hover rounded-2xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(245,166,35,0.1)] flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-[#f5a623]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{value}</p>
                      <p className="text-xs text-[#64748b]">{t(key)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
