/**
 * Shared atmosphere for GREEN (forest-green) blocks. Pass a `variant` (0–5) to
 * vary the composition so no two green sections look alike: the ghost logo
 * rotates to a different corner, ghost crosses scatter at different positions /
 * sizes / tilts, and the god-rays flip direction. Decorative only (aria-hidden).
 * variant 0 = the clean hero look (no logo) used by PageHero for consistent heroes.
 *
 * Celestial layer (shared across every variant): slow-drifting aurora glows, a
 * twinkling starfield, breathing god-rays, and a soft halo behind the cross —
 * reverent motion so the green blocks feel alive, not static.
 */
const LOGO = `${import.meta.env.BASE_URL.replace(/\/?$/, '/')}yes_logo_ghost.png`;

interface Props {
  variant?: number;
}

// A small twinkling starfield — deterministic positions, varied delays so the
// points fade in and out at different rhythms. (No Math.random → SSR-stable.)
const STARS = [
  { c: 'left-[16%] top-[22%]',        d: '0s' },
  { c: 'left-[82%] top-[18%] star-lg', d: '1.3s' },
  { c: 'left-[68%] top-[12%]',        d: '2.6s' },
  { c: 'left-[30%] top-[68%]',        d: '3.4s' },
  { c: 'left-[88%] top-[54%]',        d: '4.1s' },
  { c: 'left-[8%] top-[46%] star-lg',  d: '1.9s' },
  { c: 'left-[46%] top-[14%]',        d: '5.2s' },
  { c: 'left-[58%] top-[78%]',        d: '2.2s' },
  { c: 'left-[92%] top-[34%]',        d: '3.9s' },
  { c: 'left-[38%] top-[40%]',        d: '6.0s' },
];

