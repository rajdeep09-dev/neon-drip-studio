import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const TICKER_TEXT =
  "SINGLE ORIGIN ✧ SPECIALTY GRADE ✧ SMALL BATCH ROASTED ✧ OPEN DAILY ✧ NOT CORPORATE ✧ ACTUALLY GOOD COFFEE ✧ DRIP COFFEE STUDIO ✧ ";

const MarqueeTicker = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" as any });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, x: 200 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative z-10 w-full border-y border-foreground/[0.06] glass-dark py-4 overflow-hidden"
    >
      <div className="marquee-track whitespace-nowrap">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="font-heading font-bold text-sm md:text-base uppercase tracking-[0.1em] text-foreground/40 shrink-0"
          >
            {TICKER_TEXT.split("✧").map((segment, j) => (
              <span key={j}>
                {segment}
                {j < TICKER_TEXT.split("✧").length - 1 && (
                  <span className="text-primary mx-1">✦</span>
                )}
              </span>
            ))}
          </span>
        ))}
      </div>
    </motion.section>
  );
};

export default MarqueeTicker;
