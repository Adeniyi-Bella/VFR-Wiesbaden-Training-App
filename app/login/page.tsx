import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginButton } from "@/components/login-button"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/40">
      {/* Simple Navbar */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="text-xl">🏋️</span>
              <span>Training App</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Login Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Login to access your team's dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative h-40 w-full overflow-hidden rounded-lg mb-6">
              <Image src="/images/vfr.jpg" alt="Football team" fill className="object-cover" />
            </div>

            <div className="flex justify-center">
              <LoginButton className="w-full" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            <p>Login functionality will be implemented separately</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
