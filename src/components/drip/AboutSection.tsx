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
    <span ref={ref} className="font-serif italic text-3xl md:text-4xl font-bold text-artemis-orange">
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
    <section ref={sectionRef} className="relative z-10 py-24 md:py-32 px-6 max-w-7xl mx-auto bg-artemis-bg">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease }}
          className="relative"
        >
          {/* Card Style Background */}
          <div className="absolute -inset-4 bg-white rounded-[40px] shadow-lg border border-[#7CA5B8]/20 rotate-[3deg] -z-10" />

          <div
            className="relative overflow-hidden bg-gray-100 rounded-[35px] aspect-[4/5] shadow-inner"
          >
             {/* Placeholder Image */}
             <img
               src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2942&auto=format&fit=crop"
               alt="Coffee Shop Interior"
               className="w-full h-full object-cover grayscale-[20%] sepia-[10%]"
             />
          </div>
          <div className="absolute bottom-6 right-6 bg-white px-6 py-2 rounded-full shadow-lg border border-[#7CA5B8]/20 font-serif italic text-sm text-artemis-blue">
            small batch only
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="space-y-8">
          <motion.div variants={fadeUp}>
            <span className="inline-block px-4 py-1 rounded-full border border-artemis-orange/30 text-artemis-orange font-serif italic text-lg -rotate-2 bg-orange-50/50">
              who we are
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="font-serif italic text-artemis-blue text-4xl md:text-6xl lg:text-7xl leading-[1.1]">
            we make coffee that <span className="text-artemis-orange underline decoration-wavy decoration-2 underline-offset-4">actually slaps</span>.
          </motion.h2>

          <motion.p variants={fadeUp} className="text-gray-600 text-base md:text-lg leading-relaxed max-w-lg font-heading">
            we started drip because we were tired of burnt, overpriced coffee served by people who clearly hate their jobs. our beans are sourced directly from small farms, roasted in-house, and served by people who genuinely love what they do. no pretension. no gatekeeping. just really, really good coffee.
          </motion.p>

          <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                <CountUpNumber target={stat.number} suffix={stat.suffix} />
                <p className="text-gray-400 text-xs mt-2 font-heading uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
