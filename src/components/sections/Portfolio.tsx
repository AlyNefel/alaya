'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';

type FilterKey = 'All' | 'Translation' | 'Content' | 'Education';

const TAG_COLORS: Record<string, string> = {
  Translation: '#f5a623',
  Content: '#a78bfa',
  Education: '#38bdf8',
};

const TAG_BG: Record<string, string> = {
  Translation: 'rgba(245,166,35,0.12)',
  Content: 'rgba(167,139,250,0.12)',
  Education: 'rgba(56,189,248,0.12)',
};

const EMOJIS = ['⚖️', '🌍', '🏥', '💊', '📖', '🎓'];

export default function Portfolio() {
  const t = useTranslations('portfolio');
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeFilter, setActiveFilter] = useState<FilterKey>('All');

  const projects = [1, 2, 3, 4, 5, 6].map((n) => ({
    title: t(`project${n}Title` as `project${1|2|3|4|5|6}Title`),
    desc: t(`project${n}Desc` as `project${1|2|3|4|5|6}Desc`),
    tag: t(`project${n}Tag` as `project${1|2|3|4|5|6}Tag`) as FilterKey,
    emoji: EMOJIS[n - 1],
  }));

  const filters: FilterKey[] = ['All', 'Translation', 'Content', 'Education'];
  const filterLabels: Record<FilterKey, string> = {
    All: t('filterAll'),
    Translation: t('filterTranslation'),
    Content: t('filterContent'),
    Education: t('filterEducation'),
  };

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.tag === activeFilter);

  return (
    <section id="portfolio" ref={ref} className="section-padding relative overflow-hidden">
      <div
        className="orb w-[400px] h-[400px] left-1/2 -translate-x-1/2 top-0 opacity-10"
        style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
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

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-3 mb-12 flex-wrap"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeFilter === f
                  ? 'btn-primary py-2 px-5 text-sm'
                  : 'glass text-[#94a3b8] hover:text-white'
              }`}
            >
              {filterLabels[f]}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                whileHover={{ y: -8 }}
                className="glass glass-hover rounded-3xl overflow-hidden group cursor-pointer gradient-border"
              >
                {/* Cover */}
                <div
                  className="h-44 flex items-center justify-center text-6xl relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${TAG_BG[project.tag]} 0%, rgba(255,255,255,0.02) 100%)`,
                  }}
                >
                  <motion.span
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {project.emoji}
                  </motion.span>
                  {/* Tag */}
                  <div
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{
                      background: TAG_BG[project.tag],
                      color: TAG_COLORS[project.tag],
                      border: `1px solid ${TAG_COLORS[project.tag]}30`,
                    }}
                  >
                    {project.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#f5a623] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[#64748b] text-sm leading-relaxed mb-4">{project.desc}</p>
                  <button
                    className="inline-flex items-center gap-1.5 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                    style={{ color: TAG_COLORS[project.tag] }}
                  >
                    {t('viewProject')} <ExternalLink size={13} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
