import type { Metadata, Viewport } from "next";
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

const siteUrl = "https://jitinnair.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#0a0a0f",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jitin Nair | AI Systems Architect & Agentic AI Expert",
    template: "%s | Jitin Nair",
  },
  description:
    "AI Systems Architect specializing in multi-agent orchestration, AI enablement, and autonomous systems. 200+ AI agents deployed across 147 instances.",
  keywords: [
    "AI Enablement",
    "AI Systems Architect",
    "Agentic AI",
    "LangGraph",
    "Multi-Agent Orchestration",
    "Prompt Engineering",
    "Full-Stack Developer",
    "AI Automation",
    "Human-in-the-Loop",
    "RAG Architecture",
  ],
  authors: [{ name: "Jitin Nair", url: siteUrl }],
  creator: "Jitin Nair",
  publisher: "Jitin Nair",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Jitin Nair — AI Systems Architect",
    title: "Jitin Nair | AI Systems Architect & Agentic AI Expert",
    description:
      "200+ AI agents deployed. Specializing in multi-agent orchestration, AI enablement, and autonomous systems architecture.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jitin Nair — AI Systems Architect",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jitin Nair | AI Systems Architect",
    description: "200+ AI agents deployed. Multi-agent orchestration, AI enablement, autonomous systems.",
    images: ["/og-image.png"],
    creator: "@notjitin",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Jitin Nair",
  },
  other: {
    "google-site-verification": "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* JSON-LD Structured Data: Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Jitin Nair",
              url: siteUrl,
              jobTitle: "AI Systems Architect",
              description: "AI Systems Architect specializing in multi-agent orchestration, AI enablement, and autonomous systems.",
              knowsAbout: ["Artificial Intelligence", "Multi-Agent Systems", "LangGraph", "Prompt Engineering", "Instructional Design"],
              sameAs: [
                "https://github.com/notjitin-1994",
                "https://linkedin.com/in/jitin-nair",
                "https://twitter.com/notjitin",
              ],
            }),
          }}
        />
      </head>
      <body className={`${dmSans.variable} ${jetbrains.variable} ${playfair.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
