const ITEMS = [
  { icon: '🚚', title: 'Gratis verzending', desc: 'Vanaf €50 bestelling' },
  { icon: '↩️', title: '30 dagen retour', desc: 'Moeiteloos retourneren' },
  { icon: '🔒', title: 'Veilig betalen', desc: 'Visa · Mastercard · Bancontact' },
  { icon: '⭐', title: '4.9 / 5 sterren', desc: '500+ tevreden klanten' },
];

export default function TrustBar() {
  return (
    <div className="bg-arvenzo-cream-dark border-y border-arvenzo-cream-dark/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {ITEMS.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <span className="text-xl shrink-0">{item.icon}</span>
            <div>
              <div className="font-sans font-semibold text-arvenzo-ink text-[13px]">{item.title}</div>
              <div className="font-sans text-xs text-arvenzo-muted leading-snug">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
