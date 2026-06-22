import { useEffect, useRef } from 'react'
import { useLenis, scrollToId } from '../hooks/useLenis'
import { useActiveSection } from '../hooks/useActiveSection'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { Reveal } from '../components/Reveal'
import { YouTube } from '../components/YouTube'
import { LinkedInIcon, HandshakeIcon, GitHubIcon, ArrowIcon, DocIcon, DownloadIcon } from '../components/Icons'
import { profile, about, education, anomaly, previewNav, previewProjectIndex } from '../content/data'
import s from './V1EditorialNoir.module.css'

export default function V1EditorialNoir() {
  useLenis()
  const active = useActiveSection(previewNav.map((n) => n.id))
  const counterRef = useRef<HTMLSpanElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Equator-style scroll counter: 00 -> 99 across the page.
      gsap.to(counterRef.current, {
        textContent: 99,
        ease: 'none',
        snap: { textContent: 1 },
        scrollTrigger: { start: 0, end: 'max', scrub: 0.4 },
        onUpdate() {
          if (counterRef.current) {
            const v = Math.round(Number(counterRef.current.textContent))
            counterRef.current.textContent = String(v).padStart(2, '0')
          }
        },
      })
    }, rootRef)
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  return (
    <div className={s.root} ref={rootRef}>
      <div className={s.grain} aria-hidden />

      <aside className={s.nav}>
        <button className={s.brand} onClick={() => scrollToId('home')}>
          YZ
        </button>
        <nav className={s.navList}>
          {previewNav.map((n, i) => (
            <button
              key={n.id}
              className={`${s.navItem} ${active === n.id ? s.navActive : ''}`}
              onClick={() => scrollToId(n.id)}
            >
              <span className={s.navIndex}>{String(i + 1).padStart(2, '0')}</span>
              {n.label}
            </button>
          ))}
        </nav>
        <div className={s.navFoot}>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedInIcon size={16} />
          </a>
          <a href={profile.links.handshake} target="_blank" rel="noreferrer" aria-label="Handshake">
            <HandshakeIcon size={16} />
          </a>
          <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHubIcon size={16} />
          </a>
        </div>
      </aside>

      <div className={s.counter}>
        <span className={s.counterLabel}>Scroll to explore</span>
        <span ref={counterRef}>00</span>
      </div>

      <main className={s.main}>
        <section id="home" className={s.hero}>
          <Reveal as="div" className={s.heroKicker} y={16}>
            {profile.disciplines.join('  -  ')}
          </Reveal>
          <h1 className={s.heroTitle}>
            <Reveal as="span" className={s.line} delay={0.05}>Yang</Reveal>
            <Reveal as="span" className={s.line} delay={0.13}>Zhang</Reveal>
          </h1>
          <Reveal className={s.heroHeadline} delay={0.2}>
            M.S. in Quantitative Finance &amp; Risk Management <span className={s.at}>@</span> University of Michigan
            <br />
            B.Eng. in Data Science and Big Data Technology
          </Reveal>
          <Reveal className={s.heroActions} delay={0.3}>
            <a className={s.btnPrimary} href={profile.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <ArrowIcon size={15} />
            </a>
            <a className={s.btnGhost} href={profile.links.handshake} target="_blank" rel="noreferrer">
              Handshake <ArrowIcon size={15} />
            </a>
            <a className={s.btnGhost} href={profile.resumePreview} target="_blank" rel="noreferrer">
              <DocIcon size={15} /> Preview resume
            </a>
            <a className={s.btnGhost} href={profile.resumeDownload} download>
              <DownloadIcon size={15} /> Download
            </a>
          </Reveal>
        </section>

        <section id="about" className={s.about}>
          <Reveal className={s.sectionTag}>About</Reveal>
          <div className={s.aboutGrid}>
            <div className={s.aboutBio}>
              {about.summary.map((p, i) => (
                <Reveal as="p" key={i} delay={i * 0.05} className={s.bioP}>
                  {p}
                </Reveal>
              ))}
            </div>
            <div className={s.eduCol}>
              {education.map((e) => (
                <Reveal key={e.school} className={s.eduCard}>
                  <div className={s.eduHead}>
                    <h3>{e.school}</h3>
                    <span className={s.eduPeriod}>{e.period}</span>
                  </div>
                  <p className={s.eduDegree}>
                    {e.degree}
                    {e.detail ? <span className={s.eduDetail}> - {e.detail}</span> : null}
                  </p>
                  <span className={s.coursesLabel}>{e.coursesLabel}</span>
                  <ul className={s.courses}>
                    {e.courses.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="anomaly" className={s.work}>
          <div className={s.workHead}>
            <Reveal as="span" className={s.workIndex}>{previewProjectIndex}</Reveal>
            <Reveal as="span" className={s.sectionTag}>{anomaly.kind}</Reveal>
            <Reveal as="h2" className={s.workTitle}>{anomaly.title}</Reveal>
            <Reveal as="p" className={s.workBlurb}>{anomaly.blurb}</Reveal>
          </div>
          <div className={s.workBody}>
            <Reveal className={s.media}>
              <YouTube id={anomaly.media!.src} title={anomaly.title} accent="#f3ede1" />
              <div className={s.mediaLinks}>
                {anomaly.links?.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                    {l.label} <ArrowIcon size={13} />
                  </a>
                ))}
              </div>
            </Reveal>
            <div className={s.workText}>
              {anomaly.body.map((p, i) => (
                <Reveal as="p" key={i} delay={i * 0.04} className={s.workP}>
                  {p}
                </Reveal>
              ))}
              <Reveal className={s.figure}>
                <img src={anomaly.figure!.src} alt={anomaly.figure!.alt} />
                <span className={s.figureCap}>{anomaly.figure!.caption}</span>
              </Reveal>
              <Reveal className={s.stack}>
                {anomaly.stack.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        <footer id="contact" className={s.footer}>
          <Reveal as="h2" className={s.footerTitle}>Let&apos;s build something that endures.</Reveal>
          <Reveal className={s.footerLinks}>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
              <LinkedInIcon size={18} /> LinkedIn
            </a>
            <a href={profile.links.handshake} target="_blank" rel="noreferrer">
              <HandshakeIcon size={18} /> Handshake
            </a>
            <a href={profile.links.github} target="_blank" rel="noreferrer">
              <GitHubIcon size={18} /> GitHub
            </a>
          </Reveal>
          <span className={s.footerEmail}>{profile.email}</span>
        </footer>
      </main>
    </div>
  )
}
