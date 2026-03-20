import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jitin Nair | AI Enablement & Agentic Systems",
  description:
    "Expert in AI enablement, automation, and agentic applications. Building autonomous systems that ship. 147+ specialized AI agents deployed across enterprise infrastructure, trading, and business operations.",
  keywords: [
    "AI Enablement",
    "Automation",
    "Agentic Systems",
    "LangGraph",
    "Multi-Agent Orchestration",
    "Full-Stack Developer",
    "AI Applications",
  ],
  authors: [{ name: "Jitin Nair" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
  },
  themeColor: "#0a0a0f",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Jitin Nair",
  },
  openGraph: {
    title: "Jitin Nair | AI Enablement & Agentic Systems",
    description:
      "Building autonomous systems that ship. Expert in AI enablement, automation, and agentic applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${dmSans.variable} ${jetbrains.variable} ${playfair.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}