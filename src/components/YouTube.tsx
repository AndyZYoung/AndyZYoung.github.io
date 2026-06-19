import { useState } from 'react'
import { PlayIcon } from './Icons'

type Props = {
  id: string
  title: string
  className?: string
  accent?: string
}

// Lightweight YouTube facade: shows the thumbnail until clicked, then swaps in
// the privacy-friendly embed. Keeps 10 preview pages from each loading an iframe.
export function YouTube({ id, title, className, accent = '#ffffff' }: Props) {
  const [active, setActive] = useState(false)

  if (active) {
    return (
      <div className={className} style={{ position: 'relative', aspectRatio: '16 / 9' }}>
        <iframe
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerated-and-encrypted-media; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className={className}
      aria-label={`Play video: ${title}`}
      style={{
        position: 'relative',
        aspectRatio: '16 / 9',
        width: '100%',
        cursor: 'pointer',
        border: 0,
        padding: 0,
        backgroundColor: '#000',
        backgroundImage: `url(https://i.ytimg.com/vi/${id}/maxresdefault.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.45))',
          transition: 'background 0.3s ease',
        }}
      >
        <span
          style={{
            display: 'grid',
            placeItems: 'center',
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: accent,
            color: '#000',
            boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
          }}
        >
          <PlayIcon size={28} />
        </span>
      </span>
    </button>
  )
}
