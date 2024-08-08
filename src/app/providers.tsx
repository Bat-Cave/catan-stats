"use client";

import { getQueryClient } from "@/context/react-query";
import { AppwriteProvider } from "@/context/use-appwrite";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppwriteProvider>{children}</AppwriteProvider>
    </QueryClientProvider>
  );
}
