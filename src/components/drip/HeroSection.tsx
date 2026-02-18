import { motion } from "framer-motion";

 jules-hero-redesign-artemis-15880237673313619969
const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#e0e0e0]">
      {/* Background Image Layer - Vintage Landscape Painting Style */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2835&auto=format&fit=crop')", // Lighter, painting style
          filter: "brightness(0.9) contrast(1.1) saturate(0.8) blur(2px)"
        }}
      />

      {/* Overlay for tinting the background if needed */}
      <div className="absolute inset-0 z-0 bg-amber-50/20 mix-blend-overlay pointer-events-none" />

      {/* Main Card Container */}
      <div className="relative z-10 w-[95%] max-w-[1400px] bg-artemis-bg rounded-[50px] border-[1px] border-[#7CA5B8]/30 shadow-2xl overflow-hidden min-h-[90vh] flex flex-col justify-between p-8 md:p-12">

        {/* Header / Nav inside the card */}
        <header className="w-full flex justify-between items-start text-sm md:text-base font-medium text-gray-500 uppercase tracking-wide z-20 relative">
          <span>Works</span>

          <div className="flex flex-col items-center leading-none mt-[-5px]">
            <h2 className="font-serif text-artemis-orange text-2xl md:text-3xl italic font-bold">Artemis &</h2>
            <h2 className="font-serif text-artemis-orange text-2xl md:text-3xl italic font-bold ml-8">Artemis</h2>
          </div>

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
 main

          <span>Playground</span>
        </header>

        {/* Main Hero Content */}
        <div className="relative flex flex-col items-center text-center max-w-5xl mx-auto mt-12 md:mt-0 z-20">
          <span className="text-gray-600 font-heading text-lg mb-4 tracking-wide">This is Artemis</span>

 jules-hero-redesign-artemis-15880237673313619969
          <h1 className="font-serif text-artemis-blue text-5xl md:text-7xl lg:text-9xl italic leading-[1.1] mb-6">
            Visual and <br/>
            <span className="relative inline-block ml-4 md:ml-12">
              Product designer
            </span>
          </h1>

          <span className="text-gray-600 font-heading text-lg mb-12 tracking-wide">startups can count on</span>

          <button className="bg-artemis-orange text-white px-10 py-4 rounded-full font-heading font-medium text-lg hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300">
            Check out my works
          </button>
        </div>

        {/* Scattered Images (Absolute Positioned relative to the card content area) */}
        {/* Top Left - Woman and Dog (Painting) - Tilted Left */}
        <motion.div
          initial={{ opacity: 0, x: -50, rotate: -15 }}
          animate={{ opacity: 1, x: 0, rotate: -12 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-[18%] left-[5%] md:left-[8%] w-32 md:w-48 aspect-[3/4] shadow-xl rounded-sm overflow-hidden hidden lg:block z-10 origin-center"

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
 main
        >
          <img src="https://images.unsplash.com/photo-1597950293774-8b65675e2365?q=80&w=2787&auto=format&fit=crop" alt="Painting" className="w-full h-full object-cover grayscale-[20%] sepia-[10%]" />
        </motion.div>

        {/* Top Right - Cassie & Henry (Abstract Green/Black) - Tilted Right */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 15 }}
          animate={{ opacity: 1, x: 0, rotate: 12 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute top-[20%] right-[5%] md:right-[8%] w-32 md:w-48 aspect-[3/4] shadow-xl rounded-sm overflow-hidden hidden lg:block z-10 origin-center bg-black"
        >
           <div className="relative w-full h-full bg-gradient-to-br from-green-900 to-black p-4 flex flex-col items-center justify-center text-white">
              <span className="font-serif italic text-center text-sm absolute top-4">Cassie & Henry</span>
              <div className="border border-white/50 rounded-full w-16 h-16 flex items-center justify-center font-serif text-2xl italic">&</div>
           </div>
        </motion.div>

        {/* Bottom Left - Colorful Illustration (Red/White/Blue) - Tilted Left */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: -8 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-[20%] left-[8%] md:left-[12%] w-40 md:w-60 aspect-[4/3] shadow-xl rounded-sm p-3 bg-[#f8f5f2] border border-gray-100 hidden lg:block z-10 origin-center rotate-[-8deg]"
        >
          <div className="w-full h-full bg-red-500 relative overflow-hidden flex items-center justify-center">
             <img src="https://images.unsplash.com/photo-1549887552-93f27ea6b7eb?q=80&w=2865&auto=format&fit=crop" alt="Art" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
             <div className="absolute inset-0 border-4 border-white m-2"></div>
          </div>
        </motion.div>

        {/* Bottom Right - Gradient Card (Blue/Yellow) - Tilted Right */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: 5 }}
          animate={{ opacity: 1, y: 0, rotate: 6 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-[18%] right-[8%] md:right-[12%] w-40 md:w-64 aspect-[16/10] shadow-xl rounded-xl overflow-hidden hidden lg:block z-10 origin-center rotate-[6deg]"
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-100 via-white to-yellow-100 p-6 flex flex-col justify-end">
            <span className="font-serif text-artemis-blue text-xl leading-tight">Ableton<br/>Springs &<br/>Summer</span>
          </div>
        </motion.div>

        {/* Footer / Bottom Elements */}
        <div className="flex flex-col items-center mt-12 md:mt-0 mb-8 z-20 relative">
          {/* Telescope Icon */}
          <div className="mb-6 transform scale-110">
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Telescope Body */}
              <path d="M25 75 L55 65 L85 45" stroke="#0A1A44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="78" y="40" width="18" height="12" transform="rotate(-35 87 46)" fill="#F05A28" stroke="#0A1A44" strokeWidth="2"/>
              <rect x="25" y="70" width="30" height="12" transform="rotate(-18 40 76)" fill="white" stroke="#0A1A44" strokeWidth="2"/>
              <path d="M50 70 L50 90 M60 67 L60 90" stroke="#0A1A44" strokeWidth="2" strokeLinecap="round"/>
              <path d="M45 90 L65 90" stroke="#0A1A44" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="55" cy="90" r="2.5" fill="#0A1A44"/>
            </svg>
          </div>

          <p className="font-serif italic text-2xl md:text-3xl text-gray-700 font-light">Sneak peak of my works</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
