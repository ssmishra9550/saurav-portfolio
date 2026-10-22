"use client";

import { useEffect } from "react";

/**
 * Global, DOM-driven interaction engine. Mounted once in page.tsx.
 *
 *  - [data-reveal="heading" | "card" | "fade"]  -> scroll reveal (staggered per batch)
 *  - [data-count]                                -> number counts up from 0 on reveal
 *  - .fx-card                                    -> cursor spotlight + 3D tilt (fine pointers)
 *  - [data-timeline] / .timeline-item            -> line draws with scroll, nodes light up at centre
 *
 * Works with elements that mount later (filters, tabs, modals) via a MutationObserver.
 */

declare global {
  interface Window {
    __fxBooted?: boolean;
  }
}

const STAGGER_MS = 100;
const MAX_STAGGER_STEPS = 6;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ---------------- Counters ---------------- */

interface CounterData {
  prefix: string;
  target: number;
  decimals: number;
  pad: number;
  suffix: string;
}

const counterData = new WeakMap<HTMLElement, CounterData>();

function parseCounter(el: HTMLElement): CounterData | null {
  const raw = el.dataset.countValue ?? el.textContent ?? "";
  const match = raw.match(/^(\D*?)(\d+(?:\.\d+)?)(.*)$/s);
  if (!match) return null;
  const [, prefix, num, suffix] = match;
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  const pad = !num.includes(".") && num.length > 1 && num.startsWith("0") ? num.length : 0;
  return { prefix, target: parseFloat(num), decimals, pad, suffix };
}

function formatCounter(d: CounterData, value: number) {
  let s = value.toFixed(d.decimals);
  if (d.pad) s = s.padStart(d.pad, "0");
  return `${d.prefix}${s}${d.suffix}`;
}

function primeCounter(el: HTMLElement) {
  if (counterData.has(el)) return;
  if (!el.dataset.countValue) el.dataset.countValue = el.textContent ?? "";
  const d = parseCounter(el);
  if (!d) return;
  counterData.set(el, d);
  el.textContent = formatCounter(d, 0);
}

function runCounter(el: HTMLElement) {
  const d = counterData.get(el);
  if (!d || el.dataset.counted === "1") return;
  el.dataset.counted = "1";
  const duration = 1600;
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t); // easeOutExpo
    el.textContent = formatCounter(d, d.target * eased);
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = el.dataset.countValue ?? formatCounter(d, d.target);
  };
  requestAnimationFrame(tick);
}

