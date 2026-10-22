"use client";

import React from "react";
import { experienceData } from "@/data/portfolioData";
import { Briefcase, Calendar, MapPin, CheckCircle, GraduationCap } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300 mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Proven Track Record</span>
          </div>
          <h2 data-reveal="heading" className="section-title font-extrabold text-white tracking-tight">
            Professional Experience & Career Journey
          </h2>
          <p data-reveal="fade" className="text-slate-400 mt-2 text-sm sm:text-base">
            Over 5 years of hands-on software development across enterprise IT companies, high-volume consumer brands, and independent product builds.
          </p>
        </div>

        {/* Timeline */}
        <div data-timeline className="timeline space-y-8">
          {/* Scroll-drawn line */}
          <div className="timeline-track" aria-hidden="true" />
          <div className="timeline-fill" aria-hidden="true" />

          {experienceData.map((item) => (
            <div key={item.company} className="timeline-item relative flex items-start gap-4 sm:gap-8 group">
              {/* Node */}
              <div className="timeline-node w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#0c1222] border-2 border-slate-600 flex items-center justify-center shrink-0 z-10 shadow-md shadow-black/30">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
              </div>

              {/* Card */}
              <div data-reveal="card" className="fx-card glass-panel rounded-2xl p-5 sm:p-7 flex-1 min-w-0 border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                      {item.role}
                    </h3>
                    <p className="text-sm font-semibold text-indigo-400 mt-0.5">
                      {item.company}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                    <span className="hidden sm:flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Achievements */}
                <div className="space-y-2 mb-5">
                  {item.achievements.map((ach, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                  {item.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-slate-300 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-sky-400" />
            <span>Academic Qualifications</span>
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div data-reveal="card" className="fx-card glass-panel p-5 rounded-xl border border-white/10">
              <span className="text-xs font-mono text-sky-400 font-semibold block mb-1">
                2019 – 2021
              </span>
              <h4 className="font-bold text-white text-base">
                Master of Computer Applications (MCA)
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Manav Rachna International Institute of Research and Studies
              </p>
            </div>

            <div data-reveal="card" className="fx-card glass-panel p-5 rounded-xl border border-white/10">
              <span className="text-xs font-mono text-indigo-400 font-semibold block mb-1">
                2016 – 2019
              </span>
              <h4 className="font-bold text-white text-base">
                Bachelor of Computer Applications (BCA)
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Maulana Abul Kalam Azad University of Technology (MAKAUT), West Bengal
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
