export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      agents: {
        Row: {
          avatar: string | null;
          character_slug: string | null;
          cookies: string | null;
          created_at: string;
          id: number;
          last_posted_date: string | null;
          password: string;
          team: number | null;
          time_to_post: string | null;
          username: string;
        };
        Insert: {
          avatar?: string | null;
          character_slug?: string | null;
          cookies?: string | null;
          created_at?: string;
          id?: number;
          last_posted_date?: string | null;
          password: string;
          team?: number | null;
          time_to_post?: string | null;
          username: string;
        };
        Update: {
          avatar?: string | null;
          character_slug?: string | null;
          cookies?: string | null;
          created_at?: string;
          id?: number;
          last_posted_date?: string | null;
          password?: string;
          team?: number | null;
          time_to_post?: string | null;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: "agents_team_fkey";
            columns: ["team"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          }
        ];
      };
      posts: {
        Row: {
          agent: number | null;
          content: string | null;
          id: number;
          media_base64: string | null;
          media_url: string | null;
          score: number | null;
          status: Database["public"]["Enums"]["post_status"] | null;
          timestamp: number | null;
          x_url: string | null;
        };
        Insert: {
          agent?: number | null;
          content?: string | null;
          id?: number;
          media_base64?: string | null;
          media_url?: string | null;
          score?: number | null;
          status?: Database["public"]["Enums"]["post_status"] | null;
          timestamp?: number | null;
          x_url?: string | null;
        };
        Update: {
          agent?: number | null;
          content?: string | null;
          id?: number;
          media_base64?: string | null;
          media_url?: string | null;
          score?: number | null;
          status?: Database["public"]["Enums"]["post_status"] | null;
          timestamp?: number | null;
          x_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "posts_agent_fkey";
            columns: ["agent"];
            isOneToOne: false;
            referencedRelation: "agents";
            referencedColumns: ["id"];
          }
        ];
      };
      teams: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          image_uri: string | null;
          name: string | null;
          users: Json | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          image_uri?: string | null;
          name?: string | null;
          users?: Json | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          image_uri?: string | null;
          name?: string | null;
          users?: Json | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
<<<<<<< Updated upstream
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          team: number | null;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          team?: number | null;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          team?: number | null;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
=======
          updated_at: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          about: string | null
          id: number
          role: Database["public"]["Enums"]["role"]
          team: number | null
        }
        Insert: {
          updated_at?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          about?: string | null
          id?: number
          role?: Database["public"]["Enums"]["role"]
          team?: number | null
        }
        Update: {
          updated_at?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          about?: string | null
          id?: number
          role?: Database["public"]["Enums"]["role"]
          team?: number | null
        }
>>>>>>> Stashed changes
        Relationships: [
          {
            foreignKeyName: "users_team_fkey";
            columns: ["team"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      post_status: "draft" | "scheduled" | "published";
      role: "owner" | "admin" | "user";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
