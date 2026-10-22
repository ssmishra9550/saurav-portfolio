import type { Metadata, Viewport } from "next";
import "./globals.css";

// Absolute URLs are required for social preview crawlers (LinkedIn ignores relative og:image paths)
const SITE_URL = "https://ssmishra9550.github.io/saurav-portfolio/";
const OG_IMAGE = `${SITE_URL}og-image.png`; // served from public/og-image.png (1200×630)
const OG_TITLE = "Senior Full-Stack Developer & Solutions Portfolio";
const OG_DESCRIPTION = "Explore my projects, skills, and experience as a Full-Stack Developer.";

export const metadata: Metadata = {
  title: "Saurav Kumar Mishra | Senior Full-Stack Solutions Engineer & Software Architect",
  description: "Senior Full-Stack Solutions Engineer with 5+ years of experience delivering custom web apps, InsurTech SaaS, enterprise ERP integrations (Dynamics AX, SSIS), Healthcare IT (HL7, EHR), and modern Next.js / .NET Core architectures.",
  keywords: [
    "Saurav Kumar Mishra",
    "Senior Full Stack Developer",
    "Software Architect",
    "Next.js Developer",
    "React 19",
    "ASP.NET Core",
    "C# Developer",
    "Angular Developer",
    "SQL Server",
    "Dynamics AX 2012 R3",
    "SSIS",
    "HL7 v2",
    "Healthcare IT",
    "InsurTech",
    "Clean Architecture",
    "Docker"
  ],
  authors: [{ name: "Saurav Kumar Mishra" }],
  // Base for resolving relative metadata URLs (site is served from the /saurav-portfolio/ sub-path)
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  // Open Graph — used by LinkedIn, Facebook, WhatsApp, Slack previews
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: SITE_URL,
    siteName: "Saurav Kumar Mishra — Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        secureUrl: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Saurav Kumar Mishra — Senior Full-Stack Developer & Solutions Portfolio",
        type: "image/png",
      },
    ],
  },
  // Twitter / X card
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [{ url: OG_IMAGE, alt: "Saurav Kumar Mishra — Senior Full-Stack Developer & Solutions Portfolio" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#080c16",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Enable scroll-reveal styles before first paint (prevents a flash); falls back to visible if JS never boots */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('fx-ready');setTimeout(function(){if(!window.__fxBooted)d.classList.remove('fx-ready')},4000)}}catch(e){}})();",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#080c16] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
