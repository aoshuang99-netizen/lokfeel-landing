import { useState, useEffect, useRef } from 'react'
import {
  Heart, Shield, Users, Brain, Sparkles, ArrowRight, Check, Clock,
  MessageCircle, XCircle, Star, Lock, Zap, ChevronDown, Sun, Moon, Menu, X,
  User, Play
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

/* ═══════════════════════════════════════════════════════════════
   IMAGE ASSETS (Unsplash Free License)
   High-quality diverse portraits & couple imagery
   ═══════════════════════════════════════════════════════════════ */
const IMG = {
  // Hero — cinematic couple images for video-style background
  heroW1: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=900&fit=crop&crop=faces&q=80',
  heroW2: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=700&fit=crop&crop=faces&q=80',
  heroM1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=700&fit=crop&crop=faces&q=80',
  heroM2: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=700&fit=crop&crop=faces&q=80',
  heroW3: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=700&fit=crop&crop=faces&q=80',
  heroM3: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&h=700&fit=crop&crop=faces&q=80',
  coupleScene: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop&q=80',

  // Portraits for cards & sections
  woman1: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=faces&q=80',
  woman2: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=faces&q=80',
  woman3: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=faces&q=80',
  man1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=faces&q=80',
  man2: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=faces&q=80',
  man3: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=500&fit=crop&crop=faces&q=80',

  // Connection scenes
  conn1: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&q=80',
  conn2: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&q=80',
}

/* ═══════════════════════════════════════════════════════════════
   ATMOSPHERIC BACKGROUND — Feeld-style glow orbs
   ═══════════════════════════════════════════════════════════════ */
function Atmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <div className="atmosphere-orb" style={{
        width: '600px', height: '600px',
        top: '-10%', left: '-10%',
        background: 'hsl(330 50% 40% / 0.06)',
        animationDelay: '0s',
      }} />
      <div className="atmosphere-orb" style={{
        width: '500px', height: '500px',
        top: '40%', right: '-15%',
        background: 'hsl(260 50% 45% / 0.05)',
        animationDelay: '7s',
      }} />
      <div className="atmosphere-orb" style={{
        width: '400px', height: '400px',
        bottom: '-5%', left: '30%',
        background: 'hsl(280 40% 50% / 0.04)',
        animationDelay: '14s',
      }} />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS
   ═══════════════════════════════════════════════════════════════ */
function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="scroll-progress" style={{ width: `${progress}%` }} />
}

/* ═══════════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════════ */
function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'dark'
  )
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }
  return { theme, toggleTheme }
}

