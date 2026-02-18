import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [filled, setFilled] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setFilled((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsDone(true), 500);
          return 100;
        }
        return prev + 2; // Adjust speed here
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isDone) {
      const timeout = setTimeout(onComplete, 800); // Wait for exit animation
      return () => clearTimeout(timeout);
    }
  }, [isDone, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8F5F2] text-[#0A1A44]"
        >
          {/* Coffee Cup Container */}
          <div className="relative w-32 h-32 mb-8">
            {/* Cup Body SVG */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full overflow-visible"
              fill="none"
              stroke="#0A1A44"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 30 L25 80 C26 90 35 95 50 95 C65 95 74 90 75 80 L80 30" />
              <path d="M80 40 C90 40 95 45 95 55 C95 65 90 70 80 70" />
            </svg>

            {/* Liquid Fill Mask */}
            <div className="absolute inset-0 overflow-hidden" style={{ clipPath: "path('M20 30 L25 80 C26 90 35 95 50 95 C65 95 74 90 75 80 L80 30 Z')" }}>
              <motion.div
                className="absolute bottom-0 left-0 w-full bg-[#F05A28]"
                style={{ height: `${filled}%` }}
                transition={{ type: "spring", stiffness: 50 }}
              />
              {/* Bubbles / Wave effect could go here */}
              <motion.div
                 animate={{ x: ["-10%", "10%", "-10%"] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                 className="absolute bottom-0 left-[-10%] w-[120%] h-[10px] bg-white/20 rounded-full blur-sm"
                 style={{ bottom: `${filled}%` }}
              />
            </div>

            {/* Steam Animation */}
            <div className="absolute -top-10 left-0 w-full flex justify-center gap-2">
               {[0, 1, 2].map((i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: [0, 0.6, 0], y: -20 }}
                   transition={{
                     repeat: Infinity,
                     duration: 2,
                     delay: i * 0.4,
                     ease: "easeInOut"
                   }}
                   className="w-1.5 h-6 bg-[#0A1A44]/30 rounded-full blur-[1px]"
                 />
               ))}
            </div>
          </div>

          {/* Loading Text */}
          <div className="font-heading font-medium tracking-widest text-sm uppercase">
            Brewing Ideas... {filled}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
