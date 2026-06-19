import { useEffect, useRef } from 'react'
import { useLenis, scrollToId } from '../hooks/useLenis'
import { useActiveSection } from '../hooks/useActiveSection'
import { Reveal } from '../components/Reveal'
import { YouTube } from '../components/YouTube'
import { LinkedInIcon, HandshakeIcon, GitHubIcon, ArrowIcon, DocIcon, DownloadIcon } from '../components/Icons'
import { profile, about, education, anomaly, previewNav } from '../content/data'
import s from './V8Monochrome.module.css'

export default function V8Monochrome() {
  useLenis()
  const active = useActiveSection(previewNav.map((n) => n.id))
  const cursor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = cursor.current
    if (!dot) return
    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let cx = mx
    let cy = my
    let raf = 0
    let big = false

    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      const t = e.target as HTMLElement
      big = !!t.closest('[data-cursor]')
    }
    const loop = () => {
      cx += (mx - cx) * 0.18
      cy += (my - cy) * 0.18
      const scale = big ? 2.6 : 1
      dot.style.transform = `translate3d(${cx - 9}px, ${cy - 9}px, 0) scale(${scale})`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className={s.root}>
      <div className={s.cursor} ref={cursor} aria-hidden />

      <aside className={s.nav}>
        <button className={s.brand} onClick={() => scrollToId('home')} data-cursor>YZ</button>
        <nav className={s.navList}>
          {previewNav.map((n, i) => (
            <button
              key={n.id}
              className={`${s.navItem} ${active === n.id ? s.navActive : ''}`}
              onClick={() => scrollToId(n.id)}
              data-cursor
            >
              <span className={s.navIdx}>0{i + 1}</span>{n.label}
            </button>
          ))}
        </nav>
        <div className={s.navFoot}>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" data-cursor><LinkedInIcon size={16} /></a>
          <a href={profile.links.handshake} target="_blank" rel="noreferrer" aria-label="Handshake" data-cursor><HandshakeIcon size={16} /></a>
          <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" data-cursor><GitHubIcon size={16} /></a>
        </div>
      </aside>

      <main className={s.main}>
        <section id="home" className={s.hero}>
          <Reveal className={s.heroKicker}>{profile.disciplines.join('  —  ')}</Reveal>
          <h1 className={s.heroTitle}>
            <Reveal as="span" className={s.l} delay={0.05}>YANG</Reveal>
            <Reveal as="span" className={s.lOutline} delay={0.12}>ZHANG</Reveal>
          </h1>
          <Reveal className={s.heroHeadline} delay={0.2}>
            M.S. in Quantitative Finance &amp; Risk Management @ University of Michigan — B.Eng. in Data Science and Big
            Data Technology
          </Reveal>
          <Reveal className={s.heroActions} delay={0.3}>
            <a className={s.btnPrimary} href={profile.links.linkedin} target="_blank" rel="noreferrer" data-cursor>LinkedIn <ArrowIcon size={15} /></a>
            <a className={s.btnLine} href={profile.links.handshake} target="_blank" rel="noreferrer" data-cursor>Handshake</a>
            <a className={s.btnLine} href={profile.resumePreview} target="_blank" rel="noreferrer" data-cursor><DocIcon size={14} /> Preview resume</a>
            <a className={s.btnLine} href={profile.resumeDownload} download data-cursor><DownloadIcon size={14} /> Download</a>
          </Reveal>
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
                  <div className={s.eduHead}><h3>{e.school}</h3><span>{e.period}</span></div>
                  <p className={s.eduDegree}>{e.degree}{e.detail ? ` / ${e.detail}` : ''}</p>
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
          <Reveal as="p" className={s.workBlurb}>{anomaly.blurb}</Reveal>
          <div className={s.workBody}>
            <Reveal className={s.media}>
              <div data-cursor>
                <YouTube id={anomaly.media!.src} title={anomaly.title} accent="#fff" />
              </div>
              <div className={s.mediaLinks}>
                {anomaly.links?.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer" data-cursor>{l.label} <ArrowIcon size={13} /></a>
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
          <Reveal as="h2" className={s.footerTitle}>GET<br />IN TOUCH</Reveal>
          <Reveal className={s.footerLinks}>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" data-cursor><LinkedInIcon size={18} /> LinkedIn</a>
            <a href={profile.links.handshake} target="_blank" rel="noreferrer" data-cursor><HandshakeIcon size={18} /> Handshake</a>
            <a href={profile.links.github} target="_blank" rel="noreferrer" data-cursor><GitHubIcon size={18} /> GitHub</a>
          </Reveal>
          <span className={s.footerEmail}>{profile.email}</span>
        </footer>
      </main>
    </div>
  )
}
