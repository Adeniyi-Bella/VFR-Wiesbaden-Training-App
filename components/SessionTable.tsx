import { getTrainingSessions } from "@/app/actions/session-actions"
import { SessionTableClient } from "./session-table"

export async function SessionTable() {
  try {
    const sessions = await getTrainingSessions()
    return <SessionTableClient initialSessions={sessions} />
  } catch (error) {
    console.error("Error loading sessions:", error)
    return <SessionTableClient initialSessions={[]} />
  }
}