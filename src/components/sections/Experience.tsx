'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

const JOB_DOTS = ['#f5a623', '#a78bfa', '#38bdf8', '#34d399'];

export default function Experience() {
  const t = useTranslations('experience');
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const jobs = [1, 2, 3, 4].map((n) => ({
    title: t(`job${n}Title` as `job${1|2|3|4}Title`),
    company: t(`job${n}Company` as `job${1|2|3|4}Company`),
    period: t(`job${n}Period` as `job${1|2|3|4}Period`),
    desc: t(`job${n}Desc` as `job${1|2|3|4}Desc`),
    color: JOB_DOTS[n - 1],
  }));

  return (
    <section id="experience" ref={ref} className="section-padding relative overflow-hidden">
      <div
        className="orb w-[400px] h-[400px] left-0 bottom-0 opacity-10"
        style={{ background: 'radial-gradient(circle, #f5a623 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
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

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
            className="timeline-line origin-top hidden md:block"
          />

          <div className="space-y-12">
            {jobs.map((job, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                  className={`relative flex items-center gap-8 ${
                    isLeft
                      ? 'md:flex-row flex-col'
                      : 'md:flex-row-reverse flex-col'
                  }`}
                >
                  {/* Card */}
                  <div className="flex-1 md:max-w-[calc(50%-40px)]">
                    <div className="glass glass-hover rounded-2xl p-6 group">
                      {/* Period badge */}
                      <div
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                        style={{ background: `${job.color}15`, color: job.color, border: `1px solid ${job.color}25` }}
                      >
                        <Calendar size={11} />
                        {job.period}
                      </div>

                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#f5a623] transition-colors">
                        {job.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-[#64748b] text-sm mb-3">
                        <MapPin size={12} />
                        {job.company}
                      </div>

                      <p className="text-[#94a3b8] text-sm leading-relaxed">{job.desc}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="relative hidden md:flex items-center justify-center w-10 flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
                      className="w-5 h-5 rounded-full border-2 border-[#080812] shadow-lg z-10"
                      style={{ background: job.color, boxShadow: `0 0 15px ${job.color}60` }}
                    />
                  </div>

                  {/* Spacer (for alternating layout) */}
                  <div className="flex-1 md:max-w-[calc(50%-40px)] hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
