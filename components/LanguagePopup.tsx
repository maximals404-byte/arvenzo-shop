'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { LOCALES, COUNTRY_LANGUAGES, t } from '@/lib/translations';

type PopupMode = 'multi' | 'full';

interface PopupState {
  mode: PopupMode;
  languages: string[];
  currentLocale: string;
}

function getLocaleFromCookie(): string {
  if (typeof document === 'undefined') return 'nl';
  const match = document.cookie.match(/(?:^|;\s*)arvenzo_locale=([^;]+)/);
  return match?.[1] ?? 'nl';
}

function setLocaleCookie(locale: string) {
  document.cookie = `arvenzo_locale=${locale}; path=/; max-age=${365 * 24 * 3600}; SameSite=Lax`;
}

export default function LanguagePopup() {
  const router = useRouter();
  const [state, setState] = useState<PopupState | null>(null);
  const [selected, setSelected] = useState<string>('nl');

  useEffect(() => {
    // Already chosen in a previous session
    if (localStorage.getItem('arvenzo_locale_chosen')) return;

    async function detectAndShow() {
      try {
        const res = await fetch('/api/geo');
        const { country } = await res.json() as { country: string };
        const currentLocale = getLocaleFromCookie();

        const langs = COUNTRY_LANGUAGES[country];

        if (!langs) {
          // Unknown country → show full language picker
          setState({ mode: 'full', languages: LOCALES.map(l => l.code), currentLocale });
          setSelected(currentLocale);
          return;
        }

        if (langs.length === 1) {
          // Single-language country → silently apply and mark as chosen
          const [onlyLang] = langs;
          setLocaleCookie(onlyLang);
          localStorage.setItem('arvenzo_locale_chosen', '1');
          router.refresh();
          return;
        }

        // Multi-language country → show popup with those languages
        setState({ mode: 'multi', languages: langs, currentLocale });
        setSelected(currentLocale);
      } catch {
        // Network error or geo unavailable — stay silent
      }
    }

    detectAndShow();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function confirm() {
    setLocaleCookie(selected);
    localStorage.setItem('arvenzo_locale_chosen', '1');
    // Clear the middleware popup cookie
    document.cookie = 'arvenzo_lang_popup=; path=/; max-age=0';
    setState(null);
    router.refresh();
  }

  function dismiss() {
    localStorage.setItem('arvenzo_locale_chosen', '1');
    document.cookie = 'arvenzo_lang_popup=; path=/; max-age=0';
    setState(null);
  }

  if (!state) return null;

  const displayLocale = state.currentLocale;
  const popupTitle = t('lang.popup.title', displayLocale);
  const confirmLabel = t('lang.popup.confirm', displayLocale);

  const visibleLocales = state.mode === 'full'
    ? LOCALES
    : LOCALES.filter(l => state.languages.includes(l.code));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-arvenzo-ink/70 backdrop-blur-sm"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative bg-arvenzo-cream rounded-2xl p-8 w-full max-w-sm shadow-2xl animate-fade-up">
        {/* Close */}
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-4 right-4 p-1.5 rounded-full text-arvenzo-muted hover:text-arvenzo-ink hover:bg-arvenzo-cream-dark transition-colors"
        >
          <X size={18} />
        </button>

        {/* Logo */}
        <div className="font-heading font-black text-2xl tracking-[0.15em] text-arvenzo-ink mb-5">
          ARVENZO
        </div>

        {/* Title — show in popup locale AND selected locale if different */}
        <p className="font-heading font-bold text-arvenzo-ink text-lg leading-snug mb-1">
          {popupTitle}
        </p>
        {selected !== displayLocale && (
          <p className="text-arvenzo-muted text-sm font-sans mb-4">
            {t('lang.popup.title', selected)}
          </p>
        )}

        {/* Language list */}
        <div
          className={`mt-4 space-y-2 ${state.mode === 'full' ? 'max-h-[260px] overflow-y-auto pr-1' : ''}`}
        >
          {visibleLocales.map((loc) => {
            const isActive = selected === loc.code;
            return (
              <button
                key={loc.code}
                onClick={() => setSelected(loc.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${
                  isActive
                    ? 'bg-arvenzo-brown border-arvenzo-brown text-arvenzo-cream'
                    : 'border-arvenzo-cream-dark bg-white/50 hover:border-arvenzo-brown/40 hover:bg-arvenzo-cream-dark text-arvenzo-ink'
                }`}
              >
                <span className="text-lg leading-none">{loc.flag}</span>
                <span className="flex-1 font-sans font-medium text-sm">{loc.native}</span>
                {isActive && (
                  <span className="text-arvenzo-cream text-xs">✓</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Confirm button */}
        <button
          onClick={confirm}
          className="mt-5 w-full bg-arvenzo-brown text-arvenzo-cream font-heading font-bold py-3.5 rounded-full hover:bg-arvenzo-brown-light active:scale-[0.98] transition-all text-[14px] tracking-wide"
        >
          {confirmLabel}
          {selected !== displayLocale && ` / ${t('lang.popup.confirm', selected)}`}
        </button>
      </div>
    </div>
  );
}
