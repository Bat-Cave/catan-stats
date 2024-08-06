"use client";

import { account as appwriteAccount } from "@/app/appwrite";
import { Models } from "appwrite";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const AppwriteContext = createContext<any | null>(null);

function AppwriteProvider({ children }: { children: ReactNode }) {
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );

  const getAccount = async () => {
    setLoading(true);
    let user = null;
    try {
      user = (await appwriteAccount.get()) as Models.User<Models.Preferences>;
    } catch (e) {
      console.log(e);
    }
    setUser(user);
    setLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      setInitialized(true);
      getAccount();
    };

    if (!initialized) {
      init();
    }
  }, [initialized]);

  const logout = async () => {
    setLoading(true);
    await appwriteAccount.deleteSessions();
    setUser(null);
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    await appwriteAccount.createEmailPasswordSession(email, password);
    await getAccount();
  };

  return (
    <AppwriteContext.Provider value={{ user, loading, logout, login }}>
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
