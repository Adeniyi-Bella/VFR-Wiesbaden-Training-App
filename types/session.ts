export type TrainingSession = {
  id: number
  title: string
  description: string | null
  date: string
  duration: number
  location: string | null
  created_at: string
  updated_at: string
}

export type NewTrainingSession = Omit<TrainingSession, "id" | "created_at" | "updated_at">
export type SessionFormValues = Omit<NewTrainingSession, "date"> & {
  date: Date | null
}

export type PlayerSession = {
  player_id: number
  session_id: number
  attendance_status: string
  performance_rating: number | null
  notes: string | null
}
