"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const INFO = [
  {
    label: "Dirección",
    value: "Edificio Claret, entre calles 28 y 29, Av. 3, Mérida 5101, Venezuela",
    link: { text: "Ver en Maps →", href: "https://maps.app.goo.gl/Rzik3HHDmPs8gsjg9" },
  },
  {
    label: "Horario",
    value: "Lunes a sábado · 8:00 am a 6:00 pm · Domingo cerrado",
  },
  {
    label: "Teléfono",
    value: "+58 412-6406493",
  },
  {
    label: "WhatsApp",
    value: "+58 412-6406493",
  },
];

const SOCIALS = [
  { label: "Instagram",   href: "https://www.instagram.com/globalferreteria_" },
  { label: "TikTok",      href: "https://www.tiktok.com/@globalferreteria" },
  { label: "Google Maps", href: "https://maps.app.goo.gl/Rzik3HHDmPs8gsjg9" },
];

const FLOATING = [
  { src: "/grifo.png",   alt: "Grifo",    top: "8%",  left: "3%",  size: 90,  rotate: -15, delay: 0    },
  { src: "/mazo.png",    alt: "Mazo",     top: "65%", left: "1%",  size: 80,  rotate:  10, delay: 0.4  },
  { src: "/lampara.png", alt: "Lámpara",  top: "20%", right: "2%", size: 85,  rotate:  12, delay: 0.2  },
  { src: "/pintura-aerosol.png", alt: "Spray", top: "70%", right: "3%", size: 75, rotate: -8, delay: 0.6 },
];

export default function Contacto() {
  return (
    <section id="contacto" className="bg-[#0b0b0b] relative overflow-hidden">

      {/* Floating product images */}
      {FLOATING.map((f) => (
        <motion.div
          key={f.alt}
          className="absolute pointer-events-none hidden md:block"
          style={{
            top: f.top,
            left: (f as { left?: string }).left,
            right: (f as { right?: string }).right,
            width: f.size,
            height: f.size,
            zIndex: 1,
          }}
          animate={{
            y: [0, -14, 0],
            rotate: [f.rotate, f.rotate + 4, f.rotate],
          }}
          transition={{
            duration: 5 + f.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: f.delay,
          }}
        >
          <Image
            src={f.src}
            alt={f.alt}
            fill
            className="object-contain"
            style={{ mixBlendMode: "luminosity", opacity: 0.18 }}
          />
        </motion.div>
      ))}

      <div className="grid md:grid-cols-2 relative z-10" style={{ minHeight: 600 }}>

        {/* ── Map ── */}
        <div className="relative h-[380px] md:h-auto" style={{ filter: "grayscale(1) invert(1) brightness(0.8)" }}>
          <iframe
            src="https://maps.google.com/maps?q=8.594765150188552,-71.14858023037915&z=17&output=embed&hl=es"
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full"
            title="Global Ferretería en Google Maps"
          />
        </div>

        {/* ── Info ── */}
        <motion.div
          className="flex flex-col justify-center px-10 md:px-16 py-20"
          style={{ background: "#0f0f0f" }}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[#283186] text-sm tracking-[0.3em] uppercase mb-4">
            Contacto
          </p>
          <h2
            className="text-white leading-none mb-12"
            style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(3rem, 5vw, 5rem)" }}
          >
            Visítanos o<br />escríbenos.
          </h2>

          {/* Info rows */}
          <div className="mb-8" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {INFO.map((item) => (
              <div
                key={item.label}
                className="py-4 flex gap-6"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              >
                <span
                  className="text-white text-sm font-semibold w-24 flex-shrink-0"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  {item.label}
                </span>
                <span
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "'Satoshi', sans-serif", color: "rgba(255,255,255,0.45)" }}
                >
                  {item.value}
                  {item.link && (
                    <>
                      {" "}
                      <a
                        href={item.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#283186] hover:underline"
                      >
                        {item.link.text}
                      </a>
                    </>
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* Social pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-widest uppercase px-4 py-2 transition-all duration-200"
                style={{
                  border: "1px solid rgba(40,49,134,0.5)",
                  color: "#283186",
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 700,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#283186";
                  (e.currentTarget as HTMLElement).style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#283186";
                }}
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* CTA */}
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
              <span>Consultar por WhatsApp</span>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
