import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import BrandMark from './BrandMark'

const NAV_LINKS = [
  { label: 'Markets',  path: '/markets' },
  { label: 'About',    path: '/about' },
]

function useScrollY() {
  const [y, setY] = useState(0)
  useEffect(() => {
    const handler = () => setY(window.scrollY)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return y
}

export default function Nav() {
  const { count } = useCart()
  const { user, logout } = useAuth()
  const { theme, resolvedTheme, setTheme } = useTheme()
  const location   = useLocation()
  const navigate   = useNavigate()
  const scrollY    = useScrollY()
  const [menuOpen, setMenuOpen]     = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery]           = useState('')
  const [avatarOpen, setAvatarOpen] = useState(false)
  const searchRef = useRef(null)
  const avatarRef = useRef(null)
  const isLight = resolvedTheme === 'light'

  const scrolled = scrollY > 8

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // Focus search input when overlay opens
  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  // Close search on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') { setSearchOpen(false); setAvatarOpen(false) } }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Close avatar dropdown on outside click
  useEffect(() => {
    if (!avatarOpen) return
    const handler = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) setAvatarOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [avatarOpen])

  const dropItemStyle = {
    display: 'block',
    width: '100%',
    padding: '9px 12px',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 400,
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background 0.12s ease',
  }

  function handleSearchSubmit(e) {
    e.preventDefault()
    if (!query.trim()) return
    setSearchOpen(false)
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    setQuery('')
  }

  function cycleTheme() {
    const order = ['dark', 'light', 'system']
    const next = order[(order.indexOf(theme) + 1) % order.length]
    setTheme(next)
  }

  // Icon shown in nav button reflects the NEXT state (so user knows what clicking will do)
  function ThemeIcon() {
    if (theme === 'dark') return (
      // Sun — click to go light
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/>
        <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
        <line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>
        <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
      </svg>
    )
    if (theme === 'light') return (
      // Moon — click to go system
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    )
    // System — click to go dark
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    )
  }

  return (
    <>
      <nav
        className="main-nav"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          background: isLight
            ? (scrolled
              ? 'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(245,246,249,0.92) 100%)'
              : 'linear-gradient(180deg, rgba(255,255,255,0.86) 0%, rgba(245,246,249,0.74) 100%)')
            : (scrolled
              ? 'linear-gradient(180deg, rgba(12,14,18,0.95) 0%, rgba(16,20,29,0.88) 100%)'
              : 'linear-gradient(180deg, rgba(12,14,18,0.80) 0%, rgba(16,20,29,0.62) 100%)'),
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? (isLight ? '1px solid rgba(0,0,0,0.10)' : '1px solid rgba(255,255,255,0.08)')
            : '1px solid transparent',
          boxShadow: scrolled
            ? (isLight ? '0 8px 24px rgba(0,0,0,0.08)' : '0 10px 30px rgba(0,0,0,0.25)')
            : 'none',
          transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '1px',
            background: isLight
              ? 'linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.40) 45%, rgba(217,119,6,0.34) 55%, transparent 100%)'
              : 'linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.55) 45%, rgba(217,119,6,0.45) 55%, transparent 100%)',
            opacity: scrolled ? 0.9 : 0.55,
            pointerEvents: 'none',
          }}
        />

        <div className="nav-inner" style={{ width: '100%', maxWidth: '1320px', margin: '0 auto', display: 'flex', alignItems: 'center', position: 'relative' }}>
          {/* ── LEFT: Wordmark ─────────────────────────── */}
          <Link
            to="/"
            className="nav-brand"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexShrink: 0,
            }}
          >
            <BrandMark size="md" light />
            <span className="nav-brand-tag" style={{
              fontSize: '10px',
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              color: isLight ? 'rgba(0,0,0,0.52)' : 'rgba(255,255,255,0.58)',
              border: isLight ? '1px solid rgba(0,0,0,0.12)' : '1px solid rgba(255,255,255,0.14)',
              borderRadius: '999px',
              padding: '4px 8px',
              background: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
            }}>
              Indian Marketplace
            </span>
          </Link>

        {/* ── CENTER: Nav links (desktop only) ─────── */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '6px',
              background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)',
              border: isLight ? '1px solid rgba(0,0,0,0.10)' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: '999px',
              padding: '4px',
              boxShadow: isLight ? 'inset 0 1px 0 rgba(255,255,255,0.55)' : 'inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
            className="nav-center-links"
          >
          {NAV_LINKS.map(({ label, path }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: active ? 600 : 400,
                  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  background: active
                    ? (isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)')
                    : 'transparent',
                  transition: 'color 0.15s ease, background 0.15s ease, transform 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--text-primary)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }
                }}
              >
                {label}
              </Link>
            )
          })}
          </div>

        {/* ── RIGHT: Icons + CTA ───────────────────── */}
          <div className="nav-right" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Theme toggle */}
          <button
            className="nav-icon-btn nav-theme-btn"
            onClick={cycleTheme}
            aria-label={`Switch theme (current: ${theme})`}
            title={`Theme: ${theme} — click to cycle`}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '8px', borderRadius: '8px',
              color: 'var(--text-secondary)',
              display: 'flex', alignItems: 'center',
              transition: 'color 0.15s ease, background 0.15s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--text-primary)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-secondary)'
              e.currentTarget.style.background = 'none'
            }}
          >
            <ThemeIcon />
          </button>

          {/* Search icon */}
          <button
            className="nav-icon-btn nav-search-btn"
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.15s ease, background 0.15s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--text-primary)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-secondary)'
              e.currentTarget.style.background = 'none'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          {/* Cart icon */}
          <Link
            to="/cart"
            className="nav-icon-btn nav-cart-btn"
            data-cart-icon="true"
            aria-label={`Cart (${count} items)`}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              borderRadius: '8px',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              transition: 'color 0.15s ease, background 0.15s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--text-primary)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-secondary)'
              e.currentTarget.style.background = 'none'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {count > 0 && (
              <span
                data-cart-badge="true"
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'var(--brand-saffron)',
                  color: '#fff',
                  fontSize: '10px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1,
                  border: '1.5px solid var(--bg-base)',
                  transformOrigin: 'center',
                }}
              >
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>

          {/* Chat CTA — desktop only */}
          <Link
            to="/chat"
            className="nav-cta fx-glow-button"
            style={{
              padding: '7px 16px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: 600,
              background: location.pathname === '/chat' ? 'rgba(249,115,22,0.15)' : 'rgba(249,115,22,0.10)',
              border: '1px solid rgba(249,115,22,0.25)',
              color: 'var(--brand-saffron)',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background 0.15s ease, border-color 0.15s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(249,115,22,0.20)'; e.currentTarget.style.borderColor = 'rgba(249,115,22,0.40)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = location.pathname === '/chat' ? 'rgba(249,115,22,0.15)' : 'rgba(249,115,22,0.10)'; e.currentTarget.style.borderColor = 'rgba(249,115,22,0.25)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            ✦ Chat
          </Link>

          {/* Auth controls — desktop only */}
          {user ? (
            /* ── Avatar + dropdown ── */
            <div ref={avatarRef} style={{ position: 'relative' }} className="nav-cta">
              <button
                onClick={() => setAvatarOpen(o => !o)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 10px 5px 5px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.10)',
                  background: avatarOpen ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                }}
              >
                {/* Initials avatar */}
                <span style={{
                  width: '26px', height: '26px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--brand-saffron) 0%, var(--brand-gold) 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 700, color: '#fff', flexShrink: 0,
                }}>
                  {(user.name ?? user.email ?? '?')[0].toUpperCase()}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.name?.split(' ')[0] ?? user.email}
                </span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: avatarOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              {/* Dropdown */}
              {avatarOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                  width: '200px',
                  background: isLight ? 'rgba(250,250,252,0.98)' : 'rgba(18,18,18,0.98)',
                  border: isLight ? '1px solid rgba(0,0,0,0.10)' : '1px solid rgba(255,255,255,0.10)',
                  borderRadius: '12px',
                  boxShadow: isLight ? '0 14px 28px rgba(0,0,0,0.12)' : '0 16px 40px rgba(0,0,0,0.5)',
                  overflow: 'hidden',
                  animation: 'fadeUp 150ms ease both',
                }}>
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{user.name ?? 'You'}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--text-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
                  </div>
                  <div style={{ padding: '6px' }}>
                    <button
                      onClick={() => { setAvatarOpen(false); navigate('/chat') }}
                      style={dropItemStyle}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      💬  Chat with haat
                    </button>
                    <button
                      onClick={() => { setAvatarOpen(false); navigate('/settings') }}
                      style={dropItemStyle}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      ✦  Settings
                    </button>
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />
                    <button
                      onClick={() => { logout(); setAvatarOpen(false) }}
                      style={{ ...dropItemStyle, color: 'rgba(239,68,68,0.85)' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ── Login / Sign up ── */
            <>
              <Link
                to="/login"
                className="nav-cta"
                style={{
                  padding: '7px 14px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="nav-cta fx-glow-button"
                style={{
                  padding: '7px 16px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  background: 'var(--brand-saffron)',
                  color: '#fff',
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                  transition: 'opacity 0.15s ease, transform 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Sign up
              </Link>
            </>
          )}

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="nav-hamburger"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              color: 'var(--text-secondary)',
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '1.5px',
                background: 'currentColor',
                transition: 'transform 0.25s ease, opacity 0.25s ease',
                transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '1.5px',
                background: 'currentColor',
                transition: 'opacity 0.25s ease',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '1.5px',
                background: 'currentColor',
                transition: 'transform 0.25s ease, opacity 0.25s ease',
                transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile menu ──────────────────────────────── */}
      <div
        className="nav-mobile-menu"
        style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          zIndex: 99,
          background: isLight ? 'rgba(247,248,252,0.97)' : 'rgba(14,17,24,0.96)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: isLight ? '1px solid rgba(0,0,0,0.10)' : '1px solid rgba(255,255,255,0.06)',
          padding: menuOpen ? '16px 24px 24px' : '0 24px',
          maxHeight: menuOpen ? '380px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease, padding 0.3s ease',
          display: 'none',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 6px 10px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '4px' }}>
            <BrandMark size="sm" light />
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Menu</span>
          </div>
          <Link
            to="/chat"
            style={{
              padding: '12px 8px', fontSize: '16px', fontWeight: 600,
              color: 'var(--brand-saffron)', textDecoration: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            ✦ Chat with haat
          </Link>
          {NAV_LINKS.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              style={{
                padding: '12px 8px', fontSize: '16px', fontWeight: 500,
                color: location.pathname === path ? 'var(--brand-saffron)' : 'var(--text-primary)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              {label}
            </Link>
          ))}
          {user ? (
            <>
              <button
                onClick={() => { navigate('/chat'); setMenuOpen(false) }}
                style={{ marginTop: '12px', padding: '12px 16px', borderRadius: '999px', fontSize: '14px', fontWeight: 600, background: 'var(--brand-saffron)', color: '#fff', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'center' }}
              >
                💬 Chat with haat
              </button>
              <button
                onClick={() => { logout(); setMenuOpen(false) }}
                style={{ marginTop: '8px', padding: '12px 16px', borderRadius: '999px', fontSize: '14px', fontWeight: 500, background: 'rgba(239,68,68,0.12)', color: 'rgba(239,68,68,0.85)', border: '1px solid rgba(239,68,68,0.20)', cursor: 'pointer', width: '100%', textAlign: 'center' }}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{ marginTop: '12px', padding: '12px 16px', borderRadius: '999px', fontSize: '14px', fontWeight: 500, background: 'rgba(255,255,255,0.06)', color: 'var(--text-primary)', textDecoration: 'none', textAlign: 'center', display: 'block', border: '1px solid rgba(255,255,255,0.10)' }}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="fx-glow-button"
                style={{ marginTop: '8px', padding: '12px 16px', borderRadius: '999px', fontSize: '14px', fontWeight: 600, background: 'var(--brand-saffron)', color: '#fff', textDecoration: 'none', textAlign: 'center', display: 'block' }}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ── Search overlay ───────────────────────────── */}
      {searchOpen && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false) }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: isLight ? 'rgba(12,16,24,0.36)' : 'rgba(6,10,16,0.74)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '80px',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '560px',
              margin: '0 16px',
              background: isLight ? 'rgba(255,255,255,0.98)' : 'rgba(18,22,32,0.98)',
              border: isLight ? '1px solid rgba(0,0,0,0.10)' : '1px solid rgba(255,255,255,0.10)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: isLight ? '0 16px 42px rgba(0,0,0,0.18)' : '0 24px 80px rgba(0,0,0,0.6)',
            }}
          >
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                ref={searchRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search Indian markets… try 'silk saree for Diwali'"
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  fontSize: '16px',
                  color: 'var(--text-primary)',
                  caretColor: 'var(--brand-saffron)',
                }}
              />
              <kbd
                style={{
                  padding: '3px 7px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.3)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.04)',
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                }}
                onClick={() => setSearchOpen(false)}
              >
                ESC
              </kbd>
            </form>
            <div style={{ padding: '8px 20px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
                Try: "Kanjivaram saree", "Diwali sweets under ₹500", "Kashmiri handicrafts"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Responsive styles ────────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .main-nav {
            height: 56px !important;
            padding: 0 12px !important;
          }
          .nav-right {
            gap: 3px !important;
          }
          .nav-icon-btn {
            padding: 7px !important;
          }
          .nav-theme-btn {
            display: none !important;
          }
          .nav-brand {
            transform: scale(0.95);
            transform-origin: left center;
          }
          .nav-brand-tag {
            display: none !important;
          }
          .nav-center-links { display: none !important; }
          .nav-cta          { display: none !important; }
          .nav-hamburger    { display: flex !important; }
          .nav-mobile-menu  { display: block !important; top: 56px !important; }
        }
        @media (max-width: 980px) {
          .nav-brand-tag {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}
