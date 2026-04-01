import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const STATS = [
  { value: '100+', label: 'Curated Products', sub: 'across 10 categories' },
  { value: '40+', label: 'Countries Served', sub: 'and growing every month' },
  { value: '50+', label: 'Artisan Sellers', sub: 'verified and vetted' },
  { value: '4.8', label: 'Average Rating', sub: 'from 2,000+ orders' },
]

const TEAM = [
  {
    name: 'Arjun Sharma',
    role: 'Co-founder & CEO',
    bio: 'Grew up between Delhi and London. Spent a decade in fintech before starting haat to solve a problem he lived every day.',
    avatar: 'https://source.unsplash.com/220x220/?indian,founder,man&sig=201',
  },
  {
    name: 'Priya Nair',
    role: 'Co-founder & CPO',
    bio: "Former product lead at a major Indian e-commerce company. Built haat's AI agent architecture from the ground up.",
    avatar: 'https://source.unsplash.com/220x220/?indian,founder,woman&sig=202',
  },
  {
    name: 'Rohan Mehta',
    role: 'Head of Seller Partnerships',
    bio: 'Spent five years travelling to artisan clusters in Rajasthan, Bengal, and Tamil Nadu building trusted relationships.',
    avatar: 'https://source.unsplash.com/220x220/?indian,business,man&sig=203',
  },
  {
    name: 'Divya Krishnan',
    role: 'Head of Engineering',
    bio: 'Previously at a top AI startup. Leads the team building the shopping intelligence that powers haat.',
    avatar: 'https://source.unsplash.com/220x220/?indian,engineer,woman&sig=204',
  },
]

const VALUES = [
  {
    title: 'Authenticity first',
    desc: 'Every product is sourced from verified sellers. No mass-market replicas, no grey imports - only the real thing.',
  },
  {
    title: 'Support artisans',
    desc: 'We prioritize small-batch makers and traditional craft clusters. When you buy from haat, you buy from the hands that made it.',
  },
  {
    title: 'AI that understands culture',
    desc: 'Our AI understands context: Kanjivaram versus Banarasi, Kashmiri walnut versus regular walnut, and festival buying needs.',
  },
  {
    title: 'Built for diaspora families',
    desc: 'We are diaspora ourselves. We built this for the moment you miss home and need someone who understands what that means.',
  },
]

const TIMELINE = [
  {
    year: '2022',
    title: 'The Idea',
    desc: 'A delayed Diwali gift shipment became the spark: buying from India abroad was still too hard and too fragmented.',
  },
  {
    year: '2023',
    title: 'First Sellers',
    desc: 'The team worked on ground across Jaipur, Varanasi, and Kolkata to onboard trusted craft and food merchants.',
  },
  {
    year: '2024',
    title: 'AI Launch',
    desc: 'haat AI launched to translate natural language requests into culturally relevant product discovery.',
  },
  {
    year: '2025',
    title: 'Global Scale',
    desc: 'Serving 40+ countries with a growing mission: bring home closer for every Indian family abroad.',
  },
]

