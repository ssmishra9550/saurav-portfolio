"use client";

import React, { useState } from "react";
import { personalInfo } from "@/data/portfolioData";
import {
  ArrowRight,
  MessageSquare,
  Copy,
  Check,
} from "lucide-react";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative pt-28 pb-20 sm:pt-32 md:pt-40 md:pb-28 overflow-hidden radial-gradient-hero">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(700px,100vw)] h-[350px] bg-gradient-to-tr from-indigo-600/15 via-sky-500/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-500/10 blur-[90px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Eyebrow badge */}
          <div data-reveal="fade" className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 max-w-full px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs text-slate-300 mb-6 backdrop-blur-md hover:border-[#00e5b0]/40 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-[#00e5b0] shadow-[0_0_8px_#00e5b0] animate-pulse" />
            <span className="font-mono text-indigo-300 font-semibold">{personalInfo.name}</span>
            <span className="text-slate-500 hidden min-[420px]:inline">•</span>
            <span>{personalInfo.headline}</span>
          </div>

          {/* Main Headline */}
          <h1 data-reveal="fade" className="hero-title font-extrabold text-white tracking-tight mb-6">
            Turn Any Business Requirement Into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5b0] via-[#00b4d8] to-indigo-400 drop-shadow-[0_0_24px_rgba(0,229,176,0.25)]">
              Production-Ready Software.
            </span>
          </h1>

          {/* Subtitle */}
          <p data-reveal="fade" className="hero-subtitle text-slate-300 leading-relaxed max-w-3xl mb-8">
            You bring the requirements—I design, architect, and ship the complete software solution. From{" "}
            <span className="text-sky-300 font-medium">modern SaaS platforms (Next.js / React 19)</span> and{" "}
            <span className="text-indigo-300 font-medium">enterprise web apps (Angular / .NET Core)</span> to{" "}
            <span className="text-emerald-300 font-medium">ERP & ETL data pipelines (Dynamics AX, SSIS)</span> and{" "}
            <span className="text-amber-300 font-medium">clinical healthcare interoperability (HL7 / EHR)</span>.
          </p>

          {/* CTA Buttons */}
          <div data-reveal="fade" className="flex flex-wrap items-center justify-center gap-3 sm:gap-3.5 mb-10 w-full">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>

            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium rounded-xl bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white transition-all"
              title="Click to copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>

          {/* Trust & Architecture Pills */}
          <div data-reveal="fade" className="pt-4 border-t border-white/5 w-full max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3.5">
              Production Stacks & Architecture Patterns
            </p>
            <div className="flex flex-wrap justify-center items-center gap-2 text-xs">
              {[
                "Next.js 16 / React 19",
                "Angular 18",
                "C# / ASP.NET Core",
                "Python",
                "SQL Server & T-SQL",
                "Clean Architecture",
                "Docker Containers",
                "Dynamics AX 2012 R3",
                "SSIS & SSRS",
                "HL7 v2 & Healthcare IT",
                "Meta WhatsApp API",
                "AI-Accelerated Workflows",
              ].map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 font-mono text-[11px] hover:border-indigo-400/30 hover:text-white transition-colors"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
