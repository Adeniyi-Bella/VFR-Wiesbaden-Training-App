"use server"

import { revalidatePath } from "next/cache"
import { getServerSupabaseClient } from "@/lib/supabase"
import type { Player, NewPlayer } from "@/types/player"

// Get all players
export async function getPlayers(): Promise<Player[]> {
  const supabase = getServerSupabaseClient()

  try {
    const { data, error } = await supabase.from("players").select("*").order("name")

    if (error) {
      console.error("Error fetching players:", error)
      return [] // Return empty array instead of throwing
    }

    return data || []
  } catch (error) {
    console.error("Failed to fetch players:", error)
    return [] // Return empty array on any error
  }
}

// Get a single player by ID
export async function getPlayerById(id: number): Promise<Player | null> {
  const supabase = getServerSupabaseClient()

  const { data, error } = await supabase.from("players").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching player with ID ${id}:`, error)
    return null
  }

  return data
}

// Create a new player
export async function createPlayer(player: NewPlayer): Promise<Player> {
  
  const supabase = getServerSupabaseClient()

  const { data, error } = await supabase.from("players").insert([player]).select().single()

  if (error) {
    console.error("Error creating player:", error)
    throw new Error("Failed to create player")
  }

  revalidatePath("/dashboard")
  return data
}

// Update an existing player
export async function updatePlayer(id: number, player: Partial<Player>): Promise<Player> {
  const supabase = getServerSupabaseClient()

  // Add updated_at timestamp
  const updatedPlayer = {
    ...player,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase.from("players").update(updatedPlayer).eq("id", id).select().single()

  if (error) {
    console.error(`Error updating player with ID ${id}:`, error)
    throw new Error("Failed to update player")
  }

  revalidatePath("/dashboard")
  return data
}

// Delete a player
export async function deletePlayer(id: number): Promise<void> {
  const supabase = getServerSupabaseClient()

  const { error } = await supabase.from("players").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting player with ID ${id}:`, error)
    throw new Error("Failed to delete player")
  }

  revalidatePath("/dashboard")
}
