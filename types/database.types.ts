export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          active: boolean | null
          created_at: string
          email: string
          id: string
          password: string
          username: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          email: string
          id?: string
          password: string
          username: string
        }
        Update: {
          active?: boolean | null
          created_at?: string
          email?: string
          id?: string
          password?: string
          username?: string
        }
        Relationships: []
      }
      agents: {
        Row: {
          account_id: string
          avatar: string | null
          context: string | null
          cookies: string | null
          created_at: string
          description: string
          engagement_hooks: string | null
          engagement_rules: string | null
          ethical_boundaries: string | null
          fact_check_threshold: number
          id: number
          image_style: string
          language: string | null
          last_posted_date: string | null
          model: Database["public"]["Enums"]["model"]
          multi_model: boolean | null
          public: boolean
          stance: number
          style: number
          tags: string[] | null
          team: number
          time_to_post: string | null
          tone: number
          username: string
        }
        Insert: {
          account_id: string
          avatar?: string | null
          context?: string | null
          cookies?: string | null
          created_at?: string
          description: string
          engagement_hooks?: string | null
          engagement_rules?: string | null
          ethical_boundaries?: string | null
          fact_check_threshold: number
          id?: number
          image_style: string
          language?: string | null
          last_posted_date?: string | null
          model: Database["public"]["Enums"]["model"]
          multi_model?: boolean | null
          public: boolean
          stance: number
          style: number
          tags?: string[] | null
          team: number
          time_to_post?: string | null
          tone: number
          username: string
        }
        Update: {
          account_id?: string
          avatar?: string | null
          context?: string | null
          cookies?: string | null
          created_at?: string
          description?: string
          engagement_hooks?: string | null
          engagement_rules?: string | null
          ethical_boundaries?: string | null
          fact_check_threshold?: number
          id?: number
          image_style?: string
          language?: string | null
          last_posted_date?: string | null
          model?: Database["public"]["Enums"]["model"]
          multi_model?: boolean | null
          public?: boolean
          stance?: number
          style?: number
          tags?: string[] | null
          team?: number
          time_to_post?: string | null
          tone?: number
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "agents_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agents_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          agent: number | null
          content: string | null
          id: number
          media_url: string | null
          score: number | null
          status: Database["public"]["Enums"]["post_status"] | null
          timestamp: number | null
          x_url: string | null
        }
        Insert: {
          agent?: number | null
          content?: string | null
          id?: number
          media_url?: string | null
          score?: number | null
          status?: Database["public"]["Enums"]["post_status"] | null
          timestamp?: number | null
          x_url?: string | null
        }
        Update: {
          agent?: number | null
          content?: string | null
          id?: number
          media_url?: string | null
          score?: number | null
          status?: Database["public"]["Enums"]["post_status"] | null
          timestamp?: number | null
          x_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_agent_fkey"
            columns: ["agent"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          description: string | null
          id: number
          image_uri: string | null
          name: string | null
          users: Json | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          image_uri?: string | null
          name?: string | null
          users?: Json | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          image_uri?: string | null
          name?: string | null
          users?: Json | null
        }
        Relationships: []
      }
      users: {
        Row: {
          about: string | null
          avatar_url: string | null
          email: string | null
          full_name: string | null
          id: string
          team: number | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          about?: string | null
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          team?: number | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          about?: string | null
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          team?: number | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      model:
        | "llama-3.3-70b"
        | "llama-3.2-3b"
        | "llama-3.1-405b"
        | "qwen32b"
        | "deepseek-r1-llama-70b"
        | "deepseek-r1-671b"
        | "dolphin-2.9.2-qwen2-72b"
      post_status: "draft" | "scheduled" | "published"
      role: "owner" | "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
