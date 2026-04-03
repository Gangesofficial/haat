/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { searchProducts } from '../lib/api'
import { useReveal } from '../hooks/useReveal'
import './HomePage.css'

const PROMPTS = [
  'Diwali sweets for my parents',
  'Kanjivaram saree for a wedding',
  'Darjeeling tea gift box',
  'Kashmiri dry fruits under 3000',
]

const STATS = [
  { value: '500+', label: 'Local Markets' },
  { value: '40+', label: 'Countries Served' },
  { value: '4.9', label: 'Average Rating' },
  { value: '10k+', label: 'Happy Families' },
]

const CATEGORIES = [
  { slug: 'sweets', label: 'Sweets', image: 'https://source.unsplash.com/900x1200/?indian,sweets,mithai&sig=101' },
  { slug: 'sarees', label: 'Sarees', image: 'https://source.unsplash.com/900x1200/?kanjivaram,saree,indian&sig=102' },
  { slug: 'spices', label: 'Spices', image: 'https://source.unsplash.com/900x1200/?indian,spices,masala&sig=103' },
  { slug: 'handicrafts', label: 'Handicrafts', image: 'https://source.unsplash.com/900x1200/?indian,handicraft,artisan&sig=104' },
]

function fallbackPhoto(seed, width = 900, height = 1200) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`
}

function StatCard({ stat, i }) {
  return (
    <article className="flow-home-stat reveal-child fx-soft-card" style={{ transitionDelay: `${i * 70}ms` }}>
      <p className="flow-home-stat-value">{stat.value}</p>
      <p className="flow-home-stat-label">{stat.label}</p>
    </article>
  )
}

function CategoryCard({ item, i, onOpen }) {
  const backup = fallbackPhoto(`home-cat-${item.slug}`)
  const [src, setSrc] = useState(item.image)

  return (
    <button
      type="button"
      className="flow-home-category reveal-child fx-soft-card"
      style={{ transitionDelay: `${i * 70}ms` }}
      onClick={() => onOpen(item.slug)}
      aria-label={`Browse ${item.label}`}
    >
      <img
        src={src}
        alt={item.label}
        onError={e => {
          if (e.currentTarget.dataset.fbApplied === '1') return
          e.currentTarget.dataset.fbApplied = '1'
          setSrc(backup)
        }}
      />
      <div className="flow-home-category-overlay" />
      <div className="flow-home-category-content">
        <p>{item.label}</p>
        <span>Explore</span>
      </div>
    </button>
  )
}

function SkeletonCard() {
  return (
    <div className="flow-home-skeleton-card">
      <div className="skeleton" style={{ aspectRatio: '3/4' }} />
      <div className="flow-home-skeleton-lines">
        <div className="skeleton" style={{ height: '14px', width: '84%', borderRadius: '4px' }} />
        <div className="skeleton" style={{ height: '12px', width: '60%', borderRadius: '4px' }} />
        <div className="skeleton" style={{ height: '34px', width: '100%', borderRadius: '8px', marginTop: '8px' }} />
      </div>
    </div>
  )
}

export default function HomePage() {
  const navigate = useNavigate()
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  const heroRef = useReveal(0.08)
  const statsRef = useReveal(0.15)
  const categoriesRef = useReveal(0.12)
  const featuredRef = useReveal(0.1)
  const finalCtaRef = useReveal(0.1)

  useEffect(() => {
    searchProducts('featured Indian products', null)
      .then(data => setFeatured((data.products ?? []).slice(0, 8)))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flow-home-page">
      <div className="flow-home-top-strip">
        <p>
          Now live on Android - free and unlimited during launch
          {' '}
          <span>Download now</span>
        </p>
      </div>

      <section ref={heroRef} className="flow-home-hero">
        <div className="flow-home-orb flow-home-orb-a" aria-hidden="true" />
        <div className="flow-home-orb flow-home-orb-b" aria-hidden="true" />

        <svg className="flow-home-ring" viewBox="0 0 420 420" aria-hidden="true">
          <defs>
            <path id="flow-home-circle-path" d="M210,210 m-156,0 a156,156 0 1,1 312,0 a156,156 0 1,1 -312,0" />
          </defs>
          <text>
            <textPath href="#flow-home-circle-path">voice commerce - natural language shopping - culturally fluent AI -</textPath>
          </text>
        </svg>

        <div className="flow-home-ribbon" aria-hidden="true">
          <span>"best kaju katli for diwali in london" • "kanjivaram under 10k" •</span>
        </div>

        <div className="flow-home-hero-inner">
          <p className="flow-home-pill reveal-child">
            <span className="flow-home-pill-dot" />
            {' '}
            AI shopping assistant
          </p>

          <h1 className="flow-home-title reveal-child">
            <span className="flow-home-title-soft">Do not search,</span>{' '}
            <span className="flow-home-title-strong">just speak</span>
          </h1>

          <p className="flow-home-subtitle reveal-child">
            The voice-to-text shopping AI that turns your request into clear, trustworthy Indian product picks in every app.
          </p>

          <div className="flow-home-cta reveal-child">
            <Link to="/chat" className="flow-home-btn flow-home-btn-primary fx-glow-button">
              Start with haat AI
            </Link>
            <Link to="/search" className="flow-home-btn flow-home-btn-secondary fx-glow-button">
              Browse products
            </Link>
          </div>

          <p className="flow-home-availability reveal-child">Available for families across Mac, Windows, iPhone, and Android workflows</p>

          <div className="flow-home-prompt-list reveal-child">
            {PROMPTS.map(prompt => (
              <button
                key={prompt}
                type="button"
                onClick={() => navigate(`/chat?q=${encodeURIComponent(prompt)}`)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section ref={statsRef} className="flow-home-stats-wrap">
        <div className="flow-home-stats-grid">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} i={i} />
          ))}
        </div>
      </section>

      <section ref={categoriesRef} className="flow-home-categories-wrap">
        <div className="flow-home-section-head reveal-child">
          <p>Shop by category</p>
          <h2>Everything India makes.</h2>
        </div>

        <div className="flow-home-categories-grid">
          {CATEGORIES.map((item, i) => (
            <CategoryCard key={item.slug} item={item} i={i} onOpen={slug => navigate(`/search?category=${slug}`)} />
          ))}
        </div>
      </section>

      <section ref={featuredRef} className="flow-home-featured-wrap">
        <div className="flow-home-section-head reveal-child">
          <p>Featured now</p>
          <h2>Picked by AI, loved by families.</h2>
        </div>

        <div className="flow-home-products-grid">
          {loading
            ? Array.from({ length: 8 }, (_, i) => <SkeletonCard key={i} />)
            : featured.map((product, index) => (
                <div key={product.id} className="reveal-child" style={{ transitionDelay: `${index * 60}ms` }}>
                  <ProductCard product={product} index={index} />
                </div>
              ))}
        </div>
      </section>

      <section ref={finalCtaRef} className="flow-home-final-cta-wrap">
        <div className="flow-home-final-cta reveal-child fx-soft-card">
          <h2>Bring home closer in one prompt.</h2>
          <p>Tell haat what you need, in your own words. We will do the market work for you.</p>
          <Link to="/chat" className="flow-home-btn flow-home-btn-primary fx-glow-button">
            Start chatting
          </Link>
        </div>
      </section>
    </div>
  )
}
