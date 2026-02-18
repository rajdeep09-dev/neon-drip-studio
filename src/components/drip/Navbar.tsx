import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useLogoClickEasterEgg } from "@/hooks/useEasterEggs";

const NAV_ITEMS = [
  { label: "menu", href: "/menu", subtext: "Fresh roasts & seasonal blends" },
  { label: "about", href: "/about", subtext: "Our story & philosophy" },
  { label: "events", href: "/events", subtext: "Workshops & cupping sessions" },
  { label: "shop", href: "/shop", subtext: "Gear & beans delivered" },
  { label: "journal", href: "/journal", subtext: "Thoughts on coffee culture" },
];

/* Magnetic Hook with Fluidity */
const useFluidMagnetic = () => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Higher intensity for fluid feel
    x.set((e.clientX - centerX) * 0.6);
    y.set((e.clientY - centerY) * 0.6);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, x: springX, y: springY, handleMouseMove, handleMouseLeave };
};

/* Fluid Magnetic Link */
const FluidLink = ({ children, to, className }: { children: React.ReactNode, to: string, className?: string }) => {
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useFluidMagnetic();
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="inline-block relative z-50 p-4 -m-4" // Expand hit area
    >
      <Link to={to} className={className}>
        {children}
      </Link>
    </motion.div>
  );
};

/* Bouncy Logo with Fluid Response */
const FluidLogo = ({ scrolled }: { scrolled: boolean }) => {
  const [hovered, setHovered] = useState(false);
  const { handleClick } = useLogoClickEasterEgg();
  const letters = "DRIP".split("");

  const { ref, x, y, handleMouseMove, handleMouseLeave } = useFluidMagnetic();

  return (
    <motion.div
       ref={ref}
       onMouseMove={handleMouseMove}
       onMouseLeave={() => { handleMouseLeave(); setHovered(false); }}
       onMouseEnter={() => setHovered(true)}
       style={{ x, y }}
       className="relative z-50 cursor-pointer p-6 -m-6"
    >
      <Link
        to="/"
        className="flex flex-col items-center leading-none"
        onClick={(e) => { e.preventDefault(); handleClick(); }}
      >
        <span className={`flex font-serif italic font-black text-3xl tracking-tight transition-colors duration-500 ${scrolled ? "text-[#0A1A44]" : "text-white"}`}>
          {letters.map((l, i) => (
            <motion.span
              key={i}
              animate={hovered ? { y: [0, -8, 0], scale: [1, 1.2, 1], rotate: [0, i % 2 === 0 ? -10 : 10, 0] } : {}}
              transition={{ delay: i * 0.04, duration: 0.5, ease: "circOut" }}
              className="inline-block origin-bottom"
            >
              {l}
            </motion.span>
          ))}
        </span>
      </Link>
    </motion.div>
  );
};

