import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { PlayerTableSkeleton } from "@/components/player-table-skeleton"
import { PlayerTable } from "@/components/PlayerTable"


export default function PlayersPage() {
  return (
    <div className="container mx-auto py-10">
      <DashboardHeader
        title="Spieler verwaltung"
        // description="Manage your team players - add, edit, view, and remove players."
      />
      <div className="mt-8">
        <Suspense fallback={<PlayerTableSkeleton />}>
          <PlayerTable />
        </Suspense>
      </div>
    </div>
  )
}
