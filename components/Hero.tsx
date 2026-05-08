"use client";
import { useRef, useEffect, useState } from "react";
import { useMotionValue, useTransform, motion } from "framer-motion";
import Image from "next/image";

const TAGS = [
  { label: "Plomería",     src: "/grifo.png",          pos: "left-8  top-[28%]"     },
  { label: "Herramientas", src: "/mazo.png",            pos: "right-8 top-[24%]"     },
  { label: "Eléctrica",    src: "/lampara.png",         pos: "left-10 bottom-[24%]"  },
  { label: "Pinturas",     src: "/pintura-aerosol.png", pos: "right-10 bottom-[28%]" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  const prog = useMotionValue(0);

  const headOp      = useTransform(prog, [0, 0.16],                 [1, 0]);
  const headY       = useTransform(prog, [0, 0.16],                 [0, -50]);
  const tagsOp      = useTransform(prog, [0, 0.16],                 [1, 0]);
  const ctaOp       = useTransform(prog, [0.06, 0.14, 0.80, 0.90],  [0, 1, 1, 0]);
  const scrollIndOp = useTransform(prog, [0, 0.10, 0.20],           [1, 1, 0]);
  const finalOp     = useTransform(prog, [0.995, 1.0],              [0, 1]);

  // Scroll → video scrubbing
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const { top, height } = container.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -top / (height - window.innerHeight)));
      prog.set(p);
      const v = videoRef.current;
      if (v && v.duration > 0) v.currentTime = p * v.duration;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [prog]);

  // Prevent autoplay
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: "320vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: "#0b0b0b" }}>

        {/* Entry curtain removed — Loader handles the page reveal */}

        {/* ── Fallback — shows while video loads ── */}
        <div className="absolute inset-0" style={{ opacity: ready ? 0 : 1, transition: "opacity 0.4s" }}>
          <Image src="/hero-inicial.png" alt="Global Ferretería" fill priority className="object-contain" />
        </div>

        {/* ── Scroll-driven video ── */}
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          muted
          playsInline
          preload="auto"
          onLoadedData={() => {
            const c = containerRef.current;
            if (c) {
              const { top, height } = c.getBoundingClientRect();
              const p = Math.max(0, Math.min(1, -top / (height - window.innerHeight)));
              const v = videoRef.current;
              if (v && v.duration > 0) v.currentTime = p * v.duration;
            }
            setReady(true);
          }}
          className="absolute inset-0 w-full h-full object-contain"
          style={{ opacity: ready ? 1 : 0, transition: "opacity 0.4s" }}
        />

        {/* ── Final frame ── */}
        <motion.img
          src="/hero-final.png"
          alt=""
          className="absolute inset-0 w-full h-full object-contain"
          style={{ opacity: finalOp, pointerEvents: "none" }}
        />

        {/* ── Spotlight vignette — darkens edges, centres product ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 54% 65% at 50% 52%, transparent 0%, rgba(11,11,11,0.72) 62%, #0b0b0b 100%)",
          }}
        />

        {/* ── Headline — top left ── */}
        <motion.div
          className="absolute left-8 md:left-14 z-10 pointer-events-none"
          style={{ top: "20%", opacity: headOp, y: headY }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: "0.5rem",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}
          >
            Desde 1950 · Mérida, Venezuela
          </p>
          <h1
            className="leading-none"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(3.5rem, 8.5vw, 8rem)",
              lineHeight: 0.92,
              letterSpacing: "0.02em",
            }}
          >
            <span style={{ color: "#ffffff" }}>Global</span>
            <br />
            <span
              style={{
                WebkitTextStroke: "2px rgba(255,255,255,0.85)",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              Ferretería
            </span>
          </h1>
        </motion.div>

        {/* ── Floating category tags ── */}
        {TAGS.map((tag) => (
          <motion.div
            key={tag.label}
            className={`absolute z-10 pointer-events-none ${tag.pos}`}
            style={{ opacity: tagsOp }}
          >
            <div
              className="flex items-center gap-2.5 px-3.5 py-2 backdrop-blur-xl"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "0.5px solid rgba(255,255,255,0.15)",
                borderRadius: "100px",
              }}
            >
              <div
                className="relative rounded-full overflow-hidden flex-shrink-0"
                style={{ width: 28, height: 28, background: "#f0e4d0" }}
              >
                <Image
                  src={tag.src}
                  alt={tag.label}
                  fill
                  className="object-contain p-[3px]"
                  style={{ mixBlendMode: "multiply" }}
                />
              </div>
              <span
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  fontWeight: 500,
                }}
              >
                {tag.label}
              </span>
            </div>
          </motion.div>
        ))}

        {/* ── Hero bottom bar ── */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
          style={{ opacity: headOp }}
        >
          {/* Top border line */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />

          <div
            className="grid grid-cols-3 items-center px-8 md:px-14"
            style={{ height: 72 }}
          >
            {/* Left: keyword pills */}
            <div className="flex items-center gap-2">
              {["Calidad", "Experiencia", "Familia"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[9px] tracking-widest uppercase"
                  style={{
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "'Satoshi', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Center: tagline */}
            <div className="flex justify-center">
              <p
                className="text-center"
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                Todo para tu obra, en Mérida
              </p>
            </div>

            {/* Right: contact link with glow */}
            <div className="flex justify-end">
              <a
                href="https://wa.me/584126406493"
                target="_blank"
                rel="noopener noreferrer"
                className="relative pointer-events-auto flex items-center gap-2 group"
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                }}
              >
                {/* Glow behind */}
                <div
                  className="absolute inset-x-0 -inset-y-4 pointer-events-none"
                  style={{
                    background: "rgba(40,49,134,0.25)",
                    filter: "blur(20px)",
                    borderRadius: "50%",
                  }}
                />
                <span className="relative z-10 group-hover:text-white transition-colors duration-200">Escríbenos</span>
                <svg className="relative z-10 transition-transform duration-200 group-hover:translate-x-1" width="12" height="8" viewBox="0 0 18 10" fill="none">
                  <path d="M12 10C12 9.47 12.55 8.68 13.11 8.01C13.82 7.16 14.68 6.41 15.66 5.84C16.39 5.41 17.28 5 18 5M18 5C17.28 5 16.39 4.59 15.66 4.16C14.68 3.59 13.82 2.84 13.11 1.99C12.55 1.32 12 0.53 12 0M18 5L0 5" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            style={{ opacity: scrollIndOp }}
          >
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
