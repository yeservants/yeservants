'use client';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { Missionary } from '../types';
import { useLang } from '../i18n/useLang';

interface Props {
  missionary: Missionary;
  base: string;
}

export default function MissionaryDetail({ missionary, base }: Props) {
  const [slide, setSlide] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const gallery = missionary.gallery ?? [];
  const hasGallery = gallery.length > 0;
  const heroImg = hasGallery ? `${base}images/${gallery[0]}` : (missionary.pictureUrl ?? `${base}images/${missionary.picture}`);

  useEffect(() => {
    if (!hasGallery) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % gallery.length), 3500);
    return () => clearInterval(t);
  }, [gallery.length, hasGallery]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.detail-fade',
        { y: 20 },
        { y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12, delay: 0.1 }
      );
    }, contentRef);
    return () => ctx.revert();
  }, []);

  const { t } = useLang();
  const contact = missionary.contact;
  const hasContact = contact && !contact.none && (contact.email || contact.phone || contact.address || contact.link);
  const bioLines = missionary.bio.split('\n').filter(Boolean);

  return (
    <div>
      {/* Full-bleed hero — brand espresso (matches every other inner-page hero) */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden green-gradient">
        {/* Radial accent glow */}
        <div className="absolute top-0 right-0 w-[60%] h-full bg-[radial-gradient(ellipse_at_100%_0%,rgba(246,205,148,0.16)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_0%_100%,rgba(23,14,8,0.6)_0%,transparent_70%)] pointer-events-none" />
        {/* Decorative cross motif */}
        <div aria-hidden="true" className="absolute top-[20%] right-[8%] text-[var(--color-accent)] opacity-10 text-[5rem] pointer-events-none select-none">✛</div>
        <div aria-hidden="true" className="absolute bottom-[15%] left-[6%] text-white opacity-[0.04] text-[8rem] font-heading font-bold pointer-events-none select-none leading-none">YES</div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <a
            href={`${base}missionaries/`}
            className="inline-flex items-center gap-2 text-white/60 text-xs tracking-[0.2em] uppercase mb-6 hover:text-white transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            {t('detail_back')}
          </a>
          <p className="text-[var(--color-accent-light)] text-xs tracking-[0.25em] uppercase font-medium mb-4">{t('detail_label')}</p>
          <h1 className="font-heading text-4xl md:text-6xl font-light text-white leading-[1.05] mb-4">
            {missionary.name}
          </h1>
          <div className="flex items-center gap-2 text-white/70">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
            </svg>
            <span className="text-sm tracking-wide">{missionary.location}</span>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section ref={contentRef} className="py-16 md:py-24 bg-[var(--color-bg)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            {/* Left: gallery + meta */}
            <div className="detail-fade">
              {/* Gallery / portrait */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-[var(--color-accent)]/25 bg-[var(--color-surface)] aspect-[4/5]">
                {hasGallery ? (
                  <>
                    {gallery.map((img, i) => (
                      <img
                        key={img}
                        src={`${base}images/${img}`}
                        alt={`${missionary.name} photo ${i + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === slide ? 'opacity-100' : 'opacity-0'}`}
                      />
                    ))}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                      {gallery.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSlide(i)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${i === slide ? 'bg-[var(--color-accent)] w-5' : 'bg-white/50 w-1.5'}`}
                          aria-label={`Slide ${i + 1}`}
                          aria-current={i === slide}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <img
                    src={missionary.pictureUrl ?? `${base}images/${missionary.picture}`}
                    alt={missionary.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Meta card */}
              {(missionary.sendingChurch || missionary.ministryStarted || missionary.duration) && (
                <div className="mt-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-primary)]/8 p-6 flex flex-col gap-4">
                  {missionary.sendingChurch && (
                    <div>
                      <p className="text-[var(--color-accent-deep)] text-xs tracking-[0.2em] uppercase font-medium mb-1">{t('detail_sendingChurch')}</p>
                      <p className="text-[var(--color-primary)] font-medium text-sm">{missionary.sendingChurch}</p>
                    </div>
                  )}
                  {missionary.ministryStarted && (
                    <div>
                      <p className="text-[var(--color-accent-deep)] text-xs tracking-[0.2em] uppercase font-medium mb-1">{t('detail_started')}</p>
                      <p className="text-[var(--color-primary)] font-medium text-sm">{missionary.ministryStarted}</p>
                    </div>
                  )}
                  {missionary.duration && (
                    <div>
                      <p className="text-[var(--color-accent-deep)] text-xs tracking-[0.2em] uppercase font-medium mb-1">{t('detail_duration')}</p>
                      <p className="text-[var(--color-primary)] font-medium text-sm">{missionary.duration}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Donate */}
              <a
                href="https://www.aplos.com/aws/give/YieldedEvangelicalServantsInc/YesDonations"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full flex items-center justify-center gap-2 px-6 py-4 bg-[var(--color-accent-deep)] text-white font-medium rounded-xl transition-opacity hover:opacity-90"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                </svg>
                {t('detail_donate')} {missionary.name.split(' ')[0]}
              </a>
            </div>

            {/* Right: bio */}
            <div className="detail-fade">
              {bioLines.map((line, i) => {
                if (line.startsWith('<b>') && line.endsWith('</b>')) {
                  return (
                    <h2 key={i} className="font-heading text-xl font-medium text-[var(--color-primary)] mt-10 mb-4 first:mt-0">
                      {line.replace(/<\/?b>/g, '')}
                    </h2>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-[var(--color-text-muted)] leading-relaxed mb-5 text-[1.05rem]"
                    dangerouslySetInnerHTML={{ __html: line }}
                  />
                );
              })}

              {hasContact && (
                <div className="mt-10 pt-8 border-t border-[var(--color-primary)]/10">
                  <h2 className="font-heading text-lg font-medium text-[var(--color-primary)] mb-4">{t('detail_contact')}</h2>
                  <div className="space-y-2 text-sm text-[var(--color-text-muted)]">
                    {contact!.email && (
                      <p><span className="font-medium text-[var(--color-text)]">Email: </span>
                        <a href={`mailto:${contact!.email}`} className="text-[var(--color-accent-deep)] hover:underline">{contact!.email}</a>
                      </p>
                    )}
                    {contact!.phone && (
                      <p><span className="font-medium text-[var(--color-text)]">Phone: </span>
                        <a href={`tel:${contact!.phone.replace(/[^+\d]/g, '')}`} className="text-[var(--color-accent-deep)] hover:underline">{contact!.phone}</a>
                      </p>
                    )}
                    {contact!.address && (
                      <p><span className="font-medium text-[var(--color-text)]">Address: </span>{contact!.address.join(', ')}</p>
                    )}
                    {contact!.link && (
                      <p><span className="font-medium text-[var(--color-text)]">Website: </span>
                        <a href={contact!.link} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-deep)] hover:underline">{contact!.link}</a>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
