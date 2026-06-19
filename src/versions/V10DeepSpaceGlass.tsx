import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLenis, scrollToId } from '../hooks/useLenis'
import { useActiveSection } from '../hooks/useActiveSection'
import { Reveal } from '../components/Reveal'
import { YouTube } from '../components/YouTube'
import { LinkedInIcon, HandshakeIcon, GitHubIcon, ArrowIcon, DocIcon, DownloadIcon } from '../components/Icons'
import { profile, about, education, anomaly, previewNav } from '../content/data'
import s from './V10DeepSpaceGlass.module.css'

export default function V10DeepSpaceGlass() {
  useLenis()
  const active = useActiveSection(previewNav.map((n) => n.id))
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const starsY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const starsY2 = useTransform(scrollYProgress, [0, 1], [0, -480])

  return (
    <div className={s.root} ref={ref}>
      <div className={s.space} aria-hidden />
      <motion.div className={s.stars} style={{ y: starsY }} aria-hidden />
      <motion.div className={s.starsFar} style={{ y: starsY2 }} aria-hidden />
      <div className={s.glowTop} aria-hidden />

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
        <section id="home" className={s.hero}>
          <Reveal className={s.heroBadge}>Open to 2026 opportunities</Reveal>
          <h1 className={s.heroTitle}>
            <Reveal as="span" className={s.l} delay={0.05}>Yang</Reveal>
            <Reveal as="span" className={s.lGrad} delay={0.12}>Zhang</Reveal>
          </h1>
          <Reveal className={s.heroHeadline} delay={0.2}>
            M.S. in Quantitative Finance &amp; Risk Management @ University of Michigan
            <br />B.Eng. in Data Science and Big Data Technology
          </Reveal>
          <Reveal className={s.heroDisc} delay={0.26}>{profile.disciplines.join('  ·  ')}</Reveal>
          <Reveal className={s.heroActions} delay={0.32}>
            <a className={s.btnPrimary} href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowIcon size={15} /></a>
            <a className={s.btnGlass} href={profile.links.handshake} target="_blank" rel="noreferrer">Handshake</a>
            <a className={s.btnGlass} href={profile.resumePreview} target="_blank" rel="noreferrer"><DocIcon size={14} /> Preview resume</a>
            <a className={s.btnGlass} href={profile.resumeDownload} download><DownloadIcon size={14} /> Download</a>
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
                <Reveal key={e.school} className={s.glassCard}>
                  <div className={s.eduHead}><h3>{e.school}</h3><span>{e.period}</span></div>
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
          <Reveal as="p" className={s.workBlurb}>{anomaly.blurb}</Reveal>
          <div className={s.workBody}>
            <Reveal className={s.media}>
              <div className={s.glassMedia}>
                <YouTube id={anomaly.media!.src} title={anomaly.title} accent="#4f7cff" />
              </div>
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
          <Reveal as="h2" className={s.footerTitle}>Let&apos;s build the future of finance.</Reveal>
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
