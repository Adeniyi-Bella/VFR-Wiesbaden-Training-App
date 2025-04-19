"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import type { Player } from "@/types/player"
import { createPlayer, getPlayers, updatePlayer } from "@/app/actions/player-actions"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useQueryClient } from "@tanstack/react-query"

const playerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  position: z.enum(["torwart", "angriff", "mittelfeldspieler"]),
  mannschaft: z.enum(["manner", "junge"]),
  status: z.enum(["active", "inactive"]),
})

type PlayerFormValues = z.infer<typeof playerSchema>

type PlayerDialogProps = {
  player?: Player
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "create" | "edit" | "view"
}

export function PlayerDialog({ player, open, onOpenChange, mode }: PlayerDialogProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const queryClient = useQueryClient()


  const form = useForm<PlayerFormValues>({
    resolver: zodResolver(playerSchema),
    defaultValues: player
      ? {
        ...player,
      }
      : {
        name: "",
        position: "angriff",
        mannschaft: "manner",
        status: "active",
      },
  })

  const onSubmit = async (data: PlayerFormValues) => {
    setIsSubmitting(true)

    try {
      if (mode === "create") {
        await createPlayer({
          ...data,
        })
      } else if (mode === "edit" && player) {
        await updatePlayer(player.id, {
          ...data,
        })
      }

      onOpenChange(false)
      await queryClient.invalidateQueries({ queryKey: ["getPlayers"] })
      
      router.refresh()
    } catch (error) {
      console.error("Error saving player:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  const isViewMode = mode === "view"
  const title = {
    create: "Neu Spieler anlegen",
    edit: "Edit Player",
    view: "Player Details",
  }[mode]

  const description = {
    create: "Füge einen neuen Spieler zu deinem Team hinzu.",
    edit: "Make changes to the player profile.",
    view: "View detailed information about this player.",
  }[mode]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {isViewMode && player ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg">{getInitials(player.name)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{player.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Position</h4>
                <p>{player.position || "Not specified"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Team</h4>
                <p>{player.mannschaft || "Not specified"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                <p className="capitalize">{player.status}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Created</h4>
                <p>{new Date(player.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Aktiv</SelectItem>
                          <SelectItem value="inactive">Inaktiv</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
              <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Auswahlen.." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="torwart">Torwart</SelectItem>
                          <SelectItem value="angriff">Angriff</SelectItem>
                          <SelectItem value="mittelfeldspieler">Mittelfeldspieler</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mannschaft"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Mannschaft auswahlen " />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="manner">Manner</SelectItem>
                          <SelectItem value="junge">Junge</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input placeholder="Angriff" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="team"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team</FormLabel>
                      <FormControl>
                        <Input placeholder="Männer" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </div>

              {/* <FormField
                control={form.control}
                name="joined_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Joined Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value || undefined}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              {/* <FormField
                control={form.control}
                name="avatar_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/avatar.jpg" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormDescription>Enter a URL for the player's avatar image</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Abbrechen
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : mode === "create" ? "Anlegen" : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}
