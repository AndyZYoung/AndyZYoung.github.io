import { useEffect, useRef, useState } from 'react'
import { useLenis, scrollToId } from '../hooks/useLenis'
import { useActiveSection } from '../hooks/useActiveSection'
import { YouTube } from '../components/YouTube'
import { ArrowIcon } from '../components/Icons'
import { profile, about, education, anomaly, previewNav } from '../content/data'
import s from './V3IndustrialTerminal.module.css'

const CHARS = '!<>-_\\/[]{}=+*^?#________'

// Decrypt-on-view scramble for headings.
function Scramble({ text, className, tag = 'span' }: { text: string; className?: string; tag?: 'span' | 'h1' | 'h2' }) {
  const ref = useRef<HTMLElement>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !done) {
          setDone(true)
          let frame = 0
          const queue = text.split('').map((to) => ({
            to,
            start: Math.floor(Math.random() * 20),
            end: Math.floor(Math.random() * 20) + 20,
          }))
          const tick = () => {
            let out = ''
            let complete = 0
            for (const q of queue) {
              if (frame >= q.end) {
                complete++
                out += q.to
              } else if (frame >= q.start) {
                out += CHARS[Math.floor(Math.random() * CHARS.length)]
              } else {
                out += ''
              }
            }
            el.textContent = out
            if (complete < queue.length) {
              frame++
              requestAnimationFrame(tick)
            }
          }
          tick()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [text, done])

  const Tag = tag as 'span'
  return <Tag ref={ref as React.Ref<HTMLSpanElement>} className={className}>{text}</Tag>
}

export default function V3IndustrialTerminal() {
  useLenis()
  const active = useActiveSection(previewNav.map((n) => n.id))

  return (
    <div className={s.root}>
      <div className={s.scan} aria-hidden />

      <aside className={s.nav}>
        <button className={s.brand} onClick={() => scrollToId('home')}>
          ~/yang-zhang<span className={s.cursor}>_</span>
        </button>
        <nav className={s.navList}>
          {previewNav.map((n, i) => (
            <button
              key={n.id}
              className={`${s.navItem} ${active === n.id ? s.navActive : ''}`}
              onClick={() => scrollToId(n.id)}
            >
              <span className={s.navIdx}>{String(i).padStart(2, '0')}</span>
              <span>{n.label}</span>
              {active === n.id && <span className={s.navDot}>●</span>}
            </button>
          ))}
        </nav>
        <div className={s.navStatus}>
          <span>STATUS</span>
          <span className={s.statusOk}>OPEN TO WORK</span>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer">linkedin</a>
          <a href={profile.links.handshake} target="_blank" rel="noreferrer">handshake</a>
          <a href={profile.links.github} target="_blank" rel="noreferrer">github</a>
        </div>
      </aside>

      <main className={s.main}>
        <section id="home" className={s.hero}>
          <div className={s.heroMeta}>
            <span>[ {profile.disciplines.join(' / ')} ]</span>
            <span>{profile.location}</span>
          </div>
          <Scramble tag="h1" className={s.heroTitle} text="YANG ZHANG" />
          <p className={s.heroHeadline}>
            <span className={s.prompt}>&gt;</span> M.S. Quantitative Finance &amp; Risk Management @ University of
            Michigan
            <br />
            <span className={s.prompt}>&gt;</span> B.Eng. Data Science and Big Data Technology
          </p>
          <div className={s.heroActions}>
            <a className={s.btnPrimary} href={profile.links.linkedin} target="_blank" rel="noreferrer">
              ./linkedin
            </a>
            <a className={s.btn} href={profile.links.handshake} target="_blank" rel="noreferrer">./handshake</a>
            <a className={s.btn} href={profile.resumePreview} target="_blank" rel="noreferrer">./preview_resume</a>
            <a className={s.btn} href={profile.resumeDownload} download>./download_resume</a>
          </div>
        </section>

        <section id="about" className={s.about}>
          <div className={s.secHead}>
            <span className={s.secNo}>01</span>
            <Scramble tag="h2" className={s.secTitle} text="ABOUT" />
          </div>
          <div className={s.aboutGrid}>
            <div className={s.bio}>
              {about.summary.map((p, i) => (
                <p key={i} className={s.bioP}>
                  <span className={s.lineNo}>{String(i + 1).padStart(2, '0')}</span>
                  {p}
                </p>
              ))}
            </div>
            <div className={s.edu}>
              {education.map((e) => (
                <div key={e.school} className={s.eduRow}>
                  <div className={s.eduHead}>
                    <h3>{e.school}</h3>
                    <span>{e.period}</span>
                  </div>
                  <p className={s.eduDegree}>{e.degree}{e.detail ? `  //  ${e.detail}` : ''}</p>
                  <span className={s.coursesLabel}>// {e.coursesLabel}</span>
                  <ul className={s.courses}>
                    {e.courses.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="anomaly" className={s.work}>
          <div className={s.secHead}>
            <span className={s.secNo}>02</span>
            <span className={s.kind}>{anomaly.kind}</span>
          </div>
          <Scramble tag="h2" className={s.workTitle} text={anomaly.title} />
          <p className={s.workBlurb}>{anomaly.blurb}</p>
          <div className={s.workBody}>
            <div className={s.workLeft}>
              <div className={s.media}>
                <YouTube id={anomaly.media!.src} title={anomaly.title} accent="#c6ff4a" />
              </div>
              <div className={s.mediaLinks}>
                {anomaly.links?.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label} <ArrowIcon size={12} /></a>
                ))}
              </div>
              <ul className={s.stack}>
                {anomaly.stack.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
            <div className={s.workRight}>
              {anomaly.body.map((p, i) => (
                <p key={i} className={s.workP}>{p}</p>
              ))}
              <figure className={s.figure}>
                <img src={anomaly.figure!.src} alt={anomaly.figure!.alt} />
                <figcaption>FIG.01 — {anomaly.figure!.caption}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <footer id="contact" className={s.footer}>
          <Scramble tag="h2" className={s.footerTitle} text="// CONTACT" />
          <div className={s.footerLinks}>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">[ LinkedIn ]</a>
            <a href={profile.links.handshake} target="_blank" rel="noreferrer">[ Handshake ]</a>
            <a href={profile.links.github} target="_blank" rel="noreferrer">[ GitHub ]</a>
            <a href={`mailto:${profile.email}`}>[ {profile.email} ]</a>
          </div>
        </footer>
      </main>
    </div>
  )
}
