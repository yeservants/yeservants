"use client";
import { useEffect, useRef } from "react";
import { useLang } from "../i18n/useLang";

interface Props {
  base: string;
}

export default function FdTransparency({ base }: Props) {
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

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[var(--color-bg)]">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Asymmetric two-column layout */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left — decorative stat column */}
          <div className="lg:col-span-4">
            <div data-reveal="mask" className="relative">
              {/* Large Playfair number accent */}
              <div
                aria-hidden="true"
                className="font-heading font-bold text-[var(--color-accent)]/12 text-[clamp(5rem,14vw,10rem)] leading-none select-none"
              >
                100%
              </div>
              <p
                aria-hidden="true"
                className="font-heading text-[var(--color-text-muted)] text-sm uppercase tracking-widest mt-2"
              >
                of designated gifts to the field
              </p>
              {/* Accent rule */}
              <div className="mt-6 w-12 h-0.5 bg-[var(--color-accent)]" />
            </div>
          </div>

          {/* Right — main content */}
          <div className="lg:col-span-8">
            <p
              data-reveal="fade"
              className="flex items-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
            >
              <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
              {t("fd_s4_eyebrow")}
            </p>

            <h2
              data-reveal="mask"
              className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-text)] max-w-3xl"
            >
              {t("fd_s4_headline")}
            </h2>

            <p
              data-reveal="fade"
              className="prose-yes mt-6 text-lg leading-relaxed text-[var(--color-text-muted)] max-w-3xl"
            >
              {t("fd_s4_body")}
            </p>

            <div data-reveal="fade" className="mt-10 flex flex-col sm:flex-row gap-4">
              {/* Annual report — placeholder link */}
              {/* CLIENT: replace # with the real annual report URL */}
              <a
                href="#"
                className="inline-flex justify-center items-center px-7 py-3.5 bg-[var(--color-accent-deep)] text-white text-sm font-semibold tracking-wide rounded-full hover:bg-[var(--color-accent-hover)] transition-colors duration-300 shadow-[0_4px_18px_rgba(232,117,26,0.3)]"
              >
                {t("fd_s4_cta_report")}
              </a>
              {/* Financials download — placeholder link */}
              {/* CLIENT: replace # with the real financials PDF URL */}
              <a
                href="#"
                className="inline-flex justify-center items-center px-7 py-3.5 border border-[var(--color-primary)]/30 text-[var(--color-primary)] text-sm font-semibold tracking-wide rounded-full hover:bg-[var(--color-primary)]/5 transition-colors duration-300"
              >
                {t("fd_s4_cta_financials")}
              </a>
            </div>

            {/* Candid seal */}
            <div data-reveal="fade" className="mt-12 flex items-center gap-4">
              <img
                src={`${base}images/candid-seal-platinum-2025.png`}
                alt="Candid Platinum Transparency Seal 2025"
                width={52}
                height={52}
                loading="lazy"
                className="rounded-full flex-shrink-0"
              />
              <p className="text-[var(--color-text-muted)] text-sm">
                Candid Platinum Transparency Seal — independently verified financial accountability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
