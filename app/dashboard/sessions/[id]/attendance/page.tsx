import { Suspense } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft, Calendar, Clock, MapPin } from "lucide-react"
import { getSessionById } from "@/app/actions/session-actions"
import { AttendanceManager } from "@/components/AttendanceManager"

export default async function SessionAttendancePage({ params }: { params: { id: string } }) {
  const sessionId = Number.parseInt(params.id)

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/sessions">
          <Button variant="outline" size="sm" className="mr-4">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Sessions
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Session Attendance</h1>
      </div>

      <Suspense fallback={<SessionDetailsSkeleton />}>
        <SessionDetails sessionId={sessionId} />
      </Suspense>

      <div className="mt-8">
        <Suspense fallback={<AttendanceManagerSkeleton />}>
          <AttendanceManager sessionId={sessionId} />
        </Suspense>
      </div>
    </div>
  )
}

async function SessionDetails({ sessionId }: { sessionId: number }) {
  const session = await getSessionById(sessionId)

  if (!session) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p>Session not found</p>
        </CardContent>
      </Card>
    )
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours > 0 ? `${hours}h ` : ""}${mins > 0 ? `${mins}m` : ""}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{session.title}</CardTitle>
        <CardDescription>{session.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{format(new Date(session.date), "PPP")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{formatDuration(session.duration)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{session.location || "No location specified"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SessionDetailsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-[250px]" />
        <Skeleton className="h-4 w-[350px] mt-2" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-5 w-[150px]" />
          <Skeleton className="h-5 w-[100px]" />
          <Skeleton className="h-5 w-[200px]" />
        </div>
      </CardContent>
    </Card>
  )
}

function AttendanceManagerSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-4 w-[300px] mt-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
          <Skeleton className="h-[400px] w-full" />
        </div>
      </CardContent>
    </Card>
  )
}
