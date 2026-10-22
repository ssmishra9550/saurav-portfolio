"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Project } from "@/data/types";
import { X, CheckCircle, Server, Layout, Database, Wrench, Shield, ArrowRight } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  // Portal to <body> so the modal escapes the section's stacking context (sits above the navbar)
  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="animate-modal-pop relative w-full max-w-4xl bg-[#0d1424] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2.5 min-w-0">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              {project.categoryLabel}
            </span>
            {project.client && (
              <span className="text-xs text-slate-400 font-medium">
                Client: {project.client}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          {/* Title & Subtitle */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-slate-300 mt-2 text-sm sm:text-base leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
            {project.metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="text-sm sm:text-base font-bold text-sky-400">{m.value}</div>
                <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          {/* The Problem */}
          <div className="space-y-2">
            <h3 className="text-sm font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              The Business & Technical Challenge
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-amber-500/5 p-4 rounded-xl border border-amber-500/15">
              {project.problem}
            </p>
          </div>

          {/* Architectural Solution */}
          <div className="space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-wider text-indigo-400 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              The Architectural Solution
            </h3>
            <div className="space-y-2.5">
              {project.solution.map((sol, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{sol}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-200 font-semibold">
              Key System Features
            </h3>
            <ul className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white/5 p-2.5 rounded-lg border border-white/5">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Breakdown */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-mono uppercase tracking-wider text-sky-400 font-semibold flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              Technology Stack Deep Dive
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              {project.techStack.frontend && (
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Layout className="w-3.5 h-3.5 text-sky-400" />
                    <span>Frontend</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.frontend.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 font-mono text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.techStack.backend && (
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Backend</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.backend.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.techStack.database && (
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-amber-400" />
                    <span>Database & Reporting</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.database.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.techStack.integrations && (
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Integrations & APIs</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.integrations.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.techStack.devops && (
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-rose-400" />
                    <span>DevOps & Tooling</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.devops.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-mono text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Highlights */}
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/25 space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-300 font-semibold">
              Engineering Takeaways
            </h4>
            <ul className="space-y-1 text-xs sm:text-sm text-slate-300">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-indigo-400">⚡</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-white/5 border-t border-white/10">
          <p className="text-xs text-slate-400">
            Need a similar system built for your business?
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            >
              Close
            </button>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 text-white hover:opacity-90 transition-opacity"
            >
              <span>Discuss Requirements</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
