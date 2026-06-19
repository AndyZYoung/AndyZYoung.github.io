import { useEffect, useRef } from 'react'
import { useLenis, scrollToId } from '../hooks/useLenis'
import { useActiveSection } from '../hooks/useActiveSection'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { Reveal } from '../components/Reveal'
import { YouTube } from '../components/YouTube'
import { LinkedInIcon, HandshakeIcon, GitHubIcon, ArrowIcon, DocIcon, DownloadIcon } from '../components/Icons'
import { profile, about, education, anomaly, previewNav } from '../content/data'
import s from './V5Kinetic.module.css'

// Word-by-word fill on scroll, the heyparker.ai signature move.
function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const words = el.querySelectorAll('span')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.4,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 75%', end: 'bottom 55%', scrub: 0.5 },
        },
      )
    })
    return () => ctx.revert()
  }, [text])
  return (
    <p ref={ref} className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i}>{w} </span>
      ))}
    </p>
  )
}

export default function V5Kinetic() {
  useLenis()
  const active = useActiveSection(previewNav.map((n) => n.id))

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [])

  return (
    <div className={s.root}>
      <aside className={s.nav}>
        <button className={s.brand} onClick={() => scrollToId('home')}>Yang Zhang</button>
        <nav className={s.navList}>
          {previewNav.map((n) => (
            <button
              key={n.id}
              className={`${s.navItem} ${active === n.id ? s.navActive : ''}`}
              onClick={() => scrollToId(n.id)}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <div className={s.navFoot}>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon size={16} /></a>
          <a href={profile.links.handshake} target="_blank" rel="noreferrer" aria-label="Handshake"><HandshakeIcon size={16} /></a>
          <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon size={16} /></a>
        </div>
      </aside>

      <main className={s.main}>
        <section id="home" className={s.hero}>
          <Reveal className={s.heroKicker}>{profile.disciplines.join('  /  ')}</Reveal>
          <h1 className={s.heroTitle}>
            <Reveal as="span" className={s.tline} delay={0.05}>Yang Zhang</Reveal>
          </h1>
          <Reveal className={s.heroHeadline} delay={0.15}>
            M.S. in Quantitative Finance &amp; Risk Management @ University of Michigan. B.Eng. in Data Science and Big
            Data Technology.
          </Reveal>
          <Reveal className={s.heroActions} delay={0.25}>
            <a className={s.btnPrimary} href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowIcon size={15} /></a>
            <a className={s.btnLine} href={profile.links.handshake} target="_blank" rel="noreferrer">Handshake <ArrowIcon size={15} /></a>
            <a className={s.btnLine} href={profile.resumePreview} target="_blank" rel="noreferrer"><DocIcon size={15} /> Preview resume</a>
            <a className={s.btnLine} href={profile.resumeDownload} download><DownloadIcon size={15} /> Download</a>
          </Reveal>
        </section>

        <section className={s.statement}>
          <ScrollWords
            className={s.statementText}
            text="I build AI agents and LLM applications, and I work where data science meets quantitative finance - turning research methods into systems people can actually use."
          />
        </section>

        <section id="about" className={s.about}>
          <Reveal className={s.tag}>About</Reveal>
          <div className={s.aboutGrid}>
            <div className={s.bio}>
              {about.summary.map((p, i) => (
                <Reveal as="p" key={i} delay={i * 0.05} className={s.bioP}>{p}</Reveal>
              ))}
            </div>
            <div className={s.edu}>
              {education.map((e) => (
                <Reveal key={e.school} className={s.eduCard}>
                  <div className={s.eduHead}>
                    <h3>{e.school}</h3>
                    <span>{e.period}</span>
                  </div>
                  <p className={s.eduDegree}>{e.degree}{e.detail ? ` · ${e.detail}` : ''}</p>
                  <span className={s.coursesLabel}>{e.coursesLabel}</span>
                  <ul className={s.courses}>{e.courses.map((c) => <li key={c}>{c}</li>)}</ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="anomaly" className={s.work}>
          <Reveal className={s.tag}>{anomaly.kind}</Reveal>
          <Reveal as="h2" className={s.workTitle}>{anomaly.title}</Reveal>
          <ScrollWords className={s.workBlurb} text={anomaly.blurb} />
          <div className={s.steps}>
            {['Extract 32 segment features', 'Rank anomalous segments (MIL)', 'Localize back onto the timeline'].map((step, i) => (
              <Reveal key={step} delay={i * 0.06} className={s.step}>
                <span className={s.stepNo}>0{i + 1}</span>
                <span>{step}</span>
              </Reveal>
            ))}
          </div>
          <div className={s.workBody}>
            <Reveal className={s.media}>
              <YouTube id={anomaly.media!.src} title={anomaly.title} accent="#3b2fe0" />
              <div className={s.mediaLinks}>
                {anomaly.links?.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label} <ArrowIcon size={13} /></a>
                ))}
              </div>
            </Reveal>
            <div className={s.workText}>
              {anomaly.body.map((p, i) => (
                <Reveal as="p" key={i} delay={i * 0.04} className={s.workP}>{p}</Reveal>
              ))}
              <Reveal className={s.figure}>
                <img src={anomaly.figure!.src} alt={anomaly.figure!.alt} />
                <span className={s.figureCap}>{anomaly.figure!.caption}</span>
              </Reveal>
              <Reveal className={s.stack}>{anomaly.stack.map((t) => <span key={t}>{t}</span>)}</Reveal>
            </div>
          </div>
        </section>

        <footer id="contact" className={s.footer}>
          <ScrollWords className={s.footerTitle} text="Let's build something worth shipping." />
          <Reveal className={s.footerLinks}>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer"><LinkedInIcon size={18} /> LinkedIn</a>
            <a href={profile.links.handshake} target="_blank" rel="noreferrer"><HandshakeIcon size={18} /> Handshake</a>
            <a href={profile.links.github} target="_blank" rel="noreferrer"><GitHubIcon size={18} /> GitHub</a>
          </Reveal>
          <span className={s.footerEmail}>{profile.email}</span>
        </footer>
      </main>
    </div>
  )
}
