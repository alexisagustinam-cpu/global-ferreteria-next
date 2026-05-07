"use client";
import { useRef, useEffect, useState } from "react";
import { useMotionValue, useTransform, motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  // MotionValue for scroll progress — fed by native scroll listener
  const prog = useMotionValue(0);

  // Text / UI transforms
  const introOp     = useTransform(prog, [0, 0.14],               [1, 0]);
  const introX      = useTransform(prog, [0, 0.14],               [0, -14]);
  const topLabelOp  = useTransform(prog, [0, 0.06, 0.50, 0.60],   [0, 1, 1, 0]);
  const ctaOp       = useTransform(prog, [0.08, 0.16, 0.80, 0.90],[0, 1, 1, 0]);
  const scrollIndOp  = useTransform(prog, [0, 0.10, 0.20],         [1, 1, 0]);
  // Final image — instant swap at the very last frame of scroll
  const finalOp     = useTransform(prog, [0.995, 1.0],             [0, 1]);

  // ── Scroll → video scrubbing ───────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const { top, height } = container.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -top / (height - window.innerHeight)));
      prog.set(p);

      const v = videoRef.current;
      if (v && v.duration > 0) {
        v.currentTime = p * v.duration;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // sync on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, [prog]);

  // ── Prevent autoplay ──────────────────────────────────────
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: "320vh" }}>
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: "#f0e4d0" }}
      >

        {/* Fallback — initial photo, visible only while video hasn't loaded */}
        <div
          className="absolute inset-0"
          style={{ opacity: ready ? 0 : 1 }}
        >
          <Image
            src="/hero-inicial.png"
            alt="Global Ferretería"
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* Scroll-driven video — THE animation, from frame 0 to last frame */}
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          muted
          playsInline
          preload="auto"
          onLoadedData={() => {
            // Scrub to current scroll position before revealing
            const container = containerRef.current;
            if (container) {
              const { top, height } = container.getBoundingClientRect();
              const p = Math.max(0, Math.min(1, -top / (height - window.innerHeight)));
              const v = videoRef.current;
              if (v && v.duration > 0) v.currentTime = p * v.duration;
            }
            setReady(true);
          }}
          className="absolute inset-0 w-full h-full object-contain"
          style={{ opacity: ready ? 1 : 0 }}
        />

        {/* Final frame — same structure as video for identical sizing behavior */}
        <motion.img
          src="/hero-final.png"
          alt=""
          className="absolute inset-0 w-full h-full object-contain"
          style={{ opacity: finalOp, pointerEvents: "none" }}
        />

        {/* ── Intro identity — left side ── */}
        <motion.div
          className="absolute left-8 md:left-14 z-10 pointer-events-none"
          style={{ top: "22%", opacity: introOp, x: introX }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <p style={{ color: "#9a8070", fontSize: "0.55rem", letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: "0.6rem" }}>
              Desde 1950
            </p>
            <div style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(2rem, 3.2vw, 3rem)", color: "#1a100a", lineHeight: 1, letterSpacing: "0.02em" }}>
              Global<br />Ferretería
            </div>
            <div style={{ width: 36, height: 1, background: "#c4b8ac", margin: "10px 0" }} />
            <p style={{ color: "#9a8070", fontSize: "0.55rem", letterSpacing: "0.35em", textTransform: "uppercase" }}>
              Mérida · Venezuela
            </p>
          </motion.div>
        </motion.div>

        {/* ── Brand label — top center ── */}
        <motion.p
          className="absolute top-9 left-0 right-0 text-center z-10 pointer-events-none"
          style={{
            opacity: topLabelOp,
            color: "#9a8070",
            fontSize: "0.65rem",
            letterSpacing: "0.42em",
            textTransform: "uppercase",
          }}
        >
          Global Ferretería · Mérida, Venezuela
        </motion.p>

        {/* ── CTA — bottom ── */}
        <motion.div
          className="absolute bottom-14 left-0 right-0 flex justify-center z-10"
          style={{ opacity: ctaOp }}
        >
          <a
            href="https://wa.me/584126406493"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-clip bg-[#283186] text-white px-9 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-[#3a4db5] transition-colors duration-200"
          >
            Consultar por WhatsApp
          </a>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            style={{ opacity: scrollIndOp }}
          >
            <span
              style={{
                color: "#b8a898",
                fontSize: "0.6rem",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
              }}
            >
              Scroll
            </span>
            <motion.div
              className="w-px h-10 bg-gradient-to-b from-[#283186] to-transparent"
              animate={{ scaleY: [1, 0.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
