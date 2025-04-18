"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { SessionDialog } from "@/components/session-dialog"

export function SessionHeader() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Training Sessions</h1>
        <p className="text-muted-foreground mt-1">Schedule and manage training sessions for your team.</p>
      </div>
      <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        Add Session
      </Button>

      <SessionDialog open={open} onOpenChange={setOpen} mode="create" />
    </div>
  )
}
