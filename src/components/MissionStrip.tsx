'use client';

export default function MissionStrip() {
  const words = 'PRAY \u00B7 GIVE \u00B7 GO \u00B7 SERVE \u00B7 BELIEVE \u00B7 MISSION \u00B7 FAITH \u00B7 LOVE \u00B7 WITNESS';
  const doubled = `${words} \u00B7 ${words} \u00B7 `;

  return (
    <section className="relative green-gradient py-5 overflow-hidden">
      <div className="flex whitespace-nowrap" style={{ animation: 'marquee 30s linear infinite' }}>
        <span className="font-heading italic text-[var(--color-accent)] text-lg md:text-xl tracking-[0.15em] px-4">
          {doubled}
        </span>
        <span className="font-heading italic text-[var(--color-accent)] text-lg md:text-xl tracking-[0.15em] px-4">
          {doubled}
        </span>
      </div>
    </section>
  );
}