export default function ScrollEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = prefersReducedMotion();
    window.__fxBooted = true;

    if (reduced) {
      root.classList.remove("fx-ready");
    } else {
      root.classList.add("fx-ready");
    }

    /* ---------- Reveal observer ---------- */
    // Clip-path'd headings report zero intersection in Chrome, so headings are
    // observed through their parent ("trigger") and mapped back to the target(s).
    const triggerTargets = new Map<Element, HTMLElement[]>();

    const revealObserver = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((e) => e.isIntersecting)
          .flatMap((e) => {
            revealObserver.unobserve(e.target);
            const targets = triggerTargets.get(e.target) ?? [];
            triggerTargets.delete(e.target);
            return targets;
          })
          .sort((a, b) => {
            const ra = a.getBoundingClientRect();
            const rb = b.getBoundingClientRect();
            return ra.top - rb.top || ra.left - rb.left;
          });

        entering.forEach((el, i) => {
          if (el.dataset.reveal === "card" || el.dataset.reveal === "fade") {
            el.style.setProperty("--rv-delay", `${Math.min(i, MAX_STAGGER_STEPS) * STAGGER_MS}ms`);
          }
          el.classList.add("is-visible");

          el.querySelectorAll<HTMLElement>("[data-count]").forEach(runCounter);
          if (el.hasAttribute("data-count")) runCounter(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            runCounter(e.target as HTMLElement);
            counterObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    const registered = new WeakSet<Element>();

    const register = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (registered.has(el)) return;
        registered.add(el);
        if (reduced) {
          el.classList.add("is-visible");
          return;
        }
        const trigger = el.dataset.reveal === "heading" && el.parentElement ? el.parentElement : el;
        const list = triggerTargets.get(trigger);
        if (list) list.push(el);
        else {
          triggerTargets.set(trigger, [el]);
          revealObserver.observe(trigger);
        }
      });
      scope.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        if (registered.has(el)) return;
        registered.add(el);
        if (reduced) return;
        primeCounter(el);
        counterObserver.observe(el);
      });
    };

    register(document);

    const mutationObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return;
          const el = n as HTMLElement;
          if (el.matches?.("[data-reveal], [data-count]")) {
            // wrap so querySelectorAll includes the node itself
            const holder = el.parentElement ?? document;
            register(holder);
          } else {
            register(el);
          }
        });
      }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    /* ---------- Spotlight + tilt (event delegation) ---------- */
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let activeCard: HTMLElement | null = null;
    let pending: { card: HTMLElement; x: number; y: number } | null = null;
    let rafId = 0;

    const resetCard = (card: HTMLElement) => {
      card.classList.remove("is-hovered");
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    };

    const flush = () => {
      rafId = 0;
      if (!pending) return;
      const { card, x, y } = pending;
      pending = null;
      const rect = card.getBoundingClientRect();
      const px = x - rect.left;
      const py = y - rect.top;
      card.style.setProperty("--mouse-x", `${px}px`);
      card.style.setProperty("--mouse-y", `${py}px`);
      if (finePointer.matches && !reduced && card.dataset.tilt !== "off") {
        const max = 5;
        const ry = ((px / rect.width) - 0.5) * 2 * max;
        const rx = -((py / rect.height) - 0.5) * 2 * max;
        card.style.setProperty("--tilt-x", `${rx.toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${ry.toFixed(2)}deg`);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".fx-card") ?? null;
      if (card !== activeCard) {
        if (activeCard) resetCard(activeCard);
        activeCard = card;
        if (card) card.classList.add("is-hovered");
      }
      if (!card) return;
      pending = { card, x: e.clientX, y: e.clientY };
      if (!rafId) rafId = requestAnimationFrame(flush);
    };

    const onPointerLeaveDoc = () => {
      if (activeCard) resetCard(activeCard);
      activeCard = null;
    };

    // Touch: show spotlight where the finger lands, then fade
    let touchTimer = 0;
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".fx-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      card.classList.add("is-hovered");
      window.clearTimeout(touchTimer);
      touchTimer = window.setTimeout(() => card.classList.remove("is-hovered"), 900);
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeaveDoc);

    /* ---------- Timeline progress ---------- */
    let timelineRaf = 0;
    const updateTimelines = () => {
      timelineRaf = 0;
      const vh = window.innerHeight;
      const centre = vh / 2;
      document.querySelectorAll<HTMLElement>("[data-timeline]").forEach((tl) => {
        const rect = tl.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (centre - rect.top) / Math.max(rect.height, 1)));
        tl.style.setProperty("--tl-progress", progress.toFixed(4));
        tl.querySelectorAll<HTMLElement>(".timeline-item").forEach((item) => {
          const node = item.querySelector<HTMLElement>(".timeline-node") ?? item;
          const nRect = node.getBoundingClientRect();
          const nodeCentre = nRect.top + nRect.height / 2;
          item.classList.toggle("is-active", nodeCentre <= centre + 1);
        });
      });
    };
    const requestTimeline = () => {
      if (!timelineRaf) timelineRaf = requestAnimationFrame(updateTimelines);
    };
    updateTimelines();
    window.addEventListener("scroll", requestTimeline, { passive: true });
    window.addEventListener("resize", requestTimeline);

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
      mutationObserver.disconnect();
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerdown", onPointerDown);
      document.documentElement.removeEventListener("pointerleave", onPointerLeaveDoc);
      window.removeEventListener("scroll", requestTimeline);
      window.removeEventListener("resize", requestTimeline);
      if (rafId) cancelAnimationFrame(rafId);
      if (timelineRaf) cancelAnimationFrame(timelineRaf);
      window.clearTimeout(touchTimer);
    };
  }, []);

  return null;
}
