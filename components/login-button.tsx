"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface LoginButtonProps {
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  children?: React.ReactNode
}

export function LoginButton({
  className,
  size = "default",
  variant = "default",
  children = "Login",
}: LoginButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <Button onClick={handleLogin} className={className} size={size} variant={variant} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Logging in...
        </>
      ) : (
        children
      )}
    </Button>
  )
}
