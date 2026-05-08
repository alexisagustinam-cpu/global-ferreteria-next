"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">

          {/* Col 1: Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-9 h-9 overflow-hidden flex-shrink-0" style={{ borderRadius: 4 }}>
                <Image src="/logo.jpg" alt="Global Ferretería" fill className="object-cover" />
              </div>
              <div
                className="text-white leading-none"
                style={{ fontFamily: "var(--font-bebas)", fontSize: 20 }}
              >
                Global Ferretería
              </div>
            </div>
            <p
              className="mb-6"
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.3)",
                lineHeight: 1.7,
                maxWidth: 200,
              }}
            >
              Tres generaciones. Un mismo compromiso con Mérida y Venezuela.
            </p>
            <a
              href="#"
              className="flex items-center gap-2 group"
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                textDecoration: "none",
              }}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="group-hover:text-white transition-colors">Volver arriba</span>
              <svg className="transition-transform duration-200 group-hover:-translate-y-0.5" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </a>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <p
              className="mb-5"
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              Navegación
            </p>
            <ul className="flex flex-col gap-3">
              {[
                ["Historia",   "#historia"],
                ["Productos",  "#productos"],
                ["Categorías", "#categorias"],
                ["Nosotros",   "#nosotros"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="transition-colors duration-200"
                    style={{
                      fontFamily: "'Satoshi', sans-serif",
                      fontSize: "0.82rem",
                      color: "rgba(255,255,255,0.4)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <p
              className="mb-5"
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              Contacto
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "+58 412-6406493",
                "Lun–Sáb · 8am–6pm",
                "Edif. Claret, Av. 3",
                "Mérida, Venezuela",
              ].map((line) => (
                <li
                  key={line}
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: "0.82rem",
                    color: "rgba(255,255,255,0.35)",
                  }}
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Social */}
          <div>
            <p
              className="mb-5"
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              Redes
            </p>
            <ul className="flex flex-col gap-3">
              {[
                ["Instagram",   "https://www.instagram.com/globalferreteria_"],
                ["TikTok",      "https://www.tiktok.com/@globalferreteria"],
                ["Google Maps", "https://maps.app.goo.gl/Rzik3HHDmPs8gsjg9"],
                ["WhatsApp",    "https://wa.me/584126406493"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200"
                    style={{
                      fontFamily: "'Satoshi', sans-serif",
                      fontSize: "0.82rem",
                      color: "rgba(255,255,255,0.4)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#283186")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            © 2025 Global Ferretería · RIF J-40695985-5 · Mérida, Venezuela
          </p>
          <p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.15)",
            }}
          >
            Desde 1950
          </p>
        </div>
      </div>
    </footer>
  );
}
