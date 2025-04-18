"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { PlayerDialog } from "@/components/player-dialog"

type DashboardHeaderProps = {
  title?: string
  description?: string
}

export function DashboardHeader({
  title = "Player Management",
  // description = "Manage your team players - add, edit, view, and remove players.",
}: DashboardHeaderProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {/* <p className="text-muted-foreground mt-1">{description}</p> */}
      </div>
      <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        Spieler anlegen
      </Button>

      <PlayerDialog open={open} onOpenChange={setOpen} mode="create" />
    </div>
  )
}
