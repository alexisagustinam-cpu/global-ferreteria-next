"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";

const STATS = [
  { value: 70, suffix: "+", label: "Años de historia" },
  { value: 3,  suffix: "ª", label: "Generaciones" },
  { value: 500, suffix: "+", label: "Productos" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end center"] });

  const display = useTransform(scrollYProgress, [0, 1], [0, value]);

  return (
    <div ref={ref}>
      <motion.span>{display.get()}</motion.span>
      {suffix}
    </div>
  );
}

export default function Nosotros() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgX    = useTransform(scrollYProgress, [0, 0.6], ["60px", "0px"]);
  const imgOp   = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const textX   = useTransform(scrollYProgress, [0, 0.5], ["-40px", "0px"]);
  const textOp  = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section id="nosotros" ref={sectionRef} className="py-28 bg-[#0b0b0b]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Stats bar */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-24 p-8"
          style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="text-center"
              style={i < 2 ? { borderRight: "1px solid rgba(255,255,255,0.08)" } : {}}
            >
              <div
                className="text-[#283186] mb-2"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  lineHeight: 1,
                }}
              >
                {s.value}{s.suffix}
              </div>
              <div className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
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
            <p className="text-lg leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
              Somos una ferretería familiar venezolana con más de 70 años de historia.
              Nacimos en Tovar con el sueño de nuestro bisabuelo, crecimos bajo el mando
              de nuestro abuelo, y hoy la tercera generación lleva ese mismo compromiso
              a Mérida.
            </p>
            <p className="text-lg leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.35)" }}>
              No somos solo una ferretería — somos el lugar donde los vecinos, los
              arquitectos y los constructores encuentran no solo los materiales que
              necesitan, sino también el consejo honesto de alguien que conoce el oficio.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="https://wa.me/584126406493"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-clip bg-[#283186] text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#3a4db5] transition-colors"
              >
                Escríbenos
              </a>
              <a
                href="https://www.instagram.com/globalferreteria_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors text-sm group"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-5 h-5 group-hover:stroke-[#283186] transition-colors"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4.5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" strokeWidth="0"/>
                </svg>
                @globalferreteria_
              </a>
            </div>
          </motion.div>

          {/* Right — image */}
          <motion.div
            style={{ x: imgX, opacity: imgOp }}
            className="relative"
          >
            <div
              className="relative overflow-hidden"
              style={{ height: 520 }}
            >
              <Image
                src="/mostrador.png"
                alt="Global Ferretería — Nuestro equipo"
                fill
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ boxShadow: "inset 0 0 0 2px #283186" }}
              />
            </div>

            {/* Floating info card */}
            <motion.div
              className="absolute -bottom-6 -left-6 p-6 max-w-[240px]"
              style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div
                className="text-[#283186] mb-1"
                style={{ fontFamily: "var(--font-bebas)", fontSize: "2.5rem", lineHeight: 1 }}
              >
                Desde 1950
              </div>
              <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                Tres generaciones. Un mismo compromiso.
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
