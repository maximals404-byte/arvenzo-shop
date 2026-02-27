import { NextRequest, NextResponse } from 'next/server';

// Countries where a popup should ask the user to pick a language
const MULTI_LANG_COUNTRIES: Record<string, string[]> = {
  BE: ['nl', 'fr', 'de'],
  CH: ['de', 'fr', 'it'],
  LU: ['fr', 'de', 'lb'],
  FI: ['fi', 'sv'],
  MT: ['mt', 'en'],
  CY: ['el', 'en'],
  IE: ['ga', 'en'],
};

// Countries where a single locale can be auto-set silently
const SINGLE_LANG_COUNTRIES: Record<string, string> = {
  NL: 'nl', FR: 'fr', DE: 'de', AT: 'de', LI: 'de',
  ES: 'es', IT: 'it', PT: 'pt', PL: 'pl',
  SE: 'sv', DK: 'da', NO: 'no', IS: 'no',
  EE: 'et', LV: 'lv', LT: 'lt',
  HU: 'hu', CZ: 'cs', SK: 'sk', RO: 'ro',
  BG: 'bg', HR: 'hr', SI: 'sl', GR: 'el',
  GB: 'en', US: 'en', CA: 'en', AU: 'en', NZ: 'en',
};

const ONE_YEAR = 365 * 24 * 60 * 60;

export function middleware(request: NextRequest) {
  const existingLocale = request.cookies.get('arvenzo_locale')?.value;

  // Already set — no action needed
  if (existingLocale) {
    return NextResponse.next();
  }

  const country = request.headers.get('x-vercel-ip-country') ?? 'XX';
  const response = NextResponse.next();

  if (MULTI_LANG_COUNTRIES[country]) {
    // Set first language as default for SSR; popup will ask user to confirm
    const [firstLang] = MULTI_LANG_COUNTRIES[country];
    response.cookies.set('arvenzo_locale', firstLang, {
      path: '/',
      maxAge: ONE_YEAR,
      sameSite: 'lax',
    });
    response.cookies.set('arvenzo_lang_popup', 'true', {
      path: '/',
      maxAge: 60 * 60, // 1 hour; popup clears it via localStorage flag
      sameSite: 'lax',
    });
  } else if (SINGLE_LANG_COUNTRIES[country]) {
    // Auto-set, no popup
    response.cookies.set('arvenzo_locale', SINGLE_LANG_COUNTRIES[country], {
      path: '/',
      maxAge: ONE_YEAR,
      sameSite: 'lax',
    });
  } else {
    // Unknown country — default to NL (Belgian brand), show full popup
    response.cookies.set('arvenzo_locale', 'nl', {
      path: '/',
      maxAge: ONE_YEAR,
      sameSite: 'lax',
    });
    response.cookies.set('arvenzo_lang_popup', 'true', {
      path: '/',
      maxAge: 60 * 60,
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|images/).*)',
  ],
};
