// Full Player type from backend
export type Player = {
  id: number
  name: string
  position: "torwart" | "angriff" | "mittelfeldspieler"
  mannschaft: "manner" | "junge"
  status: "active" | "inactive"
  created_at: string
  updated_at: string
}

// Type used when creating a new player (no id or timestamps)
export type NewPlayer = Omit<Player, "id" | "created_at" | "updated_at">