"use client";
import { useEffect, useRef } from "react";
import { useLang } from "../i18n/useLang";
import GreenAtmos from './GreenAtmos';

interface Props {
  base: string;
}

export default function GiveTrust({ base }: Props) {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll("[data-reveal],[data-reveal-stagger]").forEach((el) =>
        el.classList.add("visible")
      );
      return;
    }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );
    root.querySelectorAll("[data-reveal],[data-reveal-stagger]").forEach((el) =>
      io.observe(el)
    );
    return () => io.disconnect();
  }, []);

  const signals = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <rect x="3" y="11" width="22" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
          <path d="M9 11V8a5 5 0 0110 0v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="14" cy="18" r="2" fill="currentColor" />
        </svg>
      ),
      titleKey: "give_trust_secure" as const,
      bodyKey: "give_trust_secure_body" as const,
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M14 3L4 7v7c0 5.523 4.477 10 10 10s10-4.477 10-10V7L14 3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M9 14l3 3 7-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      titleKey: "give_trust_tax" as const,
      bodyKey: "give_trust_tax_body" as const,
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <circle cx="14" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />
          <path d="M14 7.5l1.1 2.2 2.4.35-1.75 1.7.4 2.4L14 13l-2.15 1.15.4-2.4-1.75-1.7 2.4-.35L14 7.5z" fill="currentColor" />
          <path d="M9.5 16.5L8 25l6-3 6 3-1.5-8.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      ),
      titleKey: "give_trust_platinum" as const,
      bodyKey: "give_trust_platinum_body" as const,
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.7" />
          <path d="M9 10h10M9 14h7M9 18h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      ),
      titleKey: "give_trust_reports" as const,
      bodyKey: "give_trust_reports_body" as const,
    },
  ] as const;

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-32 green-gradient text-[var(--color-cream)]">
      <GreenAtmos variant={5} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-16">
          <p
            data-reveal="fade"
            className="flex items-center gap-3 text-[var(--color-accent-light)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
          >
            <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
            {t("give_s3_eyebrow")}
          </p>
          <h2
            data-reveal="mask"
            className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] max-w-3xl text-[var(--color-cream)]"
          >
            {t("give_s3_headline")}
          </h2>
        </div>

        <div
          data-reveal-stagger
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {signals.map((s, i) => (
            <article
              key={s.titleKey}
              className="relative bg-white/8 border border-[var(--color-cream)]/10 rounded-xl p-7 md:p-8"
              style={{ "--reveal-delay": `${i * 0.1}s` } as React.CSSProperties}
            >
              <div className="text-[var(--color-accent)] mb-5">{s.icon}</div>
              <h3 className="font-heading text-xl md:text-2xl text-[var(--color-cream)] mb-3">
                {t(s.titleKey)}
              </h3>
              <p className="text-[var(--color-cream)]/70 leading-relaxed text-[0.95rem]">
                {t(s.bodyKey)}
              </p>
            </article>
          ))}
        </div>

        {/* Candid Seal */}
        <div data-reveal="fade" className="mt-14 flex items-center gap-4">
          <img
            src={`${base}images/candid-seal-platinum-2025.png`}
            alt="Candid Platinum Transparency Seal 2025"
            width={60}
            height={60}
            loading="lazy"
          />
          <p className="text-[var(--color-cream)]/60 text-sm max-w-xs">
            Candid Platinum Transparency Seal — verified independent accountability.
          </p>
        </div>
      </div>
    </section>
  );
}
