"use client";

import React, { useState } from "react";
import { projectsData } from "@/data/portfolioData";
import { Project, ProjectCategory } from "@/data/types";
import ProjectModal from "./ProjectModal";
import ArchitectureModal from "./fx/ArchitectureModal";
import TerminalHeader from "./fx/TerminalHeader";
import { architectureData } from "@/data/architectureData";
import { Layers, ArrowRight, ArrowUpRight } from "lucide-react";

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [archProject, setArchProject] = useState<Project | null>(null);

  const categories: { key: ProjectCategory; label: string }[] = [
    { key: "all", label: `All Systems (${projectsData.length})` },
    { key: "saas", label: "SaaS & Web Apps" },
    { key: "enterprise", label: "Enterprise & ERP" },
    { key: "healthcare", label: "Healthcare IT" },
    { key: "integration", label: "Integrations & APIs" },
  ];

  const filteredProjects = selectedCategory === "all"
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300 mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Architectural Showcase</span>
            </div>
            <h2 data-reveal="heading" className="section-title font-extrabold text-white tracking-tight">
              Featured Systems & Case Studies
            </h2>
            <p data-reveal="fade" className="text-slate-400 mt-2 text-sm sm:text-base">
              A diverse track record of production-grade systems built across SaaS, Consumer Tech, Enterprise ERP, CRM, and Mission-Critical Healthcare.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className={`no-touch-fx px-3 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95 ${
                  selectedCategory === c.key
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              data-reveal="card"
              className="fx-card glass-panel rounded-2xl flex flex-col overflow-hidden border border-white/10 group"
            >
              {/* Live terminal header */}
              {architectureData[project.id] && (
                <TerminalHeader
                  file={architectureData[project.id].terminal.file}
                  lines={architectureData[project.id].terminal.lines}
                />
              )}

              <div className="p-5 sm:p-6">
                {/* Top Badge & Role */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    {project.categoryLabel}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {project.timeline}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-2 mb-2">
                  {project.title}
                </h3>

                {/* Subtitle / summary */}
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                  {project.subtitle}
                </p>

                {/* Key Metrics row */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5 mb-4">
                  {project.metrics.slice(0, 2).map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="text-xs font-bold text-sky-400 font-mono">{m.value}</div>
                      <div className="text-[10px] text-slate-400">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-400">
                      +{project.tags.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="relative z-[2] mt-auto p-4 bg-white/[0.02] border-t border-white/5 grid grid-cols-1 gap-2">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="w-full inline-flex items-center justify-center gap-1.5 min-h-[40px] py-2 px-3 text-xs font-semibold rounded-lg bg-white/5 hover:bg-indigo-600 hover:text-white text-slate-200 border border-white/10 hover:border-indigo-500 transition-all"
                >
                  <span>Architecture Deep Dive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                {architectureData[project.id] && (
                  <button
                    onClick={() => setArchProject(project)}
                    className="w-full inline-flex items-center justify-center gap-1.5 min-h-[40px] py-2 px-3 text-xs font-semibold rounded-lg bg-[#00e5b0]/10 text-[#5ff5d0] border border-[#00e5b0]/30 hover:bg-[#00e5b0] hover:text-slate-950 hover:shadow-[0_0_20px_rgba(0,229,176,0.45)] transition-all"
                  >
                    <span>View Architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep Dive Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />

      {/* System Architecture Flow Modal */}
      <ArchitectureModal project={archProject} onClose={() => setArchProject(null)} />
    </section>
  );
}
