"use client";

import React, { useState } from "react";
import { skillCategories } from "@/data/portfolioData";
import {
  Code2,
  Server,
  Database,
  Network,
  Cpu,
  Flame,
  Check,
} from "lucide-react";

export default function TechStackSection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const iconMap: Record<string, React.ReactNode> = {
    Layout: <Code2 className="w-5 h-5 text-sky-400" />,
    Server: <Server className="w-5 h-5 text-indigo-400" />,
    Database: <Database className="w-5 h-5 text-amber-400" />,
    Network: <Network className="w-5 h-5 text-rose-400" />,
    Cpu: <Cpu className="w-5 h-5 text-emerald-400" />,
  };

  return (
    <section id="skills" className="py-24 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technology Mastery</span>
          </div>
          <h2 data-reveal="heading" className="section-title font-extrabold text-white tracking-tight">
            Tools, Languages & Architecture Stacks
          </h2>
          <p data-reveal="fade" className="text-slate-400 mt-2 text-sm sm:text-base">
            Carefully curated, production-tested technologies chosen for maintainability, speed, and real-world scalability.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Skill categories">
          {skillCategories.map((category, index) => (
            <button
              key={category.title}
              onClick={() => setActiveTab(index)}
              role="tab"
              aria-selected={activeTab === index}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === index
                  ? "bg-gradient-to-r from-indigo-500 to-sky-500 text-white shadow-lg shadow-indigo-500/20"
                  : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              {iconMap[category.iconName]}
              <span>{category.title}</span>
            </button>
          ))}
        </div>

        {/* Active Category Display */}
        <div data-reveal="card" data-tilt="off" className="fx-card glass-panel rounded-2xl p-4 sm:p-8 border border-white/10 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-3">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                {iconMap[skillCategories[activeTab].iconName]}
                <span>{skillCategories[activeTab].title}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {skillCategories[activeTab].description}
              </p>
            </div>
            <span className="text-xs font-mono text-indigo-300 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 w-fit">
              {skillCategories[activeTab].skills.length} Core Competencies
            </span>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {skillCategories[activeTab].skills.map((skill) => (
              <div
                key={`${activeTab}-${skill.name}`}
                data-reveal="card"
                className="fx-card tap-target flex items-center justify-between gap-2 p-3.5 rounded-xl bg-white/5 border border-white/5"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00e5b0] shadow-[0_0_6px_#00e5b0] shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-slate-200">
                    {skill.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {skill.hot && (
                    <span className="flex items-center gap-1 text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                      <Flame className="w-3 h-3 text-rose-400" />
                      Hot
                    </span>
                  )}
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                    {skill.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
