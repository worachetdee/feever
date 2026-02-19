import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "feever — The Curated Marketplace for AI Products",
    template: "%s | feever",
  },
  description:
    "Discover and buy production-ready AI systems — workflow kits, AI-ready starters, MCP extensions, and complete launchables for the vibe coding era.",
  keywords: [
    "AI marketplace",
    "AI products",
    "cursor rules",
    "MCP extensions",
    "AI workflow",
    "vibe coding",
    "AI starters",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          {/* Ambient glow orbs — dark mode only */}
          <div className="pointer-events-none fixed left-1/2 top-0 z-0 hidden h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-red-600/20 blur-[120px] dark:block" />
          <div className="pointer-events-none fixed bottom-0 right-0 z-0 hidden h-[400px] w-[600px] rounded-full bg-amber-600/10 blur-[100px] dark:block" />

          <Header />
          <main className="relative z-10 min-h-screen pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
