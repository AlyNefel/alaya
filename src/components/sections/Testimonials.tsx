'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const testimonials = [1, 2, 3, 4].map((n) => ({
    quote: t(`t${n}Quote` as `t${1|2|3|4}Quote`),
    name: t(`t${n}Name` as `t${1|2|3|4}Name`),
    role: t(`t${n}Role` as `t${1|2|3|4}Role`),
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section
      id="testimonials"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080812 0%, #0d0d1e 50%, #080812 100%)' }}
    >
      <div
        className="orb w-[600px] h-[600px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-08"
        style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-label">✦ {t('sectionLabel')}</span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-6"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {t('title')}
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden min-h-[300px] flex flex-col items-center justify-center">
            {/* Quote icon */}
            <div className="w-14 h-14 rounded-full bg-[rgba(245,166,35,0.1)] flex items-center justify-center mb-8">
              <Quote size={24} className="text-[#f5a623]" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="text-[#f5a623] fill-[#f5a623]" />
              ))}
            </div>

            {/* Quote text */}
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <blockquote
                  className="text-lg md:text-xl text-[#e2e8f0] leading-relaxed mb-8 max-w-2xl mx-auto italic"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  "{testimonials[current].quote}"
                </blockquote>

                <div>
                  <p className="text-white font-bold text-lg">{testimonials[current].name}</p>
                  <p className="text-[#f5a623] text-sm font-medium mt-1">{testimonials[current].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="w-11 h-11 rounded-full glass flex items-center justify-center text-[#94a3b8] hover:text-white hover:border-[rgba(245,166,35,0.4)] transition-all"
            >
              <ChevronLeft size={20} />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-8 bg-[#f5a623]'
                      : 'w-2 bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.4)]'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(1)}
              className="w-11 h-11 rounded-full glass flex items-center justify-center text-[#94a3b8] hover:text-white hover:border-[rgba(245,166,35,0.4)] transition-all"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
