"use client";
import { useEffect, useRef } from "react";
import { useLang } from "../i18n/useLang";

export default function GiveMajorPartners() {
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
        {/* Two-column asymmetric layout */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left — eyebrow + headline column */}
          <div className="lg:col-span-5">
            <p
              data-reveal="fade"
              className="flex items-center gap-3 text-[var(--color-accent-deep)] text-sm md:text-lg tracking-[0.3em] uppercase font-medium mb-6"
            >
              {t("give_s4_eyebrow")}
            </p>
            <h2
              data-reveal="mask"
              className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-text)] max-w-xl"
            >
              {t("give_s4_headline")}
            </h2>

            {/* Orange accent bar */}
            <div
              data-reveal="fade"
              aria-hidden="true"
              className="mt-8 w-16 h-0.5 bg-[var(--color-accent)]"
            />
          </div>

          {/* Right — body + CTA column */}
          <div className="lg:col-span-7">
            <p
              data-reveal="fade"
              className="prose-yes text-lg leading-relaxed text-[var(--color-text-muted)] max-w-3xl"
            >
              {t("give_s4_body")}
            </p>

            <div data-reveal="fade" className="mt-10">
              <a
                href="mailto:info@yeservants.org"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-7 py-3.5 bg-[var(--color-accent-deep)] text-white text-sm font-semibold tracking-wide rounded-full hover:bg-[var(--color-accent-hover)] transition-colors duration-300 shadow-[0_4px_18px_rgba(232,117,26,0.3)]"
              >
                {t("cta_talkWithAndres")}
                {/* email icon */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M1.5 3.5l6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
