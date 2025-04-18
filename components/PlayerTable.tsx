import { getPlayers } from "@/app/actions/player-actions"
import { PlayerTableClient } from "./player-table"

export async function PlayerTable() {
  try {
    const players = await getPlayers()
    return <PlayerTableClient initialPlayers={players} />
  } catch (error) {
    console.error("Error loading players:", error)
    return <PlayerTableClient initialPlayers={[]} />
  }
}