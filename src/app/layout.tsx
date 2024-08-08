import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import { Nav } from "@/components/nav";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { account } from "./appwrite";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Catan Stats",
  description: "Track your IRL Catan games",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: async () => await account.get(),
  });

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background flex flex-col items-center font-sans antialiased w-full font-semibold",
          quicksand.variable
        )}
      >
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Nav />
            {children}
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
