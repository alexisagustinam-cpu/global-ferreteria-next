"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const PRODUCTS = [
  { src: "/grifo.png",             name: "Grifo Monomando",      category: "Plomería"     },
  { src: "/mazo.png",              name: "Mazo de Goma",         category: "Herramientas" },
  { src: "/pintura-aerosol.png",   name: "Pintura Aerosol",      category: "Pinturas"     },
  { src: "/pegamento-andino.png",  name: "Pegamento Andino",     category: "Materiales"   },
  { src: "/lentes-soldar.png",     name: "Lentes de Soldadura",  category: "Seguridad"    },
  { src: "/lampara.png",           name: "Lámpara Recargable",   category: "Eléctrica"    },
  { src: "/protector-voltaje.png", name: "Protector de Voltaje", category: "Eléctrica"    },
];

export default function Productos() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="productos" className="py-24 bg-[#0b0b0b]">

      {/* ── Header ── */}
      <motion.div
        className="max-w-7xl mx-auto px-6 mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-[#283186] text-sm tracking-[0.3em] uppercase mb-3">Catálogo</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2
            className="text-white leading-none"
            style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            Productos<br />Destacados
          </h2>
          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="text-white/40 max-w-xs text-sm leading-relaxed md:text-right">
              Una selección de lo que encontrarás en nuestro local.
              Escríbenos por WhatsApp para más información.
            </p>
            <span className="text-white/25 text-[10px] tracking-[0.3em] uppercase">
              ← arrastra →
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── Drag track ── */}
      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0.06}
          dragTransition={{ bounceStiffness: 280, bounceDamping: 28 }}
          className="flex gap-3 cursor-grab active:cursor-grabbing select-none"
          style={{
            paddingLeft:  "max(24px, calc((100vw - 80rem) / 2 + 24px))",
            paddingRight: "max(24px, calc((100vw - 80rem) / 2 + 24px))",
            width: "max-content",
          }}
        >
          {PRODUCTS.map((p, i) => (
            <div
              key={p.src}
              className="relative flex-shrink-0 overflow-hidden group"
              style={{ width: 300, height: 460, boxShadow: "0 2px 24px rgba(0,0,0,0.5)" }}
            >
              {/* Image area — warm spotlight against dark card */}
              <div className="relative overflow-hidden" style={{ height: 340, background: "#e8ddd0" }}>
                <Image
                  src={p.src}
                  alt={p.name}
                  fill
                  sizes="300px"
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.07]"
                  style={{ mixBlendMode: "multiply" }}
                  draggable={false}
                />
                <span className="absolute top-3 left-3 z-10 text-[9px] tracking-widest uppercase text-[#283186] bg-white/75 px-2.5 py-1">
                  {p.category}
                </span>
                <span
                  className="absolute -bottom-2 right-3 select-none pointer-events-none leading-none"
                  style={{ fontFamily: "var(--font-bebas)", fontSize: "6.5rem", color: "rgba(40,49,134,0.07)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Info area — dark */}
              <div
                className="relative flex flex-col justify-center gap-2.5 px-5"
                style={{ height: 120, background: "#141414" }}
              >
                <div className="absolute left-0 top-5 bottom-5 w-[3px] bg-[#283186]" />
                <h3
                  className="text-white leading-none"
                  style={{ fontFamily: "var(--font-bebas)", fontSize: "1.75rem", letterSpacing: "0.01em" }}
                >
                  {p.name}
                </h3>
                <a
                  href="https://wa.me/584126406493"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="self-start inline-flex items-center gap-1.5 text-white/50 text-[0.6rem] font-semibold tracking-[0.25em] uppercase hover:text-white hover:gap-3 transition-all duration-200"
                >
                  Consultar precio
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Bottom CTA ── */}
      <motion.div
        className="max-w-7xl mx-auto px-6 mt-14 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <a
          href="https://wa.me/584126406493"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-glass"
        >
          <div className="cta-glass__bg" />
          <div className="cta-glass__glow" />
          <div className="cta-glass__inner">
            <div className="cta-glass__icon">
              <svg width="14" height="8" viewBox="0 0 18 10" fill="none">
                <path d="M12 10C12 9.47 12.55 8.68 13.11 8.01C13.82 7.16 14.68 6.41 15.66 5.84C16.39 5.41 17.28 5 18 5M18 5C17.28 5 16.39 4.59 15.66 4.16C14.68 3.59 13.82 2.84 13.11 1.99C12.55 1.32 12 0.53 12 0M18 5L0 5" stroke="white" strokeWidth="1.5"/>
              </svg>
            </div>
            <span>Ver catálogo completo</span>
          </div>
        </a>
      </motion.div>
    </section>
  );
}