function fallbackPhoto(seed, width = 220, height = 220) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`
}

function StatCard({ value, label, sub, i }) {
  return (
    <div
      className="reveal-child fx-soft-card"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, var(--bg-raised) 100%)',
        border: '1px solid var(--border-faint)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)',
        textAlign: 'center',
        animationDelay: `${i * 60}ms`,
      }}
    >
      <div
        style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 800,
          letterSpacing: '-1.5px',
          color: 'var(--brand-saffron)',
          lineHeight: 1,
          marginBottom: '8px',
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{sub}</div>
    </div>
  )
}

function TeamCard({ person, i }) {
  const backup = fallbackPhoto(`team-${person.name}`)
  const [src, setSrc] = useState(person.avatar)

  return (
    <div
      className="reveal-child fx-soft-card"
      style={{
        background: 'var(--bg-raised)',
        border: '1px solid var(--border-faint)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        animationDelay: `${i * 80}ms`,
      }}
    >
      <img
        src={src}
        alt={person.name}
        style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-subtle)' }}
        onError={e => {
          if (e.currentTarget.dataset.fbApplied === '1') return
          e.currentTarget.dataset.fbApplied = '1'
          setSrc(backup)
        }}
      />
      <div>
        <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{person.name}</div>
        <div style={{ fontSize: '12px', color: 'var(--brand-saffron)', fontWeight: 500 }}>{person.role}</div>
      </div>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{person.bio}</p>
    </div>
  )
}

export default function AboutPage() {
  const heroRef = useReveal(0.1)
  const statsRef = useReveal(0.15)
  const timelineRef = useReveal(0.12)
  const valuesRef = useReveal(0.12)
  const teamRef = useReveal(0.12)

  return (
    <div style={{ minHeight: '100vh', paddingTop: 'var(--nav-height)', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes aboutGlow {
          0%, 100% { opacity: 0.65; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }
        @media (max-width: 640px) {
          .about-stats-grid  { grid-template-columns: repeat(2, 1fr) !important; }
          .about-team-grid   { grid-template-columns: 1fr !important; }
          .about-values-grid { grid-template-columns: 1fr !important; }
          .about-timeline    { grid-template-columns: 1fr !important; }
          .about-hero-h1     { font-size: clamp(34px, 10vw, 54px) !important; }
        }
        @media (max-width: 900px) {
          .about-team-grid   { grid-template-columns: repeat(2, 1fr) !important; }
          .about-values-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-timeline    { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-180px', left: '-160px', width: '560px', height: '560px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.20) 0%, rgba(249,115,22,0) 70%)', filter: 'blur(70px)', animation: 'aboutGlow 8s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', right: '-140px', top: '220px', width: '460px', height: '460px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.10) 0%, rgba(59,130,246,0) 70%)', filter: 'blur(68px)' }} />
      </div>

      <section
        ref={heroRef}
        style={{ maxWidth: '820px', margin: '0 auto', padding: 'var(--space-16) var(--space-6) var(--space-12)', textAlign: 'center' }}
      >
        <div
          className="reveal-child"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--brand-gold-lt)',
            border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: 'var(--radius-full)',
            padding: '4px 16px',
            marginBottom: 'var(--space-5)',
            background: 'rgba(245,158,11,0.07)',
          }}
        >
          <span className="fx-text-live">●</span>
          Our Story
        </div>

        <h1 className="about-hero-h1 reveal-child" style={{ fontSize: 'clamp(40px, 7vw, 64px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 'var(--space-6)' }}>
          Bringing <span className="gradient-text">India</span> to wherever you call home
        </h1>

        <p className="reveal-child" style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '620px', margin: '0 auto' }}>
          haat is an AI-powered marketplace for the Indian diaspora - making it effortless to discover, buy, and receive authentic Indian products anywhere in the world.
        </p>
      </section>

      <section style={{ maxWidth: 'var(--container-lg)', margin: '0 auto', padding: '0 var(--space-6) var(--space-16)' }}>
        <div className="about-origin fx-soft-card" style={{
          background: 'var(--bg-raised)',
          border: '1px solid var(--border-faint)',
          borderRadius: 'var(--radius-2xl)',
          padding: 'clamp(24px, 5vw, 56px)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-10)',
          alignItems: 'center',
        }}>
          <style>{`.about-origin { } @media (max-width: 768px) { .about-origin { grid-template-columns: 1fr !important; } }`}</style>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 'var(--space-4)' }}>
              Why we built this
            </div>
            <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1.3, marginBottom: 'var(--space-4)' }}>
              Because home is a feeling, <span style={{ color: 'var(--brand-saffron)' }}>not just a place</span>
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>
              We are 32 million people: Indians living abroad, raising families and building careers across the world while holding close to culture, taste, and tradition.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              haat was built so that the basmati you grew up with, the saree your mother wore at every celebration, and the festive sweets your family waits for are always within reach.
            </p>
          </div>
          <div style={{ background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.12)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)' }}>
            <blockquote style={{ fontSize: '16px', fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>
              "I wanted my daughter, born in Toronto, to taste the same Diwali laddoos I grew up with in Jaipur. That should not be hard. With haat, it is not."
            </blockquote>
            <div style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>- Arjun Sharma, co-founder</div>
          </div>
        </div>
      </section>

      <section ref={statsRef} style={{ maxWidth: 'var(--container-xl)', margin: '0 auto', padding: '0 var(--space-6) var(--space-16)' }}>
        <div className="about-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {STATS.map((s, i) => (
            <StatCard key={s.label} {...s} i={i} />
          ))}
        </div>
      </section>

      <section id="timeline" ref={timelineRef} style={{ background: 'var(--bg-raised)', borderTop: '1px solid var(--border-faint)', borderBottom: '1px solid var(--border-faint)', padding: 'var(--space-16) var(--space-6)' }}>
        <div style={{ maxWidth: 'var(--container-xl)', margin: '0 auto' }}>
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 'var(--space-3)' }}>
              Our journey
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, letterSpacing: '-1px' }}>From frustration to platform</h2>
          </div>

          <div className="about-timeline" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {TIMELINE.map((t, i) => (
              <div key={t.year} className="reveal-child fx-soft-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-faint)', borderRadius: '12px', padding: '14px', animationDelay: `${i * 70}ms` }}>
                <div style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-1px', color: 'var(--brand-saffron)', lineHeight: 1 }}>{t.year}</div>
                <div style={{ width: '24px', height: '2px', background: 'rgba(249,115,22,0.4)' }} />
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{t.title}</div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={valuesRef} style={{ maxWidth: 'var(--container-xl)', margin: '0 auto', padding: 'var(--space-16) var(--space-6)' }}>
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 'var(--space-3)' }}>
            What we believe
          </div>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, letterSpacing: '-1px' }}>Our principles</h2>
        </div>

        <div className="about-values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {VALUES.map((v, i) => (
            <div key={v.title} className="reveal-child fx-soft-card" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-faint)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', animationDelay: `${i * 60}ms` }}>
              <div style={{ fontSize: '22px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.15)', borderRadius: 'var(--radius-lg)', color: 'var(--brand-saffron)' }}>
                {i + 1}
              </div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{v.title}</div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section ref={teamRef} style={{ background: 'var(--bg-raised)', borderTop: '1px solid var(--border-faint)', padding: 'var(--space-16) var(--space-6)' }}>
        <div style={{ maxWidth: 'var(--container-xl)', margin: '0 auto' }}>
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 'var(--space-3)' }}>
              The people
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, letterSpacing: '-1px' }}>Built by diaspora, for diaspora</h2>
          </div>

          <div className="about-team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {TEAM.map((p, i) => (
              <TeamCard key={p.name} person={p} i={i} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ textAlign: 'center', padding: 'var(--space-20) var(--space-6)', maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: 'var(--space-4)', lineHeight: 1.15 }}>
          Ready to find something from home?
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: 'var(--space-8)', lineHeight: 1.6 }}>
          Tell haat AI what you are looking for. It understands the nuance.
        </p>
        <Link
          to="/chat"
          className="fx-glow-button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--brand-saffron)',
            color: '#fff',
            borderRadius: 'var(--radius-full)',
            padding: '14px 32px',
            fontSize: '15px',
            fontWeight: 700,
            textDecoration: 'none',
            transition: 'opacity 150ms ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '0.88'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = '1'
          }}
        >
          Start chatting with haat
        </Link>
      </section>
    </div>
  )
}
