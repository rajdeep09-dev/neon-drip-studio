import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

/* --- Reusable Components --- */

const RevealText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "120%", skewY: 10, rotate: 5, opacity: 0 }}
          animate={{ y: 0, skewY: 0, rotate: 0, opacity: 1 }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1], // Custom "Out Expo" curve
            delay: delay + i * 0.035,
          }}
          className="inline-block origin-bottom-left will-change-transform"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

const MagneticButton = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.4); // More magnetic pull
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 120, damping: 15, mass: 0.1 }}
      className={`relative overflow-hidden group ${className}`}
    >
      <span className="relative z-10 block transition-transform duration-500 group-hover:-translate-y-[150%]">
        {children}
      </span>
      <span className="absolute inset-0 z-10 block transition-transform duration-500 translate-y-[150%] group-hover:translate-y-0 flex items-center justify-center text-[#0A1A44]">
        {children}
      </span>
      <div className="absolute inset-0 bg-[#F05A28] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1] rounded-full" />
    </motion.button>
  );
};

/* --- Hero Section --- */

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.6], ["0px", "10px"]);

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[110vh] w-full overflow-hidden bg-[#0A1229] text-[#F9F7F5]"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background Layer */}
      <motion.div style={{ y, scale, filter: blur }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2942&auto=format&fit=crop')",
            filter: "brightness(0.55) contrast(1.15) saturate(0.9)",
          }}
        />
        {/* Animated Gradient Blob */}
        <motion.div
           animate={{
             scale: [1, 1.2, 1],
             opacity: [0.3, 0.5, 0.3],
             rotate: [0, 180, 360]
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-gradient-to-br from-[#F05A28]/20 to-transparent rounded-full blur-[150px] mix-blend-screen"
        />

        {/* Grain Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.07] mix-blend-overlay" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1229]/60 via-transparent to-[#0A1229]" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 md:px-12 pointer-events-none perspective-[1000px]">

        {/* Top Label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute top-32 md:top-40 text-center"
        >
          <div className="flex items-center gap-4">
            <span className="w-12 h-[1px] bg-[#F05A28]/50" />
            <span className="font-mono-label text-[10px] uppercase tracking-[0.4em] text-[#F9F7F5]/60">
              Est. 2024 • Los Angeles
            </span>
            <span className="w-12 h-[1px] bg-[#F05A28]/50" />
          </div>
        </motion.div>

        {/* Main Headline - Massive Typography */}
        <div className="flex flex-col items-center leading-[0.82] tracking-tighter mix-blend-difference transform-style-3d">
          <h1 className="font-serif italic text-[16vw] md:text-[13rem] text-[#F9F7F5] whitespace-nowrap overflow-visible z-20 drop-shadow-2xl">
            <RevealText text="Visual" delay={0.2} />
          </h1>
          <div className="flex items-center gap-6 md:gap-16 w-full justify-center z-10 -mt-4 md:-mt-8">
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: -15 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
              className="font-handwritten text-[#F05A28] text-[9vw] md:text-[7rem] drop-shadow-[0_0_30px_rgba(240,90,40,0.5)]"
            >
              &
            </motion.div>
            <h1 className="font-heading font-light text-[13vw] md:text-[11rem] text-[#F9F7F5] uppercase tracking-tight drop-shadow-lg">
              <RevealText text="Product" delay={0.4} />
            </h1>
          </div>
          <h1 className="font-serif italic text-[16vw] md:text-[13rem] text-[#F9F7F5] whitespace-nowrap overflow-visible text-right w-full pr-[8%] -mt-4 md:-mt-8 z-0 opacity-80">
            <RevealText text="Designer" delay={0.6} />
          </h1>
        </div>

        {/* Floating Abstract Elements (Parallax) */}
        <ParallaxElement mouseX={mouseX} mouseY={mouseY} depth={0.03} className="absolute top-[15%] left-[5%] w-[18vw] aspect-[3/4] hidden lg:block z-0">
           <div className="w-full h-full bg-[#F05A28] rounded-full blur-[100px] opacity-[0.15] mix-blend-screen animate-pulse" />
        </ParallaxElement>

        <ParallaxElement mouseX={mouseX} mouseY={mouseY} depth={0.06} className="absolute bottom-[25%] right-[5%] w-[22vw] aspect-square hidden lg:block z-0">
           <div className="w-full h-full bg-[#8CAKB6] rounded-full blur-[120px] opacity-[0.1] mix-blend-screen animate-pulse delay-1000" />
        </ParallaxElement>

        {/* Bottom CTA Area */}
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-12 md:bottom-20 w-full flex justify-between items-end px-4 md:px-0 max-w-[1600px] pointer-events-auto"
        >
          <div className="hidden md:block w-1/3 text-[10px] font-mono-label uppercase tracking-widest text-[#F9F7F5]/40 leading-relaxed">
            Scroll to explore<br />the collection
          </div>

          <div className="w-full md:w-1/3 flex justify-center">
            <MagneticButton className="px-12 py-6 bg-[#F9F7F5]/5 backdrop-blur-xl border border-[#F9F7F5]/10 rounded-full text-[#F9F7F5] font-heading font-medium uppercase tracking-widest text-xs hover:border-transparent transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_-10px_rgba(240,90,40,0.3)]">
              View Projects
            </MagneticButton>
          </div>

          <div className="hidden md:flex w-1/3 justify-end gap-12 text-[10px] font-mono-label uppercase tracking-widest text-[#F9F7F5]/40">
            <span className="hover:text-[#F05A28] transition-colors cursor-pointer">(001) Design</span>
            <span className="hover:text-[#F05A28] transition-colors cursor-pointer">(002) Code</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ParallaxElement = ({ mouseX, mouseY, depth, children, className }: any) => {
  const x = useTransform(mouseX, [-0.5, 0.5], [-80 * depth, 80 * depth]);
  const y = useTransform(mouseY, [-0.5, 0.5], [-80 * depth, 80 * depth]);
  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
};

export default HeroSection;
