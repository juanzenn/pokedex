import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import Providers from "@/components/providers";
import "@/styles/globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const BACKGROUND_URL =
  "url('https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <main
            className="flex min-h-screen flex-col py-8 bg-cover bg-no-repeat bg-center text-white"
            style={{ backgroundImage: BACKGROUND_URL }}
          >
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Pokedex - A Atrinium Challenge",
  description:
    "This Pokedex uses the Pokemon API to create a SPA. This project is a challenge from Atrinium.",
};
