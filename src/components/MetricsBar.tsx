"use client";

import React from "react";
import { metricsData } from "@/data/portfolioData";
import { Award, Briefcase, Zap, ShieldCheck } from "lucide-react";

export default function MetricsBar() {
  const icons = [
    <Briefcase key="0" className="w-5 h-5 text-indigo-400" />,
    <Award key="1" className="w-5 h-5 text-sky-400" />,
    <Zap key="2" className="w-5 h-5 text-amber-400" />,
    <ShieldCheck key="3" className="w-5 h-5 text-emerald-400" />
  ];

  return (
    <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {metricsData.map((item, index) => (
          <div
            key={item.label}
            data-reveal="card"
            className="fx-card glass-panel rounded-2xl p-4 sm:p-5 flex flex-col justify-between border border-white/10"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span
                data-count
                className="text-[clamp(1.25rem,0.9rem+1.6vw,1.875rem)] font-extrabold text-white tracking-tight tabular-nums"
              >
                {item.value}
              </span>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5 shrink-0">
                {icons[index % icons.length]}
              </div>
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-semibold text-slate-200">
                {item.label}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
