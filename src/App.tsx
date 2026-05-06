import { useState, useEffect, useRef } from 'react'
import { Heart, Menu, X, Sun, Moon, ArrowRight, Apple, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

/* ═══════════════════════════════════════════════════════════════
   MINIMAL LOKFEEL LANDING
   Black & White. One message. Pure emotion.
   ═══════════════════════════════════════════════════════════════ */

function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    }
    return 'light'
  })
  
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }
  
  return { theme, toggleTheme }
}

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
   NAVIGATION - Minimal
   ═══════════════════════════════════════════════════════════════ */
function Navbar() {
  const { theme, toggleTheme } = useTheme()
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
      scrolled ? 'bg-background/80 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">LokFeel</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a href="https://app.lokfeel.com/register" className="hidden sm:block">
              <Button size="sm" className="rounded-full px-5">
                Get Started
              </Button>
            </a>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border p-6">
          <div className="flex flex-col gap-4">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                className="text-lg py-2">
                {l.label}
              </a>
            ))}
            <a href="https://app.lokfeel.com/register" onClick={() => setMobileOpen(false)}>
              <Button className="w-full rounded-full mt-2">Get Started</Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

/* ═══════════════════════════════════════════════════════════════
   HERO - Full-screen video background
   Feeld-style immersive experience
   ═══════════════════════════════════════════════════════════════ */
