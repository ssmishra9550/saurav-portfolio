import type { Metadata, Viewport } from "next";
import "./globals.css";

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
  openGraph: {
    title: "Saurav Kumar Mishra | Senior Full-Stack Solutions Engineer",
    description: "You bring the requirements — I design, architect, and ship the complete software solution.",
    type: "website",
    locale: "en_US",
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
