"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";

const STATS = [
  { value: "70+",  label: "Años de historia"  },
  { value: "3ª",   label: "Generaciones"       },
  { value: "500+", label: "Productos"          },
];

export default function Nosotros() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgX  = useTransform(scrollYProgress, [0, 0.6], ["60px", "0px"]);
  const imgOp = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const textX = useTransform(scrollYProgress, [0, 0.5], ["-40px", "0px"]);
  const textOp = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section id="nosotros" ref={sectionRef} className="py-28 bg-[#0b0b0b]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Stats — minimal, just numbers */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-28"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="text-center"
              style={i < 2 ? { borderRight: "1px solid rgba(255,255,255,0.06)" } : {}}
            >
              <div
                className="text-[#283186] mb-2"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <motion.div style={{ x: textX, opacity: textOp }}>
            <p className="text-[#283186] text-sm tracking-[0.3em] uppercase mb-4">
              Quiénes somos
            </p>
            <h2
              className="text-white leading-none mb-8"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
              }}
            >
              Más de 70 años<br />
              <span className="text-[#283186]">sirviendo</span> a Venezuela
            </h2>
            <p
              className="text-lg leading-relaxed mb-6"
              style={{ fontFamily: "'Satoshi', sans-serif", color: "rgba(255,255,255,0.55)" }}
            >
              Somos una ferretería familiar venezolana con más de 70 años de historia.
              Nacimos en Tovar con el sueño de nuestro bisabuelo, crecimos bajo el mando
              de nuestro abuelo, y hoy la tercera generación lleva ese mismo compromiso
              a Mérida.
            </p>
            <p
              className="text-lg leading-relaxed mb-10"
              style={{ fontFamily: "'Satoshi', sans-serif", color: "rgba(255,255,255,0.32)" }}
            >
              No somos solo una ferretería — somos el lugar donde los vecinos, los
              arquitectos y los constructores encuentran no solo los materiales que
              necesitan, sino también el consejo honesto de alguien que conoce el oficio.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
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
                  <span>Escríbenos</span>
                </div>
              </a>
              <a
                href="https://www.instagram.com/globalferreteria_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group transition-colors text-sm"
                style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Satoshi', sans-serif" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 group-hover:stroke-[#283186] transition-colors">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4.5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" strokeWidth="0"/>
                </svg>
                @globalferreteria_
              </a>
            </div>
          </motion.div>

          {/* Right — image (magazine style, no border-radius) */}
          <motion.div style={{ x: imgX, opacity: imgOp }} className="relative">
            <div className="relative overflow-hidden" style={{ height: 560 }}>
              <Image
                src="/mostrador.png"
                alt="Global Ferretería — Local"
                fill
                className="object-cover"
              />
              {/* Blue accent line left */}
              <div
                className="absolute left-0 top-0 bottom-0"
                style={{ width: 3, background: "#283186" }}
              />
            </div>

            {/* Editorial badge bottom-left */}
            <div
              className="absolute -bottom-5 left-4 px-5 py-3"
              style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div
                className="text-[#283186]"
                style={{ fontFamily: "var(--font-bebas)", fontSize: "2rem", lineHeight: 1 }}
              >
                Desde 1950
              </div>
              <div
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  marginTop: "0.2rem",
                }}
              >
                Tres generaciones · Un compromiso
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