function useInView(threshold = 0.15) {
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
   FLOATING PROFILE CARD
   ═══════════════════════════════════════════════════════════════ */
function ProfileCard({ src, name, age, trait, animClass }: {
  src: string; name: string; age: number; trait: string; animClass: string
}) {
  return (
    <div className={`${animClass} w-24 h-32 sm:w-28 sm:h-36 rounded-2xl overflow-hidden shadow-2xl relative group`}>
      <img src={src} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-2.5">
        <p className="text-white text-xs font-semibold leading-tight">{name}, {age}</p>
        <p className="text-white/60 text-[10px] leading-tight mt-0.5">{trait}</p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION — Feeld-style minimal glass nav
   ═══════════════════════════════════════════════════════════════ */
function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Why Nexus', href: '#why' },
    { label: 'How It Works', href: '#how' },
    { label: 'Features', href: '#features' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      scrolled ? 'glass-strong shadow-lg shadow-black/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-all duration-300 relative">
              <Heart className="w-4 h-4 text-primary" />
              <div className="absolute inset-0 rounded-xl bg-primary/15 animate-ping opacity-20" />
            </div>
            <span className="text-lg font-bold tracking-tight">Nexus</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50">
                {l.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all cursor-pointer"
              aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a href="#waitlist" className="hidden sm:block">
              <Button size="sm" className="glow-primary">
                Join Waitlist
              </Button>
            </a>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all cursor-pointer"
              aria-label="Toggle menu">
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-border/50 animate-fade-in-down">
          <div className="px-5 py-4 space-y-1">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors">
                {l.label}
              </a>
            ))}
            <div className="pt-3">
              <a href="#waitlist" onClick={() => setMobileOpen(false)}>
                <Button className="w-full glow-primary">Join Waitlist</Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

/* ═══════════════════════════════════════════════════════════════
   HERO — Feeld-style full-screen immersive
   Video-like background with real people photos + ken burns
   ═══════════════════════════════════════════════════════════════ */
function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Trigger entrance animations after a short delay (like video loading)
    const timer = setTimeout(() => setLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Cinematic background — photos with ken burns slow pan */}
      <div className="hero-video-bg" aria-hidden="true">
        {/* Photo grid for video-like montage background */}
        <div className="absolute inset-0 opacity-40 mix-blend-luminosity">
          <div className="absolute inset-0 animate-ken-burns">
            <img src={IMG.heroW1} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        {/* Second layer — couple scene */}
        <div className="absolute inset-0 opacity-25 mix-blend-overlay">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] animate-ken-burns" style={{ animationDelay: '-12s', animationDuration: '30s' }}>
            <img src={IMG.coupleScene} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Floating background portrait blobs — very subtle */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-20 -left-10 w-72 h-96 rounded-full overflow-hidden opacity-15 blur-2xl animate-drift">
          <img src={IMG.woman2} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-1/3 -right-16 w-60 h-80 rounded-full overflow-hidden opacity-12 blur-2xl animate-drift" style={{ animationDelay: '4s' }}>
          <img src={IMG.man1} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -bottom-20 left-1/3 w-56 h-72 rounded-full overflow-hidden opacity-10 blur-2xl animate-drift" style={{ animationDelay: '8s' }}>
          <img src={IMG.woman3} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Text */}
          <div className="text-center lg:text-left">
            {/* Tag */}
            <div className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Currently in Early Access</span>
              </div>
            </div>

            {/* Headline */}
            <div className={`transition-all duration-700 delay-150 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-tight leading-[1.05] mb-6">
                A dating app{' '}
                <span className="text-gradient">for depth.</span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className={`transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                5 curated matches per week. Explanations of why you connect.
                No swiping. No games.{' '}
                <span className="text-foreground font-medium">Built for women who value substance.</span>
              </p>
            </div>

            {/* CTA */}
            <div className={`transition-all duration-700 delay-[450ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center">
                <a href="#waitlist">
                  <Button size="lg" className="text-base px-8 py-6 glow-primary-strong shimmer-border">
                    Join the Waitlist
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <a href="#how">
                  <Button variant="ghost" size="lg" className="text-base px-8 py-6 text-muted-foreground hover:text-foreground">
                    <Play className="w-4 h-4 mr-2" />
                    See How It Works
                  </Button>
                </a>
              </div>
            </div>

            {/* Trust signals */}
            <div className={`mt-14 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-3 text-sm text-muted-foreground transition-all duration-700 delay-[600ms] ${loaded ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary/70" />
                <span>Women-first approach</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary/70" />
                <span>Privacy by design</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary/70" />
                <span>Structure-based matching</span>
              </div>
            </div>
          </div>

          {/* Right — Floating profile cards mosaic */}
          <div className={`relative hidden lg:flex items-center justify-center h-[540px] transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {/* Central large portrait */}
            <div className="hero-image-container shadow-2xl w-64 h-80 z-10">
              <img src={IMG.heroW1} alt="Real person on Nexus" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-[1.25rem]" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass rounded-xl p-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary/25 flex items-center justify-center relative match-pulse">
                      <Heart className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">New match found</p>
                      <p className="text-[10px] text-white/60">Both value direct communication</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards — arranged in organic constellation */}
            <div className="absolute top-0 right-12 animate-card-1 z-20">
              <ProfileCard src={IMG.woman2} name="Elena" age={28} trait="Seeks real partnership" animClass="" />
            </div>
            <div className="absolute top-16 -left-4 animate-card-2 z-20">
              <ProfileCard src={IMG.man1} name="James" age={35} trait="Communication-first" animClass="" />
            </div>
            <div className="absolute bottom-8 right-0 animate-card-3 z-20">
              <ProfileCard src={IMG.man2} name="Marcus" age={34} trait="Values honesty" animClass="" />
            </div>
            <div className="absolute bottom-16 left-8 animate-card-2 z-0" style={{ animationDelay: '2s' }}>
              <ProfileCard src={IMG.woman3} name="Aisha" age={29} trait="Looking for intentionality" animClass="" />
            </div>

            {/* Decorative blurred circles */}
            <div className="absolute w-40 h-40 rounded-full bg-primary/5 blur-3xl top-1/4 -right-4" />
            <div className="absolute w-32 h-32 rounded-full bg-purple-500/5 blur-3xl bottom-1/4 -left-4" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in-up-delay-4">
        <a href="#why" className="flex flex-col items-center gap-2 text-muted-foreground/60 hover:text-foreground/80 transition-colors group">
          <span className="text-xs tracking-wider uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PHOTO SHOWCASE — Full-bleed gender-balanced row
   Feeld-style: large photos with names, sexuality labels
   ═══════════════════════════════════════════════════════════════ */
function UserShowcase() {
  const { ref, inView } = useInView(0.05)

  const users = [
    { src: IMG.woman1, name: 'Sarah, 32', trait: 'Bisexual', desc: 'Seeks depth over surface' },
    { src: IMG.man1, name: 'James, 35', trait: 'Straight', desc: 'Communication-first mindset' },
    { src: IMG.woman2, name: 'Elena, 28', trait: 'Pansexual', desc: 'Ready for genuine partnership' },
    { src: IMG.man2, name: 'Marcus, 34', trait: 'Straight', desc: 'Values emotional intelligence' },
    { src: IMG.woman3, name: 'Aisha, 29', trait: 'Queer', desc: 'Wants intentional connection' },
    { src: IMG.man3, name: 'David, 31', trait: 'Straight', desc: 'Relationship-minded' },
    { src: IMG.woman1, name: 'Priya, 27', trait: 'Bisexual', desc: 'Loves growth & exploration' },
    { src: IMG.man1, name: 'Chris, 36', trait: 'Straight', desc: 'Empathy-driven' },
  ]

  return (
    <section className="py-12 lg:py-16 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Real people</p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold">
          Join <span className="text-gradient">thousands</span> exploring intentional dating
        </h2>
      </div>

      {/* Infinite scroll — desktop shows all, mobile shows subset */}
      <div className={`transition-all duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}>
        {/* Row 1 → left */}
        <div className="flex gap-3 sm:gap-4 mb-3 sm:mb-4 animate-[scroll-left_40s_linear_infinite]">
          {[...users, ...users.slice(0, 4)].map((u, i) => (
            <div key={`r1-${i}`} className="flex-shrink-0 w-36 sm:w-44 lg:w-48 rounded-2xl overflow-hidden shadow-lg relative group">
              <img src={u.src} alt={u.name} className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-sm font-semibold">{u.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-white/50 text-[10px]">{u.trait}</span>
                  <span className="text-white/20">·</span>
                  <span className="text-white/40 text-[10px]">{u.desc}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 → right (reversed) */}
        <div className="flex gap-3 sm:gap-4 -mx-4 animate-[scroll-right_45s_linear_infinite]">
          {[...users.slice().reverse(), ...users.slice(0, 3).reverse()].map((u, i) => (
            <div key={`r2-${i}`} className="flex-shrink-0 w-36 sm:w-44 lg:w-48 rounded-2xl overflow-hidden shadow-lg relative group">
              <img src={u.src} alt={u.name} className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-sm font-semibold">{u.name}</p>
                <span className="text-white/50 text-[10px]">{u.trait}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   WHY SECTION — Problem statement with photo accents
   ═══════════════════════════════════════════════════════════════ */
function WhySection() {
  const { ref, inView } = useInView()

  const problems = [
    {
      icon: XCircle,
      title: "Endless Swiping Burnout",
      desc: "Dating apps are designed to keep you addicted, not matched. The game mechanics reward scrolling, not connecting.",
      img: IMG.woman2,
    },
    {
      icon: Users,
      title: "Surface-Level Matches",
      desc: "Photos and bios tell you nothing about how someone shows up in a relationship. Swipe-right signals lead to shallow connections.",
      img: IMG.man2,
    },
    {
      icon: MessageCircle,
      title: "Conversations That Fizzle",
      desc: "Even when you match, conversations die fast. Because you were matched on looks — not on the deeper patterns that sustain real connection.",
      img: IMG.woman3,
    },
  ]

  return (
    <section id="why" className="section-premium relative section-fade" ref={ref}>
      <div className="gradient-mesh" />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 relative">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-muted/80">The Problem</Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Dating apps are <span className="text-gradient">broken</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            If you're serious about finding a real relationship, the current experience is working against you.
          </p>
        </div>

        <div className={`grid md:grid-cols-3 gap-5 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {problems.map((p, i) => (
            <Card key={i} className="bg-card/60 border-border/50 hover:border-primary/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl group overflow-hidden">
              {/* Photo accent */}
              <div className="h-28 -mx-px -mt-px overflow-hidden relative opacity-25 group-hover:opacity-40 transition-opacity duration-500">
                <img src={p.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card" />
              </div>
              <CardContent className="pt-4 relative -mt-10">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4 relative z-10">
                  <p.icon className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   HOW IT WORKS — Photo timeline with alternating layout
   ═══════════════════════════════════════════════════════════════ */
function HowSection() {
  const { ref, inView } = useInView()

  const steps = [
    {
      num: '01',
      icon: Heart,
      title: 'Share Your Relationship Blueprint',
      desc: 'No endless questionnaires. A 5-minute conversation about what actually matters — your values, boundaries, and vision for partnership.',
      image: IMG.woman1,
      gender: 'female' as const,
    },
    {
      num: '02',
      icon: Brain,
      title: 'Our Engine Finds Your Matches',
      desc: 'Nexus analyzes relationship structure compatibility — attachment styles, conflict patterns, communication rhythms. Not just interests or photos.',
      image: IMG.conn2,
      gender: 'both' as const,
    },
    {
      num: '03',
      icon: Star,
      title: 'Receive 5 Curated Matches',
      desc: 'Every week, 5 high-quality matches. Each comes with a detailed explanation of why you connect — so you can decide with confidence.',
      image: IMG.man2,
      gender: 'male' as const,
    },
    {
      num: '04',
      icon: MessageCircle,
      title: 'Connect with Intention',
      desc: 'Skip the small talk. Start conversations that matter, grounded in genuine compatibility. Women always initiate — always in control.',
      image: IMG.conn1,
      gender: 'both' as const,
    },
  ]

  return (
    <section id="how" className="section-premium relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-muted/80">How It Works</Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Quality matches, <span className="text-gradient">delivered weekly</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            No algorithms optimized for engagement. No gamification. Just thoughtful matching for real connection.
          </p>
        </div>

        <div className="space-y-10 lg:space-y-16">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-6 lg:gap-12 items-center transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Photo */}
              <div className="shrink-0 w-full lg:w-72 h-56 rounded-2xl overflow-hidden shadow-xl relative group">
                <img src={s.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* Step number overlay */}
                <div className="absolute top-4 left-4">
                  <span className="text-5xl font-bold text-white/10 font-display">{s.num}</span>
                </div>
                {/* Gender badge */}
                {s.gender === 'female' && (
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full glass text-xs font-medium text-white flex items-center gap-1.5">
                    <Heart className="w-3 h-3 text-pink-400" /> Female perspective
                  </div>
                )}
                {s.gender === 'male' && (
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full glass text-xs font-medium text-white flex items-center gap-1.5">
                    <User className="w-3 h-3 text-blue-400" /> Male perspective
                  </div>
                )}
                {s.gender === 'both' && (
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full glass text-xs font-medium text-white flex items-center gap-1.5">
                    <Heart className="w-3 h-3 text-purple-400" /> Both sides
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={`flex-1 ${i % 2 === 1 ? 'lg:text-right' : ''}`}>
                <div className={`flex items-center gap-3 mb-3 ${i % 2 === 1 ? 'lg:justify-end' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   FEATURES — Card grid with Feeld-style surfaces
   ═══════════════════════════════════════════════════════════════ */
function FeaturesSection() {
  const { ref, inView } = useInView()

  const features = [
    { icon: Brain, title: 'Relationship Structure Matching', desc: 'We go beyond surface traits. Our engine matches on attachment styles, conflict resolution patterns, communication rhythms, and life vision.', highlight: true },
    { icon: Sparkles, title: 'Match Explanations', desc: 'Every match comes with a clear explanation: "You both value direct communication during conflict." Know why you connect.' },
    { icon: Shield, title: 'Conflict Pre-Filtering', desc: "Identify potential dealbreakers before you invest time. Different life timelines? Opposite financial philosophies? You'll know upfront." },
    { icon: Zap, title: 'No Questionnaire Required', desc: "Instead of 200-question surveys, we learn about you through a guided conversation. 5 minutes, not 5 hours." },
    { icon: Lock, title: 'Women Always Initiate', desc: 'Every connection starts with the woman. No unsolicited messages, no pressure. You control the pace of every interaction.' },
    { icon: Clock, title: 'Weekly Cadence', desc: "5 matches per week. We're designed for intentionality, not endless scrolling. Quality over quantity, always." },
  ]

  return (
    <section id="features" className="section-premium relative section-fade" ref={ref}>
      <div className="gradient-mesh" />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 relative">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-muted/80">Features</Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Built different. <span className="text-gradient">On purpose.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every feature designed with one goal: help you find a genuinely compatible partner without the noise.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Card
              key={i}
              className={`bg-card/60 border-border/50 hover:border-primary/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl group ${
                f.highlight ? 'sm:col-span-2 lg:col-span-1' : ''
              } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <CardContent className="pt-6">
                <div className={`w-10 h-10 rounded-lg ${f.highlight ? 'bg-gradient-to-br from-primary/20 to-purple-500/20' : 'bg-primary/10'} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   COMPARISON — Clean table
   ═══════════════════════════════════════════════════════════════ */
function ComparisonSection() {
  const { ref } = useInView()

  const rows = [
    { feature: 'Matching approach', nexus: 'Relationship structure', others: 'Surface-level swipe' },
    { feature: 'Matches per week', nexus: '5 curated', others: 'Unlimited swipes' },
    { feature: 'Match explanations', nexus: 'Detailed breakdown', others: 'None' },
    { feature: "Women's control", nexus: 'Always initiate', others: 'Reactive only' },
    { feature: 'Conflict prediction', nexus: 'Pre-filtered', others: 'Discover after dating' },
    { feature: 'Time investment', nexus: '5 min setup', others: 'Hours of swiping' },
    { feature: 'Addiction design', nexus: 'Intentional cadence', others: 'Optimized for engagement' },
  ]

  return (
    <section className="section-compact" ref={ref}>
      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Why we're <span className="text-gradient">different</span>
          </h2>
        </div>

        <Card className="overflow-hidden border-border/50 shadow-xl bg-card/60">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="text-left py-3.5 px-5 text-muted-foreground font-medium">Feature</th>
                  <th className="text-center py-3.5 px-5 text-primary font-semibold">Nexus</th>
                  <th className="text-center py-3.5 px-5 text-muted-foreground font-medium">Others</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-b border-border/20 last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-5 text-muted-foreground">{r.feature}</td>
                    <td className="py-3 px-5 text-center">
                      <span className="inline-flex items-center gap-1.5 text-foreground font-medium">
                        <Check className="w-3.5 h-3.5 text-primary" />
                        {r.nexus}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-center text-muted-foreground">{r.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SOCIAL PROOF — Testimonials with photos
   ═══════════════════════════════════════════════════════════════ */
function SocialProofSection() {
  const { ref, inView } = useInView()

  const testimonials = [
    {
      quote: "Finally, an app that matches me on what actually matters. 3 dates from Nexus and every single one felt intentional and real.",
      name: 'Sarah M.', age: 32, img: IMG.woman1, gender: 'female',
    },
    {
      quote: "Nexus pushed me to think about relationships differently. The matching explanation helped me understand what I actually need.",
      name: 'James T.', age: 35, img: IMG.man1, gender: 'male',
    },
    {
      quote: "No more ghosting, no more dead-end chats. Every match comes with real reasons why we'd work. It's refreshing.",
      name: 'Priya K.', age: 27, img: IMG.woman3, gender: 'female',
    },
  ]

  return (
    <section className="section-premium relative section-fade" ref={ref}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 relative">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-muted/80">What people say</Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Real stories from <span className="text-gradient">real users</span>
          </h2>
        </div>

        <div className={`grid md:grid-cols-3 gap-5 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {testimonials.map((t, i) => (
            <Card key={i} className="bg-card/60 border-border/50 hover:border-primary/15 transition-all duration-500 hover:-translate-y-1 overflow-hidden group">
              {/* Photo banner */}
              <div className="h-28 overflow-hidden relative">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card" />
              </div>
              <CardContent className="pt-0 relative -mt-8">
                <div className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-card mb-3 shadow-lg">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{t.name}</span>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    {t.gender === 'female' ? <><Heart className="w-2.5 h-2.5 mr-0.5" /> Female</> : <><User className="w-2.5 h-2.5 mr-0.5" /> Male</>}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   WAITLIST / CTA
   ═══════════════════════════════════════════════════════════════ */
function WaitlistSection() {
  const { ref, inView } = useInView()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const scriptUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
      await fetch(scriptUrl, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'nexus-landing', timestamp: new Date().toISOString() }),
      })
      setSubmitted(true)
    } catch {
      localStorage.setItem('nexus_waitlist_email', email)
      setSubmitted(true)
    }
    setLoading(false)
  }

  return (
    <section id="waitlist" className="section-premium relative overflow-hidden" ref={ref}>
      <div className="gradient-mesh" />
      <div className="max-w-2xl mx-auto px-5 sm:px-8 lg:px-10 text-center relative">
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Visual */}
          <div className="relative inline-flex items-center justify-center mb-8">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center relative match-pulse">
              <Heart className="w-10 h-10 text-primary" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center shadow-lg animate-card-1">
              <Heart className="w-4 h-4 text-primary" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center shadow-lg animate-card-2">
              <User className="w-4 h-4 text-blue-400" />
            </div>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Ready for <span className="text-gradient">real</span> connection?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
            Join the early access waitlist. Women are onboarded first to ensure the highest quality matching pool.
          </p>

          {submitted ? (
            <div className="glass rounded-2xl p-8 animate-scale-in">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <div className="flex items-center justify-center gap-2 text-primary font-semibold text-lg mb-2">
                <span>You're on the list!</span>
              </div>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                We'll reach out when it's your turn. Early members get priority matching and free access during beta.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={loading}
                className="h-12 bg-card/60 border-border/50 focus:border-primary"
              />
              <Button type="submit" size="lg" className="h-12 px-6 shrink-0 glow-primary-strong shimmer-border" disabled={loading}>
                {loading ? 'Joining...' : 'Join Waitlist'}
                {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </form>
          )}

          <p className="text-xs text-muted-foreground mt-4">
            No spam. No sharing your data. Early members get priority matching and free beta access.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="border-t border-border/30 py-10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-sm font-semibold">Nexus</span>
            <span className="text-xs text-muted-foreground ml-2">Relationship Matching Engine</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Nexus</p>
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
      <Atmosphere />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <UserShowcase />
        <WhySection />
        <HowSection />
        <FeaturesSection />
        <ComparisonSection />
        <SocialProofSection />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
