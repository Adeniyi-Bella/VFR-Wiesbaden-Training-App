import { getPlayers } from "@/app/actions/player-actions"
import { getSessionPlayers } from "@/app/actions/session-actions"
import { AttendanceManagerClient } from "./attendance-manager"

export async function AttendanceManager({ sessionId }: { sessionId: number }) {
  try {
    const players = await getPlayers()
    const sessionPlayers = await getSessionPlayers(sessionId)

    // Extract player IDs that are already in the session
    const sessionPlayerIds = sessionPlayers.map((sp) => sp.player_id)

    // Filter out players that are already in the session
    const availablePlayers = players.filter((player) => !sessionPlayerIds.includes(player.id))

    return (
      <AttendanceManagerClient
        sessionId={sessionId}
        initialSessionPlayers={sessionPlayers}
        availablePlayers={availablePlayers}
      />
    )
  } catch (error) {
    console.error("Error loading attendance data:", error)
    return <AttendanceManagerClient sessionId={sessionId} initialSessionPlayers={[]} availablePlayers={[]} />
  }
}