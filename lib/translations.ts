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
