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
  alternates: {
    canonical: siteUrl,
  },
  title: {
    default: "Jitin Nair | AI Systems Architect & Agentic AI Expert",
    template: "%s | Jitin Nair",
  },
  description:
    "Jitin Nair is an AI Systems Architect based in Bangalore, India, specializing in multi-agent orchestration, agentic AI, and autonomous systems. 200+ AI agents deployed. Expert in LangGraph, MCP, RAG, and Bayesian inference systems.",
  keywords: [
    "Jitin Nair",
    "Jitin",
    "AI Systems Architect",
    "Multi-Agent Orchestration",
    "Agentic AI",
    "LangGraph Expert",
    "Model Context Protocol",
    "MCP",
    "AI Enablement",
    "Autonomous Systems",
    "Prompt Engineering",
    "Full-Stack Developer",
    "AI Automation",
    "RAG Architecture",
    "Bayesian Inference",
    "Quantitative Finance AI",
    "Predator Nexus",
    "OpenClaw",
    "AI Governance",
    "Human-in-the-Loop",
    "Next.js Developer",
    "TypeScript",
    "Bangalore",
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
        {/* RSS Auto-Discovery */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Jitin Nair — AI Systems Architect | Insights RSS Feed"
          href={`${siteUrl}/feed.xml`}
        />
        {/* JSON-LD Structured Data: Person — Enhanced for Entity Building */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Jitin Nair",
              url: siteUrl,
              image: `${siteUrl}/og-image.svg`,
              jobTitle: "AI Systems Architect",
              description: "Jitin Nair is an AI Systems Architect based in Bangalore, India. He specializes in multi-agent orchestration, agentic AI systems, and autonomous platform engineering. He has deployed over 200 AI agents across 147 instances, with expertise spanning LangGraph, Model Context Protocol (MCP), RAG architecture, and high-frequency trading systems.",
              knowsAbout: [
                {
                  "@type": "Thing",
                  "name": "Artificial Intelligence",
                  "sameAs": "https://en.wikipedia.org/wiki/Artificial_intelligence"
                },
                {
                  "@type": "Thing",
                  "name": "Agentic AI",
                  "sameAs": "https://www.anthropic.com/news/model-context-protocol"
                },
                {
                  "@type": "Thing",
                  "name": "Model Context Protocol (MCP)",
                  "sameAs": "https://modelcontextprotocol.io"
                },
                {
                  "@type": "Thing",
                  "name": "LangGraph",
                  "sameAs": "https://www.langchain.com/langgraph"
                },
                "Multi-Agent Systems",
                "Prompt Engineering",
                "RAG Architecture",
                "Bayesian Inference",
                "Full-Stack Development",
                "Next.js",
                "TypeScript",
                "Python",
                "Instructional Design",
                "AI Enablement",
                "Autonomous Systems",
                "Quantitative Finance",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Independent",
                url: siteUrl,
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bangalore",
                addressRegion: "Karnataka",
                addressCountry: "IN",
              },
              sameAs: [
                "https://github.com/notjitin-1994",
                "https://www.linkedin.com/in/notjitin/",
                "https://twitter.com/not_jitin",
                "https://instagram.com/not.jitin",
              ],
            }),
          }}
        />
        {/* JSON-LD Structured Data: WebSite — Site Search & Entity */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Jitin Nair — AI Systems Architect",
              url: siteUrl,
              description: "Portfolio and insights from Jitin Nair, AI Systems Architect specializing in multi-agent orchestration and agentic AI.",
              author: {
                "@type": "Person",
                name: "Jitin Nair",
                url: siteUrl,
              },
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteUrl}/insights?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {/* JSON-LD Structured Data: FAQ for GEO Optimization */}
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
                    "text": "Jitin Nair is an AI Systems Architect based in Bangalore, India. He specializes in multi-agent orchestration, agentic AI systems, and autonomous platform engineering. He has deployed over 200 AI agents across 147 instances."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What are Jitin Nair's areas of expertise?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Jitin Nair specializes in Agentic AI, LangGraph, Model Context Protocol (MCP), RAG Architecture, Bayesian inference systems, and high-frequency trading engines like Predator Nexus."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is Predator Nexus V4.0?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Predator Nexus V4.0 is an institutional-grade AI trading ecosystem developed by Jitin Nair that performs multi-timeframe Bayesian regime detection with 91.2% accuracy across XAU/USD markets."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is the Reality-Check Protocol?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Reality-Check Protocol is a mission-critical reinforcement layer built by Jitin Nair on top of OpenClaw that implements a 3-stage hallucination elimination pipeline with hierarchical cognitive memory, reducing hallucination rates to below 2.2%."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is Jitin Nair's background?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Jitin Nair has 10 years of experience spanning customer support operations at 247.ai, instructional design at Accenture, learning and development at Moody's Analytics, and currently works as an independent AI Systems Architect deploying autonomous multi-agent systems."
                  }
                }
              ]
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
