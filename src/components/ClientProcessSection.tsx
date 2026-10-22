"use client";

import React from "react";
import { clientProcessSteps } from "@/data/portfolioData";
import { Workflow, ArrowRight } from "lucide-react";

export default function ClientProcessSection() {
  return (
    <section id="process" className="py-24 relative z-10 border-t border-white/5 bg-[#070b14]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300 mb-3">
            <Workflow className="w-3.5 h-3.5" />
            <span>How We Work Together</span>
          </div>
          <h2 data-reveal="heading" className="section-title font-extrabold text-white tracking-tight">
            From Requirements to Production in 5 Steps
          </h2>
          <p data-reveal="fade" className="text-slate-400 mt-2 text-sm sm:text-base leading-relaxed">
            A transparent, agile, and disciplined delivery framework designed to ship software on-time with zero surprises.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {clientProcessSteps.map((step, idx) => (
            <div
              key={step.step}
              data-reveal="card"
              className="fx-card glass-panel rounded-2xl p-5 border border-white/10 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-mono text-indigo-400/80 group-hover:text-sky-400 transition-colors">
                    {step.step}
                  </span>
                  {idx < clientProcessSteps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-slate-600 hidden lg:block" />
                  )}
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
