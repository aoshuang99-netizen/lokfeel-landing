/* ═══════════════════════════════════════════════════════════════
   APP DOWNLOAD SECTION
   PWA/Web App focus - No native app downloads yet
   ═══════════════════════════════════════════════════════════════ */

import { useState } from 'react'
import { Apple, Play, Heart, Sparkles, Star, Bell, Smartphone, Globe, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LokFeeAppIcon } from './LokFeeLogo'

interface AppDownloadProps {
  variant?: 'hero' | 'footer' | 'inline'
}

export function AppDownload({ variant = 'hero' }: AppDownloadProps) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
    }
  }

  if (variant === 'footer') {
    return (
      <div className="flex flex-col gap-3">
        <a 
          href="https://app.lokfeel.com"
          className="inline-flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-rose-500/20 to-purple-500/20 hover:from-rose-500/30 hover:to-purple-500/30 border border-rose-500/30 rounded-xl transition-all group"
        >
          <Globe className="w-5 h-5 text-rose-400" />
          <div className="text-left">
            <p className="text-[10px] text-white/50 uppercase tracking-wider">Available Now</p>
            <p className="text-sm font-semibold text-white">Web App</p>
          </div>
        </a>
        <p className="text-xs text-muted-foreground">
          Native apps coming soon
        </p>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-4">
        <a 
          href="https://app.lokfeel.com"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 rounded-lg transition-all"
        >
          <Globe className="w-5 h-5 text-white" />
          <span className="text-sm font-medium text-white">Open Web App</span>
        </a>
      </div>
    )
  }

  // Hero variant - Full section with PWA focus
  return (
    <section id="download" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/5 to-purple-500/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-rose-500/10 to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Available Now</span>
          </div>

          {/* App Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <LokFeeAppIcon size={80} />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-rose-500/30 blur-2xl rounded-2xl -z-10 animate-pulse-slow" />
            </div>
          </div>

          {/* Headline */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Take <span className="text-gradient">LokFee!</span> with you
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Your curated matches, delivered to your pocket. Access LokFee! instantly from any device.
          </p>
        </div>

        {/* Web App CTA */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-rose-500/10 via-purple-500/10 to-amber-500/10 border border-rose-500/20">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-500 via-purple-600 to-amber-500 flex items-center justify-center shrink-0">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-xl font-semibold mb-2">Web App — Available Now</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  No download required. Add to your home screen for a native-like experience on any device.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                  <a 
                    href="https://app.lokfeel.com"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all"
                  >
                    <Smartphone className="w-5 h-5" />
                    Open Web App
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Cards */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12 opacity-60">
          {/* iOS Card */}
          <div className="relative p-6 rounded-2xl border border-border/50 bg-card/20">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-black flex items-center justify-center shrink-0">
                <Apple className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">iOS App</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  For iPhone and iPad
                </p>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="text-xs text-muted-foreground ml-2">Coming Soon</span>
                </div>
              </div>
            </div>
          </div>

          {/* Android Card */}
          <div className="relative p-6 rounded-2xl border border-border/50 bg-card/20">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-green-600 flex items-center justify-center shrink-0">
                <Play className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Android App</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  For Android phones & tablets
                </p>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="text-xs text-muted-foreground ml-2">Coming Soon</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notify Form */}
        <div className="max-w-md mx-auto">
          <p className="text-center text-sm text-muted-foreground mb-4">
            Be the first to know when native apps launch
          </p>
          
          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-green-400 bg-green-500/10 rounded-xl py-4">
              <Heart className="w-5 h-5 fill-current" />
              <span className="font-medium">You&apos;re on the list! We&apos;ll notify you soon.</span>
            </div>
          ) : (
            <form onSubmit={handleNotify} className="flex gap-3">
              <div className="relative flex-1">
                <Bell className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-12 pl-10 pr-4 bg-card/60 border border-border/50 rounded-xl text-sm focus:outline-none focus:border-rose-500/50 transition-colors"
                />
              </div>
              <Button 
                type="submit" 
                className="h-12 px-6 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-medium"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notify Me
              </Button>
            </form>
          )}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-rose-400" />
            <span>Works on Any Device</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-400" />
            <span>No Download Required</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Add to Home Screen</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   DOWNLOAD BADGES - Compact version for inline use
   ═══════════════════════════════════════════════════════════════ */
export function DownloadBadges({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {/* Web App Badge */}
      <a 
        href="https://app.lokfeel.com"
        className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-purple-600 rounded-lg hover:scale-105 transition-transform"
      >
        <Globe className="w-5 h-5 text-white" />
        <div className="text-left">
          <p className="text-[9px] text-white/80 uppercase tracking-wider leading-none">Available Now</p>
          <p className="text-sm font-semibold text-white leading-tight">Web App</p>
        </div>
      </a>
    </div>
  )
}
