import { useState, useEffect, useRef } from 'react'
import { Heart, Menu, X, ArrowRight, Apple, Play, LogIn } from 'lucide-react'
import { OptimizedImg } from './components/OptimizedImage'

/* ═══════════════════════════════════════════════════════════════
   LOKFEEL LANDING — DATEASY DARK + FEELD STYLE
   Unified with app.lokfeel.com | Dark immersive
   ═══════════════════════════════════════════════════════════════ */

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, inView }
}

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION - Dateasy Dark + Sign In
   ═══════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'About', href: '#about' },
    { label: 'How it works', href: '#how' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5'
        : 'bg-transparent'
    }`} aria-label="Main navigation">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="font-display text-xl font-bold tracking-tight text-white">LokFeel</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="text-sm text-white/50 hover:text-white/90 transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          {/* Right side — Sign In + Get Started */}
          <div className="flex items-center gap-3">
            <a
              href="https://app.lokfeel.com/login"
              onClick={() => { try { sessionStorage.setItem('lokfeel_from_landing', '1') } catch {} }}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign In
            </a>
            <a href="https://app.lokfeel.com/register" onClick={() => { try { sessionStorage.setItem('lokfeel_from_landing', '1') } catch {} }} className="hidden sm:block">
              <button className="btn-lime rounded-full px-5 py-2 text-sm font-semibold cursor-pointer border-none">
                Get Started
              </button>
            </a>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center text-white/70"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden absolute top-16 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5 p-6" role="dialog" aria-label="Mobile navigation menu">
          <div className="flex flex-col gap-4">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                className="text-lg py-2 text-white/70 hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
            <div className="h-px bg-white/10 my-2" />
            <a href="https://app.lokfeel.com/login" onClick={() => { try { sessionStorage.setItem('lokfeel_from_landing', '1') } catch {}; setMobileOpen(false) }}
              className="text-lg py-2 text-white/70 hover:text-white transition-colors flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Sign In
            </a>
            <a href="https://app.lokfeel.com/register" onClick={() => { try { sessionStorage.setItem('lokfeel_from_landing', '1') } catch {}; setMobileOpen(false) }}>
              <button className="btn-lime w-full rounded-full py-3 text-base font-semibold cursor-pointer border-none">
                Get Started
              </button>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

/* ═══════════════════════════════════════════════════════════════
   HERO - Full-screen immersive with Dateasy Dark overlay
   ═══════════════════════════════════════════════════════════════ */
function Hero() {
  const [loaded, setLoaded] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isSlowConnection, setIsSlowConnection] = useState(false)

  useEffect(() => {
    // Detect slow connections (2g/3g only) — skip video preload
    const conn = (navigator as any).connection
    if (conn) {
      const effectiveType = conn.effectiveType
      setIsSlowConnection(effectiveType === '2g' || effectiveType === '3g' || effectiveType === 'slow-2g')
    }
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ minHeight: '100dvh' }}>
      {/* Video Background — lazy loaded, with image fallback */}
      <div className="hero-video-container" aria-hidden="true">
        <video
          autoPlay={!isSlowConnection}
          muted
          loop
          playsInline
          preload={isSlowConnection ? 'none' : 'metadata'}
          className={`animate-ken-burns transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          poster="/images/bg/couple-sunset.jpg"
          onLoadedData={() => setVideoLoaded(true)}
          onCanPlay={() => setVideoLoaded(true)}
        >
          <source src="/assets/video/background-desktop-1080p.mp4" type="video/mp4" />
          <source src="/assets/video/background-desktop-1080p.webm" type="video/webm" />
        </video>
        {/* Fallback: always show image behind video */}
        {!videoLoaded && (
          <OptimizedImg
            src="/images/bg/couple-sunset.jpg"
            alt="Couple enjoying a romantic sunset together"
            loading="eager"
            className="w-full h-full object-cover animate-ken-burns"
            style={{ filter: 'brightness(0.55) contrast(1.1) saturate(0.8)' }}
          />
        )}
      </div>

      {/* Blue & Purple atmosphere orbs */}
      <div className="blue-glow-orb blue-glow-orb-1" />
      <div className="blue-glow-orb blue-glow-orb-2" />
      <div className="blue-glow-orb blue-glow-orb-3" />
      <div className="purple-glow-orb purple-glow-orb-1" />
      <div className="purple-glow-orb purple-glow-orb-2" />
      <div className="absolute inset-0 hero-gradient-overlay" />

      {/* Purple ambient glow — bottom left */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4c1d95]/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center text-white py-20">
        <h1 className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          AI matches what
          <br />
          <span className="text-gradient-lime">swiping can't</span>
        </h1>

        <p className={`text-lg sm:text-xl text-white/60 max-w-xl mx-auto mb-8 sm:mb-10 transition-all duration-700 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Our AI engine analyzes personality, values & chemistry. 5 curated matches weekly — each with a reason why.
        </p>

        {/* CTA Buttons — Lime primary */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="https://app.lokfeel.com/register" onClick={() => { try { sessionStorage.setItem('lokfeel_from_landing', '1') } catch {} }} className="block w-full sm:w-auto">
            <button className="btn-lime animate-glow-pulse rounded-full px-8 py-6 text-base font-semibold w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer border-none" aria-label="Start free registration on LokFeel">
              <Heart className="w-5 h-5" />
              Start Free
            </button>
          </a>
          <a href="#about" className="block w-full sm:w-auto">
            <button className="rounded-full px-8 py-6 text-base font-medium border border-white/15 text-white/80 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all w-full sm:w-auto cursor-pointer bg-transparent">
              Learn More
            </button>
          </a>
        </div>

        {/* 🌸 Ladies Never Pay Banner */}
        <div className={`mt-6 sm:mt-8 transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="https://app.lokfeel.com/register" onClick={() => { try { sessionStorage.setItem('lokfeel_from_landing', '1') } catch {} }} className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all group">
            <span className="text-base sm:text-lg">🌸</span>
            <span className="text-white/70 text-xs sm:text-sm font-medium">Ladies Never Pay</span>
            <span className="text-white/30 text-[10px] sm:text-xs hidden sm:inline">— Premium features free for women</span>
            <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:block">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT - Dateasy Dark with purple accent
   ═══════════════════════════════════════════════════════════════ */
function AboutSection() {
  const { ref, inView } = useInView()

  return (
    <section id="about" className="py-24 md:py-32 bg-[#0a0a0a]" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className={`relative transition-all duration-1000 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-white/5">
              <OptimizedImg
                src="/images/about-couple.jpg"
                alt="Real couple connecting through LokFeel"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/30 via-transparent to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-[#111111] border border-[#4c1d95]/20 rounded-xl p-4 shadow-xl">
              <p className="text-3xl font-bold font-display text-gradient-lime">AI</p>
              <p className="text-sm text-white/40">Powered matching engine</p>
            </div>
          </div>

          {/* Right: Content */}
          <div className="text-center md:text-left">
            <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-white transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Swiping is random. AI matching is intentional.
            </h2>
            <p className={`text-xl text-white/50 mt-6 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              LokFeel's AI engine understands who you really are — and finds the people you'll genuinely click with.
            </p>
            <div className={`mt-8 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <a href="#how">
                <button className="rounded-full px-6 py-2.5 text-sm font-medium border border-[#4c1d95]/30 text-[#a78bfa] hover:bg-[#4c1d95]/10 hover:border-[#4c1d95]/50 transition-all cursor-pointer bg-transparent inline-flex items-center gap-2" aria-label="Learn how LokFeel works">
                  See how it works
                  <ArrowRight className="w-4 h-4" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   HOW IT WORKS - Dark cards with lime accents
   ═══════════════════════════════════════════════════════════════ */
function HowSection() {
  const { ref, inView } = useInView()
  const [activeStep, setActiveStep] = useState(0)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  const steps = [
    {
      num: '01',
      title: 'Tell the AI who you are',
      desc: 'A 5-minute conversation. Our engine learns your personality, values & patterns.',
      image: '/images/bg/photo-couple-main.jpg',
    },
    {
      num: '02',
      title: 'Get AI-curated matches',
      desc: '5 people weekly, selected by our matching engine — with explanations why.',
      image: '/images/bg/photo-team-1.jpg',
    },
    {
      num: '03',
      title: 'Connect with confidence',
      desc: 'Every match comes with compatibility insights. Skip the guesswork.',
      image: '/images/bg/photo-team-2.jpg',
    },
  ]

  useEffect(() => {
    if (!inView) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [inView, steps.length])

  return (
    <section id="how" className="py-24 md:py-32 bg-[#111111]" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <p className={`text-sm uppercase tracking-widest text-[#a3e635]/70 mb-6 text-center transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          How it works
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Steps */}
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`step-card relative flex gap-6 items-start cursor-pointer p-4 rounded-xl transition-all duration-500 ${
                  activeStep === i
                    ? 'bg-[#1a1a1a] shadow-lg scale-[1.02] ring-1 ring-[#4c1d95]/20'
                    : 'opacity-50 hover:opacity-80'
                } ${hoveredStep === i ? 'transform perspective-1000' : ''}`}
                style={{
                  transform: hoveredStep === i
                    ? 'rotateY(-5deg) rotateX(2deg) translateZ(10px)'
                    : 'rotateY(0) rotateX(0) translateZ(0)',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                onClick={() => setActiveStep(i)}
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {i < steps.length - 1 && (
                  <div className="absolute left-[2.25rem] top-16 w-0.5 h-8 bg-gradient-to-b from-[#4c1d95]/20 to-transparent" />
                )}

                <div className="relative">
                  <span className={`text-5xl font-bold font-display transition-all duration-500 ${
                    activeStep === i ? 'text-gradient-lime' : 'text-white/15'
                  }`}>
                    {step.num}
                  </span>
                  {activeStep === i && (
                    <div className="absolute inset-0 animate-ping">
                      <span className="text-5xl font-bold font-display text-[#a3e635]/10">{step.num}</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 pt-2">
                  <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                    activeStep === i ? 'text-white' : 'text-white/50'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-white/40 transition-all duration-500 ${
                    activeStep === i ? 'opacity-100' : 'opacity-70'
                  }`}>
                    {step.desc}
                  </p>

                  {activeStep === i && (
                    <div className="mt-4 h-0.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#a3e635] animate-progress" style={{ animationDuration: '4s' }} />
                    </div>
                  )}
                </div>

                <div className={`transition-all duration-300 ${activeStep === i ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                  <ArrowRight className="w-5 h-5 text-[#a3e635]/60" />
                </div>
              </div>
            ))}
          </div>

          {/* Right: Image */}
          <div
            className={`relative aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{
              transform: inView ? 'perspective(1000px) rotateY(-3deg)' : 'perspective(1000px) rotateY(0)',
              boxShadow: '20px 20px 60px rgba(76, 29, 149, 0.15), -5px -5px 20px rgba(0,0,0,0.3)',
            }}
          >
            {steps.map((step, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-700 ${
                  activeStep === i ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                }`}
              >
                <OptimizedImg
                  src={step.image}
                  alt={`Step ${step.num}: ${step.title}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
              </div>
            ))}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {steps.map((_, i) => (
              <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeStep === i ? 'bg-[#a3e635] w-8' : 'bg-white/20 w-1.5 hover:bg-white/40'
                  }`}
                  aria-label={`Go to step ${steps[i].num}: ${steps[i].title}`}
                />
              ))}
            </div>

            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
              {String(activeStep + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
/* ═══════════════════════════════════════════════════════════════
   CTA - Dateasy Dark with lime CTA
   ═══════════════════════════════════════════════════════════════ */
function CTASection() {
  const { ref, inView } = useInView()

  return (
    <section className="py-24 md:py-32 bg-[#111111]" ref={ref}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className={`font-display text-3xl sm:text-4xl tracking-tight mb-6 text-white transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Let AI find your match
        </h2>
        <p className={`text-white/50 mb-8 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Join the AI matching revolution. Women get premium features free — forever.
        </p>

        {/* App Download Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="https://apps.apple.com/app/lokfeel" target="_blank" rel="noopener noreferrer" aria-label="Download LokFeel from the App Store (opens in new tab)">
            <button className="rounded-xl px-6 h-14 gap-3 border border-white/15 text-white hover:bg-white/5 transition-all flex items-center cursor-pointer bg-transparent">
              <Apple className="w-6 h-6" />
              <div className="text-left">
                <div className="text-[10px] leading-none opacity-50">Download on the</div>
                <div className="text-sm font-semibold leading-tight">App Store</div>
              </div>
            </button>
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.lokfeel.app" target="_blank" rel="noopener noreferrer" aria-label="Download LokFeel from Google Play (opens in new tab)">
            <button className="rounded-xl px-6 h-14 gap-3 border border-white/15 text-white hover:bg-white/5 transition-all flex items-center cursor-pointer bg-transparent">
              <Play className="w-6 h-6" />
              <div className="text-left">
                <div className="text-[10px] leading-none opacity-50">Get it on</div>
                <div className="text-sm font-semibold leading-tight">Google Play</div>
              </div>
            </button>
          </a>
        </div>

        <div className={`transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="https://app.lokfeel.com/register" onClick={() => { try { sessionStorage.setItem('lokfeel_from_landing', '1') } catch {} }}>
            <button className="btn-lime animate-glow-pulse rounded-full px-8 py-3 text-base font-semibold cursor-pointer border-none inline-flex items-center gap-2">
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER - 3-Column Dating App Style
   ═══════════════════════════════════════════════════════════════ */
function Footer() {
  const legalLinks = [
    { label: 'Terms of Service', href: 'https://app.lokfeel.com/terms' },
    { label: 'Privacy Policy', href: 'https://app.lokfeel.com/privacy' },
  ];

  return (
    <footer className="pt-16 pb-8 border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Simple 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display text-xl font-bold tracking-tight text-white">LokFeel</span>
            </div>
            <p className="text-sm text-white/40 max-w-xs">
              AI-powered relationship matching engine. Find genuine connections through intelligent compatibility analysis.
            </p>
          </div>

          {/* Legal */}
          <div className="md:text-right">
            <h3 className="text-sm font-semibold text-white/80 tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/40 hover:text-[#a3e635] transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider + Bottom row */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white/90 text-sm">LokFeel</span>
            <span className="text-white/30 text-xs">AI Relationship Matching Engine</span>
          </div>

          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} LokFeel Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}


/* ═══════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════ */
function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Skip Navigation — Accessibility */}
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#a3e635] focus:text-black focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <AboutSection />
        <HowSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

export default App
