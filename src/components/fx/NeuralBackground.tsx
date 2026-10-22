"use client";

import { useEffect, useRef } from "react";

/**
 * Multi-layer animated background:
 *   1. CSS dot/tech grid with radial mask
 *   2. Two slow-floating blurred aurora orbs (parallax with scroll)
 *   3. <canvas> neural network: proximity links, travelling "data packets",
 *      scroll-depth parallax + speed boost, cursor / touch gravity.
 */

const CYAN = "0, 229, 176";
const BLUE = "0, 180, 216";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  z: number; // depth 0.35..1 (parallax + size)
  r: number;
  color: string;
  // rendered position for this frame
  rx: number;
  ry: number;
}

interface Packet {
  a: number;
  b: number;
  t: number;
  speed: number;
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbARef = useRef<HTMLDivElement>(null);
  const orbBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let isMobile = false;
    let linkDist = 140;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let links: [number, number][] = [];

    const pointer = { x: -9999, y: -9999, active: false, strength: 0 };
    let touchTimeout = 0;

    let scrollY = window.scrollY;
    let lastScrollY = scrollY;
    let scrollBoost = 0;

    const makeNode = (): Node => {
      const z = 0.35 + Math.random() * 0.65;
      const speed = 0.12 + Math.random() * 0.22;
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        z,
        r: 0.9 + z * 1.7,
        color: Math.random() < 0.55 ? CYAN : BLUE,
        rx: 0,
        ry: 0,
      };
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      isMobile = width < 768;
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      linkDist = isMobile ? 110 : 140;
      const target = isMobile ? 35 : 80;
      if (nodes.length > target) nodes = nodes.slice(0, target);
      while (nodes.length < target) nodes.push(makeNode());
      nodes.forEach((n) => {
        if (n.x > width) n.x = Math.random() * width;
        if (n.y > height) n.y = Math.random() * height;
      });
      packets = [];
    };

    const wrap = (v: number, max: number) => ((v % max) + max) % max;

    const spawnPacket = () => {
      if (!links.length || packets.length > (isMobile ? 6 : 14)) return;
      const [a, b] = links[(Math.random() * links.length) | 0];
      const forward = Math.random() < 0.5;
      packets.push({
        a: forward ? a : b,
        b: forward ? b : a,
        t: 0,
        speed: 0.012 + Math.random() * 0.018,
      });
    };

    let lastSpawn = 0;
    let raf = 0;
    let running = true;

    const frame = (now: number) => {
      raf = 0;
      if (!running) return;

      // Scroll: velocity -> temporary speed boost, offset -> parallax depth
      const dy = scrollY - lastScrollY;
      lastScrollY = scrollY;
      scrollBoost = Math.min(4, scrollBoost * 0.92 + Math.abs(dy) * 0.04);
      const speedMul = 1 + scrollBoost;

      // fade pointer influence when not active (touch release)
      pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const attractR = isMobile ? 150 : 190;

      // Update + project
      for (const n of nodes) {
        n.x += n.vx * speedMul;
        n.y += n.vy * speedMul;
        if (n.x < -20) n.x = width + 20;
        else if (n.x > width + 20) n.x = -20;
        n.y = wrap(n.y, height);

        n.rx = n.x;
        n.ry = wrap(n.y - scrollY * 0.12 * n.z, height);

        if (pointer.strength > 0.02) {
          const dx = pointer.x - n.rx;
          const dyp = pointer.y - n.ry;
          const d2 = dx * dx + dyp * dyp;
          if (d2 < attractR * attractR && d2 > 1) {
            const d = Math.sqrt(d2);
            const f = (1 - d / attractR) * 0.018 * pointer.strength;
            n.x += (dx / d) * f * 12;
            n.y += (dyp / d) * f * 12;
          }
        }
      }

      // Links
      links = [];
      const maxD2 = linkDist * linkDist;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.rx - b.rx;
          const dyl = a.ry - b.ry;
          const d2 = dx * dx + dyl * dyl;
          if (d2 < maxD2) {
            const alpha = (1 - d2 / maxD2) * 0.32 * Math.min(a.z, b.z) * 1.4;
            ctx.strokeStyle = `rgba(${a.color}, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.rx, a.ry);
            ctx.lineTo(b.rx, b.ry);
            ctx.stroke();
            links.push([i, j]);
          }
        }
      }

      // Cursor links
      if (pointer.strength > 0.02) {
        for (const n of nodes) {
          const dx = pointer.x - n.rx;
          const dyp = pointer.y - n.ry;
          const d2 = dx * dx + dyp * dyp;
          if (d2 < attractR * attractR) {
            const alpha = (1 - Math.sqrt(d2) / attractR) * 0.55 * pointer.strength;
            ctx.strokeStyle = `rgba(${CYAN}, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(n.rx, n.ry);
            ctx.stroke();
          }
        }
        const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 60);
        g.addColorStop(0, `rgba(${CYAN}, ${0.18 * pointer.strength})`);
        g.addColorStop(1, `rgba(${CYAN}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 60, 0, Math.PI * 2);
        ctx.fill();
      }

      // Nodes (halo + core)
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${n.color}, ${(0.08 * n.z).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.rx, n.ry, n.r * 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${n.color}, ${(0.45 + 0.5 * n.z).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.rx, n.ry, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Data packets travelling along live links
      if (now - lastSpawn > (isMobile ? 420 : 220)) {
        spawnPacket();
        lastSpawn = now;
      }
      packets = packets.filter((p) => {
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) return false;
        const dx = a.rx - b.rx;
        const dyl = a.ry - b.ry;
        if (dx * dx + dyl * dyl > maxD2 * 1.1) return false; // link broke
        p.t += p.speed * (1 + scrollBoost * 0.5);
        if (p.t >= 1) return false;
        const x = a.rx + (b.rx - a.rx) * p.t;
        const y = a.ry + (b.ry - a.ry) * p.t;
        // trail
        const tx = a.rx + (b.rx - a.rx) * Math.max(0, p.t - 0.18);
        const ty = a.ry + (b.ry - a.ry) * Math.max(0, p.t - 0.18);
        const grad = ctx.createLinearGradient(tx, ty, x, y);
        grad.addColorStop(0, `rgba(${CYAN}, 0)`);
        grad.addColorStop(1, `rgba(${CYAN}, 0.9)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.fillStyle = `rgba(${CYAN}, 0.22)`;
        ctx.beginPath();
        ctx.arc(x, y, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(220, 255, 247, 0.95)";
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      if (!reduced) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    /* ---------- Listeners ---------- */
    let orbRaf = 0;
    const updateOrbs = () => {
      orbRaf = 0;
      const y = window.scrollY;
      if (orbARef.current) orbARef.current.style.transform = `translate3d(0, ${(-y * 0.06).toFixed(1)}px, 0)`;
      if (orbBRef.current) orbBRef.current.style.transform = `translate3d(0, ${(-y * 0.1).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
      if (!orbRaf) orbRaf = requestAnimationFrame(updateOrbs);
      if (reduced) start();
    };
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      window.clearTimeout(touchTimeout);
      touchTimeout = window.setTimeout(() => (pointer.active = false), 1400);
    };
    const onPointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget) pointer.active = false;
    };
    const onVisibility = () => {
      running = !document.hidden;
      if (running) start();
    };
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        start();
      }, 150);
    };

    resize();
    updateOrbs();
    start();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointerout", onPointerOut);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      if (orbRaf) cancelAnimationFrame(orbRaf);
      window.clearTimeout(touchTimeout);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="fx-bg" aria-hidden="true">
      <div className="fx-grid" />
      <div ref={orbARef} className="fx-orb fx-orb-a" />
      <div ref={orbBRef} className="fx-orb fx-orb-b" />
      <canvas ref={canvasRef} className="fx-canvas" />
    </div>
  );
}
