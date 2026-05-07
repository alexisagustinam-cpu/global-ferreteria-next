"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const CATS = [
  {
    name: "Herramientas Eléctricas",
    desc: "Taladros, lijadoras, sierras circulares y todo lo que necesitas para un trabajo preciso.",
    src: "/herramientas-electricas.jpg",
  },
  {
    name: "Materiales de Construcción",
    desc: "Cemento, cabillas, bloques y materiales de primera calidad para tu obra.",
    src: "/mostrador.png",
  },
  {
    name: "Plomería",
    desc: "Tuberías, llaves de paso, grifos, conectores y todo para instalaciones sanitarias.",
    src: "/plomeria.jpg",
  },
  {
    name: "Pintura y Acabados",
    desc: "Pinturas de interior y exterior, selladores, brochas y todo para un acabado perfecto.",
    src: "/pintura-acabados.jpg",
  },
];

const EASE = [0.77, 0, 0.175, 1] as const;

function CatCard({ cat }: { cat: (typeof CATS)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden cursor-pointer"
      style={{ height: 200 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image — always behind, subtle zoom on hover */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Image src={cat.src} alt={cat.name} fill className="object-cover" />
      </motion.div>

      {/* Permanent gradient at bottom — keeps text readable when image is revealed */}
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#0a0a0a]/85 to-transparent z-[5]" />

      {/* Black overlay — ONLY THIS moves up on hover */}
      <motion.div
        className="absolute inset-0 bg-[#0a0a0a] z-10"
        animate={{ y: hovered ? "-100%" : "0%" }}
        transition={{ duration: 0.55, ease: EASE }}
      />

      {/* Fixed content — title, arrow and description stay in place always */}
      <div className="absolute inset-0 z-20 flex items-center justify-between px-10 md:px-16">

        {/* Left: title + description */}
        <div className="flex flex-col justify-center">
          <h3
            className="text-white leading-none"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              letterSpacing: "0.02em",
            }}
          >
            {cat.name}
          </h3>
          <motion.p
            className="text-[#ccc] text-sm leading-relaxed mt-3 max-w-lg"
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            transition={{ duration: 0.3, delay: hovered ? 0.25 : 0 }}
          >
            {cat.desc}
          </motion.p>
        </div>

        {/* Right: big arrow */}
        <div className="flex-shrink-0 ml-8">
          <motion.div
            animate={{ x: hovered ? 6 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke={hovered ? "#283186" : "white"}
              strokeWidth="1.2"
              style={{ transition: "stroke 0.3s" }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Categorias() {
  return (
    <section id="categorias" className="py-24 bg-[#0a0a0a]">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <p className="text-[#283186] text-sm tracking-[0.3em] uppercase mb-3">Lo que ofrecemos</p>
        <h2
          className="text-white leading-none"
          style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(3rem, 6vw, 5rem)" }}
        >
          Encontrás de todo
        </h2>
      </div>

      {/* Cards — full width, edge to edge */}
      <div className="flex flex-col gap-[2px]">
        {CATS.map((cat) => (
          <CatCard key={cat.name} cat={cat} />
        ))}
      </div>
    </section>
  );
}
