import Image from "next/image"
import { LandingNavbar } from "@/components/landing-navbar"

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
            Steigern Sie die Leistung Ihres Teams
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Verfolgen Sie die Anwesenheit von Spielern, überwachen Sie ihre Leistungen und organisieren Sie Trainingseinheiten - alles an einem Ort.
          </p>

        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-muted py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 font-semibold mb-4 md:mb-0">
              <span className="text-xl">⚽</span>
              <span>VFR Training </span>
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
