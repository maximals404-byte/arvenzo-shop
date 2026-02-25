const ITEMS = [
  'AVONTUUR', 'KWALITEIT', 'LIMITED EDITION', 'GEDRUKT IN DUITSLAND',
  'BELGISCH MERK', 'VRIJE GEEST', 'NATUUR', 'COMFORT', '15% KORTING',
];

export default function Marquee() {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden bg-arvenzo-brown py-4 select-none">
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 px-4 font-heading font-bold text-sm tracking-[0.2em] text-arvenzo-cream whitespace-nowrap"
          >
            {item}
            <span className="text-arvenzo-orange/60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
