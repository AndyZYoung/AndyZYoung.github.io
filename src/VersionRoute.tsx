import { useParams, Link, Navigate } from 'react-router-dom'
import { versionMap, versions } from './versions/registry'
import { ArrowIcon } from './components/Icons'

// Renders a chosen style version full-screen, with a thin floating bar to jump
// back to the gallery or step to the next version.
export function VersionRoute() {
  const { slug } = useParams()
  const meta = slug ? versionMap[slug] : undefined

  if (!meta) return <Navigate to="/" replace />

  const idx = versions.findIndex((v) => v.slug === meta.slug)
  const next = versions[(idx + 1) % versions.length]
  const Component = meta.component

  return (
    <>
      <Component />
      <div
        style={{
          position: 'fixed',
          bottom: 18,
          right: 18,
          zIndex: 9999,
          display: 'flex',
          gap: 8,
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.02em',
        }}
      >
        <Link
          to="/gallery"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '9px 14px',
            borderRadius: 999,
            background: 'rgba(10,10,10,0.85)',
            color: '#fff',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.18)',
          }}
        >
          All styles
        </Link>
        <Link
          to={`/${next.slug}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '9px 14px',
            borderRadius: 999,
            background: '#fff',
            color: '#0a0a0a',
            border: '1px solid rgba(0,0,0,0.1)',
          }}
        >
          {next.num} {next.name}
          <ArrowIcon size={14} />
        </Link>
      </div>
    </>
  )
}
