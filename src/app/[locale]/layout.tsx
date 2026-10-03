import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter, Playfair_Display } from 'next/font/google';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Alaya Zaaraoui | Spanish Language Specialist',
  description:
    'Expert linguist, certified translator, and language educator. Bridging cultures through language with 10+ years of professional experience.',
  keywords: [
    'Spanish translator',
    'language specialist',
    'Spanish coach',
    'translation services',
    'localization',
    'bilingual',
    'linguist',
  ],
  openGraph: {
    title: 'Alaya Zaaraoui | Spanish Language Specialist',
    description: 'Bridging Cultures Through Language',
    type: 'website',
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="bg-[#080812] text-white antialiased overflow-x-hidden">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
