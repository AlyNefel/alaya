'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Languages,
  GraduationCap,
  Mic,
  PenLine,
  CheckSquare,
  Globe,
  ArrowRight,
} from 'lucide-react';

const SERVICE_ICONS = [Languages, GraduationCap, Mic, PenLine, CheckSquare, Globe];
const ACCENT_COLORS = [
  '#f5a623', '#a78bfa', '#38bdf8', '#34d399', '#f472b6', '#fb923c',
];

export default function Services() {
  const t = useTranslations('services');
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const services = Array.from({ length: 6 }, (_, i) => ({
    title: t(`service${i + 1}Title` as `service${1 | 2 | 3 | 4 | 5 | 6}Title`),
    desc: t(`service${i + 1}Desc` as `service${1 | 2 | 3 | 4 | 5 | 6}Desc`),
    icon: SERVICE_ICONS[i],
    color: ACCENT_COLORS[i],
  }));

  return (
    <section
      id="services"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080812 0%, #0d0d1e 50%, #080812 100%)' }}
    >
      {/* Decorative orb */}
      <div
        className="orb w-[500px] h-[500px] left-1/2 -translate-x-1/2 top-0 opacity-10"
        style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-label">✦ {t('sectionLabel')}</span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-6 mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {t('title')}
          </h2>
          <p className="text-[#64748b] text-lg max-w-xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ title, desc, icon: Icon, color }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass glass-hover rounded-3xl p-7 group relative overflow-hidden cursor-pointer gradient-border"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${color}10 0%, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-300"
                style={{ background: `${color}15`, border: `1px solid ${color}25` }}
              >
                <Icon size={24} style={{ color }} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#f5a623] transition-colors">
                {title}
              </h3>
              <p className="text-[#64748b] text-sm leading-relaxed mb-5">{desc}</p>

              {/* Learn more */}
              <span
                className="inline-flex items-center gap-1 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-4px] group-hover:translate-x-0"
                style={{ color }}
              >
                {t('learnMore')} <ArrowRight size={14} />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
