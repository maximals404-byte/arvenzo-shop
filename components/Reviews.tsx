const REVIEWS = [
  { name: 'Lena V.', city: 'Antwerpen', stars: 5, product: 'Crescent Peak Hoodie', text: 'Fantastische kwaliteit! De stof is superzacht en het design is prachtig. Zeker voor herhaling vatbaar.' },
  { name: 'Thomas B.', city: 'Gent', stars: 5, product: 'Lunar Horizon Sweatshirt', text: 'Snel geleverd en de kwaliteit is echt top. De print is scherp en helder — ziet er premium uit.' },
  { name: 'Sarah M.', city: 'Brussel', stars: 5, product: 'Rustic Retreat Hoodie', text: 'Heerlijk comfortabel. Goede maatvoering en de stof voelt echt premium aan. Aanrader!' },
  { name: 'Pieter D.', city: 'Leuven', stars: 5, product: 'Pathfinder Edition Shirt', text: 'Geweldig shirt, het design is erg uniek. Veel complimentjes gekregen. Top service ook!' },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-arvenzo-orange" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="py-20 bg-arvenzo-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <p className="text-arvenzo-orange text-[11px] font-sans font-medium uppercase tracking-[0.2em] mb-2">Reviews</p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-arvenzo-ink">Wat klanten zeggen</h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Stars n={5} />
            <span className="font-heading font-bold text-arvenzo-ink">4.9</span>
            <span className="text-arvenzo-muted font-sans text-sm">op basis van 500+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-arvenzo-cream-dark rounded-2xl p-6 flex flex-col gap-4">
              <Stars n={r.stars} />
              <p className="font-sans text-[14px] text-arvenzo-ink leading-relaxed flex-1">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="border-t border-arvenzo-cream pt-4 flex items-center justify-between">
                <div>
                  <div className="font-heading font-semibold text-arvenzo-ink text-sm">{r.name}</div>
                  <div className="font-sans text-xs text-arvenzo-muted">{r.city}</div>
                </div>
                <div className="text-[11px] text-arvenzo-muted font-sans text-right leading-tight max-w-[100px]">
                  {r.product}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
