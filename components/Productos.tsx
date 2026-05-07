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
    <section
      id="productos"
      className="py-24"
      style={{ background: "linear-gradient(to bottom, #f0e4d0 0px, #f5f3ef 100px, #f5f3ef 100%)" }}
    >

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
            className="text-[#0a0a0a] leading-none"
            style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            Productos<br />Destacados
          </h2>
          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="text-[#777] max-w-xs text-sm leading-relaxed md:text-right">
              Una selección de lo que encontrarás en nuestro local.
              Escríbenos por WhatsApp para más información.
            </p>
            <span className="text-[#bbb] text-[10px] tracking-[0.3em] uppercase">
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
              className="relative flex-shrink-0 overflow-hidden group shadow-[0_2px_16px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_40px_rgba(40,49,134,0.13)] transition-shadow duration-400"
              style={{ width: 300, height: 460 }}
            >
              {/* Image area */}
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
                {/* Category badge */}
                <span className="absolute top-3 left-3 z-10 text-[9px] tracking-widest uppercase text-[#283186] bg-white/75 px-2.5 py-1">
                  {p.category}
                </span>
                {/* Number watermark */}
                <span
                  className="absolute -bottom-2 right-3 select-none pointer-events-none leading-none"
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "6.5rem",
                    color: "rgba(40,49,134,0.07)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Info area */}
              <div
                className="relative flex flex-col justify-center gap-2.5 px-5 bg-white"
                style={{ height: 120 }}
              >
                {/* Blue left accent */}
                <div className="absolute left-0 top-5 bottom-5 w-[3px] bg-[#283186]" />
                <h3
                  className="text-[#0a0a0a] leading-none"
                  style={{ fontFamily: "var(--font-bebas)", fontSize: "1.75rem", letterSpacing: "0.01em" }}
                >
                  {p.name}
                </h3>
                <a
                  href="https://wa.me/584126406493"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="self-start inline-flex items-center gap-1.5 text-[#283186] text-[0.6rem] font-semibold tracking-[0.25em] uppercase hover:gap-3 transition-all duration-200"
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
          className="inline-flex items-center gap-3 border border-[#0a0a0a]/20 text-[#555] px-8 py-4 text-sm tracking-widest uppercase hover:border-[#283186] hover:text-[#283186] transition-all duration-300"
        >
          Ver catálogo completo
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
