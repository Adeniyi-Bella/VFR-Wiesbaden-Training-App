"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreHorizontal, Check, X } from "lucide-react"
// import { getPlayers } from "@/app/actions/player-actions"
import {
  addPlayerToSession,
  updatePlayerSession,
  removePlayerFromSession,
} from "@/app/actions/session-actions"
import type { Player } from "@/types/player"



export function AttendanceManagerClient({
  sessionId,
  initialSessionPlayers,
  availablePlayers,
}: {
  sessionId: number
  initialSessionPlayers: any[]
  availablePlayers: Player[]
}) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [sessionPlayers, setSessionPlayers] = useState(initialSessionPlayers)

  // Filter session players based on search term
  const filteredSessionPlayers = sessionPlayers.filter((sp) =>
    sp.players.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddPlayer = async (playerId: number) => {
    try {
      await addPlayerToSession(sessionId, playerId)
      router.refresh()
    } catch (error) {
      console.error("Failed to add player to session:", error)
    }
  }

  const handleUpdateStatus = async (playerId: number, status: string) => {
    try {
      await updatePlayerSession(sessionId, playerId, { attendance_status: status })

      // Update local state
      setSessionPlayers((prev) =>
        prev.map((sp) => (sp.player_id === playerId ? { ...sp, attendance_status: status } : sp)),
      )
    } catch (error) {
      console.error("Failed to update player status:", error)
    }
  }

  const handleUpdatePerformance = async (playerId: number, rating: number, notes: string) => {
    try {
      await updatePlayerSession(sessionId, playerId, {
        performance_rating: rating,
        notes: notes,
      })

      // Update local state
      setSessionPlayers((prev) =>
        prev.map((sp) => (sp.player_id === playerId ? { ...sp, performance_rating: rating, notes: notes } : sp)),
      )
    } catch (error) {
      console.error("Failed to update player performance:", error)
    }
  }

  const handleRemovePlayer = async (playerId: number) => {
    try {
      await removePlayerFromSession(sessionId, playerId)

      // Update local state
      setSessionPlayers((prev) => prev.filter((sp) => sp.player_id !== playerId))
    } catch (error) {
      console.error("Failed to remove player from session:", error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>
      case "tentative":
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            Tentative
          </Badge>
        )
      case "declined":
        return <Badge variant="destructive">Declined</Badge>
      case "attended":
        return <Badge className="bg-blue-500">Attended</Badge>
      case "absent":
        return <Badge variant="destructive">Absent</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Attendance</CardTitle>
        <CardDescription>Track player attendance and performance for this training session</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search players..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Player
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Player to Session</DialogTitle>
                <DialogDescription>Select a player to add to this training session.</DialogDescription>
              </DialogHeader>

              <div className="max-h-[300px] overflow-y-auto mt-4">
                {availablePlayers.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">All players have been added to this session.</p>
                ) : (
                  <div className="space-y-2">
                    {availablePlayers.map((player) => (
                      <div key={player.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            {player.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium">{player.name}</p>
                            <p className="text-sm text-muted-foreground">{player.position || "No position"}</p>
                          </div>
                        </div>
                        <Button size="sm" onClick={() => handleAddPlayer(player.id)}>
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => {}}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSessionPlayers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    {searchTerm
                      ? "No players match your search. Try a different term."
                      : "No players added to this session yet."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredSessionPlayers.map((sp) => (
                  <TableRow key={sp.player_id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {sp.players.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium">{sp.players.name}</p>
                          <p className="text-sm text-muted-foreground">{sp.players.position || "No position"}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        defaultValue={sp.attendance_status}
                        onValueChange={(value) => handleUpdateStatus(sp.player_id, value)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Select status">{getStatusBadge(sp.attendance_status)}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="confirmed">
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              Confirmed
                            </div>
                          </SelectItem>
                          <SelectItem value="tentative">
                            <div className="flex items-center gap-2">
                              <span className="h-4 w-4 text-yellow-500">?</span>
                              Tentative
                            </div>
                          </SelectItem>
                          <SelectItem value="declined">
                            <div className="flex items-center gap-2">
                              <X className="h-4 w-4 text-red-500" />
                              Declined
                            </div>
                          </SelectItem>
                          <SelectItem value="attended">
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-blue-500" />
                              Attended
                            </div>
                          </SelectItem>
                          <SelectItem value="absent">
                            <div className="flex items-center gap-2">
                              <X className="h-4 w-4 text-red-500" />
                              Absent
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            {sp.performance_rating ? `${sp.performance_rating}/10` : "Rate"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Player Performance</DialogTitle>
                            <DialogDescription>Rate {sp.players.name}'s performance in this session</DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Performance Rating (1-10)</label>
                              <Select
                                defaultValue={sp.performance_rating?.toString() || ""}
                                onValueChange={(value) =>
                                  handleUpdatePerformance(sp.player_id, Number.parseInt(value), sp.notes || "")
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select rating" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                                    <SelectItem key={rating} value={rating.toString()}>
                                      {rating} - {rating < 4 ? "Poor" : rating < 7 ? "Average" : "Excellent"}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium">Notes</label>
                              <Textarea
                                placeholder="Add notes about the player's performance"
                                defaultValue={sp.notes || ""}
                                onChange={(e) =>
                                  handleUpdatePerformance(sp.player_id, sp.performance_rating || 0, e.target.value)
                                }
                              />
                            </div>
                          </div>

                          <DialogFooter>
                            <Button variant="outline" onClick={() => {}}>
                              Close
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleRemovePlayer(sp.player_id)}
                            className="text-destructive focus:text-destructive"
                          >
                            Remove from Session
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
