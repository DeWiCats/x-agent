"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/client";

export const useUsersHook = () => {
  const [user, setUser] = useState<Tables<"users"> | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const { data: userData } = await supabase
          .from("users")
          .select("*")
          .eq("id", data.user.id)
          .single();
        setUser(userData);
      }
    };
    fetchUser();
  }, []);

  return {
    user,
    setUser,
  };
};

export type Users = ReturnType<typeof useUsersHook>;

const UsersContext = createContext<Users | null>(null);

const { Provider } = UsersContext;

const UsersProvider = ({ children }: { children: ReactNode }) => {
  return <Provider value={useUsersHook()}>{children}</Provider>;
};

const useUsers = (): Users => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers has to be used within <UsersProvider>");
  }
  return context;
};

export { useUsers, UsersProvider };
