"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Project } from "@/data/types";
import { architectureData, ArchNodeKind } from "@/data/architectureData";
import {
  X,
  Layout,
  Server,
  Cpu,
  Database,
  FileText,
  Globe,
  Workflow,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const KIND_META: Record<ArchNodeKind, { icon: React.ReactNode; tag: string }> = {
  source: { icon: <Globe className="w-4 h-4" />, tag: "Source" },
  ui: { icon: <Layout className="w-4 h-4" />, tag: "Client" },
  api: { icon: <Server className="w-4 h-4" />, tag: "API" },
  logic: { icon: <Cpu className="w-4 h-4" />, tag: "Logic" },
  worker: { icon: <Workflow className="w-4 h-4" />, tag: "Runtime" },
  data: { icon: <Database className="w-4 h-4" />, tag: "Data" },
  report: { icon: <FileText className="w-4 h-4" />, tag: "Output" },
};

interface ArchitectureModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ArchitectureModal({ project, onClose }: ArchitectureModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;
  const arch = architectureData[project.id];
  if (!arch) return null;

  // Portal to <body> so the modal escapes the section's stacking context (sits above the navbar)
  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="arch-modal-title"
    >
      <div
        className="arch-glass animate-modal-pop relative w-full max-w-6xl rounded-2xl my-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-5 sm:px-7 py-4 border-b border-white/10 bg-white/[0.03]">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#00e5b0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5b0] shadow-[0_0_8px_#00e5b0]" />
              System Architecture · Data Flow
            </span>
            <h2 id="arch-modal-title" className="mt-1 text-lg sm:text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            aria-label="Close architecture diagram"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-7 space-y-7 max-h-[78vh] overflow-y-auto">
          {/* Flow diagram */}
          <div className="relative rounded-2xl border border-white/10 bg-[#050913]/70 p-4 sm:p-6 overflow-hidden">
            <div className="absolute inset-0 fx-grid opacity-60 pointer-events-none" />
            <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch">
              {arch.flow.map((node, i) => {
                const meta = KIND_META[node.kind];
                const delay = { ["--node-delay" as string]: `${i * 140}ms` } as React.CSSProperties;
                return (
                  <React.Fragment key={node.label}>
                    <div
                      className="arch-node w-full max-w-sm lg:max-w-none lg:flex-1 lg:min-w-0 rounded-xl border border-[#00e5b0]/25 bg-slate-900/80 p-3.5 shadow-[0_0_24px_-10px_rgba(0,229,176,0.6)]"
                      style={delay}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#00e5b0]/10 text-[#00e5b0] border border-[#00e5b0]/25">
                          {meta.icon}
                        </span>
                        <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#00b4d8]">
                          {String(i + 1).padStart(2, "0")} · {meta.tag}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-white leading-snug">{node.label}</div>
                      <div className="text-[11px] text-slate-400 mt-1 leading-snug">{node.detail}</div>
                    </div>
                    {i < arch.flow.length - 1 && (
                      <div className="flex items-center justify-center lg:w-10 lg:shrink-0 py-1 lg:py-0" aria-hidden="true">
                        <div className="arch-link" style={delay} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            {/* Plain-text flow for screen readers / quick scan */}
            <p className="relative mt-5 text-center font-mono text-[11px] text-slate-400 break-words">
              {arch.flow.map((n) => n.label).join("  ➔  ")}
            </p>
          </div>

          {/* Highlights */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#00e5b0] mb-3">
                Key Technical Highlights
              </h3>
              <ul className="space-y-2">
                {[...arch.notes, ...project.highlights].map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#00e5b0] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#00b4d8] mb-3">
                Stack by Layer
              </h3>
              <div className="space-y-3">
                {(
                  [
                    ["Frontend", project.techStack.frontend],
                    ["Backend", project.techStack.backend],
                    ["Database & Reporting", project.techStack.database],
                    ["Integrations", project.techStack.integrations],
                    ["DevOps", project.techStack.devops],
                  ] as [string, string[] | undefined][]
                )
                  .filter(([, list]) => list && list.length)
                  .map(([label, list]) => (
                    <div key={label}>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">{label}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {list!.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-[#00b4d8]/10 text-sky-200 border border-[#00b4d8]/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-7 py-4 border-t border-white/10 bg-white/[0.03]">
          <p className="text-xs text-slate-400">Need a similar architecture for your business?</p>
          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-[#00e5b0] to-[#00b4d8] text-slate-950 hover:opacity-90 transition-opacity"
          >
            <span>Discuss Requirements</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
