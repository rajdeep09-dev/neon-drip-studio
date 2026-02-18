import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ── Magnetic button ── */
const MagneticButton = ({
  children,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    setPos({ x, y });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const base =
    variant === "primary"
      ? "bg-primary text-primary-foreground glow-orange relative overflow-hidden"
      : "bg-transparent border border-foreground/20 text-foreground hover:bg-foreground hover:text-background";

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`rounded-full px-9 py-4 font-heading font-semibold text-base lowercase tracking-wide transition-all duration-300 ${base} ${className}`}
    >
      {children}
      {variant === "primary" && (
        <span className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
          <span className="absolute top-0 left-[-75%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:animate-shine" />
        </span>
      )}
    </motion.button>
  );
};

/* ── Word with strikethrough ── */
const StrikethroughWord = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(t);
  }, []);
  return (
    <span className="relative inline-block">
      <span className="relative">average</span>
      {show && (
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute left-0 right-0 top-1/2 h-[3px] bg-primary origin-left"
        />
      )}
    </span>
  );
};

/* ── Main Hero ── */
const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const btnsY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const wordVariants = {
    hidden: { y: "110%" },
    visible: (i: number) => ({
      y: "0%",
      transition: { delay: 0.3 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  const words = [
    { text: "not", component: <span>not</span> },
    { text: "your", component: <span>your</span> },
    { text: "average", component: <StrikethroughWord /> },
    { text: "cup", component: <span className="text-gradient-hero">cup</span> },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      <div className="relative text-center max-w-5xl mx-auto">
        {/* Headline */}
        <motion.h1
          style={{ fontSize: "clamp(3.5rem, 12vw, 10rem)", y: headlineY }}
          className="font-heading font-extrabold leading-[0.9] tracking-tight"
        >
          <div className="flex flex-wrap justify-center gap-x-[0.3em]">
            {words.map((w, i) => (
              <span key={w.text} className="overflow-hidden inline-block">
                <motion.span
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                  className="inline-block"
                >
                  {w.component}
                </motion.span>
              </span>
            ))}
            {/* Blinking cursor period */}
            <span className="overflow-hidden inline-block">
              <motion.span
                custom={4}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className="inline-block"
              >
                <span className="animate-blink-cursor">.</span>
              </motion.span>
            </span>
          </div>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          style={{ y: subY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-8 text-muted-foreground text-lg md:text-xl max-w-md mx-auto lowercase"
        >
          specialty coffee for people who'd rather be anywhere but a starbucks
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          style={{ y: btnsY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticButton variant="primary">see the menu</MagneticButton>
          <MagneticButton variant="secondary">find us on the map</MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: scrollOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-foreground/40"
        >
          <span className="font-handwritten text-base">scroll down</span>
          <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
            ↓
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
