"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { cn } from "@/lib/utils"
import type { TrainingSession, SessionFormValues } from "@/types/session"
import { createSession, updateSession } from "@/app/actions/session-actions"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useQueryClient } from "@tanstack/react-query"

const sessionSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  description: z.string().nullable(),
  date: z.date({ required_error: "A date is required" }),
  duration: z.coerce.number().int().positive({ message: "Duration must be a positive number" }),
  location: z.string().nullable(),
})

type SessionDialogProps = {
  session?: TrainingSession
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "create" | "edit" | "view"
}

export function SessionDialog({ session, open, onOpenChange, mode }: SessionDialogProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<SessionFormValues>({
    resolver: zodResolver(sessionSchema),
    defaultValues: session
      ? {
          ...session,
          date: new Date(session.date),
        }
      : {
          title: "",
          description: "",
          date: new Date(),
          duration: 60,
          location: "",
        },
  })

  const onSubmit = async (data: SessionFormValues) => {
    setIsSubmitting(true)

    try {
      if (mode === "create") {
        await createSession({
          ...data,
          date: format(data.date as Date, "yyyy-MM-dd"),
        })
      } else if (mode === "edit" && session) {
        await updateSession(session.id, {
          ...data,
          date: format(data.date as Date, "yyyy-MM-dd"),
        })
      }

      onOpenChange(false)
      await queryClient.invalidateQueries({ queryKey: ["getTrainingSessions"] })
      router.refresh()
    } catch (error) {
      console.error("Error saving session:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isViewMode = mode === "view"
  const title = {
    create: "Add New Training Session",
    edit: "Edit Training Session",
    view: "Training Session Details",
  }[mode]

  const description = {
    create: "Schedule a new training session for your team.",
    edit: "Make changes to the training session details.",
    view: "View detailed information about this training session.",
  }[mode]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {isViewMode && session ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">{session.title}</h3>
              <p className="text-muted-foreground whitespace-pre-line">{session.description || "No description"}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Date</h4>
                <p className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {format(new Date(session.date), "PPP")}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Duration</h4>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {session.duration} minutes
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                <p>{session.location || "No location specified"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Created</h4>
                <p>{new Date(session.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Weekly Training" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Details about the training session"
                        className="min-h-[100px]"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
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
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" min="15" step="15" {...field} />
                      </FormControl>
                      <FormDescription>Duration in minutes</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Training Ground" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : mode === "create" ? "Create" : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}
