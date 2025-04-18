import Image from "next/image"
import { LandingNavbar } from "@/components/landing-navbar"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/football-team.jpg"
          alt="Football team"
          fill
          priority
          className="object-cover brightness-[0.6]"
        />
      </div>

      {/* Navbar */}
      <LandingNavbar />

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 px-4 mt-16">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Elevate Your Team's Performance
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Track player attendance, monitor performance, and organize training sessions all in one place.
          </p>
          
        </div>
      </div>

      {/* Features Section (placeholder) */}
      {/* <section id="features" className="relative z-10 bg-background py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Player Management</h3>
              <p className="text-muted-foreground">
                Easily manage your team roster, track player details, and monitor individual progress.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Training Sessions</h3>
              <p className="text-muted-foreground">
                Schedule and organize training sessions, track attendance, and record performance metrics.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Performance Analytics</h3>
              <p className="text-muted-foreground">
                Visualize team and player performance with comprehensive analytics and reporting tools.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="relative z-10 bg-muted py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 font-semibold mb-4 md:mb-0">
              <span className="text-xl">🏋️</span>
              <span>Training </span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Training App. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
