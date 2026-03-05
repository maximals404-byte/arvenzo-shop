export interface LocaleInfo {
  code: string;
  name: string;       // Dutch name (for display in NL UI)
  native: string;     // Native name
  flag: string;       // Flag emoji
}

export const LOCALES: LocaleInfo[] = [
  { code: 'nl', name: 'Nederlands',    native: 'Nederlands',      flag: '🇳🇱' },
  { code: 'fr', name: 'Frans',         native: 'Français',        flag: '🇫🇷' },
  { code: 'de', name: 'Duits',         native: 'Deutsch',         flag: '🇩🇪' },
  { code: 'en', name: 'Engels',        native: 'English',         flag: '🇬🇧' },
  { code: 'es', name: 'Spaans',        native: 'Español',         flag: '🇪🇸' },
  { code: 'it', name: 'Italiaans',     native: 'Italiano',        flag: '🇮🇹' },
  { code: 'pt', name: 'Portugees',     native: 'Português',       flag: '🇵🇹' },
  { code: 'pl', name: 'Pools',         native: 'Polski',          flag: '🇵🇱' },
  { code: 'sv', name: 'Zweeds',        native: 'Svenska',         flag: '🇸🇪' },
  { code: 'da', name: 'Deens',         native: 'Dansk',           flag: '🇩🇰' },
  { code: 'no', name: 'Noors',         native: 'Norsk',           flag: '🇳🇴' },
  { code: 'fi', name: 'Fins',          native: 'Suomi',           flag: '🇫🇮' },
  { code: 'el', name: 'Grieks',        native: 'Ελληνικά',        flag: '🇬🇷' },
  { code: 'cs', name: 'Tsjechisch',    native: 'Čeština',         flag: '🇨🇿' },
  { code: 'sk', name: 'Slowaaks',      native: 'Slovenčina',      flag: '🇸🇰' },
  { code: 'hu', name: 'Hongaars',      native: 'Magyar',          flag: '🇭🇺' },
  { code: 'ro', name: 'Roemeens',      native: 'Română',          flag: '🇷🇴' },
  { code: 'bg', name: 'Bulgaars',      native: 'Български',       flag: '🇧🇬' },
  { code: 'hr', name: 'Kroatisch',     native: 'Hrvatski',        flag: '🇭🇷' },
  { code: 'sl', name: 'Sloveens',      native: 'Slovenščina',     flag: '🇸🇮' },
  { code: 'et', name: 'Ests',          native: 'Eesti',           flag: '🇪🇪' },
  { code: 'lv', name: 'Lets',          native: 'Latviešu',        flag: '🇱🇻' },
  { code: 'lt', name: 'Litouws',       native: 'Lietuvių',        flag: '🇱🇹' },
  { code: 'ga', name: 'Iers',          native: 'Gaeilge',         flag: '🇮🇪' },
  { code: 'mt', name: 'Maltees',       native: 'Malti',           flag: '🇲🇹' },
  { code: 'lb', name: 'Luxemburgs',    native: 'Lëtzebuergesch',  flag: '🇱🇺' },
];

// Countries with multiple languages → show popup
// Countries with one language → auto-set silently
// Countries not listed → show full popup
export const COUNTRY_LANGUAGES: Record<string, string[]> = {
  // Multi-language (popup)
  BE: ['nl', 'fr', 'de'],
  CH: ['de', 'fr', 'it'],
  LU: ['fr', 'de', 'lb'],
  FI: ['fi', 'sv'],
  MT: ['mt', 'en'],
  CY: ['el', 'en'],
  IE: ['ga', 'en'],
  // Single-language EU
  NL: ['nl'],
  FR: ['fr'],
  DE: ['de'],
  AT: ['de'],
  LI: ['de'],
  ES: ['es'],
  IT: ['it'],
  PT: ['pt'],
  PL: ['pl'],
  SE: ['sv'],
  DK: ['da'],
  NO: ['no'],
  IS: ['no'],
  EE: ['et'],
  LV: ['lv'],
  LT: ['lt'],
  HU: ['hu'],
  CZ: ['cs'],
  SK: ['sk'],
  RO: ['ro'],
  BG: ['bg'],
  HR: ['hr'],
  SI: ['sl'],
  GR: ['el'],
  // Non-EU common
  GB: ['en'],
  US: ['en'],
  CA: ['en'],
  AU: ['en'],
  NZ: ['en'],
};

