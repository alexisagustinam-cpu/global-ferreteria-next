"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const CATS = [
  {
    name: "Herramientas Eléctricas",
    tag: "Herramientas",
    desc: "Taladros, lijadoras, sierras circulares y todo lo que necesitas para un trabajo preciso.",
    src: "/herramientas-electricas.jpg",
  },
  {
    name: "Materiales de Construcción",
    tag: "Construcción",
    desc: "Cemento, cabillas, bloques y materiales de primera calidad para tu obra.",
    src: "/mostrador.png",
  },
  {
    name: "Plomería",
    tag: "Plomería",
    desc: "Tuberías, llaves de paso, grifos, conectores y todo para instalaciones sanitarias.",
    src: "/plomeria.jpg",
  },
  {
    name: "Pintura y Acabados",
    tag: "Pinturas",
    desc: "Pinturas de interior y exterior, selladores, brochas y todo para un acabado perfecto.",
    src: "/pintura-acabados.jpg",
  },
];

export default function Categorias() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="categorias" className="py-24 bg-[#0a0a0a]">

      {/* Header */}
      <div className="px-6 md:px-14 mb-12">
        <p
          className="text-sm tracking-[0.3em] uppercase mb-3"
          style={{ color: "rgba(255,255,255,0.38)", fontFamily: "'Satoshi', sans-serif", fontWeight: 700 }}
        >
          Lo que ofrecemos
        </p>
        <h2
          className="text-white leading-none"
          style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(3rem, 6vw, 5rem)" }}
        >
          Encontrás de todo
        </h2>
      </div>

      {/* Accordion */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        {CATS.map((cat, i) => {
          const isOpen = open === i;
          return (
            <div key={cat.name} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>

              {/* Row header */}
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between text-left"
                style={{
                  padding: "1.5rem 1.5rem 1.5rem clamp(1.5rem, 3.5vw, 3.5rem)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) => {
                  if (!isOpen) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <div className="flex items-center gap-6">
                  {/* Number */}
                  <span
                    style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "1rem",
                      color: "rgba(255,255,255,0.2)",
                      letterSpacing: "0.1em",
                      minWidth: "2rem",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Category name */}
                  <span
                    className="text-white"
                    style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "clamp(2rem, 4vw, 3.5rem)",
                      letterSpacing: "0.02em",
                      lineHeight: 1,
                      transition: "color 0.2s",
                      color: isOpen ? "#ffffff" : "rgba(255,255,255,0.7)",
                    }}
                  >
                    {cat.name}
                  </span>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0 pr-2 md:pr-8">
                  {/* Tag pill */}
                  <span
                    className="hidden md:inline text-[9px] tracking-widest uppercase px-3 py-1"
                    style={{
                      border: "1px solid rgba(40,49,134,0.5)",
                      color: "#283186",
                      fontFamily: "'Satoshi', sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    {cat.tag}
                  </span>

                  {/* Arrow / Plus */}
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.77, 0, 0.175, 1] }}
                    style={{ color: isOpen ? "#283186" : "rgba(255,255,255,0.4)" }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </motion.div>
                </div>
              </button>

              {/* Expandable body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.77, 0, 0.175, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      className="grid md:grid-cols-2 gap-0"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                    >
                      {/* Left: description + CTA */}
                      <div
                        className="flex flex-col justify-center gap-6 py-10"
                        style={{ paddingLeft: "clamp(1.5rem, 3.5vw, 3.5rem)", paddingRight: "2rem" }}
                      >
                        <p
                          className="text-lg leading-relaxed max-w-md"
                          style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Satoshi', sans-serif" }}
                        >
                          {cat.desc}
                        </p>
                        <a
                          href="https://wa.me/584126406493"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cta-glass self-start"
                        >
                          <div className="cta-glass__bg" />
                          <div className="cta-glass__glow" />
                          <div className="cta-glass__inner">
                            <div className="cta-glass__icon">
                              <svg width="14" height="8" viewBox="0 0 18 10" fill="none">
                                <path d="M12 10C12 9.47 12.55 8.68 13.11 8.01C13.82 7.16 14.68 6.41 15.66 5.84C16.39 5.41 17.28 5 18 5M18 5C17.28 5 16.39 4.59 15.66 4.16C14.68 3.59 13.82 2.84 13.11 1.99C12.55 1.32 12 0.53 12 0M18 5L0 5" stroke="white" strokeWidth="1.5"/>
                              </svg>
                            </div>
                            <span>Consultar disponibilidad</span>
                          </div>
                        </a>
                      </div>

                      {/* Right: image */}
                      <div className="relative overflow-hidden" style={{ height: 280 }}>
                        <motion.div
                          className="absolute inset-0"
                          initial={{ scale: 1.08 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                          <Image src={cat.src} alt={cat.name} fill className="object-cover" />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 to-transparent" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
