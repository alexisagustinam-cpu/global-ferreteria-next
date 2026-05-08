"use client";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "historia",   label: "Historia"   },
  { id: "productos",  label: "Productos"  },
  { id: "categorias", label: "Categorías" },
  { id: "nosotros",   label: "Nosotros"   },
  { id: "contacto",   label: "Contacto"   },
];

export default function Markers() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4 items-end">
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="flex items-center gap-2 group"
            style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
            aria-label={label}
          >
            <span
              className="transition-all duration-300"
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: isActive ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
                transition: "color 0.3s",
              }}
            >
              {label}
            </span>
            <div
              className="flex items-center gap-1"
              style={{ transition: "all 0.3s" }}
            >
              <div
                style={{
                  width: isActive ? 20 : 0,
                  height: 1,
                  background: "rgba(255,255,255,0.5)",
                  transition: "width 0.3s ease",
                  overflow: "hidden",
                }}
              />
              <div
                style={{
                  width: isActive ? 5 : 4,
                  height: isActive ? 5 : 4,
                  borderRadius: "50%",
                  background: isActive ? "#ffffff" : "rgba(255,255,255,0.25)",
                  transition: "all 0.3s",
                }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
