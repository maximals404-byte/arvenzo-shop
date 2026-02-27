'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { t as tFn } from '@/lib/translations';

interface LanguageContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, vars?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'nl',
  setLocale: () => {},
  t: (key) => key,
});

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: string;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState(initialLocale);

  const setLocale = useCallback(
    (newLocale: string) => {
      setLocaleState(newLocale);
      document.cookie = `arvenzo_locale=${newLocale}; path=/; max-age=${365 * 24 * 3600}; SameSite=Lax`;
      router.refresh();
    },
    [router],
  );

  const t = useCallback(
    (key: string, vars?: Record<string, string>) => tFn(key, locale, vars),
    [locale],
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
