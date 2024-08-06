"use client";

import { AppwriteProvider } from "@/context/use-appwrite";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <AppwriteProvider>{children}</AppwriteProvider>;
}
