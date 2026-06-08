import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Download,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Target,
} from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { education, experiences, profile, projects, skills, stats } from './data/profile'

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

const fadeIn = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

const sectionIds = ['about', 'skills', 'projects', 'experience', 'contact']

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-fuchsia-300">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{description}</p> : null}
    </motion.div>
  )
}

function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const [activeSection, setActiveSection] = useState('about')
  const [projectPulse, setProjectPulse] = useState(0)

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleSection?.target.id) {
          setActiveSection(visibleSection.target.id)
        }
      },
      { rootMargin: '-28% 0px -55% 0px', threshold: [0.2, 0.4, 0.65] },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const handleViewProjects = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setActiveSection('projects')
    setProjectPulse((value) => value + 1)
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', '#projects')
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070713] text-slate-100 selection:bg-fuchsia-400 selection:text-slate-950">
      <motion.div className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300" style={{ scaleX }} />

      <header className="fixed inset-x-0 top-1 z-40 border-b border-white/10 bg-[#070713]/78 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#top" className="group inline-flex items-center gap-2 text-sm font-semibold text-white">
            <span className="grid size-9 place-items-center rounded-lg border border-fuchsia-300/30 bg-fuchsia-400/10 text-fuchsia-200 shadow-[0_0_24px_rgba(217,70,239,0.25)]">BV</span>
            <span className="hidden sm:inline">{profile.displayName}</span>
          </a>
          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 md:flex">
            {navItems.map((item) => {
              const sectionId = item.href.slice(1)
              const isActive = activeSection === sectionId

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setActiveSection(sectionId)}
                  className={`relative rounded-full px-4 py-2 text-sm transition ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full bg-fuchsia-400/18 shadow-[0_0_22px_rgba(217,70,239,0.35)] ring-1 ring-fuchsia-300/30"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative z-10">{item.label}</span>
                </a>
              )
            })}
          </div>
          <a href={profile.cvPath} download className="inline-flex items-center gap-2 rounded-lg bg-fuchsia-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-fuchsia-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-200 focus:ring-offset-2 focus:ring-offset-[#070713]">
            <Download className="size-4" />
            CV
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="relative flex min-h-screen items-center px-5 pb-20 pt-32 md:px-8 md:pt-28">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(217,70,239,0.22),transparent_34%),radial-gradient(circle_at_82%_20%,rgba(34,211,238,0.14),transparent_28%),linear-gradient(180deg,#070713_0%,#0b0b1f_52%,#070713_100%)]" />
          <div className="absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />

          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/25 bg-fuchsia-400/10 px-4 py-2 text-sm text-fuchsia-100">
                <Sparkles className="size-4" />
                Open to Backend Developer Intern roles
              </div>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] tracking-tight text-white md:text-7xl">
                {profile.name}
                <span className="block bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-200 bg-clip-text text-transparent">{profile.role}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">{profile.summary}</p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">{profile.objective}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <motion.a href="#projects" onClick={handleViewProjects} whileTap={{ scale: 0.96 }} whileHover={{ y: -2 }} className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-fuchsia-100">
                  View Projects <motion.span animate={projectPulse ? { y: [0, 4, 0] } : { y: 0 }} transition={{ duration: 0.45 }}><ArrowDown className="size-4" /></motion.span>
                </motion.a>
                <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-3 font-semibold text-white transition hover:border-fuchsia-300/60 hover:bg-white/8">
                  GitHub <FaGithub className="size-4" />
                </a>
              </div>
            </motion.div>

            <motion.aside initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.65, ease: 'easeOut' }} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-fuchsia-950/30 backdrop-blur">
              <div className="rounded-xl border border-fuchsia-300/20 bg-[#101027] p-6">
                <p className="text-sm uppercase tracking-[0.28em] text-fuchsia-300">Candidate snapshot</p>
                <div className="mt-7 space-y-5">
                  <div className="flex items-start gap-4">
                    <Target className="mt-1 size-5 text-cyan-200" />
                    <div>
                      <p className="font-semibold text-white">Career direction</p>
                      <p className="text-sm leading-6 text-slate-300">Backend intern now, full stack developer long term.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="mt-1 size-5 text-cyan-200" />
                    <div>
                      <p className="font-semibold text-white">Location</p>
                      <p className="text-sm leading-6 text-slate-300">{profile.location}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-3">
                    {stats.map((stat) => (
                      <div key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.035] p-3 text-center">
                        <p className="text-2xl font-semibold text-fuchsia-200">{stat.value}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-400">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </section>

        <section id="about" className="px-5 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="About" title="Focused on practical backend systems and complete product delivery" />
            <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55 }} className="grid gap-5 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6 md:col-span-2">
                <h3 className="mb-4 text-2xl font-semibold text-white">Profile</h3>
                <p className="leading-8 text-slate-300">
                  I am a final-year Information Technology student with hands-on experience building APIs, database schemas, dashboards, web scraping pipelines, web applications, and mobile applications. My strongest focus is backend development, but I can work across the product from UI implementation to data modeling and deployment.
                </p>
              </div>
              <div className="rounded-xl border border-fuchsia-300/20 bg-fuchsia-400/10 p-6">
                <h3 className="mb-4 text-2xl font-semibold text-white">Contact basics</h3>
                <div className="space-y-3 text-sm text-slate-200">
                  <p className="flex items-center gap-3"><Mail className="size-4 text-fuchsia-200" /> {profile.email}</p>
                  <p className="flex items-center gap-3"><Phone className="size-4 text-fuchsia-200" /> {profile.phone}</p>
                  <p className="flex items-center gap-3"><CalendarDays className="size-4 text-fuchsia-200" /> {profile.birthday}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="skills" className="px-5 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Skills" title="Technical stack built around web, backend, database, and mobile" />
            <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {skills.map((group) => (
                <div key={group.title} className="rounded-xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-fuchsia-300/40 hover:bg-white/[0.06]">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white"><Layers3 className="size-5 text-fuchsia-200" /> {group.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="rounded-md border border-white/10 bg-slate-950/45 px-3 py-1.5 text-sm text-slate-300">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="projects" className="px-5 py-20 md:px-8">
          <motion.div
            className="mx-auto max-w-7xl rounded-2xl border border-transparent"
            animate={projectPulse ? {
              borderColor: ['rgba(217,70,239,0)', 'rgba(217,70,239,0.55)', 'rgba(217,70,239,0)'],
              boxShadow: ['0 0 0 rgba(217,70,239,0)', '0 0 42px rgba(217,70,239,0.22)', '0 0 0 rgba(217,70,239,0)'],
            } : undefined}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <SectionHeading eyebrow="Projects" title="Project-first portfolio for recruiter review" description="No image previews here. Each project highlights product scope, engineering decisions, core features, and technical strengths." />
            <div className="space-y-6">
              {projects.map((project, index) => (
                <motion.article key={project.name} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.55, delay: index * 0.08 }} className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 shadow-xl shadow-slate-950/20 md:p-8">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-sm font-medium text-fuchsia-200">{project.period} | {project.role}</p>
                      <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">{project.name}</h3>
                      <p className="mt-4 max-w-4xl leading-8 text-slate-300">{project.description}</p>
                    </div>
                    <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-fuchsia-300/30 px-4 py-2 text-sm font-semibold text-fuchsia-100 transition hover:bg-fuchsia-400/15">
                      Source code <ArrowUpRight className="size-4" />
                    </a>
                  </div>
                  <div className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <ul className="space-y-3">
                      {project.highlights.map((item) => (
                        <li key={item} className="flex gap-3 leading-7 text-slate-300">
                          <span className="mt-2 size-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.75)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5">
                      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Tech stack</p>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <span key={item} className="rounded-md bg-fuchsia-300/10 px-3 py-1.5 text-sm text-fuchsia-100 ring-1 ring-fuchsia-300/20">{item}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

          </motion.div>
        </section>

        <section id="experience" className="px-5 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
            <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-fuchsia-300">Experience</p>
              {experiences.map((item) => (
                <div key={item.company}>
                  <h2 className="text-3xl font-semibold text-white">{item.role}</h2>
                  <p className="mt-2 flex items-center gap-2 text-slate-300"><BriefcaseBusiness className="size-4 text-cyan-200" /> {item.company}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.period}</p>
                  <ul className="mt-6 space-y-3">
                    {item.details.map((detail) => (
                      <li key={detail} className="flex gap-3 leading-7 text-slate-300"><span className="mt-2 size-2 shrink-0 rounded-full bg-fuchsia-300" /> {detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: 0.08 }} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-fuchsia-300">Education</p>
              <h2 className="text-3xl font-semibold text-white">{education.major}</h2>
              <p className="mt-2 flex items-center gap-2 text-slate-300"><GraduationCap className="size-4 text-cyan-200" /> {education.school}</p>
              <p className="mt-1 text-sm text-slate-400">{education.period}</p>
              <ul className="mt-6 space-y-3">
                {education.details.map((detail) => (
                  <li key={detail} className="flex gap-3 leading-7 text-slate-300"><span className="mt-2 size-2 shrink-0 rounded-full bg-cyan-300" /> {detail}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        <section id="contact" className="px-5 py-24 md:px-8">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55 }} className="mx-auto max-w-5xl rounded-2xl border border-fuchsia-300/20 bg-gradient-to-br from-fuchsia-400/16 via-white/[0.045] to-cyan-300/10 p-8 text-center md:p-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-fuchsia-200">Contact</p>
            <h2 className="text-3xl font-semibold text-white md:text-5xl">Ready to discuss backend intern opportunities</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">The fastest way to reach me is email. You can also review my source code and project history on GitHub.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={`mailto:${profile.email}`} className="inline-flex items-center justify-center gap-2 rounded-lg bg-fuchsia-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-fuchsia-200"><Mail className="size-4" /> Email me</a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-3 font-semibold text-white transition hover:bg-white/8"><FaGithub className="size-4" /> GitHub</a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-slate-500 md:px-8">
        <p>Built with React, Vite, TypeScript, Tailwind CSS, Framer Motion, and Lucide React.</p>
      </footer>
    </div>
  )
}

export default App




