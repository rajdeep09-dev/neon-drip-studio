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
          setTimeout(() => setIsDone(true), 800);
          return 100;
        }
        return prev + 1.5; // Slower, smoother fill
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isDone) {
      const timeout = setTimeout(onComplete, 1200); // Wait for curtain lift
      return () => clearTimeout(timeout);
    }
  }, [isDone, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} // "Curtain lift" effect
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8F5F2] text-[#0A1A44]"
        >
          {/* Central Logo & Progress */}
          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="font-serif italic text-6xl md:text-8xl text-[#0A1A44] mb-2">Artemis</h1>
              <span className="font-mono-label text-xs tracking-[0.4em] uppercase text-[#F05A28]">Coffee Studio</span>
            </motion.div>

            {/* Minimal Line Progress Bar */}
            <div className="w-64 h-[2px] bg-[#0A1A44]/10 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#F05A28]"
                style={{ width: `${filled}%` }}
                transition={{ ease: "linear" }}
              />
            </div>

            <div className="font-mono-label text-[10px] text-[#0A1A44]/40 mt-2">
              {Math.round(filled)}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
