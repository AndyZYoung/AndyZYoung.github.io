import { useLenis, scrollToId } from '../hooks/useLenis'
import { useActiveSection } from '../hooks/useActiveSection'
import { Reveal } from '../components/Reveal'
import { YouTube } from '../components/YouTube'
import { LinkedInIcon, HandshakeIcon, GitHubIcon, ArrowIcon, DocIcon, DownloadIcon } from '../components/Icons'
import { profile, about, education, anomaly, previewNav } from '../content/data'
import s from './V2SwissGrid.module.css'

export default function V2SwissGrid() {
  useLenis()
  const active = useActiveSection(previewNav.map((n) => n.id))

  return (
    <div className={s.root}>
      <div className={s.gridlines} aria-hidden>
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      <aside className={s.nav}>
        <button className={s.brand} onClick={() => scrollToId('home')}>
          Yang Zhang<sup>®</sup>
        </button>
        <nav className={s.navList}>
          {previewNav.map((n, i) => (
            <button
              key={n.id}
              className={`${s.navItem} ${active === n.id ? s.navActive : ''}`}
              onClick={() => scrollToId(n.id)}
            >
              <span className={s.navFolio}>{String(i + 1).padStart(2, '0')}</span>
              <span>{n.label}</span>
            </button>
          ))}
        </nav>
        <div className={s.navMeta}>
          <span>{profile.location}</span>
          <div className={s.navSocials}>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">Li</a>
            <a href={profile.links.handshake} target="_blank" rel="noreferrer">Hs</a>
            <a href={profile.links.github} target="_blank" rel="noreferrer">Gh</a>
          </div>
        </div>
      </aside>

      <main className={s.main}>
        <section id="home" className={s.hero}>
          <div className={s.heroTop}>
            <span className={s.folioLarge}>01</span>
            <span className={s.heroDisc}>{profile.disciplines.join(' / ')}</span>
          </div>
          <h1 className={s.heroTitle}>
            Yang<br />Zhang
          </h1>
          <div className={s.heroBottom}>
            <p className={s.heroHeadline}>
              M.S. Quantitative Finance &amp; Risk Management, University of Michigan. B.Eng. Data Science and Big Data
              Technology.
            </p>
            <div className={s.heroActions}>
              <a className={s.btnPrimary} href={profile.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <ArrowIcon size={14} />
              </a>
              <a className={s.btnLine} href={profile.links.handshake} target="_blank" rel="noreferrer">
                Handshake <ArrowIcon size={14} />
              </a>
              <a className={s.btnLine} href={profile.resumePreview} target="_blank" rel="noreferrer">
                <DocIcon size={14} /> Preview resume
              </a>
              <a className={s.btnLine} href={profile.resumeDownload} download>
                <DownloadIcon size={14} /> Download
              </a>
            </div>
          </div>
        </section>

        <section id="about" className={s.about}>
          <div className={s.rowHead}>
            <span className={s.folioLarge}>02</span>
            <span className={s.tag}>About</span>
          </div>
          <div className={s.aboutGrid}>
            <div className={s.bio}>
              {about.summary.map((p, i) => (
                <Reveal as="p" key={i} delay={i * 0.05} className={s.bioP}>{p}</Reveal>
              ))}
            </div>
            <div className={s.edu}>
              {education.map((e, idx) => (
                <Reveal key={e.school} delay={idx * 0.05} className={s.eduRow}>
                  <div className={s.eduHead}>
                    <h3>{e.school}</h3>
                    <span>{e.period}</span>
                  </div>
                  <p className={s.eduDegree}>
                    {e.degree}{e.detail ? `  -  ${e.detail}` : ''}
                  </p>
                  <span className={s.coursesLabel}>{e.coursesLabel}</span>
                  <ul className={s.courses}>
                    {e.courses.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="anomaly" className={s.work}>
          <div className={s.rowHead}>
            <span className={s.folioLarge}>03</span>
            <span className={s.tag}>{anomaly.kind}</span>
          </div>
          <Reveal as="h2" className={s.workTitle}>{anomaly.title}</Reveal>
          <Reveal as="p" className={s.workBlurb}>{anomaly.blurb}</Reveal>
          <div className={s.workBody}>
            <div className={s.workLeft}>
              <Reveal className={s.media}>
                <YouTube id={anomaly.media!.src} title={anomaly.title} accent="#ff4f00" />
              </Reveal>
              <div className={s.mediaLinks}>
                {anomaly.links?.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label} <ArrowIcon size={13} /></a>
                ))}
              </div>
              <Reveal className={s.stack}>
                {anomaly.stack.map((t) => <span key={t}>{t}</span>)}
              </Reveal>
            </div>
            <div className={s.workRight}>
              {anomaly.body.map((p, i) => (
                <Reveal as="p" key={i} delay={i * 0.04} className={s.workP}>{p}</Reveal>
              ))}
              <Reveal className={s.figure}>
                <img src={anomaly.figure!.src} alt={anomaly.figure!.alt} />
                <span className={s.figureCap}>Fig. 01 — {anomaly.figure!.caption}</span>
              </Reveal>
            </div>
          </div>
        </section>

        <footer id="contact" className={s.footer}>
          <span className={s.folioLarge}>04</span>
          <h2 className={s.footerTitle}>Contact</h2>
          <div className={s.footerLinks}>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer"><LinkedInIcon size={18} /> LinkedIn</a>
            <a href={profile.links.handshake} target="_blank" rel="noreferrer"><HandshakeIcon size={18} /> Handshake</a>
            <a href={profile.links.github} target="_blank" rel="noreferrer"><GitHubIcon size={18} /> GitHub</a>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
        </footer>
      </main>
    </div>
  )
}
