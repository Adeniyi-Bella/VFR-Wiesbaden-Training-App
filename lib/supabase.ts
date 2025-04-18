import { createClient } from "@supabase/supabase-js"

// Create a singleton instance for the client side
let clientInstance: ReturnType<typeof createClient> | null = null

console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
// NEXT_PUBLIC_SUPABASE_URL
console.log(7);


export function getClientSupabaseClient() {
  if (clientInstance) return clientInstance


  

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase environment variables")
  }

  clientInstance = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  return clientInstance
}

// Server-side client with more privileges
export function getServerSupabaseClient() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}