export default function GreenAtmos({ variant = 0 }: Props) {
  const v = ((variant % 6) + 6) % 6;
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 atmos-glow" />

      {/* ── shared celestial light: two slow-drifting aurora glows ── */}
      <div className="aurora w-[42vw] h-[42vw] left-[6%] -top-[14%] bg-[radial-gradient(circle,rgba(246,205,148,0.16),transparent_70%)] [animation-delay:0s]" />
      <div className="aurora w-[36vw] h-[36vw] right-0 -bottom-[18%] bg-[radial-gradient(circle,rgba(58,107,66,0.55),transparent_68%)] [animation-delay:-9s] [animation-duration:26s]" />

      {/* ── shared twinkling starfield ── */}
      {STARS.map((s, i) => (
        <span key={i} className={`star ${s.c}`} style={{ animationDelay: s.d }} />
      ))}

      {/* a single slow ember drifting through the sky */}
      <span className="ember left-[74%] top-[8%] [animation-delay:-4s]" />

      {/* drifting motes (dust in the light) */}
      <span className="mote w-1.5 h-1.5 left-[60%] top-[42%] [animation-delay:0s]" />
      <span className="mote w-1 h-1 left-[73%] top-[58%] [animation-delay:2.6s]" />
      <span className="mote w-1.5 h-1.5 left-[24%] top-[34%] [animation-delay:5s]" />
      <span className="mote w-1 h-1 left-[54%] top-[64%] [animation-delay:7s]" />

      {/* ── variant 0 — clean hero: breathing rays top-right, haloed centered cross, no logo ── */}
      {v === 0 && (
        <>
          <div className="god-rays absolute -top-1/3 right-0 w-[82%] h-[170%] rotate-[15deg] blur-[1px] bg-[repeating-linear-gradient(96deg,transparent_0px,transparent_46px,rgba(246,222,180,0.6)_52px,transparent_60px)] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_72%)]" />
          <div className="cross-halo w-[40vh] h-[40vh] top-1/2 left-1/2 hidden md:block" />
          <div className="ghost-cross text-[var(--color-cream)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[46vh] h-[66vh] hidden md:block" />
        </>
      )}

      {/* ── variant 1 — logo top-left, haloed cross bottom-right ── */}
      {v === 1 && (
        <>
          <div className="god-rays absolute -top-1/3 right-0 w-[78%] h-[170%] rotate-[15deg] blur-[1px] bg-[repeating-linear-gradient(96deg,transparent_0px,transparent_46px,rgba(246,222,180,0.6)_52px,transparent_60px)] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_72%)] [animation-delay:-2s]" />
          <img src={LOGO} alt="" loading="lazy" width={400} height={389} className="absolute -top-20 -left-16 w-[280px] opacity-[0.05] -rotate-12 select-none" />
          <div className="cross-halo w-[32vh] h-[32vh] bottom-[6%] right-[18%] hidden md:block" />
          <div className="ghost-cross text-[var(--color-cream)] bottom-[-10%] right-[10%] w-[34vh] h-[50vh] rotate-[8deg] hidden md:block" />
        </>
      )}

      {/* ── variant 2 — logo bottom-right, two crosses, rays top-left ── */}
      {v === 2 && (
        <>
          <div className="god-rays absolute -top-1/3 left-0 w-[78%] h-[170%] -rotate-[15deg] blur-[1px] bg-[repeating-linear-gradient(84deg,transparent_0px,transparent_46px,rgba(246,222,180,0.6)_52px,transparent_60px)] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_72%)] [animation-delay:-4s]" />
          <img src={LOGO} alt="" loading="lazy" width={400} height={389} className="absolute -bottom-24 -right-16 w-[340px] opacity-[0.05] rotate-[12deg] select-none" />
          <div className="ghost-cross text-[var(--color-cream)] opacity-[0.04] top-[10%] left-[10%] w-[22vh] h-[33vh] -rotate-[10deg] hidden lg:block" />
          <div className="cross-halo w-[34vh] h-[34vh] top-1/2 right-[24%] hidden md:block" />
          <div className="ghost-cross text-[var(--color-cream)] top-1/2 right-[24%] -translate-y-1/2 w-[36vh] h-[52vh] rotate-[5deg] hidden md:block" />
        </>
      )}

      {/* ── variant 3 — logo center-right large, haloed cross top-left, rays bottom-left ── */}
      {v === 3 && (
        <>
          <div className="god-rays absolute -bottom-1/3 left-0 w-[78%] h-[170%] rotate-[160deg] blur-[1px] bg-[repeating-linear-gradient(96deg,transparent_0px,transparent_46px,rgba(246,222,180,0.55)_52px,transparent_60px)] [mask-image:radial-gradient(ellipse_at_bottom_left,black,transparent_72%)] [animation-delay:-6s]" />
          <img src={LOGO} alt="" loading="lazy" width={400} height={389} className="absolute top-1/2 -right-12 -translate-y-1/2 w-[360px] opacity-[0.045] rotate-[6deg] select-none hidden md:block" />
          <div className="cross-halo w-[30vh] h-[30vh] top-[16%] left-[24%] hidden md:block" />
          <div className="ghost-cross text-[var(--color-cream)] top-[6%] left-[16%] w-[30vh] h-[44vh] -rotate-[12deg] hidden md:block" />
        </>
      )}

      {/* ── variant 4 — logo bottom-left, crosses top-right + mid-left, rays top ── */}
      {v === 4 && (
        <>
          <div className="god-rays absolute -top-1/3 left-1/4 w-[60%] h-[170%] rotate-[4deg] blur-[1px] bg-[repeating-linear-gradient(92deg,transparent_0px,transparent_46px,rgba(246,222,180,0.6)_52px,transparent_60px)] [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)] [animation-delay:-3s]" />
          <img src={LOGO} alt="" loading="lazy" width={400} height={389} className="absolute -bottom-20 -left-14 w-[300px] opacity-[0.05] rotate-[7deg] select-none" />
          <div className="cross-halo w-[36vh] h-[36vh] top-[12%] right-[16%] hidden md:block" />
          <div className="ghost-cross text-[var(--color-cream)] top-[2%] right-[8%] w-[38vh] h-[56vh] rotate-[10deg] hidden md:block" />
          <div className="ghost-cross text-[var(--color-cream)] opacity-[0.03] top-1/2 left-[6%] -translate-y-1/2 w-[20vh] h-[30vh] -rotate-[6deg] hidden lg:block" />
        </>
      )}

      {/* ── variant 5 — logo top-right, big haloed cross bottom-center, rays diagonal-left ── */}
      {v === 5 && (
        <>
          <div className="god-rays absolute -top-1/4 -left-10 w-[80%] h-[160%] -rotate-[10deg] blur-[1px] bg-[repeating-linear-gradient(100deg,transparent_0px,transparent_46px,rgba(246,222,180,0.6)_52px,transparent_60px)] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_72%)] [animation-delay:-5s]" />
          <img src={LOGO} alt="" loading="lazy" width={400} height={389} className="absolute -top-16 -right-14 w-[300px] opacity-[0.05] -rotate-[10deg] select-none" />
          <div className="cross-halo w-[38vh] h-[38vh] -bottom-[2%] left-1/2 hidden md:block" />
          <div className="ghost-cross text-[var(--color-cream)] -bottom-[12%] left-1/2 -translate-x-1/2 w-[44vh] h-[64vh] rotate-[4deg] hidden md:block" />
        </>
      )}
    </div>
  );
}