function Hero() {
  const [loaded, setLoaded] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isSlowConnection, setIsSlowConnection] = useState(false)

  useEffect(() => {
    // Detect slow connections (4G or worse)
    const conn = (navigator as any).connection
    if (conn) {
      const effectiveType = conn.effectiveType
      setIsSlowConnection(effectiveType === '2g' || effectiveType === '3g' || effectiveType === '4g')
      // Don't auto-play video on slow connections
    }
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ minHeight: '100dvh' }}>
      {/* Video Background — lazy loaded, no preload on slow connections */}
      <div className="hero-video-container">
        <video
          autoPlay={!isSlowConnection}
          muted
          loop
          playsInline
          preload={isSlowConnection ? 'none' : 'metadata'}
          className={`animate-ken-burns transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          poster="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=60"
          onLoadedData={() => setVideoLoaded(true)}
          onCanPlay={() => setVideoLoaded(true)}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Fallback: always show poster image behind video */}
        {!videoLoaded && (
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=60"
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.7) contrast(1.1) saturate(0.9)' }}
            />
          </div>
        )}
      </div>

      {/* Content — z-20 ensures always above video overlay */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center text-white py-20">
        <h1 className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Feel the connection
          <br />
          before you meet
        </h1>

        <p className={`text-lg sm:text-xl text-white/80 max-w-xl mx-auto mb-8 sm:mb-10 transition-all duration-700 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          5 curated matches weekly. Each with a reason why you click.
        </p>

        {/* CTA Buttons — Always visible, never hidden behind video */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="https://app.lokfeel.com/register" className="block w-full sm:w-auto">
            <Button size="lg" className="rounded-full px-8 py-6 text-base bg-foreground text-background hover:bg-foreground/90 shadow-lg shadow-black/20 w-full sm:w-auto">
              <Heart className="w-5 h-5 mr-2" />
              Start Free
            </Button>
          </a>
          <a href="#about" className="block w-full sm:w-auto">
            <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-base border-foreground/20 text-foreground hover:bg-foreground/5 w-full sm:w-auto">
              Learn More
            </Button>
          </a>
        </div>

        {/* 🌸 Ladies Never Pay Banner */}
        <div className={`mt-6 sm:mt-8 transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="https://app.lokfeel.com/register" className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm hover:bg-foreground/10 transition-all group">
            <span className="text-base sm:text-lg">🌸</span>
            <span className="text-foreground/90 text-xs sm:text-sm font-medium">Ladies Never Pay</span>
            <span className="text-foreground/50 text-[10px] sm:text-xs hidden sm:inline">— Premium features free for women</span>
            <ArrowRight className="w-3.5 h-3.5 text-foreground/50 group-hover:text-foreground/80 group-hover:translate-x-0.5 transition-all" />
          </a>
        </div>
      </div>

      {/* Scroll indicator — hidden on mobile (screen too short) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:block">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT - One powerful slogan with real image
   ═══════════════════════════════════════════════════════════════ */
function AboutSection() {
  const { ref, inView } = useInView()

  return (
    <section id="about" className="py-24 md:py-32" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className={`relative transition-all duration-1000 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="/images/about-couple.jpg"
                alt="Real connection"
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to placeholder if image not found
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=800&fit=crop&q=70'
                }}
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-background border border-border rounded-xl p-4 shadow-xl">
              <p className="text-3xl font-bold font-display">10K+</p>
              <p className="text-sm text-muted-foreground">Real connections made</p>
            </div>
          </div>
          
          {/* Right: Content */}
          <div className="text-center md:text-left">
            <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl tracking-tight transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Dating apps are exhausting.
            </h2>
            <p className={`text-xl text-muted-foreground mt-6 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              We built LokFeel for people who want something real.
            </p>
            <div className={`mt-8 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <a href="#how">
                <Button variant="outline" className="rounded-full px-6">
                  See how it works
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   HOW IT WORKS - Dynamic Animation Guide
   ═══════════════════════════════════════════════════════════════ */
function HowSection() {
  const { ref, inView } = useInView()
  const [activeStep, setActiveStep] = useState(0)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  const steps = [
    {
      num: '01',
      title: 'Share your story',
      desc: 'A 5-minute conversation about what matters to you.',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop&q=60',
    },
    {
      num: '02',
      title: 'Get curated matches',
      desc: '5 handpicked people weekly, with explanations why you connect.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&q=60',
    },
    {
      num: '03',
      title: 'Meet with intention',
      desc: 'Skip the small talk. Start with genuine compatibility.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&q=60',
    },
  ]

  // Auto-advance steps
  useEffect(() => {
    if (!inView) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [inView, steps.length])

  return (
    <section id="how" className="py-24 md:py-32 bg-muted/30" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <p className={`text-sm uppercase tracking-widest text-muted-foreground mb-6 text-center transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          How it works
        </p>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Animated Steps */}
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`step-card relative flex gap-6 items-start cursor-pointer p-4 rounded-xl transition-all duration-500 ${
                  activeStep === i 
                    ? 'bg-background shadow-lg scale-[1.02]' 
                    : 'opacity-60 hover:opacity-90'
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
                {/* Connection line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[2.25rem] top-16 w-0.5 h-8 bg-gradient-to-b from-border to-transparent" />
                )}
                
                {/* Step number with pulse animation */}
                <div className="relative">
                  <span className={`text-5xl font-bold font-display transition-all duration-500 ${
                    activeStep === i ? 'text-foreground' : 'text-muted-foreground/30'
                  }`}>
                    {step.num}
                  </span>
                  {activeStep === i && (
                    <div className="absolute inset-0 animate-ping">
                      <span className="text-5xl font-bold font-display text-foreground/20">{step.num}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 pt-2">
                  <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                    activeStep === i ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-muted-foreground transition-all duration-500 ${
                    activeStep === i ? 'opacity-100 max-h-20' : 'opacity-70 max-h-20'
                  }`}>
                    {step.desc}
                  </p>
                  
                  {/* Progress bar for active step */}
                  {activeStep === i && (
                    <div className="mt-4 h-0.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-foreground animate-progress" style={{ animationDuration: '4s' }} />
                    </div>
                  )}
                </div>
                
                {/* Arrow indicator */}
                <div className={`transition-all duration-300 ${activeStep === i ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>

          {/* Right: Dynamic Image with 3D effect */}
          <div 
            className={`relative aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{
              transform: inView ? 'perspective(1000px) rotateY(-3deg)' : 'perspective(1000px) rotateY(0)',
              boxShadow: '20px 20px 60px rgba(0,0,0,0.15), -5px -5px 20px rgba(255,255,255,0.1)',
            }}
          >
            {steps.map((step, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-700 ${
                  activeStep === i ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                }`}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            ))}
            
            {/* Step indicator dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeStep === i ? 'bg-white w-8' : 'bg-white/40 w-1.5 hover:bg-white/60'
                  }`}
                >
                  {activeStep === i && (
                    <div className="h-full bg-white/50 rounded-full animate-pulse" />
                  )}
                </button>
              ))}
            </div>
            
            {/* Step counter badge */}
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
   STORIES - 5 Professional Success Stories (Image-Focused Carousel)
   ═══════════════════════════════════════════════════════════════ */
function StoriesSection() {
  const { ref, inView } = useInView()
  const [activeStory, setActiveStory] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const stories: Array<{name: string; role: string; quote: string; image: string; result: string; highlight: string; avatar: string}> = [
    {
      name: 'Sarah, 32',
      role: 'Architect',
      quote: "I control who reaches me. The matching engine explained why David and I connect.",
      image: '/images/case-1-sarah.jpg',
      avatar: '/images/avatar-sarah.jpg',
      result: 'Together for 8 months',
      highlight: 'Women-first control',
    },
    {
      name: 'Marcus, 29',
      role: 'Finance Analyst',
      quote: "The relationship structure matching is brilliant. No guessing games.",
      image: '/images/case-2-marcus.jpg',
      avatar: '/images/avatar-marcus.jpg',
      result: 'Engaged after 6 months',
      highlight: 'Structure matching',
    },
    {
      name: 'Elena, 35',
      role: 'Creative Director',
      quote: "I only see verified professionals who match my goals. Quality over quantity.",
      image: '/images/case-3-elena.jpg',
      avatar: '/images/avatar-elena.jpg',
      result: 'Together for 1 year',
      highlight: 'Verified professionals',
    },
    {
      name: 'James, 31',
      role: 'Tech Entrepreneur',
      quote: "The algorithm matched me with someone complementary. It actually works.",
      image: '/images/case-4-james.jpg',
      avatar: '/images/avatar-james.jpg',
      result: 'Married after 10 months',
      highlight: 'AI matching engine',
    },
    {
      name: 'Priya, 28',
      role: 'Physician',
      quote: "LokFeel lets me set the pace. Every match came with a clear reason.",
      image: '/images/case-5-priya.jpg',
      avatar: '/images/avatar-priya.jpg',
      result: 'Together for 6 months',
      highlight: 'Purposeful matching',
    },
  ]

  // Auto-advance stories
  useEffect(() => {
    if (!inView || isPaused) return
    const interval = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % stories.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [inView, stories.length, isPaused])

  return (
    <section className="py-16 md:py-24 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <p className={`text-xs uppercase tracking-widest text-muted-foreground mb-3 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            Success Stories
          </p>
          <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl tracking-tight transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Real connections, real professionals
          </h2>
        </div>

        {/* Main Carousel - Full Width */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Large Image Carousel */}
          <div className={`relative aspect-[16/10] md:aspect-[21/9] rounded-2xl overflow-hidden transition-all duration-700 ${inView ? 'opacity-100 scale-100' : 'opacity-95 scale-98'}`}>
            {stories.map((story, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-700 ease-out ${activeStory === i ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
              >
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const fallbacks = [
                      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=600&fit=crop&q=90',
                      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&h=600&fit=crop&q=90',
                      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1200&h=600&fit=crop&q=90',
                      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1200&h=600&fit=crop&q=90',
                      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&h=600&fit=crop&q=90',
                    ]
                    ;(e.target as HTMLImageElement).src = fallbacks[i] || fallbacks[0]
                  }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
              </div>
            ))}
            
            {/* Content overlay - Compact */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
              <div className="flex items-end justify-between gap-4">
                {/* Left: Story info */}
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={stories[activeStory].avatar}
                      alt={stories[activeStory].name}
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-white/50"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  
                  {/* Text info */}
                  <div>
                    <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-full mb-1">
                      {stories[activeStory].highlight}
                    </span>
                    <p className="text-white font-bold text-base sm:text-lg md:text-xl">{stories[activeStory].name}</p>
                    <p className="text-white/70 text-xs sm:text-sm">{stories[activeStory].role} · {stories[activeStory].result}</p>
                  </div>
                </div>

                {/* Right: Quote - Hidden on mobile, shown on md+ */}
                <div className="hidden md:block max-w-md">
                  <p className="text-white/90 text-sm md:text-base italic">
                    "{stories[activeStory].quote}"
                  </p>
                </div>
              </div>
              
              {/* Mobile quote */}
              <p className="md:hidden text-white/80 text-xs mt-3 italic">
                "{stories[activeStory].quote}"
              </p>
            </div>
            
            {/* Counter badge */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
              {String(activeStory + 1).padStart(2, '0')} / {String(stories.length).padStart(2, '0')}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={() => setActiveStory((prev) => (prev - 1 + stories.length) % stories.length)}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors"
              aria-label="Previous story"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setActiveStory((prev) => (prev + 1) % stories.length)}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors"
              aria-label="Next story"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Thumbnail navigation */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
            {stories.map((story, i) => (
              <button
                key={i}
                onClick={() => setActiveStory(i)}
                className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                  activeStory === i 
                    ? 'w-16 sm:w-20 md:w-24 h-12 sm:h-14 md:h-16 ring-2 ring-foreground' 
                    : 'w-10 sm:w-12 md:w-14 h-12 sm:h-14 md:h-16 opacity-60 hover:opacity-80'
                }`}
              >
                <img
                  src={story.avatar}
                  alt={story.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const fallbacks = [
                      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&q=80',
                      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&q=80',
                      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&q=80',
                      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80',
                      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&q=80',
                    ]
                    ;(e.target as HTMLImageElement).src = fallbacks[i] || fallbacks[0]
                  }}
                />
                {activeStory === i && (
                  <div className="absolute inset-0 bg-foreground/20" />
                )}
              </button>
            ))}
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center gap-1.5 mt-3">
            {stories.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeStory === i ? 'w-6 bg-foreground' : 'w-1 bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   CTA - App Download Section
   ═══════════════════════════════════════════════════════════════ */
function CTASection() {
  const { ref, inView } = useInView()

  return (
    <section className="py-24 md:py-32 bg-muted/30" ref={ref}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className={`font-display text-3xl sm:text-4xl tracking-tight mb-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Ready for real connection?
        </h2>
        <p className={`text-muted-foreground mb-8 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Join the early access. Women get premium features free — forever.
        </p>
        
        {/* App Download Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="https://apps.apple.com/app/lokfeel" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="rounded-xl px-6 h-14 gap-3 border-2">
              <Apple className="w-6 h-6" />
              <div className="text-left">
                <div className="text-[10px] leading-none opacity-70">Download on the</div>
                <div className="text-sm font-semibold leading-tight">App Store</div>
              </div>
            </Button>
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.lokfeel.app" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="rounded-xl px-6 h-14 gap-3 border-2">
              <Play className="w-6 h-6" />
              <div className="text-left">
                <div className="text-[10px] leading-none opacity-70">Get it on</div>
                <div className="text-sm font-semibold leading-tight">Google Play</div>
              </div>
            </Button>
          </a>
        </div>

        <div className={`transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="https://app.lokfeel.com/register">
            <Button size="lg" className="rounded-full px-8">
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER - Minimal
   ═══════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-bold">LokFeel</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="https://app.lokfeel.com/privacy" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="https://app.lokfeel.com/terms" className="hover:text-foreground transition-colors">Terms</a>
            <a href="mailto:hello@lokfeel.com" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LokFeel
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
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <HowSection />
        <StoriesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

export default App
