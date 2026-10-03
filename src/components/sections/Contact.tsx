'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const INFO_ICONS = [Mail, Phone, MapPin, Clock];
const INFO_COLORS = ['#f5a623', '#a78bfa', '#38bdf8', '#34d399'];

export default function Contact() {
  const t = useTranslations('contact');
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('sent');
  };

  const infoItems = [
    { titleKey: 'info1Title' as const, valueKey: 'info1Value' as const },
    { titleKey: 'info2Title' as const, valueKey: 'info2Value' as const },
    { titleKey: 'info3Title' as const, valueKey: 'info3Value' as const },
    { titleKey: 'info4Title' as const, valueKey: 'info4Value' as const },
  ];

  return (
    <section id="contact" ref={ref} className="section-padding relative overflow-hidden">
      <div
        className="orb w-[500px] h-[500px] left-0 top-1/2 -translate-y-1/2 opacity-10"
        style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)' }}
      />
      <div
        className="orb w-[400px] h-[400px] right-0 top-0 opacity-10"
        style={{ background: 'radial-gradient(circle, #f5a623 0%, transparent 70%)' }}
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

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {infoItems.map(({ titleKey, valueKey }, i) => {
                const Icon = INFO_ICONS[i];
                const color = INFO_COLORS[i];
                return (
                  <motion.div
                    key={titleKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                    className="glass glass-hover rounded-2xl p-5"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: `${color}15` }}
                    >
                      <Icon size={18} style={{ color }} />
                    </div>
                    <p className="text-xs text-[#64748b] mb-1 uppercase tracking-wider font-medium">
                      {t(titleKey)}
                    </p>
                    <p className="text-white font-semibold text-sm">{t(valueKey)}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Decorative quote */}
            <div className="glass rounded-2xl p-6 border-l-4 border-[#f5a623]">
              <p className="text-[#94a3b8] italic text-sm leading-relaxed" style={{ fontFamily: 'var(--font-playfair)' }}>
                "El lenguaje es el vestido del pensamiento." — Samuel Johnson
              </p>
              <p className="text-[#f5a623] text-xs mt-2 font-medium">Language is the dress of thought.</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {status === 'sent' ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass rounded-3xl p-12 text-center flex flex-col items-center gap-5"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                >
                  <CheckCircle size={60} className="text-[#34d399]" />
                </motion.div>
                <p className="text-white text-xl font-bold">{t('successMsg')}</p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass rounded-3xl p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-[#94a3b8] mb-2 font-medium">{t('nameLabel')}</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t('namePlaceholder')}
                      required
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#94a3b8] mb-2 font-medium">{t('emailLabel')}</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t('emailPlaceholder')}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#94a3b8] mb-2 font-medium">{t('serviceLabel')}</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="" disabled>{t('servicePlaceholder')}</option>
                    <option value="translation">Translation & Localization</option>
                    <option value="coaching">Language Coaching</option>
                    <option value="interpretation">Interpretation</option>
                    <option value="content">Content Writing</option>
                    <option value="proofreading">Proofreading & Editing</option>
                    <option value="consulting">Cultural Consulting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-[#94a3b8] mb-2 font-medium">{t('messageLabel')}</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t('messagePlaceholder')}
                    rows={5}
                    required
                    className="form-input"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full justify-center py-4 text-base"
                >
                  {status === 'sending' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                      />
                      {t('sending')}
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      {t('sendBtn')}
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
