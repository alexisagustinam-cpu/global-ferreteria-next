"use client";
import { useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  motion,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";

const MILESTONES = [
  {
    year:  "1950",
    title: "Fundada en Tovar",
    desc:  "Nuestro bisabuelo abrió las puertas de la primera ferretería familiar en el pequeño pueblo de Tovar, con un sueño y un cargamento de herramientas.",
    bg:    "/tovar.png",
  },
  {
    year:  "1973",
    title: "El abuelo toma el mando",
    desc:  "La segunda generación lleva el negocio a nuevas alturas. El catálogo crece, la clientela se fideliza y Global Ferretería se convierte en referencia de la región.",
    bg:    "/abuelo.png",
  },
  {
    year:  "1990s",
    title: "Décadas de éxito en Tovar",
    desc:  "Durante décadas, arquitectos, constructores y vecinos confían en nosotros. Cada proyecto local lleva algo de Global Ferretería.",
    bg:    "/ferreteria1970.png",
  },
  {
    year:  "Hoy",
    title: "Nueva era: Mérida",
    desc:  "La tercera generación abre en Mérida, Venezuela. El mismo compromiso de siempre, ahora al servicio de una ciudad entera.",
    bg:    "/fachada.png",
  },
];

export default function Historia() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const [activeIdx, setActiveIdx] = useState(0);

  const x        = useTransform(scrollYProgress, [0, 1], ["0vw", "-300vw"]);
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveIdx(Math.min(Math.round(latest * 3), 3));
  });

  return (
    <div
      id="historia"
      ref={containerRef}
      className="relative"
      style={{ height: "400vh" }}
    >
      <div
        className="sticky overflow-hidden"
        style={{ top: "68px", height: "calc(100vh - 68px)" }}
      >

        {/* Background images */}
        <AnimatePresence initial={false}>
          <motion.div
            key={activeIdx}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <Image
              src={MILESTONES[activeIdx].bg}
              alt={MILESTONES[activeIdx].title}
              fill
              className="object-cover"
              priority={activeIdx === 0}
            />
            <div className="absolute inset-0 bg-[#0a0a0a]/50" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0a0a0a]/90 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Milestone dots — top right */}
        <div className="absolute top-12 right-6 z-10 flex flex-col gap-2 items-end">
          {MILESTONES.map((m, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="text-[10px] tracking-widest uppercase transition-colors duration-300"
                style={{ color: i === activeIdx ? "#ffffff" : "rgba(255,255,255,0.3)" }}
              >
                {m.year}
              </span>
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width:      i === activeIdx ? 10 : 6,
                  height:     i === activeIdx ? 10 : 6,
                  background: i === activeIdx ? "#ffffff" : "rgba(255,255,255,0.25)",
                }}
              />
            </div>
          ))}
        </div>

        {/* Horizontal strip */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div className="flex" style={{ x }}>
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                className="relative flex-shrink-0 flex flex-col justify-between px-16 pt-10 pb-10"
                style={{ width: "100vw", height: "calc(100vh - 68px)" }}
              >
                {/* Top: section heading */}
                <div className="z-10 relative">
                  <p className="text-[#283186] text-sm tracking-[0.3em] uppercase mb-2">
                    Nuestra historia
                  </p>
                  <h2
                    className="text-white leading-none"
                    style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "clamp(2.5rem, 6vw, 5rem)",
                    }}
                  >
                    Más de 70 años
                  </h2>
                </div>

                {/* Bottom: timeline content */}
                <div className="z-10 relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-4 h-4 rounded-full bg-white flex-shrink-0"
                      style={{ boxShadow: "0 0 12px rgba(255,255,255,0.5)" }}
                    />
                    <div
                      className="flex-1 h-px"
                      style={{
                        background:
                          i < MILESTONES.length - 1
                            ? "linear-gradient(90deg, rgba(255,255,255,0.6), transparent)"
                            : "transparent",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontFamily:   "var(--font-bebas)",
                      fontSize:     "clamp(3rem, 8vw, 6rem)",
                      lineHeight:   1,
                      color:        "#ffffff",
                      textShadow:   "0 0 40px rgba(40,49,134,0.8)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {m.year}
                  </div>
                  <h3
                    className="text-white mb-3"
                    style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize:   "clamp(1.5rem, 3vw, 2.5rem)",
                    }}
                  >
                    {m.title}
                  </h3>
                  <p className="max-w-md text-base leading-relaxed" style={{ color: "#d0cdc8" }}>
                    {m.desc}
                  </p>
                </div>

                {/* Watermark counter */}
                <div
                  className="absolute top-[28%] right-16 select-none pointer-events-none"
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize:   "clamp(10rem, 22vw, 18rem)",
                    lineHeight: 1,
                    color:      "rgba(255,255,255,0.06)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[3px] bg-[#283186]"
          style={{ width: barWidth }}
        />
      </div>
    </div>
  );
}
