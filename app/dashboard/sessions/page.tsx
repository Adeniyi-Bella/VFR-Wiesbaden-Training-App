import { Suspense } from "react"
import { SessionTableSkeleton } from "@/components/session-table-skeleton"
import { SessionHeader } from "@/components/session-header"
import { SessionTable } from "@/components/SessionTable"

export default function SessionsPage() {
  return (
    <div className="container mx-auto py-10">
      <SessionHeader />
      <div className="mt-8">
        <Suspense fallback={<SessionTableSkeleton />}>
          <SessionTable />
        </Suspense>
      </div>
    </div>
  )
}
