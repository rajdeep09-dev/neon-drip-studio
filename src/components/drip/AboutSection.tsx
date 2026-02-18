import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const AboutSection = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start end", "end start"] });

  // Parallax for image
  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  // Spring physics for smooth text movement
  const springConfig = { damping: 20, stiffness: 100 };
  const textY = useSpring(useTransform(scrollYProgress, [0, 0.5], [100, 0]), springConfig);

  return (
    <section ref={container} className="relative py-40 overflow-hidden bg-[#F9F7F5] z-10">
      {/* Decorative Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-[#0A1229]/20 to-transparent" />

      <div className="container px-6 md:px-12 mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40 items-center">

          {/* Image Column with Reveal & Parallax */}
          <div className="relative group perspective-[1000px]">
             <motion.div
               style={{ y }}
               className="relative w-full aspect-[3/4] rounded-[60px] overflow-hidden shadow-[0_40px_80px_-20px_rgba(10,18,41,0.15)] will-change-transform"
             >
               <motion.div
                 initial={{ scale: 1.2, filter: "blur(10px)" }}
                 whileInView={{ scale: 1, filter: "blur(0px)" }}
                 viewport={{ once: true, margin: "-10%" }}
                 transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                 className="w-full h-full"
               >
                 <img
                   src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2787&auto=format&fit=crop"
                   alt="Coffee Brewing"
                   className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110"
                 />
               </motion.div>

               {/* Grain Overlay */}
               <div className="absolute inset-0 bg-[#0A1229]/5 mix-blend-multiply pointer-events-none" />

               {/* Floating Badge */}
               <motion.div
                 initial={{ opacity: 0, x: 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.5, duration: 1 }}
                 className="absolute bottom-12 right-12 bg-white/80 backdrop-blur-xl border border-white/50 p-8 rounded-[30px] shadow-lg max-w-[240px] hidden md:block"
               >
                 <p className="font-serif italic text-3xl text-[#0A1229] leading-[0.9] mb-2">
                   "Coffee is a language."
                 </p>
                 <span className="block font-mono-label text-[10px] uppercase tracking-[0.2em] text-[#F05A28]">
                   - Jackie Chan
                 </span>
               </motion.div>
             </motion.div>
          </div>

          {/* Content Column */}
          <div className="space-y-16 relative">
            <motion.div style={{ y: textY }}>
              <motion.span
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#0A1229]/10 bg-[#F9F7F5] text-[10px] font-mono-label uppercase tracking-widest text-[#0A1229]/60 mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-[#F05A28] animate-pulse" />
                Our Philosophy
              </motion.span>

              <h2 className="font-serif text-7xl md:text-8xl lg:text-9xl text-[#0A1229] leading-[0.85] mb-10 tracking-tight">
                More than <br/>
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#F05A28] to-[#0A1229]/80">caffeine.</span>
              </h2>

              <p className="font-heading text-xl md:text-2xl text-[#0A1229]/70 leading-relaxed max-w-lg text-pretty">
                We believe in the ritual. From meticulous single-origin sourcing to the precise art of the pour-over, every cup tells a story of dedication.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-12 border-t border-[#0A1229]/10 pt-12">
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
                      <h3 className="font-mono-label text-[10px] uppercase tracking-widest text-[#0A1229]/40">{stat.label}</h3>
                      <span className="font-serif text-[#F05A28] opacity-0 group-hover:opacity-100 transition-opacity duration-300">{stat.icon}</span>
                   </div>
                   <p className="font-serif italic text-3xl md:text-4xl text-[#0A1229] group-hover:translate-x-2 transition-transform duration-500 ease-[0.22, 1, 0.36, 1]">{stat.value}</p>
                 </motion.div>
               ))}
            </div>

            <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.6 }}
            >
               <button className="group relative px-10 py-5 overflow-hidden rounded-full bg-[#0A1229] text-[#F9F7F5]">
                  <div className="absolute inset-0 bg-[#F05A28] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]" />
                  <span className="relative z-10 font-heading text-sm uppercase tracking-widest flex items-center gap-4 group-hover:text-[#F9F7F5] transition-colors">
                     Read Our Story
                     <span className="text-xl leading-none mb-1">→</span>
                  </span>
               </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
