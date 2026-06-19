import { Link } from 'react-router-dom'
import { versions } from './versions/registry'
import { profile } from './content/data'
import styles from './App.module.css'

export default function App() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.kicker}>Yang Zhang - Personal Website</div>
        <h1 className={styles.title}>
          Ten directions.<br />Pick the one that feels like you.
        </h1>
        <p className={styles.intro}>
          Each version below is a working preview - left navigation, hero, an About snippet, and the Weakly
          Supervised Video Anomaly Detection project - built with its own palette, type, and scroll motion.
          Open a few, scroll through them, and tell me the number you want. I&apos;ll build the full site in that style.
        </p>
        <div className={styles.meta}>
          <span>{profile.disciplines.join('  /  ')}</span>
        </div>
      </header>

      <div className={styles.grid}>
        {versions.map((v) => (
          <Link key={v.slug} to={`/${v.slug}`} className={styles.card}>
            <div className={styles.preview} style={{ background: v.swatches[0] }}>
              <div className={styles.previewType} style={{ color: v.swatches[1] }}>
                Yang Zhang
              </div>
              <div className={styles.swatches}>
                {v.swatches.map((s, i) => (
                  <span key={i} className={styles.swatch} style={{ background: s }} />
                ))}
              </div>
              <span className={styles.num} style={{ color: v.swatches[1] }}>
                {v.num}
              </span>
              <span className={styles.accentBar} style={{ background: v.swatches[2] }} />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardHead}>
                <h2 className={styles.cardName}>{v.name}</h2>
                <span className={styles.tag}>after {v.inspiration}</span>
              </div>
              <p className={styles.cardTagline}>{v.tagline}</p>
              <span className={styles.open}>Open preview →</span>
            </div>
          </Link>
        ))}
      </div>

      <footer className={styles.footer}>
        <span>Built to deploy at AndyZYoung.github.io</span>
      </footer>
    </main>
  )
}
