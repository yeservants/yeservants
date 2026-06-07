"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n/useLang";

const APLOS = "https://www.aplos.com/aws/give/YieldedEvangelicalServantsInc/YesDonations";

interface Props {
  base: string;
}

type GivingType = "monthly" | "onetime";
type Amount = "35" | "75" | "150" | "250" | "custom";
type Designation = "general" | "worker" | "team" | "leadership";

export default function GiveOptions({ base }: Props) {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);

  const [givingType, setGivingType] = useState<GivingType>("monthly");
  const [amount, setAmount] = useState<Amount>("75");
  const [designation, setDesignation] = useState<Designation>("general");

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

  const amounts: { value: Amount; label: string }[] = [
    { value: "35", label: t("give_amount_35") },
    { value: "75", label: t("give_amount_75") },
    { value: "150", label: t("give_amount_150") },
    { value: "250", label: t("give_amount_250") },
    { value: "custom", label: t("give_amount_custom") },
  ];

  const designations: { value: Designation; label: string }[] = [
    { value: "general", label: t("give_desig_general") },
    { value: "worker", label: t("give_desig_worker") },
    { value: "team", label: t("give_desig_team") },
    { value: "leadership", label: t("give_desig_leadership") },
  ];

  return (
    <section
      id="giving-options"
      ref={ref}
      className="py-24 md:py-32 bg-[var(--color-bg)]"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mx-auto mb-14 text-center">
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

        {/* Giving panel */}
        <div data-reveal="mask" className="max-w-2xl mx-auto">
          {/* ── Giving Type ── */}
          <fieldset className="mb-10">
            <legend className="font-heading text-[var(--color-text)] text-xl md:text-2xl mb-5 text-center w-full">
              {t("give_type_monthly")} &amp; {t("give_type_onetime")}
            </legend>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Monthly */}
              <button
                type="button"
                onClick={() => setGivingType("monthly")}
                aria-pressed={givingType === "monthly"}
                className={[
                  "relative flex-1 text-left rounded-xl border-t-2 p-6 transition-colors duration-300",
                  givingType === "monthly"
                    ? "border-[var(--color-accent)] bg-white shadow-[0_18px_40px_-24px_rgba(31,58,38,0.35)]"
                    : "border-transparent bg-[var(--color-surface)] hover:border-[var(--color-accent)]/40",
                ].join(" ")}
              >
                <span className="block font-heading text-lg text-[var(--color-text)] mb-1">
                  {t("give_type_monthly")}
                </span>
                <span className="block text-[var(--color-accent-deep)] text-xs tracking-wide uppercase">
                  {t("give_type_monthly_badge")}
                </span>
                {givingType === "monthly" && (
                  <span
                    aria-hidden="true"
                    className="absolute top-4 right-4 w-4 h-4 rounded-full bg-[var(--color-accent)] flex items-center justify-center"
                  >
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </button>

              {/* One-time */}
              <button
                type="button"
                onClick={() => setGivingType("onetime")}
                aria-pressed={givingType === "onetime"}
                className={[
                  "relative flex-1 text-left rounded-xl border-t-2 p-6 transition-colors duration-300",
                  givingType === "onetime"
                    ? "border-[var(--color-accent)] bg-white shadow-[0_18px_40px_-24px_rgba(31,58,38,0.35)]"
                    : "border-transparent bg-[var(--color-surface)] hover:border-[var(--color-accent)]/40",
                ].join(" ")}
              >
                <span className="block font-heading text-lg text-[var(--color-text)] mb-1">
                  {t("give_type_onetime")}
                </span>
                {givingType === "onetime" && (
                  <span
                    aria-hidden="true"
                    className="absolute top-4 right-4 w-4 h-4 rounded-full bg-[var(--color-accent)] flex items-center justify-center"
                  >
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </fieldset>

          {/* ── Amount ── */}
          <fieldset className="mb-10">
            <legend className="font-heading text-[var(--color-text)] text-xl md:text-2xl mb-5 text-center w-full">
              {t("give_amount_label")}
            </legend>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="group">
              {amounts.map((a) => (
                <button
                  key={a.value}
                  type="button"
                  onClick={() => setAmount(a.value)}
                  aria-pressed={amount === a.value}
                  className={[
                    "py-3.5 px-4 rounded-full text-sm font-semibold tracking-wide transition-colors duration-300 border",
                    amount === a.value
                      ? "bg-[var(--color-primary)] text-[var(--color-cream)] border-[var(--color-primary)]"
                      : "bg-transparent text-[var(--color-primary)] border-[var(--color-primary)]/30 hover:border-[var(--color-primary)]/60 hover:bg-[var(--color-primary)]/5",
                  ].join(" ")}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </fieldset>

          {/* ── Designation ── */}
          <fieldset className="mb-10">
            <legend className="font-heading text-[var(--color-text)] text-xl md:text-2xl mb-5 text-center w-full">
              {t("give_desig_label")}
            </legend>
            <div className="flex flex-col gap-3" role="group">
              {designations.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setDesignation(d.value)}
                  aria-pressed={designation === d.value}
                  className={[
                    "text-left py-4 px-5 rounded-xl border transition-colors duration-300 text-sm leading-snug",
                    designation === d.value
                      ? "border-[var(--color-accent)] bg-white text-[var(--color-text)] shadow-[0_8px_24px_-12px_rgba(31,58,38,0.25)]"
                      : "border-[var(--color-primary)]/15 bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]/40",
                  ].join(" ")}
                >
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={[
                        "w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center",
                        designation === d.value
                          ? "bg-[var(--color-accent)] border-[var(--color-accent)]"
                          : "border-[var(--color-grey)] bg-transparent",
                      ].join(" ")}
                    >
                      {designation === d.value && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                      )}
                    </span>
                    {d.label}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

          {/* ── Proceed CTA ── */}
          <div className="pt-2">
            <a
              href={APLOS}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex justify-center items-center gap-2 px-7 py-4 bg-[var(--color-accent-deep)] text-white text-base font-semibold tracking-wide rounded-full hover:bg-[var(--color-accent-hover)] transition-colors duration-300 shadow-[0_4px_18px_rgba(232,117,26,0.35)]"
            >
              {t("give_cta_proceed")}
              {/* external link icon */}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M5.5 2H2a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1V8.5M8.5 1H13m0 0v4.5M13 1L6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <p className="mt-3 text-center text-[var(--color-text-muted)] text-xs">
              {t("give_cta_aplos_note")}
            </p>
          </div>

          {/* ── Mail-in ── */}
          <div className="mt-8 pt-8 border-t border-[var(--color-primary)]/10 flex flex-col sm:flex-row items-center gap-3">
            <span className="text-[var(--color-text-muted)] text-sm">
              {t("give_cta_mailin")}
            </span>
            <a
              href={`${base}download/Mail-inDonation.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--color-primary)] underline underline-offset-2 hover:text-[var(--color-accent)] transition-colors duration-300"
            >
              {t("give_cta_mailin_link")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