/* --- Navbar Component --- */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScroll = useRef(0);
  const { scrollY } = useScroll();

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 50);
    setHidden(y > 100 && y > lastScroll.current);
    lastScroll.current = y;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Fluid Morphing Background
  const width = useTransform(scrollY, [0, 100], ["100%", "50%"]);
  const top = useTransform(scrollY, [0, 100], ["0px", "24px"]);
  const height = useTransform(scrollY, [0, 100], ["80px", "60px"]);
  const borderRadius = useTransform(scrollY, [0, 100], ["0px", "100px"]);
  const background = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.85)"]
  );
  const backdropFilter = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(20px)"]);
  const border = useTransform(scrollY, [0, 100], ["1px solid rgba(255,255,255,0)", "1px solid rgba(255,255,255,0.3)"]);
  const boxShadow = useTransform(scrollY, [0, 100], ["0px 0px 0px rgba(0,0,0,0)", "0px 10px 40px -10px rgba(10, 26, 68, 0.1)"]);

  const color = scrolled ? "#0A1A44" : "#F8F5F2";

  return (
    <>
      <motion.nav
        style={{
          width: window.innerWidth > 768 ? width : "100%",
          top: window.innerWidth > 768 ? top : 0,
          height: window.innerWidth > 768 ? height : "80px",
          borderRadius,
          background,
          backdropFilter,
          border,
          boxShadow,
          y: hidden && !mobileOpen ? "-200%" : "0%"
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-0 right-0 mx-auto z-[100] flex items-center justify-between px-8 md:px-10 transition-colors duration-500`}
      >
        {/* Left Nav */}
        <div className="hidden md:flex items-center gap-12">
           {NAV_ITEMS.slice(0, 2).map((item) => (
              <FluidLink key={item.label} to={item.href} className={`relative lowercase text-sm font-medium tracking-wide transition-colors duration-300 font-heading group`}>
                <span style={{ color }} className="group-hover:text-[#F05A28] transition-colors duration-300 block overflow-hidden h-[1.2em]">
                   <span className="block group-hover:-translate-y-full transition-transform duration-500 ease-[0.76, 0, 0.24, 1]">{item.label}</span>
                   <span className="block absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76, 0, 0.24, 1] text-[#F05A28]">{item.label}</span>
                </span>
              </FluidLink>
           ))}
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
           <FluidLogo scrolled={scrolled} />
        </div>

        {/* Right Nav */}
        <div className="hidden md:flex items-center gap-12">
           {NAV_ITEMS.slice(2).map((item) => (
              <FluidLink key={item.label} to={item.href} className={`relative lowercase text-sm font-medium tracking-wide transition-colors duration-300 font-heading group`}>
                <span style={{ color }} className="group-hover:text-[#F05A28] transition-colors duration-300 block overflow-hidden h-[1.2em]">
                   <span className="block group-hover:-translate-y-full transition-transform duration-500 ease-[0.76, 0, 0.24, 1]">{item.label}</span>
                   <span className="block absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76, 0, 0.24, 1] text-[#F05A28]">{item.label}</span>
                </span>
              </FluidLink>
           ))}

           <FluidLink to="/#reservation" className="">
              <div className={`relative px-6 py-2.5 rounded-full overflow-hidden group transition-all duration-500 ${scrolled ? "bg-[#0A1A44]" : "bg-white"}`}>
                <div className="absolute inset-0 w-full h-full bg-[#F05A28] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76, 0, 0.24, 1]" />
                <span className={`relative z-10 text-xs font-heading font-bold uppercase tracking-widest transition-colors duration-300 ${scrolled ? "text-white" : "text-[#0A1A44] group-hover:text-white"}`}>
                  Reserve
                </span>
              </div>
           </FluidLink>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative z-[110] w-12 h-12 flex flex-col items-center justify-center gap-1.5 group"
        >
          <motion.span
             animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
             className={`w-8 h-[2px] transition-colors duration-300`}
             style={{ backgroundColor: mobileOpen ? "#0A1A44" : color }}
          />
          <motion.span
             animate={mobileOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
             className={`w-8 h-[2px] transition-colors duration-300`}
             style={{ backgroundColor: mobileOpen ? "#0A1A44" : color }}
          />
          <motion.span
             animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
             className={`w-8 h-[2px] transition-colors duration-300`}
             style={{ backgroundColor: mobileOpen ? "#0A1A44" : color }}
          />
        </button>
      </motion.nav>

      {/* Fluid Mega Menu Overlay (Mobile) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] bg-[#F8F5F2] flex flex-col justify-center px-8 overflow-hidden"
          >
            {/* Background Grain */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Animated Circles */}
            <motion.div
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ duration: 1.5, ease: "circOut" }}
               className="absolute -top-[20%] -right-[20%] w-[80vw] h-[80vw] bg-[#F05A28]/5 rounded-full blur-[100px]"
            />

            <div className="flex flex-col gap-2 max-w-lg mx-auto w-full relative z-10">
              <span className="font-mono-label text-xs uppercase tracking-widest text-[#0A1A44]/40 mb-12 border-b border-[#0A1A44]/10 pb-4">Menu</span>
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 100, skewX: 20 }}
                  animate={{ opacity: 1, x: 0, skewX: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative"
                >
                  <Link
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block font-serif italic font-black text-6xl md:text-8xl lowercase text-[#0A1A44] hover:text-[#F05A28] transition-colors duration-500 leading-[0.85] tracking-tight origin-left hover:scale-[1.02]"
                  >
                    {item.label}
                  </Link>
                  <motion.span
                     initial={{ opacity: 0, height: 0 }}
                     whileInView={{ opacity: 1, height: "auto" }}
                     className="block font-heading text-sm text-[#0A1A44]/60 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0"
                  >
                    {item.subtext}
                  </motion.span>
                </motion.div>
              ))}
            </div>

            <motion.div
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.8, duration: 0.8 }}
               className="absolute bottom-12 left-8 right-8 flex justify-between font-mono-label text-[10px] uppercase tracking-widest text-[#0A1A44]/40"
            >
              <div className="flex flex-col gap-2">
                 <span>Socials</span>
                 <div className="flex gap-4 text-[#0A1A44]">
                    <span>IG</span><span>TW</span><span>LI</span>
                 </div>
              </div>
              <div className="flex flex-col gap-2 text-right">
                 <span>Contact</span>
                 <span className="text-[#0A1A44]">hello@artemis.coffee</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