// Translation lookup: key → locale → string
// Fully translated: nl, fr, de, en, es, it, pt, pl, sv, da, no, fi
// Fallback to 'en' for: el, cs, sk, hu, ro, bg, hr, sl, et, lv, lt, ga, mt, lb
const translations: Record<string, Record<string, string>> = {
  // ─── Navigation ────────────────────────────────────────────────────────────
  'nav.shop': {
    nl: 'Shop', fr: 'Boutique', de: 'Shop', en: 'Shop',
    es: 'Tienda', it: 'Shop', pt: 'Loja', pl: 'Sklep',
    sv: 'Shop', da: 'Shop', no: 'Shop', fi: 'Kauppa',
  },
  'nav.story': {
    nl: 'Ons verhaal', fr: 'Notre histoire', de: 'Unsere Geschichte', en: 'Our story',
    es: 'Nuestra historia', it: 'La nostra storia', pt: 'Nossa história', pl: 'Nasza historia',
    sv: 'Vår historia', da: 'Vores historie', no: 'Vår historie', fi: 'Meidän tarina',
  },
  'nav.faq': {
    nl: 'FAQ', fr: 'FAQ', de: 'FAQ', en: 'FAQ',
    es: 'FAQ', it: 'FAQ', pt: 'FAQ', pl: 'FAQ',
    sv: 'FAQ', da: 'FAQ', no: 'FAQ', fi: 'UKK',
  },
  'nav.contact': {
    nl: 'Contact', fr: 'Contact', de: 'Kontakt', en: 'Contact',
    es: 'Contacto', it: 'Contatto', pt: 'Contato', pl: 'Kontakt',
    sv: 'Kontakt', da: 'Kontakt', no: 'Kontakt', fi: 'Yhteystiedot',
  },
  'nav.account': {
    nl: 'Mijn account', fr: 'Mon compte', de: 'Mein Konto', en: 'My account',
    es: 'Mi cuenta', it: 'Il mio account', pt: 'Minha conta', pl: 'Moje konto',
    sv: 'Mitt konto', da: 'Min konto', no: 'Min konto', fi: 'Oma tili',
  },
  'nav.login': {
    nl: 'Inloggen', fr: 'Se connecter', de: 'Anmelden', en: 'Login',
    es: 'Iniciar sesión', it: 'Accedi', pt: 'Entrar', pl: 'Zaloguj się',
    sv: 'Logga in', da: 'Log ind', no: 'Logg inn', fi: 'Kirjaudu',
  },
  // ─── Announcement bar ──────────────────────────────────────────────────────
  'announcement.text': {
    nl: 'Gratis verzending v.a. €50 · Limited edition · Gedrukt in Europa',
    fr: 'Livraison gratuite dès 50€ · Édition limitée · Imprimé en Europe',
    de: 'Gratisversand ab 50€ · Limited Edition · In Europa gedruckt',
    en: 'Free shipping from €50 · Limited edition · Printed in Europe',
    es: 'Envío gratis desde 50€ · Edición limitada · Impreso en Europa',
    it: 'Spedizione gratuita da 50€ · Edizione limitata · Stampato in Europa',
    pt: 'Envio grátis a partir de 50€ · Edição limitada · Impresso na Europa',
    pl: 'Darmowa wysyłka od 50€ · Limitowana edycja · Drukowane w Europie',
    sv: 'Gratis frakt från 50€ · Limited edition · Tryckt i Europa',
    da: 'Gratis fragt fra 50€ · Begrænset udgave · Trykt i Europa',
    no: 'Gratis frakt fra 50€ · Limited edition · Trykt i Europa',
    fi: 'Ilmainen toimitus yli 50€ · Limited edition · Painettu Euroopassa',
  },
  // ─── Mobile menu tagline ───────────────────────────────────────────────────
  'mobile.tagline': {
    nl: 'Belgisch merk · Gedrukt in Europa',
    fr: 'Marque belge · Imprimé en Europe',
    de: 'Belgische Marke · In Europa gedruckt',
    en: 'Belgian brand · Printed in Europe',
    es: 'Marca belga · Impreso en Europa',
    it: 'Marchio belga · Stampato in Europa',
    pt: 'Marca belga · Impresso na Europa',
    pl: 'Belgijska marka · Drukowane w Europie',
    sv: 'Belgiskt märke · Tryckt i Europa',
    da: 'Belgisk mærke · Trykt i Europa',
    no: 'Belgisk merke · Trykt i Europa',
    fi: 'Belgialainen merkki · Painettu Euroopassa',
  },
  // ─── Footer ────────────────────────────────────────────────────────────────
  'footer.tagline': {
    nl: 'Avontuur en rust in elk ontwerp. Belgisch merk, gedrukt in Europa.',
    fr: 'Aventure et sérénité dans chaque design. Marque belge, imprimée en Europe.',
    de: 'Abenteuer und Ruhe in jedem Design. Belgische Marke, in Europa gedruckt.',
    en: 'Adventure and calm in every design. Belgian brand, printed in Europe.',
    es: 'Aventura y calma en cada diseño. Marca belga, impresa en Europa.',
    it: 'Avventura e calma in ogni design. Marchio belga, stampato in Europa.',
    pt: 'Aventura e calma em cada design. Marca belga, impressa na Europa.',
    pl: 'Przygoda i spokój w każdym projekcie. Belgijska marka, drukowana w Europie.',
    sv: 'Äventyr och ro i varje design. Belgiskt märke, tryckt i Europa.',
    da: 'Eventyr og ro i hvert design. Belgisk mærke, trykt i Europa.',
    no: 'Eventyr og ro i hvert design. Belgisk merke, trykt i Europa.',
    fi: 'Seikkailua ja rauhaa jokaisessa designissa. Belgialainen merkki, painettu Euroopassa.',
  },
  'footer.col.shop': {
    nl: 'Shop', fr: 'Boutique', de: 'Shop', en: 'Shop',
    es: 'Tienda', it: 'Shop', pt: 'Loja', pl: 'Sklep',
    sv: 'Shop', da: 'Shop', no: 'Shop', fi: 'Kauppa',
  },
  'footer.col.service': {
    nl: 'Service', fr: 'Service', de: 'Service', en: 'Service',
    es: 'Servicio', it: 'Servizio', pt: 'Serviço', pl: 'Serwis',
    sv: 'Service', da: 'Service', no: 'Service', fi: 'Palvelu',
  },
  'footer.col.info': {
    nl: 'Info', fr: 'Info', de: 'Info', en: 'Info',
    es: 'Info', it: 'Info', pt: 'Info', pl: 'Info',
    sv: 'Info', da: 'Info', no: 'Info', fi: 'Tietoa',
  },
  'footer.link.all_products': {
    nl: 'Alle producten', fr: 'Tous les produits', de: 'Alle Produkte', en: 'All products',
    es: 'Todos los productos', it: 'Tutti i prodotti', pt: 'Todos os produtos', pl: 'Wszystkie produkty',
    sv: 'Alla produkter', da: 'Alle produkter', no: 'Alle produkter', fi: 'Kaikki tuotteet',
  },
  'footer.link.hoodies': {
    nl: 'Hoodies', fr: 'Sweats à capuche', de: 'Hoodies', en: 'Hoodies',
    es: 'Sudaderas', it: 'Felpe con cappuccio', pt: 'Hoodies', pl: 'Bluzy',
    sv: 'Hoodies', da: 'Hættetrøjer', no: 'Hettegensere', fi: 'Hupparit',
  },
  'footer.link.sweatshirts': {
    nl: 'Sweatshirts', fr: 'Sweat-shirts', de: 'Sweatshirts', en: 'Sweatshirts',
    es: 'Sudaderas sin capucha', it: 'Felpe', pt: 'Moletom', pl: 'Bluzy bez kaptura',
    sv: 'Sweatshirts', da: 'Sweatshirts', no: 'Sweatshirts', fi: 'Collegepaidat',
  },
  'footer.link.shirts': {
    nl: 'Shirts', fr: 'T-shirts', de: 'Shirts', en: 'Shirts',
    es: 'Camisetas', it: 'Magliette', pt: 'Camisetas', pl: 'Koszulki',
    sv: 'Tröjor', da: 'Trøjer', no: 'Skjorter', fi: 'Paidat',
  },
  'footer.link.mugs': {
    nl: 'Mugs', fr: 'Tasses', de: 'Tassen', en: 'Mugs',
    es: 'Tazas', it: 'Tazze', pt: 'Canecas', pl: 'Kubki',
    sv: 'Muggar', da: 'Krus', no: 'Krus', fi: 'Mukit',
  },
  'footer.link.shipping': {
    nl: 'Verzending', fr: 'Livraison', de: 'Versand', en: 'Shipping',
    es: 'Envío', it: 'Spedizione', pt: 'Envio', pl: 'Wysyłka',
    sv: 'Frakt', da: 'Fragt', no: 'Frakt', fi: 'Toimitus',
  },
  'footer.link.returns': {
    nl: 'Retourneren', fr: 'Retours', de: 'Rückgabe', en: 'Returns',
    es: 'Devoluciones', it: 'Resi', pt: 'Devoluções', pl: 'Zwroty',
    sv: 'Returer', da: 'Retur', no: 'Retur', fi: 'Palautukset',
  },
  'footer.link.sizing': {
    nl: 'Maatgids', fr: 'Guide des tailles', de: 'Größenguide', en: 'Size guide',
    es: 'Guía de tallas', it: 'Guida alle taglie', pt: 'Guia de tamanhos', pl: 'Tabela rozmiarów',
    sv: 'Storleksguide', da: 'Størrelsesguide', no: 'Størrelsesguide', fi: 'Kokotaulukko',
  },
  'footer.link.faq': {
    nl: 'FAQ', fr: 'FAQ', de: 'FAQ', en: 'FAQ',
    es: 'FAQ', it: 'FAQ', pt: 'FAQ', pl: 'FAQ',
    sv: 'FAQ', da: 'FAQ', no: 'FAQ', fi: 'UKK',
  },
  'footer.link.contact': {
    nl: 'Contact', fr: 'Contact', de: 'Kontakt', en: 'Contact',
    es: 'Contacto', it: 'Contatto', pt: 'Contato', pl: 'Kontakt',
    sv: 'Kontakt', da: 'Kontakt', no: 'Kontakt', fi: 'Yhteystiedot',
  },
  'footer.link.story': {
    nl: 'Ons verhaal', fr: 'Notre histoire', de: 'Unsere Geschichte', en: 'Our story',
    es: 'Nuestra historia', it: 'La nostra storia', pt: 'Nossa história', pl: 'Nasza historia',
    sv: 'Vår historia', da: 'Vores historie', no: 'Vår historie', fi: 'Meidän tarina',
  },
  'footer.link.company': {
    nl: 'Bedrijfsgegevens', fr: 'Infos société', de: 'Firmendaten', en: 'Company info',
    es: 'Info empresa', it: 'Info azienda', pt: 'Info empresa', pl: 'Informacje o firmie',
    sv: 'Företagsinfo', da: 'Firmaoplysninger', no: 'Firmainformasjon', fi: 'Yritystiedot',
  },
  'footer.link.privacy': {
    nl: 'Privacybeleid', fr: 'Politique de confidentialité', de: 'Datenschutz', en: 'Privacy policy',
    es: 'Política de privacidad', it: 'Privacy', pt: 'Política de privacidade', pl: 'Polityka prywatności',
    sv: 'Integritetspolicy', da: 'Privatlivspolitik', no: 'Personvernpolicy', fi: 'Tietosuojapolitiikka',
  },
  'footer.link.terms': {
    nl: 'Algemene voorwaarden', fr: 'Conditions générales', de: 'AGB', en: 'Terms & conditions',
    es: 'Términos y condiciones', it: 'Termini e condizioni', pt: 'Termos e condições', pl: 'Regulamin',
    sv: 'Allmänna villkor', da: 'Handelsbetingelser', no: 'Kjøpsvilkår', fi: 'Käyttöehdot',
  },
  'footer.link.withdrawal': {
    nl: 'Herroepingsrecht', fr: 'Droit de rétractation', de: 'Widerrufsrecht', en: 'Right of withdrawal',
    es: 'Derecho de desistimiento', it: 'Diritto di recesso', pt: 'Direito de arrependimento', pl: 'Prawo odstąpienia',
    sv: 'Ångerrätt', da: 'Fortrydelsesret', no: 'Angrerett', fi: 'Peruutusoikeus',
  },
  'footer.payment': {
    nl: 'Veilig betalen via', fr: 'Paiement sécurisé via', de: 'Sicher bezahlen via', en: 'Secure payment via',
    es: 'Pago seguro via', it: 'Pagamento sicuro via', pt: 'Pagamento seguro via', pl: 'Bezpieczna płatność via',
    sv: 'Säker betalning via', da: 'Sikker betaling via', no: 'Sikker betaling via', fi: 'Turvallinen maksu via',
  },
  'footer.secure': {
    nl: 'Veilig & beveiligd via Shopify', fr: 'Sécurisé via Shopify', de: 'Sicher via Shopify', en: 'Secure via Shopify',
    es: 'Seguro via Shopify', it: 'Sicuro via Shopify', pt: 'Seguro via Shopify', pl: 'Bezpieczne via Shopify',
    sv: 'Säkert via Shopify', da: 'Sikkert via Shopify', no: 'Sikkert via Shopify', fi: 'Turvallinen Shopifyn kautta',
  },
  // ─── Cart cross-sell ───────────────────────────────────────────────────────
  'cart.cross_sell': {
    nl: 'Klanten kochten ook', fr: 'Les clients ont aussi acheté', de: 'Kunden kauften auch', en: 'Customers also bought',
    es: 'Los clientes también compraron', it: 'I clienti hanno acquistato anche', pt: 'Clientes também compraram', pl: 'Klienci kupili też',
    sv: 'Kunder köpte också', da: 'Kunder køber også', no: 'Kunder kjøpte også', fi: 'Asiakkaat ostivat myös',
  },
  'cart.add': {
    nl: 'toevoegen', fr: 'ajouter', de: 'hinzufügen', en: 'add',
    es: 'añadir', it: 'aggiungere', pt: 'adicionar', pl: 'dodaj',
    sv: 'lägg till', da: 'tilføj', no: 'legg til', fi: 'lisää',
  },
  // ─── Cart ──────────────────────────────────────────────────────────────────
  'cart.title': {
    nl: 'Winkelwagen', fr: 'Panier', de: 'Warenkorb', en: 'Cart',
    es: 'Cesta', it: 'Carrello', pt: 'Carrinho', pl: 'Koszyk',
    sv: 'Varukorg', da: 'Indkøbskurv', no: 'Handlekurv', fi: 'Ostoskori',
  },
  'cart.empty': {
    nl: 'Winkelwagen is leeg', fr: 'Votre panier est vide', de: 'Warenkorb ist leer', en: 'Cart is empty',
    es: 'Cesta vacía', it: 'Carrello vuoto', pt: 'Carrinho vazio', pl: 'Koszyk jest pusty',
    sv: 'Varukorgen är tom', da: 'Indkøbskurv er tom', no: 'Handlekurven er tom', fi: 'Ostoskori on tyhjä',
  },
  'cart.empty_sub': {
    nl: 'Voeg producten toe om verder te gaan', fr: 'Ajoutez des produits pour continuer', de: 'Produkte hinzufügen um fortzufahren', en: 'Add products to continue',
    es: 'Añade productos para continuar', it: 'Aggiungi prodotti per continuare', pt: 'Adicione produtos para continuar', pl: 'Dodaj produkty, aby kontynuować',
    sv: 'Lägg till produkter för att fortsätta', da: 'Tilføj produkter for at fortsætte', no: 'Legg til produkter for å fortsette', fi: 'Lisää tuotteita jatkaaksesi',
  },
  'cart.shop_now': {
    nl: 'Shop nu', fr: 'Acheter maintenant', de: 'Jetzt shoppen', en: 'Shop now',
    es: 'Comprar ahora', it: 'Acquista ora', pt: 'Comprar agora', pl: 'Kup teraz',
    sv: 'Handla nu', da: 'Shop nu', no: 'Handle nå', fi: 'Osta nyt',
  },
  'cart.subtotal': {
    nl: 'Subtotaal', fr: 'Sous-total', de: 'Zwischensumme', en: 'Subtotal',
    es: 'Subtotal', it: 'Subtotale', pt: 'Subtotal', pl: 'Suma częściowa',
    sv: 'Delsumma', da: 'Subtotal', no: 'Subtotal', fi: 'Välisumma',
  },
  'cart.checkout': {
    nl: 'Afrekenen', fr: 'Commander', de: 'Zur Kasse', en: 'Checkout',
    es: 'Pagar', it: 'Acquista', pt: 'Finalizar', pl: 'Zamów',
    sv: 'Till kassan', da: 'Gå til kassen', no: 'Til kassen', fi: 'Kassalle',
  },
  'cart.continue': {
    nl: 'Verder winkelen', fr: 'Continuer mes achats', de: 'Weiter einkaufen', en: 'Continue shopping',
    es: 'Seguir comprando', it: 'Continua gli acquisti', pt: 'Continuar comprando', pl: 'Kontynuuj zakupy',
    sv: 'Fortsätt handla', da: 'Fortsæt med at handle', no: 'Fortsett å handle', fi: 'Jatka ostoksia',
  },
  'cart.free_shipping': {
    nl: '✓ Gratis verzending inbegrepen', fr: '✓ Livraison gratuite incluse', de: '✓ Gratisversand inklusive', en: '✓ Free shipping included',
    es: '✓ Envío gratuito incluido', it: '✓ Spedizione gratuita inclusa', pt: '✓ Frete grátis incluído', pl: '✓ Darmowa wysyłka w cenie',
    sv: '✓ Gratis frakt ingår', da: '✓ Gratis fragt inkluderet', no: '✓ Gratis frakt inkludert', fi: '✓ Ilmainen toimitus sisältyy',
  },
  'cart.towards_free': {
    nl: '+ €{amount} voor gratis verzending', fr: '+ {amount}€ pour la livraison gratuite', de: '+ {amount}€ bis Gratisversand', en: '+ €{amount} for free shipping',
    es: '+ {amount}€ para envío gratis', it: '+ {amount}€ per la spedizione gratuita', pt: '+ {amount}€ para frete grátis', pl: '+ {amount}€ do darmowej wysyłki',
    sv: '+ {amount}€ för gratis frakt', da: '+ {amount}€ til gratis fragt', no: '+ {amount}€ til gratis frakt', fi: '+ {amount}€ ilmaiseen toimitukseen',
  },
  // ─── Cookie banner ─────────────────────────────────────────────────────────
  'cookie.text': {
    nl: 'Wij gebruiken cookies voor analytische doeleinden. Meer info in ons',
    fr: "Nous utilisons des cookies à des fins analytiques. Plus d'infos dans notre",
    de: 'Wir verwenden Cookies für analytische Zwecke. Mehr Infos in unserer',
    en: 'We use cookies for analytical purposes. More info in our',
    es: 'Usamos cookies con fines analíticos. Más info en nuestra',
    it: 'Utilizziamo cookie a scopi analitici. Più informazioni nella nostra',
    pt: 'Usamos cookies para fins analíticos. Mais info na nossa',
    pl: 'Używamy plików cookie do celów analitycznych. Więcej w naszej',
    sv: 'Vi använder cookies för analytiska ändamål. Mer info i vår',
    da: 'Vi bruger cookies til analytiske formål. Mere info i vores',
    no: 'Vi bruker informasjonskapsler til analytiske formål. Mer info i vår',
    fi: 'Käytämme evästeitä analyyttisiin tarkoituksiin. Lisätietoja',
  },
  'cookie.privacy': {
    nl: 'Privacybeleid', fr: 'Politique de confidentialité', de: 'Datenschutzerklärung', en: 'Privacy Policy',
    es: 'Política de privacidad', it: 'Informativa privacy', pt: 'Política de Privacidade', pl: 'Polityce prywatności',
    sv: 'Integritetspolicy', da: 'Privatlivspolitik', no: 'Personvernpolicy', fi: 'tietosuojaselosteessamme',
  },
  'cookie.accept': {
    nl: 'Accepteren', fr: 'Accepter', de: 'Akzeptieren', en: 'Accept',
    es: 'Aceptar', it: 'Accetta', pt: 'Aceitar', pl: 'Akceptuj',
    sv: 'Acceptera', da: 'Accepter', no: 'Aksepter', fi: 'Hyväksy',
  },
  'cookie.decline': {
    nl: 'Weigeren', fr: 'Refuser', de: 'Ablehnen', en: 'Decline',
    es: 'Rechazar', it: 'Rifiuta', pt: 'Recusar', pl: 'Odrzuć',
    sv: 'Avböj', da: 'Afvis', no: 'Avvis', fi: 'Hylkää',
  },
  // ─── Language UI ───────────────────────────────────────────────────────────
  'lang.popup.title': {
    nl: 'Kies je taal', fr: 'Choisissez votre langue', de: 'Sprache wählen', en: 'Choose your language',
    es: 'Elige tu idioma', it: 'Scegli la tua lingua', pt: 'Escolha o seu idioma', pl: 'Wybierz język',
    sv: 'Välj ditt språk', da: 'Vælg dit sprog', no: 'Velg språk', fi: 'Valitse kielesi',
  },
  'lang.popup.confirm': {
    nl: 'Bevestigen', fr: 'Confirmer', de: 'Bestätigen', en: 'Confirm',
    es: 'Confirmar', it: 'Conferma', pt: 'Confirmar', pl: 'Potwierdź',
    sv: 'Bekräfta', da: 'Bekræft', no: 'Bekreft', fi: 'Vahvista',
  },
  'lang.choose': {
    nl: 'Taal', fr: 'Langue', de: 'Sprache', en: 'Language',
    es: 'Idioma', it: 'Lingua', pt: 'Idioma', pl: 'Język',
    sv: 'Språk', da: 'Sprog', no: 'Språk', fi: 'Kieli',
  },
  // ─── Page home label ───────────────────────────────────────────────────────
  'page.home': {
    nl: 'Home', fr: 'Accueil', de: 'Startseite', en: 'Home',
  },
  // ─── Hero ──────────────────────────────────────────────────────────────────
  'hero.badge': {
    nl: 'Nieuw — Crescent Peak & Lunar Horizon',
    fr: 'Nouveau — Crescent Peak & Lunar Horizon',
    de: 'Neu — Crescent Peak & Lunar Horizon',
    en: 'New — Crescent Peak & Lunar Horizon',
  },
  'hero.title.main': {
    nl: 'Draag het', fr: 'Portez', de: 'Trag das', en: 'Wear the',
  },
  'hero.title.accent': {
    nl: 'avontuur.', fr: "l'aventure.", de: 'Abenteuer.', en: 'adventure.',
  },
  'hero.subtitle': {
    nl: 'Premium streetwear voor wie de bergen voelt. Limited edition, gedrukt in Europa.',
    fr: "Streetwear premium pour ceux qui ressentent les montagnes. Édition limitée, imprimé en Europe.",
    de: 'Premium Streetwear für die, die die Berge spüren. Limited Edition, gedruckt in Europa.',
    en: 'Premium streetwear for those who feel the mountains. Limited edition, printed in Europe.',
  },
  'hero.cta': {
    nl: 'Shop de collectie', fr: 'Découvrir la collection', de: 'Kollektion entdecken', en: 'Shop the collection',
  },
  'hero.bestseller': {
    nl: 'Bestseller →', fr: 'Best-seller →', de: 'Bestseller →', en: 'Bestseller →',
  },
  // ─── Brand Story ───────────────────────────────────────────────────────────
  'brand.label': {
    nl: 'Ons verhaal', fr: 'Notre histoire', de: 'Unsere Geschichte', en: 'Our story',
  },
  'brand.heading1': {
    nl: 'Gemaakt voor', fr: 'Fait pour', de: 'Gemacht für', en: 'Made for',
  },
  'brand.heading2': {
    nl: 'avonturiers.', fr: 'les aventuriers.', de: 'Abenteurer.', en: 'adventurers.',
  },
  'brand.body1': {
    nl: 'Arvenzo is geboren uit een passie voor de natuur en moderne esthetiek. Elk ontwerp is een ode aan de rust van berglandschappen en het avontuur dat daarin schuilt.',
    fr: "Arvenzo est né d'une passion pour la nature et l'esthétique moderne. Chaque design est une ode à la sérénité des paysages montagneux et à l'aventure qui s'y cache.",
    de: 'Arvenzo entstand aus einer Leidenschaft für Natur und moderne Ästhetik. Jedes Design ist eine Ode an die Ruhe der Berglandschaften und das Abenteuer, das darin steckt.',
    en: 'Arvenzo was born from a passion for nature and modern aesthetics. Each design is an ode to the tranquility of mountain landscapes and the adventure hidden within.',
  },
  'brand.body2': {
    nl: 'Elke collectie — van Crescent Peak tot Starry Compass — vertelt een eigen verhaal van exploratie. Onze designs combineren minimalisme met krachtige grafische verhalen, gedrukt met de hoogste kwaliteitsstandaarden.',
    fr: "Chaque collection — de Crescent Peak à Starry Compass — raconte sa propre histoire d'exploration. Nos designs combinent minimalisme et récits graphiques puissants, imprimés selon les plus hauts standards de qualité.",
    de: 'Jede Kollektion — von Crescent Peak bis Starry Compass — erzählt eine eigene Geschichte der Erkundung. Unsere Designs verbinden Minimalismus mit kraftvollen grafischen Erzählungen, gedruckt nach höchsten Qualitätsstandards.',
    en: 'Each collection — from Crescent Peak to Starry Compass — tells its own story of exploration. Our designs combine minimalism with powerful graphic narratives, printed to the highest quality standards.',
  },
  'brand.cta': {
    nl: 'Ontdek alle collecties', fr: 'Découvrir toutes les collections', de: 'Alle Kollektionen entdecken', en: 'Discover all collections',
  },
  'brand.stat1.num': { nl: '7', fr: '7', de: '7', en: '7' },
  'brand.stat1.label': {
    nl: 'Unieke collecties', fr: 'Collections uniques', de: 'Einzigartige Kollektionen', en: 'Unique collections',
  },
  'brand.stat1.sub': {
    nl: 'Elk met eigen identiteit', fr: 'Chacune avec sa propre identité', de: 'Jede mit eigener Identität', en: 'Each with its own identity',
  },
  'brand.stat2.num': { nl: '28', fr: '28', de: '28', en: '28' },
  'brand.stat2.label': {
    nl: 'Producten', fr: 'Produits', de: 'Produkte', en: 'Products',
  },
  'brand.stat2.sub': {
    nl: 'Hoodies, shirts, mugs & meer', fr: 'Hoodies, t-shirts, mugs & plus', de: 'Hoodies, Shirts, Mugs & mehr', en: 'Hoodies, shirts, mugs & more',
  },
  'brand.stat3.num': { nl: '100%', fr: '100%', de: '100%', en: '100%' },
  'brand.stat3.label': {
    nl: 'Gedrukt in 🌍', fr: 'Imprimé en 🌍', de: 'Gedruckt in 🌍', en: 'Printed in 🌍',
  },
  'brand.stat3.sub': {
    nl: 'Premium Europees vakmanschap', fr: 'Artisanat européen premium', de: 'Premium europäisches Handwerk', en: 'Premium European craftsmanship',
  },
  'brand.stat4.num': { nl: '3-7d', fr: '3-7j', de: '3-7T', en: '3-7d' },
  'brand.stat4.label': {
    nl: 'Levering', fr: 'Livraison', de: 'Lieferung', en: 'Delivery',
  },
  'brand.stat4.sub': {
    nl: 'In België en Nederland', fr: 'En Belgique et aux Pays-Bas', de: 'In Belgien und den Niederlanden', en: 'In Belgium and the Netherlands',
  },
  // ─── TrustBar ──────────────────────────────────────────────────────────────
  'trust.shipping.label': {
    nl: 'Gratis verzending', fr: 'Livraison gratuite', de: 'Gratisversand', en: 'Free shipping',
  },
  'trust.shipping.desc': {
    nl: 'Vanaf €50 bestelling', fr: 'Dès €50 de commande', de: 'Ab €50 Bestellung', en: 'From €50 order',
  },
  'trust.returns.label': {
    nl: '14 dagen retour', fr: '14 jours de retour', de: '14 Tage Rückgabe', en: '14-day returns',
  },
  'trust.returns.desc': {
    nl: 'Moeiteloos retourneren', fr: 'Retours sans effort', de: 'Mühelose Rücksendung', en: 'Hassle-free returns',
  },
  'trust.payment.label': {
    nl: 'Veilig betalen', fr: 'Paiement sécurisé', de: 'Sicher bezahlen', en: 'Secure payment',
  },
  'trust.payment.desc': {
    nl: 'Visa · Mastercard · Bancontact', fr: 'Visa · Mastercard · Bancontact', de: 'Visa · Mastercard · Bancontact', en: 'Visa · Mastercard · Bancontact',
  },
  'trust.rating.label': {
    nl: '4.9 / 5 sterren', fr: '4.9 / 5 étoiles', de: '4,9 / 5 Sterne', en: '4.9 / 5 stars',
  },
  'trust.rating.desc': {
    nl: '500+ tevreden klanten', fr: '500+ clients satisfaits', de: '500+ zufriedene Kunden', en: '500+ satisfied customers',
  },
  'trust.eco.label': {
    nl: '1 boom & 1 kg CO₂', fr: '1 arbre & 1 kg CO₂', de: '1 Baum & 1 kg CO₂', en: '1 tree & 1 kg CO₂',
  },
  'trust.eco.desc': {
    nl: 'Per besteld item gedoneerd', fr: 'Offert par article commandé', de: 'Pro bestelltem Artikel gespendet', en: 'Donated per ordered item',
  },
  // ─── FeaturedProducts ──────────────────────────────────────────────────────
  'products.badge': {
    nl: 'Bestsellers', fr: 'Bestsellers', de: 'Bestseller', en: 'Bestsellers',
  },
  'products.title': {
    nl: 'Meest geliefd', fr: 'Les plus aimés', de: 'Am beliebtesten', en: 'Most loved',
  },
  'products.cta': {
    nl: 'Alle hoodies →', fr: 'Tous les hoodies →', de: 'Alle Hoodies →', en: 'All hoodies →',
  },
  // ─── CollectionSpotlight ───────────────────────────────────────────────────
  'spotlight.badge': {
    nl: 'Collecties', fr: 'Collections', de: 'Kollektionen', en: 'Collections',
  },
  'spotlight.heading': {
    nl: 'Elke collectie vertelt een verhaal',
    fr: 'Chaque collection raconte une histoire',
    de: 'Jede Kollektion erzählt eine Geschichte',
    en: 'Every collection tells a story',
  },
  'spotlight.cta': {
    nl: 'Bekijk alles →', fr: 'Tout voir →', de: 'Alles ansehen →', en: 'View all →',
  },
  'spotlight.crescent_peak.desc': {
    nl: 'Maan boven een berglandschap', fr: "Lune au-dessus d'un paysage montagneux", de: 'Mond über einer Berglandschaft', en: 'Moon above a mountain landscape',
  },
  'spotlight.lunar_horizon.desc': {
    nl: 'De horizon onder sterrenhemel', fr: "L'horizon sous un ciel étoilé", de: 'Der Horizont unter dem Sternenhimmel', en: 'The horizon under a starry sky',
  },
  'spotlight.rustic_retreat.desc': {
    nl: 'Terugkeer naar de natuur', fr: 'Retour à la nature', de: 'Rückkehr zur Natur', en: 'Return to nature',
  },
  'spotlight.pathfinder.desc': {
    nl: 'Voor wie zijn eigen weg gaat', fr: 'Pour ceux qui tracent leur propre chemin', de: 'Für die, die ihren eigenen Weg gehen', en: 'For those who forge their own path',
  },
  'spotlight.natura_compass.desc': {
    nl: 'Geleid door de natuur', fr: 'Guidé par la nature', de: 'Von der Natur geleitet', en: 'Guided by nature',
  },
  'spotlight.starry_compass.desc': {
    nl: 'Navigeer op de sterren', fr: 'Naviguer sur les étoiles', de: 'An den Sternen navigieren', en: 'Navigate by the stars',
  },
  'spotlight.mountain_nature.desc': {
    nl: 'De berg als thuis', fr: 'La montagne comme maison', de: 'Der Berg als Zuhause', en: 'The mountain as home',
  },
  // ─── Marquee ───────────────────────────────────────────────────────────────
  'marquee.1': { nl: 'AVONTUUR', fr: 'AVENTURE', de: 'ABENTEUER', en: 'ADVENTURE' },
  'marquee.2': { nl: 'KWALITEIT', fr: 'QUALITÉ', de: 'QUALITÄT', en: 'QUALITY' },
  'marquee.3': { nl: 'LIMITED EDITION', fr: 'ÉDITION LIMITÉE', de: 'LIMITED EDITION', en: 'LIMITED EDITION' },
  'marquee.4': { nl: 'GEDRUKT IN DUITSLAND', fr: 'IMPRIMÉ EN ALLEMAGNE', de: 'IN DEUTSCHLAND GEDRUCKT', en: 'PRINTED IN GERMANY' },
  'marquee.5': { nl: 'BELGISCH MERK', fr: 'MARQUE BELGE', de: 'BELGISCHE MARKE', en: 'BELGIAN BRAND' },
  'marquee.6': { nl: 'VRIJE GEEST', fr: 'ESPRIT LIBRE', de: 'FREIER GEIST', en: 'FREE SPIRIT' },
  'marquee.7': { nl: 'NATUUR', fr: 'NATURE', de: 'NATUR', en: 'NATURE' },
  'marquee.8': { nl: 'COMFORT', fr: 'CONFORT', de: 'KOMFORT', en: 'COMFORT' },
  'marquee.9': { nl: 'GRATIS LEVERING V.A. €50', fr: 'LIVRAISON GRATUITE DÈS €50', de: 'GRATIS VERSAND AB €50', en: 'FREE SHIPPING FROM €50' },
  // ─── LifestyleSection ──────────────────────────────────────────────────────
  'lifestyle.1.tag': {
    nl: 'Comfortabel overal', fr: 'Confortable partout', de: 'Überall komfortabel', en: 'Comfortable everywhere',
  },
  'lifestyle.1.heading1': {
    nl: 'Van camping', fr: 'Du camping', de: 'Vom Camping', en: 'From camping',
  },
  'lifestyle.1.heading2': {
    nl: 'tot stad.', fr: 'à la ville.', de: 'in die Stadt.', en: 'to city.',
  },
  'lifestyle.1.cta': {
    nl: 'Ontdek', fr: 'Découvrir', de: 'Entdecken', en: 'Discover',
  },
  'lifestyle.mission.tag': {
    nl: 'Onze missie', fr: 'Notre mission', de: 'Unsere Mission', en: 'Our mission',
  },
  'lifestyle.mission.heading': {
    nl: '1 boom & 1 kg CO₂', fr: '1 arbre & 1 kg CO₂', de: '1 Baum & 1 kg CO₂', en: '1 tree & 1 kg CO₂',
  },
  'lifestyle.mission.body': {
    nl: 'Voor elk besteld item planten wij één boom én halen we 1 kg CO₂ uit de lucht — voor een groenere toekomst.',
    fr: "Pour chaque article commandé, nous plantons un arbre et retirons 1 kg de CO₂ de l'atmosphère — pour un avenir plus vert.",
    de: 'Für jeden bestellten Artikel pflanzen wir einen Baum und holen 1 kg CO₂ aus der Luft — für eine grünere Zukunft.',
    en: 'For every ordered item we plant one tree and remove 1 kg of CO₂ from the air — for a greener future.',
  },
  'lifestyle.mission.footer': {
    nl: 'Samen voor een groenere wereld', fr: 'Ensemble pour un monde plus vert', de: 'Gemeinsam für eine grünere Welt', en: 'Together for a greener world',
  },
  'lifestyle.3.tag': {
    nl: 'Bestseller', fr: 'Best-seller', de: 'Bestseller', en: 'Bestseller',
  },
  'lifestyle.3.heading': {
    nl: 'De perfecte hoodie', fr: 'Le hoodie parfait', de: 'Der perfekte Hoodie', en: 'The perfect hoodie',
  },
  'lifestyle.3.cta': {
    nl: 'Ontdek', fr: 'Découvrir', de: 'Entdecken', en: 'Discover',
  },
  'lifestyle.4.tag': {
    nl: 'Cadeau tip', fr: 'Idée cadeau', de: 'Geschenkidee', en: 'Gift idea',
  },
  'lifestyle.4.heading': {
    nl: 'Begin elke dag goed', fr: 'Commencez chaque journée du bon pied', de: 'Starte jeden Tag gut', en: 'Start every day right',
  },
  'lifestyle.4.cta': {
    nl: 'Ontdek', fr: 'Découvrir', de: 'Entdecken', en: 'Discover',
  },
  'lifestyle.5.tag': {
    nl: 'Nieuw in collectie', fr: 'Nouveau dans la collection', de: 'Neu in der Kollektion', en: 'New in collection',
  },
  'lifestyle.5.heading': {
    nl: 'Stijl in de natuur.', fr: 'Style dans la nature.', de: 'Stil in der Natur.', en: 'Style in nature.',
  },
  'lifestyle.5.body': {
    nl: 'Lichte premium shirts met krachtige designs. Perfect voor warme avonturen.',
    fr: 'T-shirts premium légers avec des designs puissants. Parfaits pour les aventures estivales.',
    de: 'Leichte Premium-Shirts mit kraftvollen Designs. Perfekt für warme Abenteuer.',
    en: 'Lightweight premium shirts with powerful designs. Perfect for warm adventures.',
  },
  'lifestyle.5.cta': {
    nl: 'Shop shirts', fr: 'Shop t-shirts', de: 'Shirts shoppen', en: 'Shop shirts',
  },
  // ─── ReviewSection ─────────────────────────────────────────────────────────
  'reviews.no_reviews': {
    nl: 'Nog geen reviews', fr: "Pas encore d'avis", de: 'Noch keine Bewertungen', en: 'No reviews yet',
  },
  'reviews.customer': {
    nl: 'Klantreviews', fr: 'Avis clients', de: 'Kundenbewertungen', en: 'Customer reviews',
  },
  'reviews.verified': {
    nl: 'Geverifieerde koper', fr: 'Acheteur vérifié', de: 'Verifizierter Käufer', en: 'Verified buyer',
  },
  // ─── Newsletter ────────────────────────────────────────────────────────────
  'newsletter.badge': {
    nl: 'Nieuwsbrief', fr: 'Newsletter', de: 'Newsletter', en: 'Newsletter',
  },
  'newsletter.heading': {
    nl: '10% korting op je eerste bestelling',
    fr: '10% de réduction sur votre première commande',
    de: '10% Rabatt auf deine erste Bestellung',
    en: '10% off your first order',
  },
  'newsletter.body': {
    nl: 'Schrijf je in en ontvang exclusieve aanbiedingen & nieuwe collecties als eerste.',
    fr: "Inscrivez-vous et recevez des offres exclusives & les nouvelles collections en avant-première.",
    de: 'Melde dich an und erhalte exklusive Angebote & neue Kollektionen als Erster.',
    en: 'Sign up and receive exclusive offers & new collections first.',
  },
  'newsletter.success': {
    nl: '✓ Bedankt! Controleer je inbox voor de kortingscode.',
    fr: '✓ Merci ! Vérifiez votre boîte de réception pour le code de réduction.',
    de: '✓ Danke! Überprüfe deinen Posteingang für den Rabattcode.',
    en: '✓ Thanks! Check your inbox for the discount code.',
  },
  'newsletter.placeholder': {
    nl: 'jouw@email.be', fr: 'votre@email.fr', de: 'deine@email.de', en: 'your@email.com',
  },
  'newsletter.submit': {
    nl: 'Inschrijven →', fr: "S'inscrire →", de: 'Anmelden →', en: 'Subscribe →',
  },
  'newsletter.disclaimer': {
    nl: 'Geen spam. Uitschrijven kan altijd.', fr: 'Pas de spam. Désinscription possible à tout moment.', de: 'Kein Spam. Jederzeit abmeldbar.', en: 'No spam. Unsubscribe anytime.',
  },
  // ─── About page ────────────────────────────────────────────────────────────
  'about.breadcrumb': {
    nl: 'Ons verhaal', fr: 'Notre histoire', de: 'Unsere Geschichte', en: 'Our story',
  },
  'about.hero.title': {
    nl: 'Gemaakt voor mensen die buiten leven',
    fr: 'Fait pour les personnes qui vivent dehors',
    de: 'Gemacht für Menschen, die draußen leben',
    en: 'Made for people who live outside',
  },
  'about.hero.body': {
    nl: 'Arvenzo is een Belgisch lifestyle-merk dat avontuur en rust combineert in elk ontwerp. We geloven dat kleding meer kan zijn dan stof — het kan een gevoel oproepen, een herinnering, een uitnodiging om buiten te zijn.',
    fr: "Arvenzo est une marque de lifestyle belge qui combine l'aventure et la sérénité dans chaque design. Nous croyons que les vêtements peuvent être plus que du tissu — ils peuvent évoquer un sentiment, un souvenir, une invitation à être dehors.",
    de: 'Arvenzo ist eine belgische Lifestyle-Marke, die Abenteuer und Ruhe in jedem Design vereint. Wir glauben, dass Kleidung mehr sein kann als Stoff — sie kann ein Gefühl wecken, eine Erinnerung, eine Einladung nach draußen zu gehen.',
    en: 'Arvenzo is a Belgian lifestyle brand that combines adventure and calm in every design. We believe clothing can be more than fabric — it can evoke a feeling, a memory, an invitation to be outside.',
  },
  'about.values.title': {
    nl: 'Onze waarden', fr: 'Nos valeurs', de: 'Unsere Werte', en: 'Our values',
  },
  'about.value1.title': { nl: 'Duurzaam', fr: 'Durable', de: 'Nachhaltig', en: 'Sustainable' },
  'about.value1.body': {
    nl: 'On-demand productie betekent geen overproductie. Elk stuk wordt gemaakt voor de persoon die het draagt.',
    fr: 'La production à la demande signifie pas de surproduction. Chaque pièce est fabriquée pour la personne qui la porte.',
    de: 'On-Demand-Produktion bedeutet keine Überproduktion. Jedes Stück wird für die Person gemacht, die es trägt.',
    en: 'On-demand production means no overproduction. Each piece is made for the person who wears it.',
  },
  'about.value2.title': { nl: 'Avontuurlijk', fr: 'Aventureux', de: 'Abenteuerlich', en: 'Adventurous' },
  'about.value2.body': {
    nl: 'Elk ontwerp verwijst naar natuur, bergen en vrijheid. Kleding voor mensen die buiten zijn.',
    fr: 'Chaque design fait référence à la nature, aux montagnes et à la liberté. Des vêtements pour les gens qui sont dehors.',
    de: 'Jedes Design bezieht sich auf Natur, Berge und Freiheit. Kleidung für Menschen, die draußen sind.',
    en: 'Every design references nature, mountains and freedom. Clothing for people who are outside.',
  },
  'about.value3.title': { nl: 'Belgisch', fr: 'Belge', de: 'Belgisch', en: 'Belgian' },
  'about.value3.body': {
    nl: 'Opgericht in Vlaams-Brabant, gedrukt in Europa. Trots op onze roots, met een open blik op de wereld.',
    fr: "Fondé en Brabant flamand, imprimé en Europe. Fier de nos racines, avec un regard ouvert sur le monde.",
    de: 'Gegründet in Flämisch-Brabant, gedruckt in Europa. Stolz auf unsere Wurzeln, mit einem offenen Blick auf die Welt.',
    en: 'Founded in Flemish Brabant, printed in Europe. Proud of our roots, with an open view of the world.',
  },
  'about.story.title': {
    nl: 'Het begin', fr: 'Les débuts', de: 'Der Anfang', en: 'The beginning',
  },
  'about.story.p1': {
    nl: 'Arvenzo ontstond vanuit een eenvoudige gedachte: waarom zijn kleding en natuur zo zelden verbonden? We wilden een merk bouwen dat mensen herinnert aan de rust van een bos, de vrijheid van een bergpad, de stilte bij een kampvuur.',
    fr: "Arvenzo est né d'une pensée simple : pourquoi les vêtements et la nature sont-ils si rarement connectés ? Nous voulions construire une marque qui rappelle aux gens la sérénité d'une forêt, la liberté d'un sentier de montagne, le silence d'un feu de camp.",
    de: 'Arvenzo entstand aus einem einfachen Gedanken: Warum sind Kleidung und Natur so selten verbunden? Wir wollten eine Marke aufbauen, die Menschen an die Ruhe eines Waldes, die Freiheit eines Bergpfades, die Stille am Lagerfeuer erinnert.',
    en: 'Arvenzo was born from a simple thought: why are clothing and nature so rarely connected? We wanted to build a brand that reminds people of the calm of a forest, the freedom of a mountain trail, the silence by a campfire.',
  },
  'about.story.p2': {
    nl: 'Elk collectienaam — Crescent Peak, Lunar Horizon, Rustic Retreat — vertelt een verhaal. Een verhaal dat jij draagt.',
    fr: 'Chaque nom de collection — Crescent Peak, Lunar Horizon, Rustic Retreat — raconte une histoire. Une histoire que vous portez.',
    de: 'Jeder Kollektionsname — Crescent Peak, Lunar Horizon, Rustic Retreat — erzählt eine Geschichte. Eine Geschichte, die du trägst.',
    en: 'Every collection name — Crescent Peak, Lunar Horizon, Rustic Retreat — tells a story. A story that you wear.',
  },
  'about.story.p3': {
    nl: 'We zijn klein, bewust en ambitieus. We groeien langzaam zodat elk product de aandacht krijgt die het verdient.',
    fr: "Nous sommes petits, conscients et ambitieux. Nous grandissons lentement pour que chaque produit reçoive l'attention qu'il mérite.",
    de: 'Wir sind klein, bewusst und ehrgeizig. Wir wachsen langsam, damit jedes Produkt die Aufmerksamkeit bekommt, die es verdient.',
    en: 'We are small, conscious and ambitious. We grow slowly so that each product gets the attention it deserves.',
  },
  'about.cta.heading': {
    nl: 'Klaar voor het avontuur?', fr: "Prêt pour l'aventure ?", de: 'Bereit für das Abenteuer?', en: 'Ready for the adventure?',
  },
  'about.cta.body': {
    nl: 'Ontdek onze collecties en vind jouw stuk.', fr: 'Découvrez nos collections et trouvez votre pièce.', de: 'Entdecke unsere Kollektionen und finde dein Stück.', en: 'Discover our collections and find your piece.',
  },
  'about.cta.button': {
    nl: 'Shop nu', fr: 'Acheter', de: 'Jetzt shoppen', en: 'Shop now',
  },
  // ─── FAQ page ──────────────────────────────────────────────────────────────
  'faq.title': {
    nl: 'Veelgestelde vragen', fr: 'Questions fréquentes', de: 'Häufig gestellte Fragen', en: 'Frequently asked questions',
  },
  'faq.heading': {
    nl: 'Staat je vraag er niet bij?', fr: 'Votre question ne figure pas dans la liste ?', de: 'Ihre Frage ist nicht dabei?', en: "Can't find your question?",
  },
  'faq.contact': {
    nl: 'Neem contact op', fr: 'Contactez-nous', de: 'Kontakt aufnehmen', en: 'Contact us',
  },
  // ─── Contact page ──────────────────────────────────────────────────────────
  'contact.title': {
    nl: 'Contact', fr: 'Contact', de: 'Kontakt', en: 'Contact',
  },
  'contact.subtitle': {
    nl: 'Vragen over een bestelling, product of levering? We helpen je graag verder.',
    fr: "Des questions sur une commande, un produit ou une livraison ? Nous sommes là pour vous aider.",
    de: 'Fragen zu einer Bestellung, einem Produkt oder einer Lieferung? Wir helfen gerne weiter.',
    en: "Questions about an order, product or delivery? We're happy to help.",
  },
  'contact.email.label': {
    nl: 'E-mail', fr: 'E-mail', de: 'E-Mail', en: 'Email',
  },
  'contact.hours.title': {
    nl: 'Openingstijden', fr: "Heures d'ouverture", de: 'Öffnungszeiten', en: 'Opening hours',
  },
  'contact.hours.weekdays': {
    nl: 'Maandag – vrijdag: 09:00 – 18:00', fr: 'Lundi – vendredi : 09h00 – 18h00', de: 'Montag – Freitag: 09:00 – 18:00 Uhr', en: 'Monday – Friday: 09:00 – 18:00',
  },
  'contact.hours.weekend': {
    nl: 'Zaterdag & zondag: gesloten', fr: 'Samedi & dimanche : fermé', de: 'Samstag & Sonntag: geschlossen', en: 'Saturday & Sunday: closed',
  },
  'contact.hours.response': {
    nl: 'Reactietijd: binnen 24 uur op werkdagen', fr: 'Délai de réponse : sous 24h les jours ouvrables', de: 'Antwortzeit: innerhalb von 24 Stunden an Werktagen', en: 'Response time: within 24 hours on weekdays',
  },
  'contact.categories.title': {
    nl: 'Waar gaat uw vraag over?', fr: "Quel est l'objet de votre question ?", de: 'Worum geht es bei Ihrer Anfrage?', en: 'What is your question about?',
  },
  'contact.cat.1.label': {
    nl: 'Bestelling/levering', fr: 'Commande/livraison', de: 'Bestellung/Lieferung', en: 'Order/delivery',
  },
  'contact.cat.1.desc': {
    nl: '— vermeld uw ordernummer', fr: '— mentionnez votre numéro de commande', de: '— Bestellnummer angeben', en: '— include your order number',
  },
  'contact.cat.2.label': {
    nl: 'Retour', fr: 'Retour', de: 'Rückgabe', en: 'Return',
  },
  'contact.cat.2.intro': {
    nl: '— zie eerst ons', fr: "— voir d'abord notre", de: '— zuerst ansehen:', en: '— see our',
  },
  'contact.cat.3.label': {
    nl: 'Maat', fr: 'Taille', de: 'Größe', en: 'Size',
  },
  'contact.cat.3.intro': {
    nl: '— bekijk de', fr: '— consultez le', de: '— ansehen den', en: '— check the',
  },
  'contact.cat.4.label': {
    nl: 'Overig', fr: 'Autre', de: 'Sonstiges', en: 'Other',
  },
  'contact.cat.4.desc': {
    nl: '— stuur een bericht via het formulier', fr: '— envoyez un message via le formulaire', de: '— senden Sie eine Nachricht über das Formular', en: '— send a message via the form',
  },
  'contact.socials.title': {
    nl: 'Volg ons', fr: 'Suivez-nous', de: 'Folge uns', en: 'Follow us',
  },
  'contact.legal': {
    nl: 'Op zoek naar onze wettelijke bedrijfsgegevens?', fr: 'Vous cherchez nos informations légales ?', de: 'Auf der Suche nach unseren rechtlichen Unternehmensdaten?', en: 'Looking for our legal company details?',
  },
  'contact.legal.cta': {
    nl: 'Klik hier →', fr: 'Cliquez ici →', de: 'Hier klicken →', en: 'Click here →',
  },
  'contact.form.name': { nl: 'Naam', fr: 'Nom', de: 'Name', en: 'Name' },
  'contact.form.email': { nl: 'E-mail', fr: 'E-mail', de: 'E-Mail', en: 'Email' },
  'contact.form.subject': { nl: 'Onderwerp', fr: 'Sujet', de: 'Betreff', en: 'Subject' },
  'contact.form.message': { nl: 'Bericht', fr: 'Message', de: 'Nachricht', en: 'Message' },
  'contact.form.submit': {
    nl: 'Verstuur bericht', fr: 'Envoyer le message', de: 'Nachricht senden', en: 'Send message',
  },
  'contact.form.success': {
    nl: 'Bericht verstuurd!', fr: 'Message envoyé !', de: 'Nachricht gesendet!', en: 'Message sent!',
  },
  'contact.form.success_sub': {
    nl: 'We nemen zo snel mogelijk contact op.', fr: 'Nous vous contacterons dans les plus brefs délais.', de: 'Wir werden uns so schnell wie möglich bei Ihnen melden.', en: 'We will get back to you as soon as possible.',
  },
  'contact.form.ph.name': { nl: 'Je naam', fr: 'Votre nom', de: 'Dein Name', en: 'Your name' },
  'contact.form.ph.email': { nl: 'je@email.be', fr: 'vous@email.fr', de: 'deine@email.de', en: 'your@email.com' },
  'contact.form.ph.subject': {
    nl: 'Bijv. vraag over bestelling #1234', fr: 'Ex. question sur la commande #1234', de: 'z.B. Frage zu Bestellung #1234', en: 'E.g. question about order #1234',
  },
  'contact.form.ph.message': {
    nl: 'Je bericht...', fr: 'Votre message...', de: 'Deine Nachricht...', en: 'Your message...',
  },
  // ─── Sizing page ───────────────────────────────────────────────────────────
  'sizing.breadcrumb': {
    nl: 'Maatgids', fr: 'Guide des tailles', de: 'Größenguide', en: 'Size guide',
  },
  'sizing.title': {
    nl: 'Maatgids', fr: 'Guide des tailles', de: 'Größenguide', en: 'Size guide',
  },
  'sizing.note': {
    nl: 'Alle maten in centimeters (cm). Twijfel je? Kies een maat groter.',
    fr: 'Toutes les tailles en centimètres (cm). Vous hésitez ? Choisissez une taille au-dessus.',
    de: 'Alle Größen in Zentimetern (cm). Unsicher? Wähle eine Größe größer.',
    en: 'All sizes in centimeters (cm). Not sure? Choose one size up.',
  },
  'sizing.hoodies.title': {
    nl: 'Hoodies & Sweatshirts', fr: 'Hoodies & Sweat-shirts', de: 'Hoodies & Sweatshirts', en: 'Hoodies & Sweatshirts',
  },
  'sizing.hoodies.model': {
    nl: 'Unisex pasvorm. Onze modellen dragen standaard maat M.',
    fr: 'Coupe unisexe. Nos modèles portent une taille M standard.',
    de: 'Unisex-Schnitt. Unsere Models tragen standardmäßig Größe M.',
    en: 'Unisex fit. Our models wear standard size M.',
  },
  'sizing.col.size': { nl: 'Maat', fr: 'Taille', de: 'Größe', en: 'Size' },
  'sizing.col.chest': { nl: 'Borsomtrek (cm)', fr: 'Tour de poitrine (cm)', de: 'Brustumfang (cm)', en: 'Chest (cm)' },
  'sizing.col.length': { nl: 'Lengte (cm)', fr: 'Longueur (cm)', de: 'Länge (cm)', en: 'Length (cm)' },
  'sizing.col.shoulder': { nl: 'Schouder (cm)', fr: 'Épaules (cm)', de: 'Schulter (cm)', en: 'Shoulder (cm)' },
  'sizing.measure.title': {
    nl: 'Hoe meet je jezelf op?', fr: 'Comment vous mesurer ?', de: 'Wie misst du dich?', en: 'How to measure yourself?',
  },
  'sizing.measure.1.label': { nl: 'Borsomtrek', fr: 'Tour de poitrine', de: 'Brustumfang', en: 'Chest' },
  'sizing.measure.1.desc': {
    nl: 'Meet horizontaal rond het breedste deel van je borst, onder je oksels.',
    fr: 'Mesurez horizontalement autour de la partie la plus large de votre poitrine, sous vos aisselles.',
    de: 'Miss horizontal um den breitesten Teil deiner Brust, unter den Achseln.',
    en: 'Measure horizontally around the widest part of your chest, under your armpits.',
  },
  'sizing.measure.2.label': { nl: 'Lengte', fr: 'Longueur', de: 'Länge', en: 'Length' },
  'sizing.measure.2.desc': {
    nl: 'Meet van de schoudernaad (nek) tot de onderkant van het kledingstuk.',
    fr: "Mesurez de la couture de l'épaule (nuque) jusqu'au bas du vêtement.",
    de: 'Miss von der Schulternaht (Hals) bis zum unteren Ende des Kleidungsstücks.',
    en: 'Measure from the shoulder seam (neck) to the bottom of the garment.',
  },
  'sizing.measure.3.label': { nl: 'Schouder', fr: 'Épaules', de: 'Schulter', en: 'Shoulder' },
  'sizing.measure.3.desc': {
    nl: 'Meet van schoudernaad tot schoudernaad, over je rug.',
    fr: 'Mesurez de couture à couture, sur votre dos.',
    de: 'Miss von Schulternaht zu Schulternaht, über deinen Rücken.',
    en: 'Measure from shoulder seam to shoulder seam, across your back.',
  },
  'sizing.fit.title': { nl: 'Pasvorm', fr: 'Coupe', de: 'Passform', en: 'Fit' },
  'sizing.fit.b1': {
    nl: 'Onze hoodies en sweatshirts hebben een oversized tot regular fit.',
    fr: 'Nos hoodies et sweat-shirts ont une coupe oversized à regular.',
    de: 'Unsere Hoodies und Sweatshirts haben eine Oversize- bis Regular-Passform.',
    en: 'Our hoodies and sweatshirts have an oversized to regular fit.',
  },
  'sizing.fit.b2': {
    nl: 'Voor een regular fit kies je je normale maat.',
    fr: 'Pour une coupe regular, choisissez votre taille habituelle.',
    de: 'Für eine Regular-Passform wählst du deine normale Größe.',
    en: 'For a regular fit, choose your normal size.',
  },
  'sizing.fit.b3': {
    nl: 'Voor een iets ruimere, streetwear-look ga je één maat groter.',
    fr: 'Pour un look streetwear légèrement plus ample, prenez une taille au-dessus.',
    de: 'Für einen etwas weiteren Streetwear-Look gehe eine Größe größer.',
    en: 'For a slightly roomier, streetwear look, go one size up.',
  },
  'sizing.fit.b4': {
    nl: 'Na het eerste wassen kunnen producten maximaal 1-2% krimpen. Was altijd op 30°C.',
    fr: "Après le premier lavage, les produits peuvent rétrécir jusqu'à 1-2%. Lavez toujours à 30°C.",
    de: 'Nach dem ersten Waschen können Produkte maximal 1-2% einlaufen. Immer bei 30°C waschen.',
    en: 'After the first wash, products may shrink by up to 1-2%. Always wash at 30°C.',
  },
  // ─── Shipping / Returns breadcrumbs ────────────────────────────────────────
  'shipping.breadcrumb': {
    nl: 'Verzending', fr: 'Livraison', de: 'Versand', en: 'Shipping',
  },
  'shipping.updated': {
    nl: 'Laatste update: 14 januari 2026', fr: 'Dernière mise à jour : 14 janvier 2026', de: 'Letzte Aktualisierung: 14. Januar 2026', en: 'Last updated: January 14, 2026',
  },
  'returns.breadcrumb': {
    nl: 'Retourneren', fr: 'Retours', de: 'Rückgabe', en: 'Returns',
  },
};

/**
 * Look up a translation key.
 * Falls back to 'en', then 'nl', then the key itself.
 * Supports {amount} placeholder substitution.
 */
export function t(key: string, locale: string, vars?: Record<string, string>): string {
  const entry = translations[key];
  if (!entry) return key;
  const value = entry[locale] ?? entry['en'] ?? entry['nl'] ?? key;
  if (!vars) return value;
  return Object.entries(vars).reduce(
    (str, [k, v]) => str.replace(`{${k}}`, v),
    value,
  );
}
