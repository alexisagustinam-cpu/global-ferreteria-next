"use client";
import { motion } from "framer-motion";

const INFO = [
  {
    label: "Dirección",
    value: "Edificio Claret, entre calles 28 y 29, Av. 3, Mérida 5101, Venezuela",
    link: { text: "Ver en Google Maps →", href: "https://maps.app.goo.gl/Rzik3HHDmPs8gsjg9" },
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

export default function Contacto() {
  return (
    <section id="contacto" className="bg-[#0b0b0b]">
      <div className="grid md:grid-cols-2" style={{ minHeight: 600 }}>

        {/* ── Map ── */}
        <div className="relative h-[380px] md:h-auto" style={{ filter: "grayscale(1) invert(1) brightness(0.85)" }}>
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
          <div className="mb-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {INFO.map((item) => (
              <div
                key={item.label}
                className="py-4 flex gap-6"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span className="text-white text-sm font-semibold w-24 flex-shrink-0">
                  {item.label}
                </span>
                <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
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
                className="border border-[#283186] text-[#283186] text-[10px] tracking-widest uppercase px-4 py-2 hover:bg-[#283186] hover:text-white transition-all duration-200"
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
            className="btn-clip self-start inline-flex items-center gap-3 bg-[#283186] text-white text-sm font-semibold px-8 py-4 tracking-widest uppercase hover:bg-[#3a4db5] transition-colors duration-200"
          >
            Consultar por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
