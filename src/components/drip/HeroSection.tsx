import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import MagneticButton from "./MagneticButton"; // Ensure this import is correct

const RevealText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "120%", rotateX: 90, opacity: 0 }}
          animate={{ y: 0, rotateX: 0, opacity: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1], // "Out Expo" curve for premium snap
            delay: delay + i * 0.03,
          }}
          className="inline-block origin-bottom will-change-transform"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  // Parallax & Blur
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const blur = useTransform(scrollYProgress, [0, 0.5], ["0px", "10px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[110vh] w-full overflow-hidden bg-[#050A14] text-[#F8FAFC] perspective-[2000px]"
    >
      {/* Aurora Background (Global Class via CSS) */}
      <div className="aurora-bg" />

      {/* Dynamic Noise Overlay (Subtle) */}
      <div className="noise-overlay opacity-[0.04] mix-blend-overlay" />

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 md:px-12 pointer-events-none">

        {/* Top Label - Minimalist Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute top-32 md:top-40 flex flex-col items-center gap-2"
        >
          <span className="font-mono-label text-[10px] tracking-[0.4em] text-white/40 uppercase">
            Est. 2024 — Los Angeles
          </span>
        </motion.div>

        {/* Main Headline - Gradient Fill & Massive Scale */}
        <div className="flex flex-col items-center leading-[0.9] tracking-tight mix-blend-difference transform-style-3d text-center">
          <h1 className="font-heading font-semibold text-[14vw] md:text-[10rem] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-2xl">
            <RevealText text="Visual" delay={0.2} />
          </h1>

          <div className="flex items-center gap-8 md:gap-16 w-full justify-center -mt-2 md:-mt-6 relative z-10">
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: -15 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
              className="font-serif italic text-[#F05A28] text-[8vw] md:text-[6rem]"
            >
              &
            </motion.div>
            <h1 className="font-heading font-light text-[12vw] md:text-[9rem] text-white/90 uppercase tracking-wide">
              <RevealText text="Product" delay={0.4} />
            </h1>
          </div>

          <h1 className="font-heading font-semibold text-[14vw] md:text-[10rem] text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-white/40 -mt-2 md:-mt-6 opacity-90">
            <RevealText text="Designer" delay={0.6} />
          </h1>
        </div>

        {/* Subtext Description */}
        <motion.p
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1.2, duration: 1 }}
           className="mt-12 md:mt-16 font-heading text-lg md:text-xl text-[#F8FAFC]/60 max-w-lg text-center leading-relaxed text-balance"
        >
           Crafting digital experiences that bridge the gap between tangible ritual and abstract design.
        </motion.p>

        {/* Call to Action - Liquid Magnetic Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 pointer-events-auto"
        >
          <MagneticButton className="px-10 py-5 bg-white/5 border border-white/10 text-xs tracking-[0.2em] hover:bg-white/10 backdrop-blur-md">
            View Projects
          </MagneticButton>
        </motion.div>
      </div>

      {/* Floating Abstract Orbs (Subtle Background Elements) */}
      <motion.div
         animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
         className="absolute bottom-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-[#F05A28] blur-[150px] opacity-[0.08] mix-blend-screen pointer-events-none"
      />
      <motion.div
         animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
         className="absolute top-[10%] right-[5%] w-[35vw] h-[35vw] rounded-full bg-blue-900 blur-[150px] opacity-[0.1] mix-blend-screen pointer-events-none"
      />
    </section>
  );
};

export default HeroSection;
