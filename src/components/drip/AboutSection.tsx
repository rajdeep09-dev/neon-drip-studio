import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const AboutSection = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={container} className="relative py-32 overflow-hidden bg-[#F8F5F2]">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Image Column with Parallax */}
          <motion.div
            style={{ y }}
            className="relative w-full aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2787&auto=format&fit=crop"
              alt="Coffee Brewing"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110"
            />

            {/* Overlay Badge */}
            <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-lg max-w-[200px]">
              <p className="font-serif italic text-2xl text-[#0A1A44] leading-tight">
                "Coffee is a language in itself."
              </p>
              <span className="block mt-2 font-heading text-xs uppercase tracking-widest text-[#F05A28]">
                - Jackie Chan
              </span>
            </div>
          </motion.div>

          {/* Content Column */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full border border-[#0A1A44]/10 text-xs font-heading uppercase tracking-widest text-[#0A1A44]/60 mb-6">
                Our Philosophy
              </span>
              <h2 className="font-serif text-6xl md:text-7xl text-[#0A1A44] leading-[0.9] mb-8">
                More than just <br/>
                <span className="italic text-[#F05A28]">a caffeine fix.</span>
              </h2>
              <p className="font-heading text-lg text-[#0A1A44]/70 leading-relaxed max-w-md">
                We believe in the ritual of coffee. From the meticulous sourcing of single-origin beans to the precise art of the pour-over, every cup tells a story of dedication and craft.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-8">
               {[
                 { label: "Sourced", value: "Ethically" },
                 { label: "Roasted", value: "Locally" },
                 { label: "Brewed", value: "Perfectly" },
                 { label: "Served", value: "Warmly" }
               ].map((stat, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1, duration: 0.5 }}
                   className="p-6 bg-white rounded-2xl border border-[#0A1A44]/5 hover:border-[#F05A28]/20 transition-colors shadow-sm hover:shadow-md"
                 >
                   <h3 className="font-heading text-xs uppercase tracking-widest text-[#0A1A44]/40 mb-2">{stat.label}</h3>
                   <p className="font-serif italic text-2xl text-[#0A1A44]">{stat.value}</p>
                 </motion.div>
               ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#0A1A44] text-white rounded-full font-heading uppercase tracking-widest text-sm hover:bg-[#F05A28] transition-colors duration-300"
            >
              Read Our Story
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
