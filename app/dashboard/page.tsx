import { Suspense } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, Calendar, BarChart, ArrowRight } from "lucide-react"
import { getPlayers } from "@/app/actions/player-actions"
import { getTrainingSessions } from "@/app/actions/session-actions"

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<StatCardSkeleton title="Players" />}>
          <PlayerStatsCard />
        </Suspense>

        <Suspense fallback={<StatCardSkeleton title="Training Sessions" />}>
          <SessionStatsCard />
        </Suspense>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">Analytik</CardTitle>
              <CardDescription>Training Leistungsübersicht</CardDescription>
            </div>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">Demnächst verfügbar</div>
            <p className="text-xs text-muted-foreground">Leistungsverfolgung Features</p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/analytics" className="w-full">
              <Button variant="outline" className="w-full">
                Analytik Anzeigen<ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Suspense fallback={<RecentPlayersSkeleton />}>
          <RecentPlayersCard />
        </Suspense>

        <Suspense fallback={<RecentSessionsSkeleton />}>
          <RecentSessionsCard />
        </Suspense>
      </div>
    </div>
  )
}

async function PlayerStatsCard() {
  try {
    const players = await getPlayers()
    const activePlayers = players.filter((player) => player.status === "active").length

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Spieler</CardTitle>
            <CardDescription>Gesamtzahl der registrierten Spieler</CardDescription>
          </div>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{players.length}</div>
          <p className="text-xs text-muted-foreground">{activePlayers} aktiv Spiler</p>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/players" className="w-full">
            <Button variant="outline" className="w-full">
              Alle Spieler anzeigen <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    )
  } catch (error) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Spieler</CardTitle>
            <CardDescription>Gesamtzahl der registrierten Spieler</CardDescription>
          </div>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">0 aktiv Spieler</p>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/players" className="w-full">
            <Button variant="outline" className="w-full">
              Alle Spieler anzeigen <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    )
  }
}

async function SessionStatsCard() {
  try {
    const sessions = await getTrainingSessions()
    const upcomingSessions = sessions.filter((session) => new Date(session.date) >= new Date()).length

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Training Sessions</CardTitle>
            <CardDescription>Geplant training sessions</CardDescription>
          </div>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{sessions.length}</div>
          <p className="text-xs text-muted-foreground">{upcomingSessions} Kommende sessions</p>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/sessions" className="w-full">
            <Button variant="outline" className="w-full">
              Alle sessions anzeigen <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    )
  } catch (error) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Training Sessions</CardTitle>
            <CardDescription>Geplant training sessions</CardDescription>
          </div>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">0 kommende sessions</p>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/sessions" className="w-full">
            <Button variant="outline" className="w-full">
              Alle sessions anzeigen <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    )
  }
}

async function RecentPlayersCard() {
  try {
    const players = await getPlayers()
    const recentPlayers = players
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5)

    return (
      <Card>
        <CardHeader>
          <CardTitle>Neueste Spieler</CardTitle>
          <CardDescription>Die zuletzt zum System hinzugefügten Spieler</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPlayers.length === 0 ? (
              <p className="text-sm text-muted-foreground">Noch keine Spieler hinzugefügt </p>
            ) : (
              recentPlayers.map((player) => (
                <div key={player.id} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {player.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{player.name}</p>
                    <p className="text-sm text-muted-foreground">{player.position || "No position"}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(player.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/players" className="w-full">
            <Button variant="outline" className="w-full">
              Alle Spieler anzeigen
            </Button>
          </Link>
        </CardFooter>
      </Card>
    )
  } catch (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Neueste Spieler</CardTitle>
          <CardDescription>Die zuletzt zum System hinzugefügten Spieler</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Noch keine Spieler hinzugefügt.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/players" className="w-full">
            <Button variant="outline" className="w-full">
              Alle Spieler anzeigen
            </Button>
          </Link>
        </CardFooter>
      </Card>
    )
  }
}

async function RecentSessionsCard() {
  try {
    const sessions = await getTrainingSessions()
    const upcomingSessions = sessions
      .filter((session) => new Date(session.date) >= new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5)

    return (
      <Card>
        <CardHeader>
          <CardTitle>Kommende sessions</CardTitle>
          <CardDescription>Nächste kommende Training sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingSessions.length === 0 ? (
              <p className="text-sm text-muted-foreground">Keine geplant kommende sessions.</p>
            ) : (
              upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{session.title}</p>
                    <p className="text-sm text-muted-foreground">{session.location || "No location"}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{new Date(session.date).toLocaleDateString()}</div>
                </div>
              ))
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/sessions" className="w-full">
            <Button variant="outline" className="w-full">
              Alle sessions anzeigen
            </Button>
          </Link>
        </CardFooter>
      </Card>
    )
  } catch (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Kommende Sessions</CardTitle>
          <CardDescription>Nächste kommende Training sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Keine kommende Training sessions.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/sessions" className="w-full">
            <Button variant="outline" className="w-full">
              Alle sessions anzeigen
            </Button>
          </Link>
        </CardFooter>
      </Card>
    )
  }
}

function StatCardSkeleton({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <CardDescription>Laden...</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-4 w-40 mt-2" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}

function RecentPlayersSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Neuste Spieler</CardTitle>
        <CardDescription>Die zuletzt zum System hinzugefügten Spieler</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-3 w-[80px]" />
              </div>
              <Skeleton className="h-4 w-[80px]" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}

function RecentSessionsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kommende Sessions</CardTitle>
        <CardDescription>Näachste geplant Training sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-3 w-[80px]" />
              </div>
              <Skeleton className="h-4 w-[80px]" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}
