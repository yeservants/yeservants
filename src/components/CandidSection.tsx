'use client';

interface Props {
  base: string;
}

export default function CandidSection({ base }: Props) {
  return (
    <section className="relative py-16 md:py-20 bg-[var(--color-bg)] overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-10 bg-white rounded-2xl shadow-lg px-8 py-10 md:px-14 md:py-12">
          <div className="flex-shrink-0">
            <img
              src={`${base}images/candid-seal-platinum-2025.png`}
              alt="Candid Platinum Seal of Transparency 2025"
              width={160}
              height={160}
              className="h-36 w-auto"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--color-primary)] mb-3">
              Verified for Accountability and Transparency
            </h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed max-w-xl">
              YES is a Platinum-rated nonprofit on Candid (formerly GuideStar), demonstrating financial integrity, public transparency, and trustworthy governance. When you give, you partner with a ministry that protects every dollar and honors every donor.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
