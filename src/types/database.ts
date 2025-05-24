export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          username: string
          birthdate: string | null
          gender: string | null
          avatar_url: string | null
          is_premium: boolean
          role: 'admin' | 'user'
          invited_by: string | null
          updated_at: string
          is_approved: boolean
        }
        Insert: {
          id: string
          email: string
          username: string
          birthdate: string | null
          gender: string | null
          avatar_url: string | null
          is_premium: boolean
          role: 'admin' | 'user'
          invited_by: string | null
          updated_at: string
          is_approved: boolean
        }
        Update: {
          id?: string
          email?: string
          username?: string
          birthdate?: string | null
          gender?: string | null
          avatar_url?: string | null
          is_premium?: boolean
          role?: 'admin' | 'user'
          invited_by?: string | null
          updated_at?: string
          is_approved?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

export type Profile = Tables<'profiles'>
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'] 