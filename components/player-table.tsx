"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Eye, Edit, Trash } from "lucide-react"
import {  deletePlayer, getPlayers } from "@/app/actions/player-actions"
import type { Player } from "@/types/player"
import { PlayerDialog } from "./player-dialog"
import { useQuery, useQueryClient } from "@tanstack/react-query"



export function PlayerTableClient() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleDelete = async () => {
    if (!selectedPlayer) return

    try {
      await deletePlayer(selectedPlayer.id)
      setDeleteDialogOpen(false)
      await queryClient.invalidateQueries({ queryKey: ["getPlayers"] })
      router.refresh()
    } catch (error) {
      console.error("Failed to delete player:", error)
    }
  }

  const { data: players = [], isLoading, error } = useQuery({
    queryKey: ["getPlayers"],
    queryFn: getPlayers,
  })


  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  if (isLoading) return <div>Spieler Laden...</div>
  if (error) return <div>Fehler beim Laden der Spieler</div>

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Spieler</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Mannschaft</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No players found. Add your first player to get started.
                </TableCell>
              </TableRow>
            ) : (
              players.map((player) => (
                <TableRow key={player.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        {/* <AvatarImage src={player.avatar_url || undefined} alt={player.name} /> */}
                        <AvatarFallback>{getInitials(player.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{player.name}</div>
                        {/* <div className="text-sm text-muted-foreground">{player.email}</div> */}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{player.position || "N/A"}</TableCell>
                  <TableCell>{player.mannschaft || "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant={player.status === "active" ? "default" : "secondary"}>{player.status}</Badge>
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
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedPlayer(player)
                            setViewDialogOpen(true)
                          }}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedPlayer(player)
                            setEditDialogOpen(true)
                          }}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedPlayer(player)
                            setDeleteDialogOpen(true)
                          }}
                          className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                        >
                          <Trash className="h-4 w-4" />
                          Delete
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

      {/* View Player Dialog */}
      {selectedPlayer && (
        <PlayerDialog player={selectedPlayer} open={viewDialogOpen} onOpenChange={setViewDialogOpen} mode="view" />
      )}

      {/* Edit Player Dialog */}
      {selectedPlayer && (
        <PlayerDialog player={selectedPlayer} open={editDialogOpen} onOpenChange={setEditDialogOpen} mode="edit" />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {selectedPlayer?.name}'s profile and remove all their data. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
