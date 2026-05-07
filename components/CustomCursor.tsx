"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const checkPointer = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
          target.closest("a, button") !== null
      );
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", checkPointer);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkPointer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        animate={{ x: pos.x - 6, y: pos.y - 6 }}
        transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.5 }}
      >
        <div
          className="rounded-full transition-all duration-150"
          style={{
            width: isPointer ? 10 : 12,
            height: isPointer ? 10 : 12,
            background: "#ff6b00",
          }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block"
        animate={{ x: pos.x - 20, y: pos.y - 20 }}
        transition={{ type: "spring", stiffness: 200, damping: 30, mass: 0.8 }}
      >
        <div
          className="rounded-full border border-[#ff6b00] transition-all duration-200"
          style={{
            width: isPointer ? 50 : 40,
            height: isPointer ? 50 : 40,
            opacity: isPointer ? 0.6 : 0.3,
          }}
        />
      </motion.div>
    </>
  );
}
