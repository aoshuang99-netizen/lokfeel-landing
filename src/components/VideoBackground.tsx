/* ═══════════════════════════════════════════════════════════════
   FEELD-STYLE IMMERSIVE VIDEO BACKGROUND
   Cinematic, atmospheric, heart-fluttering visual experience
   ═══════════════════════════════════════════════════════════════ */

import { useEffect, useState } from 'react'

interface VideoBackgroundProps {
  variant?: 'hero' | 'subtle' | 'intense'
}

export function VideoBackground({ variant = 'hero' }: VideoBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simulate video loading for smooth entrance
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const opacityMap = {
    hero: 'opacity-100',
    subtle: 'opacity-60',
    intense: 'opacity-100',
  }

  return (
    <div className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ${isLoaded ? opacityMap[variant] : 'opacity-0'}`}>
      {/* 
        Video Background - Feeld Style
        Using cinematic photo montage with Ken Burns effect
        as fallback until actual video is available
      */}
      <div className="absolute inset-0">
        {/* Layer 1: Primary cinematic image with slow zoom */}
        <div className="absolute inset-0 animate-ken-burns-slow">
          <img 
            src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&h=800&fit=crop&q=70"
            alt=""
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover scale-110"
          />
        </div>
        
        {/* Layer 2: Secondary image with reverse animation */}
        <div className="absolute inset-0 animate-ken-burns-reverse opacity-40 mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&h=800&fit=crop&q=60"
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Layer 3: Floating portrait elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-44 rounded-full overflow-hidden opacity-20 blur-xl animate-float-slow">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=200&fit=crop&crop=faces&q=50"
              alt=""
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-1/3 right-1/4 w-28 h-40 rounded-full overflow-hidden opacity-15 blur-xl animate-float-slow" style={{ animationDelay: '3s' }}>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=200&fit=crop&crop=faces&q=50"
              alt=""
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Cinematic color grading overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 0%, rgba(15, 15, 25, 0.4) 100%),
            linear-gradient(180deg, rgba(15, 15, 25, 0.3) 0%, transparent 30%, transparent 70%, rgba(15, 15, 25, 0.6) 100%),
            linear-gradient(135deg, rgba(244, 63, 94, 0.1) 0%, transparent 50%, rgba(147, 51, 234, 0.1) 100%)
          `
        }}
      />

      {/* Film grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.5) 100%)'
        }}
      />

      {/* Animated light leaks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-rose-500/10 via-transparent to-transparent blur-3xl animate-light-leak-1" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 via-transparent to-transparent blur-3xl animate-light-leak-2" />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   ATMOSPHERIC ORBS - Floating ambient elements
   ═══════════════════════════════════════════════════════════════ */
export function AtmosphericOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Large rose orb */}
      <div 
        className="absolute rounded-full animate-orb-float"
        style={{
          width: '600px',
          height: '600px',
          top: '-10%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animationDuration: '20s',
        }}
      />
      
      {/* Purple orb */}
      <div 
        className="absolute rounded-full animate-orb-float"
        style={{
          width: '500px',
          height: '500px',
          top: '40%',
          right: '-15%',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animationDuration: '25s',
          animationDelay: '-5s',
        }}
      />
      
      {/* Amber orb */}
      <div 
        className="absolute rounded-full animate-orb-float"
        style={{
          width: '400px',
          height: '400px',
          bottom: '-5%',
          left: '30%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animationDuration: '22s',
          animationDelay: '-10s',
        }}
      />

      {/* Small accent orbs */}
      <div 
        className="absolute w-32 h-32 rounded-full animate-pulse-slow"
        style={{
          top: '20%',
          left: '60%',
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.1) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
      
      <div 
        className="absolute w-24 h-24 rounded-full animate-pulse-slow"
        style={{
          bottom: '30%',
          right: '20%',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, transparent 70%)',
          filter: 'blur(15px)',
          animationDelay: '2s',
        }}
      />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   HEARTBEAT PULSE EFFECT
   Subtle heartbeat animation for key elements
   ═══════════════════════════════════════════════════════════════ */
export function HeartbeatPulse({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Pulse rings */}
      <div className="absolute inset-0 animate-heartbeat-ring rounded-full" />
      <div className="absolute inset-0 animate-heartbeat-ring-delayed rounded-full" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
