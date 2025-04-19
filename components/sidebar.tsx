"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Users, Calendar, BarChart, Settings, Home, Menu, X } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Spieler", href: "/dashboard/players", icon: Users },
    { name: "Training Sessions", href: "/dashboard/sessions", icon: Calendar },
    // { name: "Analytiks", href: "/dashboard/analytics", icon: BarChart },
    // { name: "Einstellungen", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <>
      {/* Topbar with Hamburger - visible only on small screens */}
      <div className="absolute top-0 left-0 right-0 md:hidden flex items-center justify-between h-14 border-b px-4 bg-muted/40 z-40 ">
      {/* <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <span className="text-xl">🏋️</span>
          <span>Training App</span>
        </Link> */}
        <button onClick={() => setIsOpen(true)} className="text-muted-foreground">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Sidebar (overlay) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-muted/90 flex flex-col w-full">
          <div className="flex items-center justify-between h-14 px-4 border-b">
            {/* <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <span className="text-xl">🏋️</span>
              <span>Training App</span>
            </Link> */}
            <button onClick={() => setIsOpen(false)}>
              <X className="w-6 h-6 text-muted-foreground" />
            </button>
          </div>
          <nav className="flex-1 overflow-auto p-4">
            <ul className="grid gap-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                        isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="border-t p-4">
            <div className="flex items-center gap-3 rounded-md px-3 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="text-sm font-medium">U</span>
              </div>
              <div>
                <p className="text-sm font-medium">User</p>
                <p className="text-xs text-muted-foreground">user@example.com</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen w-64 flex-col border-r bg-muted/40">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <span className="text-xl">⚽</span>
            <span>VFR  Training App</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-auto p-2">
          <ul className="grid gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="border-t p-4">
          <div className="flex items-center gap-3 rounded-md px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-sm font-medium">U</span>
            </div>
            <div>
              <p className="text-sm font-medium">User</p>
              <p className="text-xs text-muted-foreground">user@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
