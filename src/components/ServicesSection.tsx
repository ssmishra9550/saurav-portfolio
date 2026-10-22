"use client";

import React from "react";
import { servicesData } from "@/data/portfolioData";
import {
  Globe,
  Boxes,
  HeartPulse,
  Database,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function ServicesSection() {
  const iconMap: Record<string, React.ReactNode> = {
    Globe: <Globe className="w-6 h-6 text-sky-400" />,
    Boxes: <Boxes className="w-6 h-6 text-indigo-400" />,
    HeartPulse: <HeartPulse className="w-6 h-6 text-rose-400" />,
    Database: <Database className="w-6 h-6 text-amber-400" />,
    RefreshCw: <RefreshCw className="w-6 h-6 text-emerald-400" />,
  };

  return (
    <section id="services" className="py-24 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-300 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Versatile Full-Cycle Engineering</span>
          </div>
          <h2 data-reveal="heading" className="section-title font-extrabold text-white tracking-tight">
            What I Can Build For Your Business
          </h2>
          <p data-reveal="fade" className="text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
            I don’t just write isolated code modules—I deliver end-to-end software solutions designed to solve your operational challenges, accelerate growth, and automate complex workflows.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <div
              key={service.id}
              data-reveal="card"
              className="fx-card glass-panel rounded-2xl p-5 sm:p-7 flex flex-col justify-between border border-white/10 group"
            >
              <div>
                {/* Icon & Title */}
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {iconMap[service.iconName] || <Globe className="w-6 h-6 text-indigo-400" />}
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-sky-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Deliverables */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                    Key Deliverables:
                  </span>
                  <ul className="space-y-1.5">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Stack & Action */}
              <div className="pt-4 border-t border-white/5">
                <span className="text-[10px] font-mono text-slate-400 block mb-2">
                  Typical Architecture:
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300 font-mono text-[11px] block text-center mb-3 break-words" title={service.typicalStack}>
                  {service.typicalStack}
                </span>

                <a
                  href="#contact"
                  className="relative z-[2] w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg bg-white/5 hover:bg-sky-500 hover:text-white text-slate-200 border border-white/10 hover:border-sky-400 transition-all"
                >
                  <span>Request a Scope Review</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
