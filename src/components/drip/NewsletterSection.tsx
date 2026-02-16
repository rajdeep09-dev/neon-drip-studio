import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import type { Easing } from "framer-motion";

const ease: Easing = [0.25, 0.1, 0.25, 1];

const NewsletterSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const target = 2847;
    const duration = 1500;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView]);

  return (
    <section ref={ref} className="relative z-10 py-24 md:py-32 px-6">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="font-heading font-bold text-3xl md:text-5xl lowercase"
        >
          join the <span className="text-neon-orange">drip</span> list
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6, ease }}
          className="text-foreground/50 text-base md:text-lg lowercase"
        >
          new menu drops. secret events. discounts. no spam, ever. we hate spam too.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6, ease }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-pill inline-flex items-center gap-2 !py-4 !px-8 text-accent font-heading font-medium"
            >
              <span>✓</span> you're in! check your inbox ✨
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="your email (we'll treat it nice)"
                className="glass-input flex-1 px-5 py-3.5 text-sm rounded-full"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground rounded-full px-8 py-3.5 font-heading font-semibold lowercase text-sm glow-orange hover:scale-105 active:scale-95 transition-transform duration-200 shrink-0"
              >
                subscribe
              </button>
            </form>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-foreground/30 text-sm lowercase"
        >
          join {count.toLocaleString()} other cool people
        </motion.p>
      </div>
    </section>
  );
};

export default NewsletterSection;
