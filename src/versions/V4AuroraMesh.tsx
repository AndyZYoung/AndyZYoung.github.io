import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLenis, scrollToId } from '../hooks/useLenis'
import { useActiveSection } from '../hooks/useActiveSection'
import { Reveal } from '../components/Reveal'
import { YouTube } from '../components/YouTube'
import { LinkedInIcon, HandshakeIcon, GitHubIcon, ArrowIcon, DocIcon, DownloadIcon } from '../components/Icons'
import { profile, about, education, anomaly, previewNav } from '../content/data'
import s from './V4AuroraMesh.module.css'

export default function V4AuroraMesh() {
  useLenis()
  const active = useActiveSection(previewNav.map((n) => n.id))
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div className={s.root}>
      <div className={s.mesh} aria-hidden />
      <div className={s.noise} aria-hidden />

      <aside className={s.nav}>
        <button className={s.brand} onClick={() => scrollToId('home')}>YZ</button>
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
        <section id="home" className={s.hero} ref={heroRef}>
          <motion.div style={{ y: titleY, opacity: titleOpacity }} className={s.heroInner}>
            <Reveal className={s.heroKicker} blur>{profile.disciplines.join('  ·  ')}</Reveal>
            <h1 className={s.heroTitle}>
              <Reveal as="span" blur delay={0.05} className={s.glow}>Yang</Reveal>
              <Reveal as="span" blur delay={0.12} className={s.glow}>Zhang</Reveal>
            </h1>
            <Reveal className={s.heroHeadline} blur delay={0.2}>
              M.S. in Quantitative Finance &amp; Risk Management @ University of Michigan
              <br /> B.Eng. in Data Science and Big Data Technology
            </Reveal>
            <Reveal className={s.heroActions} blur delay={0.3}>
              <a className={s.btnPrimary} href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowIcon size={15} /></a>
              <a className={s.btnGlass} href={profile.links.handshake} target="_blank" rel="noreferrer">Handshake <ArrowIcon size={15} /></a>
              <a className={s.btnGlass} href={profile.resumePreview} target="_blank" rel="noreferrer"><DocIcon size={15} /> Preview resume</a>
              <a className={s.btnGlass} href={profile.resumeDownload} download><DownloadIcon size={15} /> Download</a>
            </Reveal>
          </motion.div>
        </section>

        <section id="about" className={s.about}>
          <Reveal className={s.tag} blur>About</Reveal>
          <div className={s.aboutGrid}>
            <div className={s.bio}>
              {about.summary.map((p, i) => (
                <Reveal as="p" key={i} blur delay={i * 0.05} className={s.bioP}>{p}</Reveal>
              ))}
            </div>
            <div className={s.edu}>
              {education.map((e) => (
                <Reveal key={e.school} blur className={s.eduCard}>
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
          <Reveal className={s.tag} blur>{anomaly.kind}</Reveal>
          <Reveal as="h2" blur className={s.workTitle}>{anomaly.title}</Reveal>
          <Reveal as="p" blur className={s.workBlurb}>{anomaly.blurb}</Reveal>
          <div className={s.workBody}>
            <Reveal className={s.media} blur>
              <div className={s.mediaGlow}>
                <YouTube id={anomaly.media!.src} title={anomaly.title} accent="#00f0ff" />
              </div>
              <div className={s.mediaLinks}>
                {anomaly.links?.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label} <ArrowIcon size={13} /></a>
                ))}
              </div>
            </Reveal>
            <div className={s.workText}>
              {anomaly.body.map((p, i) => (
                <Reveal as="p" key={i} blur delay={i * 0.04} className={s.workP}>{p}</Reveal>
              ))}
              <Reveal className={s.figure} blur>
                <img src={anomaly.figure!.src} alt={anomaly.figure!.alt} />
                <span className={s.figureCap}>{anomaly.figure!.caption}</span>
              </Reveal>
              <Reveal className={s.stack} blur>{anomaly.stack.map((t) => <span key={t}>{t}</span>)}</Reveal>
            </div>
          </div>
        </section>

        <footer id="contact" className={s.footer}>
          <Reveal as="h2" blur className={s.footerTitle}>Let&apos;s make something luminous.</Reveal>
          <Reveal className={s.footerLinks} blur>
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
