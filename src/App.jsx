import { useEffect, useRef, useState } from 'react'
import './App.css'
import asishProfile from './assets/asish.png'
import akrLogo from './assets/akr.png'
import {
  Home,
  User,
  BarChart3,
  Folder,
  GraduationCap,
  Mail,
} from 'lucide-react'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const activeSectionRef = useRef('home')
  const magnifierTimeoutRef = useRef(null)

  const changeActiveSection = (nextSection) => {
    const currentSection = activeSectionRef.current

    if (currentSection === nextSection) {
      return
    }

    const selector =
      currentSection === 'home'
        ? '.nav-links a[href="#"]'
        : `.nav-links a[href="#${currentSection}"]`

    const previousLink = document.querySelector(selector)

    if (previousLink) {
      previousLink.classList.remove('magnifier-pass')

      // Restart the animation cleanly.
      void previousLink.offsetWidth

      previousLink.classList.add('magnifier-pass')

      if (magnifierTimeoutRef.current) {
        window.clearTimeout(magnifierTimeoutRef.current)
      }

      magnifierTimeoutRef.current = window.setTimeout(() => {
        previousLink.classList.remove('magnifier-pass')
      }, 450)
    }

    activeSectionRef.current = nextSection
    setActiveSection(nextSection)
  }

  useEffect(() => {
    const sections = ['about', 'skills', 'projects', 'education', 'contact']

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180

      if (window.scrollY < 250) {
        changeActiveSection('home')
        return
      }

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)

        if (!section) {
          continue
        }

        const top = section.offsetTop
        const height = section.offsetHeight

        if (
          scrollPosition >= top &&
          scrollPosition < top + height
        ) {
          changeActiveSection(sectionId)
          return
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (event) => {
      document.documentElement.style.setProperty(
        '--mouse-x',
        `${event.clientX}px`
      )

      document.documentElement.style.setProperty(
        '--mouse-y',
        `${event.clientY}px`
      )

      const moveX = (event.clientX / window.innerWidth - 0.5) * 14
      const moveY = (event.clientY / window.innerHeight - 0.5) * 10

      document.documentElement.style.setProperty(
        '--parallax-x',
        `${moveX}px`
      )

      document.documentElement.style.setProperty(
        '--parallax-y',
        `${moveY}px`
      )
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (magnifierTimeoutRef.current) {
        window.clearTimeout(magnifierTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="portfolio">

      {/* Navigation */}
      <nav className="navbar" aria-label="Primary navigation">

        {/* AKR Logo / Mobile Menu Trigger */}
        <button
          type="button"
          className="logo mobile-menu-trigger"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <img
            src={akrLogo}
            alt="AKR"
            className="logo-image"
          />
        </button>

        {/* Mobile Navigation */}
        <div
          className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
          aria-hidden={!mobileMenuOpen}
        >
          <a
            href="#"
            className={activeSection === 'home' ? 'active' : ''}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="mobile-menu-icon">
              <Home size={17} strokeWidth={2} />
            </span>
            <span>Home</span>
          </a>

          <a
            href="#about"
            className={activeSection === 'about' ? 'active' : ''}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="mobile-menu-icon">
              <User size={17} strokeWidth={2} />
            </span>
            <span>About</span>
          </a>

          <a
            href="#skills"
            className={activeSection === 'skills' ? 'active' : ''}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="mobile-menu-icon">
              <BarChart3 size={17} strokeWidth={2} />
            </span>
            <span>Skills</span>
          </a>

          <a
            href="#projects"
            className={activeSection === 'projects' ? 'active' : ''}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="mobile-menu-icon">
              <Folder size={17} strokeWidth={2} />
            </span>
            <span>Projects</span>
          </a>

          <a
            href="#education"
            className={activeSection === 'education' ? 'active' : ''}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="mobile-menu-icon">
              <GraduationCap size={17} strokeWidth={2} />
            </span>
            <span>Education</span>
          </a>

          <a
            href="#contact"
            className={activeSection === 'contact' ? 'active' : ''}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="mobile-menu-icon">
              <Mail size={17} strokeWidth={2} />
            </span>
            <span>Contact</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links" data-active={activeSection}>
          <span
            className="nav-slider"
            aria-hidden="true"
          />

          <a
            href="#"
            className={activeSection === 'home' ? 'active' : ''}
          >
            Home
          </a>

          <a
            href="#about"
            className={activeSection === 'about' ? 'active' : ''}
          >
            About
          </a>

          <a
            href="#skills"
            className={activeSection === 'skills' ? 'active' : ''}
          >
            Skills
          </a>

          <a
            href="#projects"
            className={activeSection === 'projects' ? 'active' : ''}
          >
            Projects
          </a>

          <a
            href="#education"
            className={activeSection === 'education' ? 'active' : ''}
          >
            Education
          </a>

          <a
            href="/Asish_Kumar_Rout_Resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>

          <a
            href="#contact"
            className={activeSection === 'contact' ? 'active' : ''}
          >
            Contact
          </a>
        </div>

        {/* Contact CTA */}
        <a
          href="mailto:akrout9999@gmail.com"
          className="nav-cta"
        >
          Let's Talk ↗
        </a>
      </nav>

      {/* Hero */}
      <header className="hero">
        <div className="hero-grid">

          {/* Left Side */}
          <div className="hero-content">
            <p className="intro hero-animate hero-delay-1">Hello, I'm</p>

            <h1 className="hero-animate hero-delay-2">
              ASISH KUMAR ROUT
            </h1>

            <h3 className="hero-animate hero-delay-3">
              JUST A DEVELOPER.
            </h3>

            <p className="hero-description hero-animate hero-delay-4">
              I build practical software, explore modern technologies,
              and turn ideas into working projects.
            </p>

            <div className="hero-buttons hero-animate hero-delay-5">
              <a href="#projects" className="primary-button">
                View Projects
              </a>

              <a
                href="/Asish_Kumar_Rout_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="secondary-button"
              >
                Resume ↗
              </a>
            </div>

            <div className="hero-socials hero-animate hero-delay-6">
              <a
                href="https://github.com/akrout9999-star"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/asish-kumar-rout-0262102b2"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>

              <a href="mailto:akrout9999@gmail.com">
                Email ↗
              </a>
            </div>

            <div className="availability hero-animate hero-delay-7">
              <span className="availability-dot" aria-hidden="true" />
              Open to opportunities
            </div>
          </div>

          {/* Right Side */}
          <div className="hero-visual hero-visual-animate">
            <div className="visual-glow" />

            <div className="visual-window">
              <div className="window-top" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              <div className="window-code">
                <p>
                  <span className="code-purple">const</span> developer = {'{'}
                </p>

                <p>
                  &nbsp;&nbsp;name:
                  <span className="code-string"> "Asish Kumar Rout"</span>,
                </p>

                <p>
                  &nbsp;&nbsp;focus:
                  <span className="code-string"> "Building useful things"</span>,
                </p>

                <p>
                  &nbsp;&nbsp;status:
                  <span className="code-string"> "Learning & Shipping"</span>
                </p>

                <p>{'}'}</p>
              </div>
            </div>

            <div className="floating-card card-one">
              <span>PROJECTS</span>
              <strong>5</strong>
              <small>1 currently building</small>
            </div>

            <div className="floating-card card-two">
              <span>FOCUS</span>
              <strong>Software + AI</strong>
            </div>
          </div>
        </div>

        <a href="#about" className="scroll-down">
          Scroll to explore ↓
        </a>
      </header>

      <main>

        {/* About */}
        <section id="about" className="about-section">
          <div className="about-layout">

            {/* Left Side */}
            <div className="about-left">
              <div className="about-heading">
                <p className="section-label">01 / ABOUT</p>

                <h2>
                  I build things that
                  <span> solve real problems.</span>
                </h2>
              </div>

              <div className="about-text">
                <p>
                  I'm a Computer Science and Engineering undergraduate at
                  Government College of Engineering, Keonjhar, graduating in 2027.
                </p>

                <p>
                  I enjoy turning ideas into practical software — from web
                  applications and developer tools to projects exploring AI and
                  computer vision.
                </p>

                <p>
                  My focus is simple: keep learning, build useful things, and become
                  a better developer with every project.
                </p>
              </div>

              <div className="about-metrics">
                <div className="about-metric">
                  <strong>5+</strong>
                  <span>Projects</span>
                </div>

                <div className="about-metric">
                  <strong>8.0</strong>
                  <span>CGPA</span>
                </div>

                <div className="about-metric">
                  <strong>2027</strong>
                  <span>Graduation</span>
                </div>
              </div>

              <div className="about-learning">
                <span className="about-learning-dot" aria-hidden="true" />
                <span>Always learning, always building.</span>
                <span className="about-learning-line" aria-hidden="true" />
              </div>
            </div>

            {/* Center Portrait */}
            <div className="about-portrait-area">
              <img
                src={asishProfile}
                alt="Asish Kumar Rout"
                className="about-profile-image"
              />

              <div className="about-developer-tag">
                JUST
                <br />
                A DEVELOPER.
              </div>
            </div>

            {/* Right Side */}
            <div className="about-info-cards">
              <div className="about-info-card about-info-large">
                <span className="about-info-label">CURRENTLY</span>

                <h3>B.Tech CSE</h3>

                <p>
                  Government College of Engineering,
                  <br />
                  Keonjhar
                </p>

                <span className="about-info-year">
                  2023 — 2027
                </span>
              </div>

              <div className="about-info-card">
                <span className="about-info-label">CGPA</span>

                <strong>
                  8.0 <small>/ 10</small>
                </strong>

                <p>
                  Consistent progress, always aiming higher.
                </p>
              </div>

              <div className="about-info-card">
                <span className="about-info-label">LOCATION</span>

                <h3>Cuttack, Odisha</h3>

                <p>
                  Open to opportunities
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="skills-section">
          <div className="skills-heading">
            <p className="section-label">02 / SKILLS</p>

            <h2>
              Tools I use to turn
              <span> ideas into software.</span>
            </h2>
          </div>

          <div className="skills-layout">

            {/* Programming */}
            <div className="skill-panel">
              <div className="skill-panel-top">
                <span>01</span>
                <h3>Programming</h3>
              </div>

              <div className="skill-items">
                <div className="skill-item">
                  <strong>C++</strong>
                  <span>DSA & Problem Solving</span>
                </div>

                <div className="skill-item">
                  <strong>Python</strong>
                  <span>Projects & Automation</span>
                </div>

                <div className="skill-item">
                  <strong>C</strong>
                  <span>Programming Fundamentals</span>
                </div>

                <div className="skill-item">
                  <strong>Java</strong>
                  <span>Basics</span>
                </div>
              </div>
            </div>

            {/* Core CS */}
            <div className="skill-panel">
              <div className="skill-panel-top">
                <span>02</span>
                <h3>Core Computer Science</h3>
              </div>

              <div className="skill-tags">
                <span>Data Structures & Algorithms</span>
                <span>OOP</span>
                <span>DBMS</span>
                <span>Basic SQL</span>
                <span>Operating Systems</span>
                <span>Computer Networks</span>
              </div>
            </div>

            {/* Tools */}
            <div className="skill-panel">
              <div className="skill-panel-top">
                <span>03</span>
                <h3>Tools & Technologies</h3>
              </div>

              <div className="skill-tags">
                <span>Git</span>
                <span>GitHub</span>
                <span>React</span>
                <span>Firebase</span>
                <span>Vite</span>
                <span>Pillow</span>
              </div>
            </div>

            {/* Currently Exploring */}
            <div className="skill-panel exploring-panel">
              <div>
                <p className="exploring-label">
                  CURRENTLY EXPLORING
                </p>

                <h3>Always learning something new.</h3>

                <p>
                  Expanding my skills through hands-on projects in modern
                  development, AI-assisted systems and computer vision.
                </p>
              </div>

              <div className="exploring-list">
                <span>React</span>
                <span>AI Systems</span>
                <span>Computer Vision</span>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="projects-section">
          <div className="projects-heading">
            <p className="section-label">03 / PROJECTS</p>

            <h2>
              Things I've built
              <span> and things I'm building.</span>
            </h2>
          </div>

          <div className="projects-showcase">

            {/* Project 01 */}
            <article className="project-feature">
              <div className="project-feature-top">
                <span className="project-index">01</span>

                <span className="project-status completed">
                  COMPLETED
                </span>
              </div>

              <div className="project-feature-content">
                <div>
                  <h3>Image Metadata Extractor</h3>

                  <p>
                    A Python utility that extracts technical image information and
                    available EXIF metadata including dimensions, camera details,
                    date-time information, software and GPS availability.
                  </p>

                  <div className="project-tech">
                    <span>Python</span>
                    <span>Pillow</span>
                    <span>EXIF</span>
                  </div>
                </div>

                <a
                  href="https://github.com/akrout9999-star/image-metadata-extractor"
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                >
                  View Project
                </a>
              </div>
            </article>

            {/* Project 02 */}
            <article className="project-feature">
              <div className="project-feature-top">
                <span className="project-index">02</span>

                <span className="project-status completed">
                  COMPLETED
                </span>
              </div>

              <div className="project-feature-content">
                <div>
                  <h3>Attendance Management System</h3>

                  <p>
                    A collaborative web application designed for structured and
                    efficient tracking of student attendance.
                  </p>

                  <div className="project-tech">
                    <span>React</span>
                    <span>Firebase</span>
                    <span>Vite</span>
                  </div>
                </div>

                <a
                  href="https://github.com/akrout9999-star/campus_desk_gce_kjr"
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                >
                  View Project
                </a>
              </div>
            </article>

            {/* Project 03 */}
            <article className="project-feature project-building">
              <div className="project-feature-top">
                <span className="project-index">03</span>

                <span className="project-status progress">
                  IN PROGRESS
                </span>
              </div>

              <div className="project-feature-content">
                <div>
                  <h3>Traffic Violation Monitoring System</h3>

                  <p>
                    A computer vision project being developed to detect common
                    traffic violations from video feeds using vehicle detection
                    and tracking.
                  </p>

                  <div className="project-tech">
                    <span>Computer Vision</span>
                    <span>Python</span>
                  </div>
                </div>
              </div>
            </article>

                        {/* Project 04 */}
            <article className="project-feature">
              <div className="project-feature-top">
                <span className="project-index">04</span>

                <span className="project-status completed">
                  COMPLETED
                </span>
              </div>

              <div className="project-feature-content">
                <div>
                  <h3>SUPPORT/OS — AI Support Desk</h3>

                  <p>
                    A full-stack AI-assisted customer support platform with
                    role-based authentication, persistent ticket management,
                    Gemini-powered diagnostics, and a human-reviewed response
                    workflow.
                  </p>

                  <div className="project-tech">
                    <span>React</span>
                    <span>Node.js</span>
                    <span>PostgreSQL</span>
                    <span>Gemini AI</span>
                  </div>
                </div>

                <a
  href="https://github.com/akrout9999-star/ai-support-desk"
  target="_blank"
  rel="noreferrer"
  className="project-link"
>
  View Project
</a>
              </div>
            </article>

                        {/* Project 05 */}
            <article className="project-feature project-building">
              <div className="project-feature-top">
                <span className="project-index">05</span>

                <span className="project-status progress">
                  IN PROGRESS
                </span>
              </div>

              <div className="project-feature-content">
                <div>
                  <h3>Tech-Prep : AI Mock Interview</h3>

                  <p>
                    An AI-powered mock interview platform being developed to help
                    users practice technical interviews and improve their interview
                    preparation through AI-assisted sessions.
                  </p>

                  <div className="project-tech">
                    <span>AI</span>
                    <span>Interview Prep</span>
                  </div>
                </div>

                <a
                  href="https://github.com/akrout9999-star/ai-mock-interview"
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                >
                  View Project
                </a>
              </div>
            </article>

          </div>
        </section>

        {/* Education */}
        <section id="education" className="education-section">
          <div className="education-heading">
            <p className="section-label">04 / EDUCATION</p>

            <h2>
              Where I'm learning
              <span> and where I started.</span>
            </h2>
          </div>

          <div className="education-list">
            <div className="education-row">
              <div className="education-year">
                2023 — 2027
              </div>

              <div className="education-main">
                <span className="education-type">B.TECH · CSE</span>

                <h3>
                  Bachelor of Technology in Computer Science & Engineering
                </h3>

                <p>
                  Government College of Engineering, Keonjhar
                </p>
              </div>

              <div className="education-score">
                <span>CGPA</span>
                <strong>8.0</strong>
              </div>
            </div>

            <div className="education-row">
              <div className="education-year">
                12TH
              </div>

              <div className="education-main">
                <span className="education-type">HIGHER SECONDARY</span>

                <h3>
                  Guidance English Medium School
                </h3>

                <p>
                  Dumduma, Bhubaneswar
                </p>
              </div>

              <div className="education-score">
                <span>SCORE</span>
                <strong>93%</strong>
              </div>
            </div>

            <div className="education-row">
              <div className="education-year">
                10TH
              </div>

              <div className="education-main">
                <span className="education-type">SECONDARY</span>

                <h3>
                  Modern Public School
                </h3>

                <p>
                  Balasore
                </p>
              </div>

              <div className="education-score">
                <span>SCORE</span>
                <strong>95.4%</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="contact-section">
          <div className="contact-heading">
            <p className="section-label">05 / CONTACT</p>

            <h2>
              Let's build something
              <span> worth using.</span>
            </h2>
          </div>

          <div className="contact-grid">
            <div className="contact-copy">
              <p>
                I'm interested in opportunities where I can learn, build and
                contribute as a software developer.
              </p>

              <div className="contact-availability">
                <span className="availability-dot" aria-hidden="true" />
                Open to opportunities
              </div>
            </div>

            <div className="contact-actions">
              <a
                href="mailto:akrout9999@gmail.com"
                className="contact-primary"
              >
                Email Me ↗
              </a>

              <a
                href="https://github.com/akrout9999-star"
                target="_blank"
                rel="noreferrer"
                className="contact-secondary"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/asish-kumar-rout-0262102b2"
                target="_blank"
                rel="noreferrer"
                className="contact-secondary"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>© 2026 Asish Kumar Rout</p>
        <p>Built with React.</p>
      </footer>

    </div>
  )
}

export default App
