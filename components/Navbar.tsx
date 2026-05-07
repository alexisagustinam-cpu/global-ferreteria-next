"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Historia",   href: "#historia" },
  { label: "Productos",  href: "#productos" },
  { label: "Categorías", href: "#categorias" },
  { label: "Nosotros",   href: "#nosotros" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });

    /* Observe html class changes to sync nav background */
    const syncTheme = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const navBg = scrolled
    ? isDark
      ? "rgba(10,10,10,0.95)"
      : "rgba(242,241,237,0.95)"
    : "transparent";

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: navBg,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? `1px solid ${isDark ? "#1e1e1e" : "#d8d7d0"}`
            : "1px solid transparent",
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded overflow-hidden flex-shrink-0">
              <Image
                src="/logo.jpg"
                alt="Global Ferretería"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div
                className="leading-none tracking-wide transition-colors duration-400"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: 20,
                  color: isDark ? "#ffffff" : "#1a1a1a",
                }}
              >
                Global Ferretería
              </div>
              <div
                className="text-[10px] tracking-widest uppercase transition-colors duration-400"
                style={{ color: isDark ? "#555" : "#888" }}
              >
                Mérida, Venezuela
              </div>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-[#888] hover:text-white transition-colors duration-200 tracking-wide uppercase"
                  style={{ color: isDark ? "#888" : "#666" }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right: toggle + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <a
              href="https://wa.me/584126406493"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#283186] text-white text-sm font-semibold px-5 py-2.5 btn-clip hover:bg-[#3a4db5] transition-colors duration-200"
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              className="flex flex-col gap-1.5 p-1"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              <span
                className="block w-6 h-px transition-all duration-300"
                style={{
                  background: isDark ? "#fff" : "#1a1a1a",
                  transform: open ? "rotate(45deg) translateY(8px)" : "none",
                }}
              />
              <span
                className="block w-6 h-px transition-all duration-300"
                style={{
                  background: isDark ? "#fff" : "#1a1a1a",
                  opacity: open ? 0 : 1,
                }}
              />
              <span
                className="block w-6 h-px transition-all duration-300"
                style={{
                  background: isDark ? "#fff" : "#1a1a1a",
                  transform: open ? "rotate(-45deg) translateY(-8px)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-[#0a0a0a]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-5xl text-white hover:text-[#283186] transition-colors"
                style={{ fontFamily: "var(--font-bebas)" }}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.07 }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="https://wa.me/584126406493"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-[#283186] text-white px-8 py-3 text-lg btn-clip"
              style={{ fontFamily: "var(--font-bebas)" }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              WhatsApp
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
