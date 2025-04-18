"use server"

import { revalidatePath } from "next/cache"
import { getServerSupabaseClient } from "@/lib/supabase"
import type { TrainingSession, NewTrainingSession } from "@/types/session"

// Get all training sessions
export async function getTrainingSessions(): Promise<TrainingSession[]> {
  const supabase = getServerSupabaseClient()

  try {
    const { data, error } = await supabase.from("training_sessions").select("*").order("date")

    if (error) {
      console.error("Error fetching training sessions:", error)
      return [] // Return empty array instead of throwing
    }

    return data || []
  } catch (error) {
    console.error("Failed to fetch training sessions:", error)
    return [] // Return empty array on any error
  }
}

// Get a single training session by ID
export async function getSessionById(id: number): Promise<TrainingSession | null> {
  const supabase = getServerSupabaseClient()

  const { data, error } = await supabase.from("training_sessions").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching training session with ID ${id}:`, error)
    return null
  }

  return data
}

// Create a new training session
export async function createSession(session: NewTrainingSession): Promise<TrainingSession> {
  const supabase = getServerSupabaseClient()

  const { data, error } = await supabase.from("training_sessions").insert([session]).select().single()

  if (error) {
    console.error("Error creating training session:", error)
    throw new Error("Failed to create training session")
  }

  revalidatePath("/dashboard/sessions")
  revalidatePath("/dashboard") // Also revalidate dashboard for stats
  return data
}

// Update an existing training session
export async function updateSession(id: number, session: Partial<TrainingSession>): Promise<TrainingSession> {
  const supabase = getServerSupabaseClient()

  // Add updated_at timestamp
  const updatedSession = {
    ...session,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase.from("training_sessions").update(updatedSession).eq("id", id).select().single()

  if (error) {
    console.error(`Error updating training session with ID ${id}:`, error)
    throw new Error("Failed to update training session")
  }

  revalidatePath("/dashboard/sessions")
  revalidatePath("/dashboard") // Also revalidate dashboard for stats
  return data
}

// Delete a training session
export async function deleteSession(id: number): Promise<void> {
  const supabase = getServerSupabaseClient()

  const { error } = await supabase.from("training_sessions").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting training session with ID ${id}:`, error)
    throw new Error("Failed to delete training session")
  }

  revalidatePath("/dashboard/sessions")
  revalidatePath("/dashboard") // Also revalidate dashboard for stats
}

// Get players for a specific session
export async function getSessionPlayers(sessionId: number) {
  const supabase = getServerSupabaseClient()

  const { data, error } = await supabase
    .from("player_sessions")
    .select(`
      player_id,
      attendance_status,
      performance_rating,
      notes,
      players:player_id (id, name, position, mannschaft)
    `)
    .eq("session_id", sessionId)

  if (error) {
    console.error(`Error fetching players for session ${sessionId}:`, error)
    throw new Error("Failed to fetch session players")
  }

  return data || []
}

// Add player to session
export async function addPlayerToSession(sessionId: number, playerId: number, status = "confirmed") {
  const supabase = getServerSupabaseClient()

  const { error } = await supabase.from("player_sessions").insert({
    session_id: sessionId,
    player_id: playerId,
    attendance_status: status,
  })

  if (error) {
    console.error(`Error adding player ${playerId} to session ${sessionId}:`, error)
    throw new Error("Failed to add player to session")
  }

  revalidatePath("/dashboard/sessions")
}

// Update player session details
export async function updatePlayerSession(
  sessionId: number,
  playerId: number,
  data: { attendance_status?: string; performance_rating?: number; notes?: string },
) {
  const supabase = getServerSupabaseClient()

  const { error } = await supabase
    .from("player_sessions")
    .update(data)
    .eq("session_id", sessionId)
    .eq("player_id", playerId)

  if (error) {
    console.error(`Error updating player ${playerId} in session ${sessionId}:`, error)
    throw new Error("Failed to update player session details")
  }

  revalidatePath("/dashboard/sessions")
}

// Remove player from session
export async function removePlayerFromSession(sessionId: number, playerId: number) {
  const supabase = getServerSupabaseClient()

  const { error } = await supabase
    .from("player_sessions")
    .delete()
    .eq("session_id", sessionId)
    .eq("player_id", playerId)

  if (error) {
    console.error(`Error removing player ${playerId} from session ${sessionId}:`, error)
    throw new Error("Failed to remove player from session")
  }

  revalidatePath("/dashboard/sessions")
}
