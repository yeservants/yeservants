"use client";
import { useEffect, useRef } from "react";
import { useLang } from "../i18n/useLang";
import GreenAtmos from './GreenAtmos';

const APLOS = "https://www.aplos.com/aws/give/YieldedEvangelicalServantsInc/YesDonations";

interface Props {
  base: string;
}

export default function FdHowToPartner({ base }: Props) {
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

  const ways = [
    {
      titleKey: "fd_way1_title" as const,
      badgeKey: "fd_way1_badge" as const,
      bodyKey: "fd_way1_body" as const,
      ctaKey: "fd_way1_cta" as const,
      href: APLOS,
      external: true,
      featured: true,
    },
    {
      titleKey: "fd_way2_title" as const,
      badgeKey: null,
      bodyKey: "fd_way2_body" as const,
      ctaKey: "fd_way2_cta" as const,
      href: APLOS,
      external: true,
      featured: false,
    },
    {
      titleKey: "fd_way3_title" as const,
      badgeKey: null,
      bodyKey: "fd_way3_body" as const,
      ctaKey: "fd_way3_cta" as const,
      href: "mailto:info@yeservants.org",
      external: false,
      featured: false,
    },
    {
      titleKey: "fd_way4_title" as const,
      badgeKey: null,
      bodyKey: "fd_way4_body" as const,
      ctaKey: "fd_way4_cta" as const,
      href: `${base}how-it-works/`,
      external: false,
      featured: false,
    },
    {
      titleKey: "fd_way5_title" as const,
      badgeKey: null,
      bodyKey: "fd_way5_body" as const,
      ctaKey: "fd_way5_cta" as const,
      href: "mailto:info@yeservants.org",
      external: false,
      featured: false,
    },
    {
      titleKey: "fd_way6_title" as const,
      badgeKey: null,
      bodyKey: "fd_way6_body" as const,
      ctaKey: "fd_way6_cta" as const,
      href: "mailto:info@yeservants.org",
      external: false,
      featured: false,
    },
  ] as const;

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-32 green-gradient text-[var(--color-cream)]">
      <GreenAtmos variant={1} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-16">
          <p
            data-reveal="fade"
            className="flex items-center gap-3 text-[var(--color-accent-light)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
          >
            <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
            {t("fd_s3_eyebrow")}
          </p>
          <h2
            data-reveal="mask"
            className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-cream)] max-w-3xl"
          >
            {t("fd_s3_headline")}
          </h2>
        </div>

        <div
          data-reveal-stagger
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {ways.map((way, i) => (
            <article
              key={way.titleKey}
              className={[
                "relative rounded-xl p-7 md:p-8 border-t-2 transition-colors duration-300",
                way.featured
                  ? "bg-white/12 border-[var(--color-accent)] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.4)]"
                  : "bg-white/6 border-[var(--color-cream)]/20",
              ].join(" ")}
              style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}
            >
              {way.badgeKey && (
                <p className="text-[var(--color-accent-light)] text-xs tracking-wide uppercase mb-3 font-medium">
                  {t(way.badgeKey)}
                </p>
              )}
              <h3 className="font-heading text-xl md:text-2xl text-[var(--color-cream)] mb-4">
                {t(way.titleKey)}
              </h3>
              <p className="text-[var(--color-cream)]/70 leading-relaxed text-[0.95rem] mb-7">
                {t(way.bodyKey)}
              </p>
              <a
                href={way.href}
                {...(way.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={[
                  "inline-flex items-center gap-2 text-sm font-semibold tracking-wide rounded-full px-5 py-2.5 transition-colors duration-300",
                  way.featured
                    ? "bg-[var(--color-accent-deep)] text-white hover:bg-[var(--color-accent-hover)] shadow-[0_4px_14px_rgba(232,117,26,0.35)]"
                    : "border border-[var(--color-cream)]/35 text-[var(--color-cream)] hover:bg-[var(--color-cream)]/10",
                ].join(" ")}
              >
                {t(way.ctaKey)}
                {way.external && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M4 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V8M7 1h4m0 0v4M11 1L5 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
