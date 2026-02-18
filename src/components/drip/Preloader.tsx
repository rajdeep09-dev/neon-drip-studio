import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = "DRIP".split("");
const MIN_DURATION = 1500;

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"typing" | "scatter" | "done">("typing");
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [progress, setProgress] = useState(0);

  // Typewriter effect
  useEffect(() => {
    if (phase !== "typing") return;
    if (visibleLetters < LETTERS.length) {
      const t = setTimeout(() => setVisibleLetters((v) => v + 1), 200);
      return () => clearTimeout(t);
    } else {
      // All letters visible, wait then scatter
      const t = setTimeout(() => setPhase("scatter"), 400);
      return () => clearTimeout(t);
    }
  }, [phase, visibleLetters]);

  // Progress bar
  useEffect(() => {
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / MIN_DURATION, 1);
      setProgress(p);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  // Scatter -> done
  useEffect(() => {
    if (phase !== "scatter") return;
    const t = setTimeout(() => setPhase("done"), 800);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase === "done") {
      const t = setTimeout(onComplete, 500);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  const scatterAngles = [
    { x: -120, y: -80, r: -30 },
    { x: -40, y: -120, r: 20 },
    { x: 60, y: -100, r: -15 },
    { x: 140, y: -60, r: 25 },
  ];

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ background: "#0A0A0A" }}
        >
          {/* Film grain */}
          <div className="film-grain" style={{ zIndex: 1 }} />

          {/* Letters */}
          <div className="relative flex gap-1 z-10">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  phase === "scatter"
                    ? {
                        x: scatterAngles[i].x,
                        y: scatterAngles[i].y,
                        rotate: scatterAngles[i].r,
                        opacity: 0,
                        scale: 0.5,
                      }
                    : visibleLetters > i
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={
                  phase === "scatter"
                    ? {
                        duration: 0.5,
                        ease: [0.68, -0.55, 0.27, 1.55],
                        delay: i * 0.05,
                      }
                    : { duration: 0.3 }
                }
                className="font-heading font-black text-6xl md:text-8xl"
                style={{ color: "#EA580C" }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: visibleLetters >= 4 ? 0.5 : 0 }}
            className="font-handwritten text-lg mt-2 z-10"
            style={{ color: "#3B8EA5" }}
          >
            coffee studio
          </motion.span>

          {/* Progress bar */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-white/5 rounded-full overflow-hidden z-10">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #EA580C, #3B8EA5)",
                width: `${progress * 100}%`,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
