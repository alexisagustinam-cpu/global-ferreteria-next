"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [count, setCount] = useState(0);
  const [exit, setExit] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const duration = 1600;
    const startTime = performance.now();

    function animate(now: number) {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 2.5);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => setExit(true), 120);
        setTimeout(() => setGone(true), 1200);
      }
    }
    requestAnimationFrame(animate);
  }, []);

  if (gone) return null;

  return (
    <AnimatePresence>
      {!gone && (
        <div className="fixed inset-0 z-[200] overflow-hidden pointer-events-none">

          {/* Blue layer — exits second */}
          <motion.div
            className="absolute inset-0 z-10"
            style={{ background: "#283186" }}
            animate={exit ? { y: "-100%" } : { y: "0%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.12 }}
          />

          {/* Dark layer with counter — exits first */}
          <motion.div
            className="absolute inset-0 z-20"
            style={{ background: "#0b0b0b" }}
            animate={exit ? { y: "-100%" } : { y: "0%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0 }}
          >
            {/* Decorative circles */}
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ opacity: 0.12 }}
              preserveAspectRatio="xMidYMid slice"
            >
              <circle cx="50%" cy="50%" r="42vw" stroke="#3A3A3A" strokeWidth="1" strokeDasharray="8 8" fill="none" />
              <circle cx="50%" cy="50%" r="30vw" stroke="#3A3A3A" strokeWidth="1" strokeDasharray="8 8" fill="none" />
              <circle cx="50%" cy="50%" r="19vw" stroke="#3A3A3A" strokeWidth="1" strokeDasharray="8 8" fill="none" />
            </svg>

            {/* Counter */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div
                className="text-white tabular-nums leading-none"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(7rem, 18vw, 16rem)",
                  lineHeight: 1,
                }}
              >
                {count}
              </div>
              <p
                className="text-white/25 tracking-[0.5em] uppercase"
                style={{ fontSize: "0.6rem" }}
              >
                Global Ferretería
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
