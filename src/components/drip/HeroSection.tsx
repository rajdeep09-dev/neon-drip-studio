import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Link } from "react-router-dom";

/* Text Reveal Component */
const RevealText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => (
  <span className={`inline-block overflow-hidden align-bottom ${className}`}>
    <motion.span
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay }}
      className="inline-block"
    >
      {text}
    </motion.span>
  </span>
);

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Parallax Mouse Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[110vh] w-full flex items-center justify-center overflow-hidden bg-[#e0e0e0] perspective-[1000px]"
      onMouseMove={handleMouseMove}
    >
      {/* Background Parallax Layer */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1685648043756-124a4adad0ec?q=80&w=2835&auto=format&fit=crop')",
            filter: "brightness(0.85) contrast(1.1) saturate(0.9) blur(4px)"
          }}
        />
        <div className="absolute inset-0 bg-[#0A1A44]/10 mix-blend-multiply" />
      </motion.div>

      {/* 3D Card Container */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-10 w-[92%] max-w-[1500px] h-[85vh] bg-[#F8F5F2] rounded-[60px] border border-[#F05A28]/10 shadow-[0_20px_80px_-20px_rgba(10,26,68,0.3)] overflow-hidden flex flex-col items-center justify-center p-8 md:p-16 isolate transform-style-3d"
      >
        {/* Grain Overlay on Card */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

        {/* Floating Images with Parallax Depth */}
        <ParallaxImage
          src="https://images.unsplash.com/photo-1571159346336-a29a1b400029?q=80&w=2787&auto=format&fit=crop"
          alt="Art"
          className="top-[10%] left-[5%] rotate-[-12deg] w-[180px] aspect-[3/4]"
          depth={0.15}
          mouseX={mouseX}
          mouseY={mouseY}
        />

        <ParallaxImage
          src="https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?q=80&w=2865&auto=format&fit=crop"
          alt="Abstract"
          className="bottom-[15%] left-[10%] rotate-[8deg] w-[240px] aspect-[4/3] border-8 border-white"
          depth={0.25}
          mouseX={mouseX}
          mouseY={mouseY}
        />

        <ParallaxImage
          src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2787&auto=format&fit=crop"
          alt="Green"
          className="top-[15%] right-[5%] rotate-[12deg] w-[200px] aspect-[3/4] bg-[#0A2A1A]"
          depth={0.2}
          mouseX={mouseX}
          mouseY={mouseY}
        >
          <div className="absolute inset-0 flex items-center justify-center text-white font-serif italic text-2xl mix-blend-difference">
            Art & Design
          </div>
        </ParallaxImage>

        <ParallaxImage
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop"
          alt="Gradient"
          className="bottom-[12%] right-[10%] rotate-[-6deg] w-[260px] aspect-[16/10] bg-white p-4 shadow-xl"
          depth={0.3}
          mouseX={mouseX}
          mouseY={mouseY}
        >
           <div className="w-full h-full bg-gradient-to-br from-blue-100 to-orange-100 flex items-end p-4">
             <span className="font-heading text-xs uppercase tracking-widest text-[#0A1A44]">Summer Collection</span>
           </div>
        </ParallaxImage>

        {/* Main Content */}
        <div className="relative z-50 flex flex-col items-center text-center max-w-6xl mx-auto mix-blend-darken">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="w-12 h-[1px] bg-[#0A1A44]/30" />
            <span className="font-heading text-sm uppercase tracking-[0.3em] text-[#0A1A44]/60">Est. 2024</span>
            <span className="w-12 h-[1px] bg-[#0A1A44]/30" />
          </motion.div>

          <h1 className="font-serif italic text-[#0A1A44] text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] tracking-tight mb-8">
            <div className="flex justify-center gap-[0.2em] flex-wrap">
              <RevealText text="Visual" delay={0.1} />
              <span className="font-handwritten text-[#F05A28] text-5xl md:text-7xl lg:text-8xl -rotate-12 self-end mb-4 mx-4">&</span>
              <RevealText text="Product" delay={0.2} />
            </div>
            <div className="block mt-2">
              <RevealText text="Designer" delay={0.3} className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A1A44] to-[#F05A28]" />
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="font-heading text-lg md:text-xl text-[#0A1A44]/70 max-w-xl leading-relaxed mb-12"
          >
            Crafting digital experiences that feel tangible. Based in the Arts District, brewing ideas daily.
          </motion.p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
          >
            <button className="group relative px-10 py-5 bg-[#0A1A44] rounded-full overflow-hidden shadow-2xl hover:shadow-[#F05A28]/30 transition-shadow duration-500">
              <div className="absolute inset-0 bg-[#F05A28] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
              <span className="relative z-10 font-heading font-medium text-white group-hover:text-white transition-colors uppercase tracking-widest text-sm flex items-center gap-3">
                Explore Work
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#0A1A44] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

/* Helper Component for Parallax Images */
const ParallaxImage = ({
  src,
  alt,
  className,
  depth,
  mouseX,
  mouseY,
  children
}: {
  src: string;
  alt: string;
  className: string;
  depth: number;
  mouseX: any;
  mouseY: any;
  children?: React.ReactNode;
}) => {
  const x = useTransform(mouseX, [-0.5, 0.5], [-40 * depth, 40 * depth]);
  const y = useTransform(mouseY, [-0.5, 0.5], [-40 * depth, 40 * depth]);

  return (
    <motion.div
      style={{ x, y }}
      className={`absolute hidden lg:block overflow-hidden shadow-2xl rounded-2xl ${className}`}
    >
      {src && <img src={src} alt={alt} className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700 hover:scale-110" />}
      {children}
    </motion.div>
  );
};

export default HeroSection;
