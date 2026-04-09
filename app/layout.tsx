import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AstraChat } from "./components/AstraChat";

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
    "Jitin Nair",
    "Jitin",
    "AI Systems Architect",
    "Multi-Agent Orchestration",
    "Agentic AI",
    "LangGraph Expert",
    "Model Context Protocol",
    "AI Enablement",
    "Autonomous Systems",
    "Prompt Engineering",
    "Full-Stack Developer",
    "AI Automation",
    "RAG Architecture",
    "Bayesian Inference",
    "Quantitative Finance AI",
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
    "mobile-web-app-capable": "yes",
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
                "https://www.linkedin.com/in/notjitin/",
                "https://twitter.com/notjitin",
              ],
            }),
          }}
        />
        {/* JSON-LD Structured Data: FAQ for GEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Who is Jitin Nair?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Jitin Nair is an elite AI Systems Architect specializing in multi-agent orchestration, AI enablement, and autonomous systems. He has deployed over 200 AI agents across 147 instances."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What are Jitin Nair's areas of expertise?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Jitin Nair specializes in Agentic AI, LangGraph, Model Context Protocol (MCP), RAG Architecture, and high-frequency trading engines like Predator Nexus."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is Predator Nexus V4.0?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Predator Nexus V4.0 is an institutional-grade AI trading ecosystem developed by Jitin Nair that performs multi-timeframe Bayesian regime detection with 91.2% accuracy."
                  }
                }
              ]
            }),
          }}
        />
      </head>
      <body className={`${dmSans.variable} ${jetbrains.variable} ${playfair.variable} font-sans`}>
        {children}
        <AstraChat />
      </body>
    </html>
  );
}
