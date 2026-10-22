"use client";

import React, { useState } from "react";
import { personalInfo } from "@/data/portfolioData";
import {
  Mail,
  Phone,
  MessageSquare,
  Send,
  CheckCircle,
  Copy,
  Clock,
  Sparkles,
} from "lucide-react";

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Full-Stack Web App",
    budget: "$2,000 – $5,000",
    timeline: "1 – 2 Months",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry: ${formData.projectType} from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Saurav,\n\nName: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\nEstimated Budget: ${formData.budget}\nTarget Timeline: ${formData.timeline}\n\nProject Overview & Requirements:\n${formData.message}\n`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Let&apos;s Build Something Scalable</span>
          </div>
          <h2 data-reveal="heading" className="section-title font-extrabold text-white tracking-tight">
            Have a Project in Mind? Let&apos;s Talk.
          </h2>
          <p data-reveal="fade" className="text-slate-400 mt-2 text-sm sm:text-base leading-relaxed">
            Whether you have a complete technical specification or just an early concept on a napkin, I&apos;m ready to help you architect and build it.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Left Column: Direct Contact Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div data-reveal="card" data-tilt="off" className="fx-card glass-panel rounded-2xl p-5 sm:p-7 border border-white/10 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Direct Channels
                </h3>
                <p className="text-xs text-slate-400">
                  Feel free to email, call, or message me directly on WhatsApp.
                </p>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between gap-2 p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 hidden min-[400px]:flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-sky-300 transition-colors [overflow-wrap:anywhere]"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(personalInfo.email, "email")}
                  className="shrink-0 inline-flex items-center justify-center w-10 h-10 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
                  title="Copy email"
                >
                  {copiedEmail ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone / WhatsApp */}
              <div className="flex items-center justify-between gap-2 p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 hidden min-[400px]:flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Phone / WhatsApp
                    </span>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-emerald-300 transition-colors"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(personalInfo.phone, "phone")}
                  className="shrink-0 inline-flex items-center justify-center w-10 h-10 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
                  title="Copy phone"
                >
                  {copiedPhone ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Instant WhatsApp Action */}
              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all text-xs sm:text-sm font-semibold shadow-md shadow-emerald-500/10"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open Instant WhatsApp Chat</span>
              </a>

              {/* LinkedIn */}
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10 transition-all text-xs sm:text-sm font-medium"
              >
                <LinkedinIcon className="w-4 h-4 text-sky-400" />
                <span>Connect on LinkedIn</span>
              </a>

              {/* Response guarantee */}
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 border-t border-white/5">
                <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Guaranteed response within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form (3 cols) */}
          <div className="lg:col-span-3">
            <div data-reveal="card" data-tilt="off" className="fx-card glass-panel rounded-2xl p-5 sm:p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-1">
                Project Inquiry & Scope Estimate
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Fill out the quick questionnaire below to initiate a structured discovery conversation.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Inquiry Composed!</h4>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Your email client should have opened with your requirements pre-filled. If not, feel free to drop a direct message on WhatsApp!
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs text-indigo-400 underline font-medium"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300 block mb-1.5">
                        Project Type
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0c1222] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option>Full-Stack Web App</option>
                        <option>SaaS Platform</option>
                        <option>ERP / CRM Integration</option>
                        <option>Healthcare IT / HL7</option>
                        <option>Database Optimization</option>
                        <option>Legacy Modernization</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300 block mb-1.5">
                        Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0c1222] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option>&lt; $2,000</option>
                        <option>$2,000 – $5,000</option>
                        <option>$5,000 – $15,000</option>
                        <option>$15,000+</option>
                        <option>Hourly / Monthly Retainer</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300 block mb-1.5">
                        Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0c1222] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option>Urgent (&lt; 2 Weeks)</option>
                        <option>1 – 2 Months</option>
                        <option>3+ Months</option>
                        <option>Flexible</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-1.5">
                      Project Overview & Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe what you want to build, existing systems to integrate with, or technical bottlenecks you are facing..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-semibold text-sm shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Project Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
