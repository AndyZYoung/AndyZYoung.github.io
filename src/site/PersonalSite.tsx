import { motion, useScroll, useSpring, MotionConfig } from 'framer-motion'
import { useLenis, scrollToId } from '../hooks/useLenis'
import { useActiveSection } from '../hooks/useActiveSection'
import { YouTube } from '../components/YouTube'
import { LinkedInIcon, HandshakeIcon, GitHubIcon, ArrowIcon, DocIcon, DownloadIcon } from '../components/Icons'
import { profile, about, education, experience, projects, activities, navItems } from '../content/data'
import s from './PersonalSite.module.css'

const slideIn = (from: number, delay = 0) => ({
  initial: { x: from, opacity: 0 },
  whileInView: { x: 0, opacity: 1 },
  viewport: { once: true, margin: '0px 0px -12% 0px' },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
})

const rise = (delay = 0) => ({
  initial: { y: 30, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, margin: '0px 0px -10% 0px' },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
})

const panelColor = ['eduBlue', 'eduMustard', 'eduBlue', 'eduMustard'] as const

export default function PersonalSite() {
  useLenis()
  const active = useActiveSection(navItems.map((n) => n.id))
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <MotionConfig reducedMotion="user">
    <div className={s.root}>
      <motion.div className={s.progress} style={{ scaleX: progress }} aria-hidden />

      <aside className={s.nav}>
        <button className={s.brand} onClick={() => scrollToId('home')}>
          <span className={s.brandCircle} />YANG ZHANG
        </button>
        <nav className={s.navList}>
          {navItems.map((n, i) => (
            <button
              key={n.id}
              className={`${s.navItem} ${active === n.id ? s.navActive : ''}`}
              onClick={() => scrollToId(n.id)}
            >
              <span className={s.navIdx}>{String(i).padStart(2, '0')}</span>
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

      <motion.main
        className={s.main}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* HOME */}
        <section id="home" className={s.hero}>
          <div className={s.heroShapes} aria-hidden>
            <motion.span
              className={s.shapeBlue}
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1, y: [0, -18, 0] }}
              transition={{
                x: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.8 },
                y: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
              }}
            />
            <motion.span
              className={s.shapeMustard}
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1, y: [0, 16, 0], rotate: [0, 8, 0] }}
              transition={{
                x: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.8 },
                y: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
              }}
            />
            <motion.span
              className={s.shapeBrick}
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1, y: [0, -12, 0], rotate: [0, -6, 0] }}
              transition={{
                x: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.8 },
                y: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
                rotate: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
              }}
            />
          </div>
          <motion.div className={s.heroKicker} {...rise(0)}>{profile.disciplines.join('  /  ')}</motion.div>
          <h1 className={s.heroTitle}>
            <motion.span className={s.l} {...rise(0.05)}>YANG</motion.span>
            <motion.span className={s.lAccent} {...rise(0.12)}>ZHANG</motion.span>
          </h1>
          <motion.p className={s.heroHeadline} {...rise(0.2)}>
            M.S. Quantitative Finance &amp; Risk Management @ University of Michigan · B.Eng. Data Science and Big Data
            Technology
          </motion.p>
          <motion.div className={s.heroActions} {...rise(0.28)}>
            <a className={s.btnPrimary} href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowIcon size={15} /></a>
            <a className={s.btnLine} href={profile.links.handshake} target="_blank" rel="noreferrer">Handshake</a>
            <a className={s.btnLine} href={profile.resumePreview} target="_blank" rel="noreferrer"><DocIcon size={14} /> Preview resume</a>
            <a className={s.btnLine} href={profile.resumeDownload} download><DownloadIcon size={14} /> Download</a>
          </motion.div>
          <button className={s.scrollHint} onClick={() => scrollToId('about')}>Scroll ↓</button>
        </section>

        {/* ABOUT */}
        <section id="about" className={s.about}>
          <motion.div className={s.aboutBlock} {...slideIn(-100)}>
            <span className={s.tagLight}>About</span>
            {about.summary.map((p, i) => (
              <p key={i} className={s.bioP}>{p}</p>
            ))}
          </motion.div>
          <div className={s.edu}>
            {education.map((e, idx) => (
              <motion.div key={e.school} className={idx % 2 === 0 ? s.eduMustard : s.eduBlue} {...slideIn(idx % 2 === 0 ? 100 : -100)}>
                <div className={s.eduHead}>
                  <h3>{e.school}</h3>
                  <span>{e.period}</span>
                </div>
                <p className={s.eduDegree}>{e.degree}{e.detail ? ` · ${e.detail}` : ''}{e.future ? ' · Incoming' : ''}</p>
                <span className={s.coursesLabel}>{e.coursesLabel}</span>
                <ul className={s.courses}>{e.courses.map((c) => <li key={c}>{c}</li>)}</ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className={s.experience}>
          <div className={s.projectHead}>
            <span className={s.projIndex}>◆</span>
            <span className={s.tag}>Professional Experience</span>
          </div>
          <motion.h2 className={s.projTitle} {...rise(0)}>Shipping AI systems in the real world</motion.h2>
          <div className={s.expList}>
            {experience.map((e, idx) => (
              <motion.article key={e.company} className={s.expRow} {...slideIn(idx % 2 === 0 ? -80 : 80, idx * 0.05)}>
                <div className={s.expLeft}>
                  <span className={`${s.expMarker} ${idx % 2 === 0 ? s.markBlue : s.markMustard}`} />
                  <h3 className={s.expCompany}>{e.company}</h3>
                  <span className={s.expRole}>{e.role}</span>
                  <span className={s.expPeriod}>{e.period}</span>
                </div>
                <div className={s.expRight}>
                  <p className={s.expSummary}>{e.summary}</p>
                  <ul className={s.expHighlights}>
                    {e.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                  <div className={s.stack}>{e.tags.map((t) => <span key={t}>{t}</span>)}</div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        {projects.map((p, idx) => {
          const flip = idx % 2 === 1
          const isVideo = p.media?.type === 'youtube'
          return (
            <section key={p.id} id={p.id} className={s.project}>
              <div className={s.projectHead}>
                <span className={s.projIndex}>{p.index}</span>
                <span className={s.tag}>{p.kind}</span>
              </div>
              <motion.h2 className={s.projTitle} {...rise(0)}>{p.title}</motion.h2>
              <motion.p className={s.projBlurb} {...rise(0.06)}>{p.blurb}</motion.p>

              <div className={`${s.projBody} ${flip ? s.flip : ''}`}>
                <motion.div className={s.projVisual} {...slideIn(flip ? 80 : -80)}>
                  <div className={`${s.frame} ${panelColor[idx]}`}>
                    {isVideo ? (
                      <YouTube id={p.media!.src} title={p.title} accent="#e6a911" />
                    ) : (
                      <img className={s.shot} src={p.media!.src} alt={p.media!.alt ?? p.title} />
                    )}
                  </div>
                  {p.links && (
                    <div className={s.links}>
                      {p.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label} <ArrowIcon size={13} /></a>
                      ))}
                    </div>
                  )}
                </motion.div>

                <motion.div className={s.projText} {...slideIn(flip ? -80 : 80)}>
                  {p.body.map((para, i) => (
                    <p key={i} className={s.projP}>{para}</p>
                  ))}
                  {p.figure && (
                    <figure className={s.figure}>
                      <img src={p.figure.src} alt={p.figure.alt} />
                      <figcaption>{p.figure.caption}</figcaption>
                    </figure>
                  )}
                  <div className={s.stack}>{p.stack.map((t) => <span key={t}>{t}</span>)}</div>
                </motion.div>
              </div>
            </section>
          )
        })}

        {/* ACTIVITIES */}
        <section id="activities" className={s.activities}>
          <div className={s.projectHead}>
            <span className={s.projIndex}>05</span>
            <span className={s.tag}>Activities &amp; Student Work</span>
          </div>
          <motion.h2 className={s.projTitle} {...rise(0)}>Building communities, not just code</motion.h2>
          <div className={s.actGrid}>
            {activities.map((a, idx) => (
              <motion.div key={a.org} className={idx % 2 === 0 ? s.actBlue : s.actMustard} {...slideIn(idx % 2 === 0 ? -80 : 80)}>
                <span className={s.actPeriod}>{a.period}</span>
                <h3>{a.org}</h3>
                <span className={s.actRole}>{a.role}</span>
                <p>{a.detail}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact" className={s.footer}>
          <motion.h2 className={s.footerTitle} {...slideIn(-100)}>LET&apos;S<br />CONNECT</motion.h2>
          <div className={s.footerLinks}>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer"><LinkedInIcon size={20} /> LinkedIn</a>
            <a href={profile.links.handshake} target="_blank" rel="noreferrer"><HandshakeIcon size={20} /> Handshake</a>
            <a href={profile.links.github} target="_blank" rel="noreferrer"><GitHubIcon size={20} /> GitHub</a>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
          <span className={s.copyright}>© {new Date().getFullYear()} Yang Zhang</span>
        </footer>
      </motion.main>
    </div>
    </MotionConfig>
  )
}
