"use client";
import { useEffect, useRef } from "react";
import { useLang } from "../i18n/useLang";

export default function FdWhyPartner() {
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

  const valueProps = [
    {
      num: "01",
      titleKey: "fd_vp1_title" as const,
      bodyKey: "fd_vp1_body" as const,
    },
    {
      num: "02",
      titleKey: "fd_vp2_title" as const,
      bodyKey: "fd_vp2_body" as const,
    },
    {
      num: "03",
      titleKey: "fd_vp3_title" as const,
      bodyKey: "fd_vp3_body" as const,
    },
    {
      num: "04",
      titleKey: "fd_vp4_title" as const,
      bodyKey: "fd_vp4_body" as const,
    },
  ] as const;

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[var(--color-bg)]">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-16">
          <p
            data-reveal="fade"
            className="flex items-center gap-3 text-[var(--color-accent-deep)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium mb-6"
          >
            <span aria-hidden="true" className="w-8 h-px bg-[var(--color-accent)]/60" />
            {t("fd_s2_eyebrow")}
          </p>
          <h2
            data-reveal="mask"
            className="font-heading font-medium leading-[1.08] text-[clamp(1.9rem,4vw,3.2rem)] text-[var(--color-text)] max-w-3xl"
          >
            {t("fd_s2_headline")}
          </h2>
        </div>

        {/* Value props — alternating layout */}
        <div className="space-y-10">
          {valueProps.map((vp, i) => (
            <article
              key={vp.titleKey}
              data-reveal="mask"
              className={[
                "grid lg:grid-cols-12 gap-6 lg:gap-12 items-start relative",
                "border-t border-[var(--color-primary)]/10 pt-10",
              ].join(" ")}
              style={{ "--reveal-delay": `${i * 0.07}s` } as React.CSSProperties}
            >
              {/* Big Playfair number */}
              <div className="lg:col-span-2">
                <span
                  aria-hidden="true"
                  className="font-heading text-[var(--color-accent)]/25 text-5xl md:text-6xl font-bold leading-none select-none"
                >
                  {vp.num}
                </span>
              </div>

              {/* Title + body */}
              <div className="lg:col-span-10 lg:grid lg:grid-cols-2 lg:gap-10">
                <h3 className="font-heading text-xl md:text-2xl text-[var(--color-text)] leading-snug mb-4 lg:mb-0">
                  {t(vp.titleKey)}
                </h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  {t(vp.bodyKey)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
