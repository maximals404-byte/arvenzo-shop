'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { LOCALES } from '@/lib/translations';
import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSelector() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LOCALES.find(l => l.code === locale) ?? LOCALES[0];

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function choose(code: string) {
    setOpen(false);
    if (code !== locale) setLocale(code);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 text-arvenzo-cream/30 hover:text-arvenzo-cream/60 transition-colors text-[11px] font-sans"
        aria-label="Select language"
      >
        <Globe size={13} />
        <span>{current.native}</span>
        <ChevronDown size={11} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute bottom-full right-0 mb-2 w-52 bg-arvenzo-ink border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
          <div className="max-h-[280px] overflow-y-auto">
            {LOCALES.map(loc => (
              <button
                key={loc.code}
                onClick={() => choose(loc.code)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left transition-colors text-sm ${
                  loc.code === locale
                    ? 'bg-arvenzo-brown/30 text-arvenzo-cream'
                    : 'text-arvenzo-cream/50 hover:bg-white/5 hover:text-arvenzo-cream/80'
                }`}
              >
                <span className="text-base leading-none">{loc.flag}</span>
                <span className="font-sans">{loc.native}</span>
                {loc.code === locale && (
                  <span className="ml-auto text-arvenzo-orange text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
