import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Easing } from "framer-motion";

const stats = [
  { number: 3, label: "origin countries", suffix: "" },
  { number: 12, label: "house blends", suffix: "+" },
  { number: 847, label: "5-star reviews", suffix: "" },
  { number: 0, label: "burnt batches (we promise)", suffix: "" },
];

const CountUpNumber = ({ target, suffix }: { target: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || target === 0) return;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-mono text-3xl md:text-4xl font-bold text-primary">
      {count}{suffix}
    </span>
  );
};

const ease: Easing = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative z-10 py-24 md:py-32 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease }}
          className="relative"
        >
          <div className="absolute -inset-4 glass-teal rotate-[6deg] -z-10" style={{ borderRadius: "30px" }} />
          <div
            className="relative overflow-hidden bg-muted"
            style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", aspectRatio: "4/5" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10" />
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-handwritten text-5xl text-foreground/20">☕</span>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 glass-pill glass-animated-border font-handwritten text-sm text-foreground/70">
            small batch only
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="space-y-8">
          <motion.div variants={fadeUp}>
            <span className="glass-pill font-handwritten text-primary text-lg inline-block -rotate-3">who we are ↓</span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl leading-[1.1] lowercase">
            we make coffee that <span className="text-gradient-hero">actually slaps</span>.
          </motion.h2>

          <motion.p variants={fadeUp} className="text-foreground/60 text-base md:text-lg leading-relaxed max-w-lg">
            we started drip because we were tired of burnt, overpriced coffee served by people who clearly hate their jobs. our beans are sourced directly from small farms, roasted in-house, and served by people who genuinely love what they do. no pretension. no gatekeeping. just really, really good coffee.
          </motion.p>

          <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="glass-pill glass-hover text-center py-4 px-3">
                <CountUpNumber target={stat.number} suffix={stat.suffix} />
                <p className="text-foreground/50 text-xs mt-1 font-mono uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
