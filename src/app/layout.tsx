import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import Nav from "@/components/Nav";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "Recipe App",
  description: "Recipe App that allows you to store, share and browse recipes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <Nav />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
