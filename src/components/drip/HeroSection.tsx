import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

/* --- Reusable Components --- */

const RevealText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", rotate: 10, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + i * 0.03,
          }}
          className="inline-block origin-bottom-left"
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
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
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
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative overflow-hidden group ${className}`}
    >
      <span className="relative z-10 block transition-transform duration-500 group-hover:-translate-y-[120%]">
        {children}
      </span>
      <span className="absolute inset-0 z-10 block transition-transform duration-500 translate-y-[120%] group-hover:translate-y-0 flex items-center justify-center">
        {children}
      </span>
      <div className="absolute inset-0 bg-[#F05A28] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1] rounded-full" />
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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
      className="relative h-screen w-full overflow-hidden bg-[#0A1A44] text-[#F8F5F2]"
      onMouseMove={handleMouseMove}
    >
      {/* Background Video/Image Layer */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2942&auto=format&fit=crop')", // High-end coffee aesthetic
            filter: "brightness(0.6) contrast(1.1)",
          }}
        />
        {/* Grain Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A44]/30 via-transparent to-[#0A1A44]" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 md:px-12 pointer-events-none">

        {/* Top Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute top-32 md:top-40 text-center"
        >
          <span className="font-mono-label text-xs uppercase tracking-[0.4em] text-[#F05A28]">
            Est. 2024 • Los Angeles
          </span>
        </motion.div>

        {/* Main Headline - Massive Typography */}
        <div className="flex flex-col items-center leading-[0.85] tracking-tighter mix-blend-difference">
          <h1 className="font-serif italic text-[15vw] md:text-[12rem] text-white whitespace-nowrap overflow-visible">
            <RevealText text="Visual" delay={0.2} />
          </h1>
          <div className="flex items-center gap-4 md:gap-12 w-full justify-center">
            <motion.span
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
              className="font-handwritten text-[#F05A28] text-[8vw] md:text-[6rem]"
            >
              &
            </motion.span>
            <h1 className="font-heading font-light text-[12vw] md:text-[10rem] text-white uppercase tracking-tight">
              <RevealText text="Product" delay={0.4} />
            </h1>
          </div>
          <h1 className="font-serif italic text-[15vw] md:text-[12rem] text-white whitespace-nowrap overflow-visible text-right w-full pr-[10%]">
            <RevealText text="Designer" delay={0.6} />
          </h1>
        </div>

        {/* Floating Abstract Elements (Parallax) */}
        <ParallaxElement mouseX={mouseX} mouseY={mouseY} depth={0.05} className="absolute top-[20%] left-[10%] w-[15vw] aspect-[3/4] hidden lg:block">
           <div className="w-full h-full bg-[#F05A28] rounded-full blur-[80px] opacity-40 mix-blend-screen" />
        </ParallaxElement>

        <ParallaxElement mouseX={mouseX} mouseY={mouseY} depth={0.08} className="absolute bottom-[20%] right-[10%] w-[20vw] aspect-square hidden lg:block">
           <div className="w-full h-full bg-[#7CA5B8] rounded-full blur-[100px] opacity-30 mix-blend-screen" />
        </ParallaxElement>

        {/* Bottom CTA Area */}
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 md:bottom-20 w-full flex justify-between items-end px-4 md:px-0 max-w-[1400px] pointer-events-auto"
        >
          <div className="hidden md:block w-1/3 text-xs font-mono-label uppercase tracking-widest text-white/50">
            Scroll to explore<br />the collection
          </div>

          <div className="w-full md:w-1/3 flex justify-center">
            <MagneticButton className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-heading font-medium uppercase tracking-widest text-sm hover:border-transparent transition-colors">
              View Projects
            </MagneticButton>
          </div>

          <div className="hidden md:flex w-1/3 justify-end gap-8 text-xs font-mono-label uppercase tracking-widest text-white/50">
            <span>(001)</span>
            <span>Design</span>
            <span>(002)</span>
            <span>Code</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ParallaxElement = ({ mouseX, mouseY, depth, children, className }: any) => {
  const x = useTransform(mouseX, [-0.5, 0.5], [-100 * depth, 100 * depth]);
  const y = useTransform(mouseY, [-0.5, 0.5], [-100 * depth, 100 * depth]);
  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
};

export default HeroSection;
