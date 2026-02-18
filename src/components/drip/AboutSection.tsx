import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import TiltCard from "./TiltCard"; // Import the TiltCard component

const AboutSection = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start end", "end start"] });

  // Parallax for image
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Spring physics for smooth text movement
  const springConfig = { damping: 25, stiffness: 80 };
  const textY = useSpring(useTransform(scrollYProgress, [0, 0.5], [60, 0]), springConfig);

  return (
    <section ref={container} className="relative py-32 md:py-48 bg-[#050A14] text-[#F8FAFC] overflow-hidden">

      {/* Decorative Line (Minimal) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-white/10 to-transparent" />

      <div className="container px-6 md:px-12 mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">

          {/* Tilt Card Wrapper for Image */}
          <TiltCard className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5">
            <motion.div
               style={{ y }}
               className="relative w-full h-full will-change-transform"
             >
               <motion.div
                 initial={{ scale: 1.15, filter: "blur(10px)" }}
                 whileInView={{ scale: 1, filter: "blur(0px)" }}
                 viewport={{ once: true, margin: "-10%" }}
                 transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                 className="w-full h-full"
               >
                 <img
                   src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2787&auto=format&fit=crop"
                   alt="Coffee Brewing"
                   className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-[1.5s]"
                 />
               </motion.div>

               {/* Minimal Badge */}
               <motion.div
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.6, duration: 1 }}
                 className="absolute bottom-12 right-12 glass-card p-6 max-w-[200px] hidden md:block backdrop-blur-3xl border-white/20 bg-white/5"
               >
                 <p className="font-heading font-medium text-lg leading-tight mb-2">
                   "Coffee is a language."
                 </p>
                 <span className="block font-mono-label text-[10px] tracking-[0.2em] text-[#F05A28]">
                   - Jackie Chan
                 </span>
               </motion.div>
             </motion.div>
          </TiltCard>

          {/* Content Column */}
          <div className="space-y-16 relative z-10">
            <motion.div style={{ y: textY }}>
              <motion.span
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono-label tracking-[0.2em] text-white/60 mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#F05A28] animate-pulse" />
                Our Philosophy
              </motion.span>

              <h2 className="font-heading font-bold text-6xl md:text-8xl tracking-tighter leading-[0.9] mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50">
                More than just <br/>
                <span className="text-[#F05A28]">caffeine.</span>
              </h2>

              <p className="font-heading text-xl text-white/60 leading-relaxed max-w-lg text-pretty">
                We believe in the ritual. From meticulous single-origin sourcing to the precise art of the pour-over, every cup tells a story of dedication.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-12 border-t border-white/10 pt-12">
               {[
                 { label: "Sourced", value: "Ethically", icon: "✦" },
                 { label: "Roasted", value: "Locally", icon: "☀" },
                 { label: "Brewed", value: "Perfectly", icon: "⚡" },
                 { label: "Served", value: "Warmly", icon: "♥" }
               ].map((stat, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.15, duration: 0.8 }}
                   className="group cursor-default"
                 >
                   <div className="flex justify-between items-start mb-2">
                      <h3 className="font-mono-label text-[10px] tracking-[0.2em] text-white/40 uppercase">{stat.label}</h3>
                      <span className="text-[#F05A28] opacity-0 group-hover:opacity-100 transition-opacity duration-300">{stat.icon}</span>
                   </div>
                   <p className="font-serif italic text-3xl text-white group-hover:translate-x-2 transition-transform duration-500">{stat.value}</p>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
