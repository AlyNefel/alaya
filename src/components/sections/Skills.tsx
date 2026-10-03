'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

type SkillItem = { name: string; level: number; color: string };
type Category = { key: string; label: string; skills: SkillItem[] };

const COLORS = ['#f5a623', '#a78bfa', '#38bdf8', '#34d399'];

export default function Skills() {
  const t = useTranslations('skills');
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeTab, setActiveTab] = useState(0);

  const categories: Category[] = [
    {
      key: 'catLang',
      label: t('catLang'),
      skills: [
        { name: t('spanish'), level: 100, color: '#f5a623' },
        { name: t('english'), level: 98, color: '#fbbf24' },
        { name: t('catalan'), level: 75, color: '#f59e0b' },
        { name: t('french'), level: 60, color: '#d97706' },
      ],
    },
    {
      key: 'catTools',
      label: t('catTools'),
      skills: [
        { name: t('sdl'), level: 95, color: '#a78bfa' },
        { name: t('memoQ'), level: 90, color: '#c084fc' },
        { name: t('wordfast'), level: 85, color: '#7c3aed' },
        { name: t('cat'), level: 92, color: '#8b5cf6' },
      ],
    },
    {
      key: 'catSoft',
      label: t('catSoft'),
      skills: [
        { name: t('communication'), level: 98, color: '#38bdf8' },
        { name: t('culturalIntelligence'), level: 97, color: '#0ea5e9' },
        { name: t('leadership'), level: 88, color: '#0284c7' },
        { name: t('detailOriented'), level: 99, color: '#06b6d4' },
      ],
    },
  ];

  return (
    <section
      id="skills"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080812 0%, #0d0d1e 50%, #080812 100%)' }}
    >
      <div
        className="orb w-[500px] h-[500px] right-0 top-1/2 -translate-y-1/2 opacity-10"
        style={{ background: 'radial-gradient(circle, #34d399 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="section-label">✦ {t('sectionLabel')}</span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-6 mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {t('title')}
          </h2>
          <p className="text-[#64748b] text-lg">{t('subtitle')}</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-2 mb-12"
        >
          {categories.map((cat, i) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === i
                  ? 'text-black shadow-lg'
                  : 'glass text-[#94a3b8] hover:text-white'
              }`}
              style={
                activeTab === i
                  ? { background: COLORS[i] }
                  : {}
              }
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Skills */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="glass rounded-3xl p-8 md:p-12 space-y-8"
          >
            {categories[activeTab].skills.map((skill, i) => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white font-semibold">{skill.name}</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-sm font-bold"
                    style={{ color: skill.color }}
                  >
                    {skill.level}%
                  </motion.span>
                </div>
                <div className="skill-bar-bg">
                  <motion.div
                    className="skill-bar-fill"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{
                      duration: 1.4,
                      delay: 0.2 + i * 0.12,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    style={{
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
