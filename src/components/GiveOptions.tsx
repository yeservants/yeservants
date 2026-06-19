"use client";
import { useEffect, useRef } from "react";
import { useLang } from "../i18n/useLang";

const APLOS = "https://app.aplos.com/aws/give/YieldedEvangelicalServantsInc/YesDonations";

interface Props {
  base: string;
}

export default function GiveOptions({ base }: Props) {
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
    <section
      id="giving-options"
      ref={ref}
      className="py-24 md:py-32 bg-[var(--color-bg)]"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <p
            data-reveal="fade"
            className="flex items-center justify-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
          >
            <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
            {t("give_s2_eyebrow")}
            <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
          </p>
          <p data-reveal="fade" className="prose-yes text-lg leading-relaxed text-[var(--color-text-muted)]">
            {t("give_s2_intro")}
          </p>
        </div>

        {/* Direct giving CTA — donations are securely processed on Aplos */}
        <div
          data-reveal="mask"
          className="max-w-2xl mx-auto rounded-2xl border-t-2 border-[var(--color-accent)] bg-white/70 shadow-[0_24px_60px_-30px_rgba(33,23,16,0.4)] px-7 py-10 md:px-10 md:py-12 text-center"
        >
          <a
            href={APLOS}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-9 py-4 bg-[var(--color-accent-deep)] text-white text-base font-semibold tracking-wide rounded-full hover:bg-[var(--color-accent-hover)] transition-colors duration-300 shadow-[0_4px_18px_rgba(232,117,26,0.35)]"
          >
            {t("cta_becomePartner")}
            <span className="sr-only">{t("give_new_tab")}</span>
            {/* external link icon */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M5.5 2H2a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1V8.5M8.5 1H13m0 0v4.5M13 1L6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <p className="mt-4 text-[var(--color-text-muted)] text-sm">
            {t("give_cta_aplos_note")}
          </p>

          {/* Mail-in alternative */}
          <div className="mt-8 pt-8 border-t border-[var(--color-primary)]/10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="text-[var(--color-text-muted)] text-sm">
              {t("give_cta_mailin")}
            </span>
            <a
              href={`${base}download/Mail-inDonation.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--color-primary)] underline underline-offset-2 hover:text-[var(--color-accent-deep)] transition-colors duration-300"
            >
              {t("give_cta_mailin_link")}
              <span className="sr-only">{t("give_new_tab")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
