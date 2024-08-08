"use client";

import { account as appwriteAccount } from "@/app/appwrite";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getGamesByUser } from "./appwrite-functions";

const AppwriteContext = createContext<any | null>(null);

function AppwriteProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await appwriteAccount.get(),
  });

  const { data: games } = useQuery({
    queryKey: ["games"],
    queryFn: async () => await getGamesByUser({ userId: user?.$id! }),
    enabled: !!user,
  });

  const logout = async () => {
    setLoading(true);
    await appwriteAccount.deleteSessions();
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    await appwriteAccount.createEmailPasswordSession(email, password);
    await refetch();
    setLoading(false);
  };

  return (
    <AppwriteContext.Provider
      value={{
        user,
        loading: loading || isLoading,
        logout,
        login,
        games: games?.documents || [],
      }}
    >
      {children}
    </AppwriteContext.Provider>
  );
}

function useAppwrite() {
  const context = useContext(AppwriteContext);
  if (context === undefined) {
    throw new Error("useAppwrite must be used within a AppwriteProvider");
  }
  return context;
}

export { AppwriteProvider, useAppwrite };
