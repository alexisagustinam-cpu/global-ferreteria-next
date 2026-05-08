"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Historia",   href: "#historia"   },
  { label: "Productos",  href: "#productos"  },
  { label: "Categorías", href: "#categorias" },
  { label: "Nosotros",   href: "#nosotros"   },
  { label: "Contacto",   href: "#contacto"   },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          transition: "background 0.4s, backdrop-filter 0.4s, border-color 0.4s",
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3 z-10">
            <div className="relative w-9 h-9 overflow-hidden flex-shrink-0" style={{ borderRadius: 4 }}>
              <Image src="/logo.jpg" alt="Global Ferretería" fill className="object-cover" />
            </div>
            <div>
              <div
                className="text-white leading-none tracking-wide"
                style={{ fontFamily: "var(--font-bebas)", fontSize: 20 }}
              >
                Global Ferretería
              </div>
              <div className="text-[10px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
                Mérida, Venezuela
              </div>
            </div>
          </a>

          {/* Desktop center links with dot separators */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l, i) => (
              <li key={l.href} className="flex items-center gap-1">
                {i > 0 && (
                  <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.35rem" }}>●</span>
                )}
                <a
                  href={l.href}
                  className="text-xs tracking-widest uppercase px-2 py-1 transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/584126406493"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex cta-glass"
            >
              <div className="cta-glass__bg" />
              <div className="cta-glass__glow" />
              <div className="cta-glass__inner">
                <div className="cta-glass__icon">
                  <svg width="14" height="8" viewBox="0 0 18 10" fill="none">
                    <path d="M12 10C12 9.47 12.55 8.68 13.11 8.01C13.82 7.16 14.68 6.41 15.66 5.84C16.39 5.41 17.28 5 18 5M18 5C17.28 5 16.39 4.59 15.66 4.16C14.68 3.59 13.82 2.84 13.11 1.99C12.55 1.32 12 0.53 12 0M18 5L0 5" stroke="white" strokeWidth="1.5"/>
                  </svg>
                </div>
                <span>WhatsApp</span>
              </div>
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="flex flex-col gap-[5px] p-1 z-[60]"
              aria-label="Menu"
              style={{ background: "transparent", border: "none", cursor: "pointer" }}
            >
              <span
                className="block w-6 h-[1.5px] bg-white transition-all duration-300"
                style={{ transform: open ? "rotate(45deg) translateY(6.5px)" : "none" }}
              />
              <span
                className="block w-6 h-[1.5px] bg-white transition-all duration-300"
                style={{ opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "none" }}
              />
              <span
                className="block w-6 h-[1.5px] bg-white transition-all duration-300"
                style={{ transform: open ? "rotate(-45deg) translateY(-6.5px)" : "none" }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[45] flex"
            style={{ background: "#080808" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto px-6 w-full pt-28 pb-16 grid md:grid-cols-2 gap-10">

              {/* Left: Nav links */}
              <ul className="flex flex-col justify-center gap-2">
                {NAV_LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-4 py-2"
                      style={{ textDecoration: "none" }}
                    >
                      <svg
                        width="28" height="28"
                        viewBox="0 0 36 37"
                        fill="none"
                        className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                        style={{ opacity: 0.35 }}
                      >
                        <path d="M31.71 35.37C30.11 33.76 29.35 29.73 28.99 26.07C28.53 21.35 28.81 16.54 30 11.9C30.9 8.41 32.31 4.52 34.44 2.39M34.44 2.39C32.31 4.52 28.41 5.93 24.93 6.82C20.29 8.01 15.48 8.29 10.76 7.83C7.09 7.48 3.06 6.72 1.46 5.12M34.44 2.39L2.88 33.95" stroke="white" strokeWidth="3"/>
                      </svg>
                      <span
                        className="text-white/60 group-hover:text-white transition-colors duration-200"
                        style={{
                          fontFamily: "var(--font-bebas)",
                          fontSize: "clamp(2.5rem, 5vw, 4rem)",
                          letterSpacing: "0.02em",
                          lineHeight: 1,
                        }}
                      >
                        {l.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Right: contact info + socials */}
              <motion.div
                className="flex flex-col justify-end gap-8 md:pl-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div>
                  <p className="text-[#283186] text-xs tracking-[0.3em] uppercase mb-4">Contáctanos</p>
                  <a
                    href="https://wa.me/584126406493"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-white/70 hover:text-white transition-colors text-lg font-medium mb-1"
                  >
                    +58 412-6406493
                  </a>
                  <p className="text-white/30 text-sm leading-relaxed">
                    Edif. Claret, entre calles 28 y 29<br />
                    Av. 3, Mérida 5101, Venezuela
                  </p>
                </div>

                <div>
                  <p className="text-[#283186] text-xs tracking-[0.3em] uppercase mb-4">Redes</p>
                  <div className="flex flex-col gap-2">
                    {[
                      ["Instagram", "https://www.instagram.com/globalferreteria_"],
                      ["TikTok", "https://www.tiktok.com/@globalferreteria"],
                    ].map(([label, href]) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-white transition-colors text-sm tracking-wide"
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <a
                    href="https://wa.me/584126406493"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-glass"
                    onClick={() => setOpen(false)}
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
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
