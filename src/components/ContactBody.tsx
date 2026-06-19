'use client';
import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/useLang';
import type { TranslationKey } from '../i18n/translations';

interface Props {
  base: string;
  /** Web3Forms access key. Empty string → form falls back to mailto:. */
  web3formsKey?: string;
}

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

const SUBJECTS: TranslationKey[] = [
  'contact_form_subject_partner',
  'contact_form_subject_trip',
  'contact_form_subject_accounting',
  'contact_form_subject_general',
  'contact_form_subject_other',
];

/**
 * Contact — two columns (FINAL v2: info left, form right) + centered
 * John 13:35 close. Static site: the form POSTs to Web3Forms (no backend) so
 * submissions land in the YES inbox. If no access key is configured it falls
 * back to composing a mailto: message.
 */
export default function ContactBody({ base, web3formsKey = '' }: Props) {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState<TranslationKey>('contact_form_subject_partner');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<SubmitState>('idle');

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) =>
        el.classList.add('visible')
      );
      return;
    }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    root.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const sendViaMailto = () => {
    const mailSubject = encodeURIComponent(`[${t(subject)}] ${name}`.trim());
    const mailBody = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:info@yeservants.org?subject=${mailSubject}&body=${mailBody}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // No key configured → keep the original mailto behaviour.
    if (!web3formsKey) {
      sendViaMailto();
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3formsKey,
          name,
          email,
          subject: `[${t(subject)}] ${name}`.trim(),
          message,
          from_name: 'YES Website Contact Form',
        }),
      });
      const data: { success?: boolean } = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setName('');
        setEmail('');
        setSubject('contact_form_subject_partner');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputCls =
    'w-full rounded-xl border border-[var(--color-primary)]/15 bg-white/70 px-4 py-3 text-[var(--color-text)] text-base placeholder:text-[var(--color-text-muted)]/60 focus:border-[var(--color-accent-deep)] focus:ring-2 focus:ring-[var(--color-accent-deep)] focus:ring-offset-1 transition-colors duration-200';
  const labelCls =
    'block text-[var(--color-text)] text-sm font-semibold tracking-wide mb-2';

  const infoRow = (label: string, value: React.ReactNode) => (
    <div className="py-4 border-b border-[var(--color-primary)]/10 last:border-b-0">
      <p className="text-[var(--color-text-muted)] text-[11px] tracking-[0.18em] uppercase mb-1">{label}</p>
      <div className="text-[var(--color-text)] text-base md:text-lg">{value}</div>
    </div>
  );

  return (
    <section ref={ref} className="relative bg-[var(--color-bg)] py-20 md:py-28 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ── Info column ── */}
          <div data-reveal="fade" className="lg:col-span-5">
            <h2 className="font-heading text-2xl md:text-3xl text-[var(--color-text)] mb-6">
              {t('contact_info_label')}
            </h2>

            <div className="rounded-2xl bg-white/60 border-t-2 border-[var(--color-accent)] shadow-[0_18px_40px_-24px_rgba(33,23,16,0.35)] px-7 py-4">
              {infoRow(
                'Email',
                <a href="mailto:info@yeservants.org" className="text-[var(--color-accent-deep)] hover:underline">
                  {t('contact_info_email')}
                </a>
              )}
              {/* CLIENT: confirm accounting@yeservants.org is active and monitored before launch */}
              {infoRow(
                t('contact_info_accounting_label'),
                <a href="mailto:accounting@yeservants.org" className="text-[var(--color-accent-deep)] hover:underline">
                  {t('contact_info_accounting')}
                </a>
              )}
              {infoRow(t('contact_info_phone_label'), <a href="tel:4074985128" className="hover:underline">407-498-5128</a>)}
              {infoRow(
                t('contact_info_address_label'),
                <address className="not-italic leading-relaxed">PO Box 770308<br />{t('contact_info_location')} 32837</address>
              )}
              {infoRow('501(c)(3)', <span>{t('contact_info_org')}</span>)}
              {infoRow(
                t('contact_info_transparency_label'),
                <span className="flex items-center gap-3">
                  <img
                    src={`${base}images/candid-seal-platinum-2025.png`}
                    alt="Candid Platinum Transparency 2025 seal"
                    width={40}
                    height={40}
                    loading="lazy"
                    className="w-10 h-10 shrink-0"
                  />
                  {t('contact_info_transparency')}
                </span>
              )}
            </div>
          </div>

          {/* ── Form column ── */}
          <div data-reveal="fade" className="lg:col-span-7">
            <h2 className="font-heading text-2xl md:text-3xl text-[var(--color-text)] mb-6">
              {t('contact_form_label')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className={labelCls}>{t('contact_form_name')}</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className={labelCls}>{t('contact_form_email')}</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className={labelCls}>{t('contact_form_subject')}</label>
                <select
                  id="contact-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value as TranslationKey)}
                  className={inputCls}
                >
                  {SUBJECTS.map((key) => (
                    <option key={key} value={key}>
                      {t(key)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className={labelCls}>{t('contact_form_message')}</label>
                <textarea
                  id="contact-message"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={inputCls}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  aria-describedby="contact-form-note"
                  className="w-full sm:w-auto inline-flex justify-center px-9 py-4 bg-[var(--color-accent-deep)] text-white text-sm font-semibold tracking-wide rounded-full hover:bg-[var(--color-accent-hover)] transition-colors duration-300 shadow-[0_4px_20px_rgba(168,79,10,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? t('contact_form_sending') : t('contact_form_submit')}
                </button>

                {status === 'success' ? (
                  <p role="status" className="mt-3 text-[var(--color-accent-deep)] text-sm font-semibold leading-relaxed">
                    {t('contact_form_success')}
                  </p>
                ) : status === 'error' ? (
                  <p role="alert" className="mt-3 text-[#A8201A] text-sm font-semibold leading-relaxed">
                    {t('contact_form_error')}
                  </p>
                ) : (
                  <p id="contact-form-note" className="mt-3 text-[var(--color-text-muted)] text-xs leading-relaxed">
                    {web3formsKey ? t('contact_form_note_inbox') : t('contact_form_note')}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* ── John 13:35 close — centered at the end of the page ── */}
        <div data-reveal="mask" className="mt-24 md:mt-32 pt-14 border-t border-[var(--color-primary)]/10 text-center max-w-3xl mx-auto">
          <blockquote>
            <p className="font-heading italic text-[var(--color-accent-deep)] text-[clamp(1.3rem,2.8vw,2rem)] leading-[1.5]">
              &ldquo;{t('contact_close_quote')}&rdquo;
            </p>
          </blockquote>
          <p className="mt-5 text-[var(--color-text-muted)] text-sm tracking-[0.22em] uppercase">
            &mdash; {t('contact_close_ref')}
          </p>
        </div>
      </div>
    </section>
  );
}
