import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useLogoClickEasterEgg } from "@/hooks/useEasterEggs";

const NAV_ITEMS = [
  { label: "menu", href: "/menu", subtext: "Fresh roasts & seasonal blends" },
  { label: "about", href: "/about", subtext: "Our story & philosophy" },
  { label: "events", href: "/events", subtext: "Workshops & cupping sessions" },
  { label: "shop", href: "/shop", subtext: "Gear & beans delivered" },
  { label: "journal", href: "/journal", subtext: "Thoughts on coffee culture" },
];

/* Magnetic Hook */
const useMagnetic = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.35;
    const y = (e.clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });
  return { ref, position, handleMouseMove, handleMouseLeave };
};

/* Magnetic Link Component */
const MagneticLink = ({ children, to, className }: { children: React.ReactNode, to: string, className?: string }) => {
  const { ref, position, handleMouseMove, handleMouseLeave } = useMagnetic();
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      <Link to={to} className={className}>
        {children}
      </Link>
    </motion.div>
  );
};

/* --- Bouncy Logo --- */
const BouncyLogo = ({ scrolled }: { scrolled: boolean }) => {
  const [hovered, setHovered] = useState(false);
  const { handleClick, scattering } = useLogoClickEasterEgg();
  const letters = "DRIP".split("");

  return (
    <Link
      to="/"
      className="flex flex-col items-center leading-none group relative z-50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => { e.preventDefault(); handleClick(); }}
    >
      <span className={`flex font-serif italic font-black text-3xl tracking-tight transition-colors duration-500 ${scrolled ? "text-[#0A1A44]" : "text-white"}`}>
        {letters.map((l, i) => (
          <motion.span
            key={i}
            animate={hovered ? { y: [0, -4, 0], rotate: [0, i % 2 === 0 ? -5 : 5, 0] } : {}}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="inline-block origin-bottom"
          >
            {l}
          </motion.span>
        ))}
      </span>
    </Link>
  );
};

/* --- Navbar Component --- */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScroll = useRef(0);
  const { scrollY } = useScroll();

  // Scroll logic for hiding/showing and changing style
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

  // Framer Motion transforms for the "Pill" effect
  const width = useTransform(scrollY, [0, 100], ["100%", "60%"]);
  const top = useTransform(scrollY, [0, 100], ["0px", "20px"]);
  const borderRadius = useTransform(scrollY, [0, 100], ["0px", "50px"]);
  const background = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]
  );
  const backdropFilter = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);
  const border = useTransform(scrollY, [0, 100], ["1px solid rgba(255,255,255,0)", "1px solid rgba(255,255,255,0.2)"]);
  const color = scrolled ? "#0A1A44" : "#F8F5F2";

  return (
    <>
      <motion.nav
        style={{
          width: window.innerWidth > 768 ? width : "100%",
          top: window.innerWidth > 768 ? top : 0,
          borderRadius,
          background,
          backdropFilter,
          border,
          y: hidden && !mobileOpen ? "-150%" : "0%"
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 mx-auto z-[100] h-20 md:h-16 flex items-center justify-between px-6 md:px-8 transition-colors duration-500`}
      >
        {/* Left Nav */}
        <div className="hidden md:flex items-center gap-8">
           {NAV_ITEMS.slice(0, 2).map((item) => (
              <MagneticLink key={item.label} to={item.href} className={`relative lowercase text-sm font-medium tracking-wide transition-colors duration-300 font-heading group`}>
                <span style={{ color }} className="group-hover:text-[#F05A28] transition-colors">{item.label}</span>
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#F05A28] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </MagneticLink>
           ))}
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
           <BouncyLogo scrolled={scrolled} />
        </div>

        {/* Right Nav */}
        <div className="hidden md:flex items-center gap-8">
           {NAV_ITEMS.slice(2).map((item) => (
              <MagneticLink key={item.label} to={item.href} className={`relative lowercase text-sm font-medium tracking-wide transition-colors duration-300 font-heading group`}>
                <span style={{ color }} className="group-hover:text-[#F05A28] transition-colors">{item.label}</span>
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#F05A28] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </MagneticLink>
           ))}

           <MagneticLink to="/#reservation" className="">
              <button className={`px-5 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 ${scrolled ? "bg-[#0A1A44] text-white hover:bg-[#F05A28]" : "bg-white text-[#0A1A44] hover:bg-[#F05A28] hover:text-white"}`}>
                Reserve
              </button>
           </MagneticLink>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative z-[110] w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
        >
          <span className={`w-6 h-0.5 transition-transform duration-300 ${mobileOpen ? "rotate-45 translate-y-2 bg-[#0A1A44]" : "bg-current"}`} style={{ backgroundColor: mobileOpen ? "#0A1A44" : color }} />
          <span className={`w-6 h-0.5 transition-opacity duration-300 ${mobileOpen ? "opacity-0 bg-[#0A1A44]" : "bg-current"}`} style={{ backgroundColor: mobileOpen ? "#0A1A44" : color }} />
          <span className={`w-6 h-0.5 transition-transform duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2 bg-[#0A1A44]" : "bg-current"}`} style={{ backgroundColor: mobileOpen ? "#0A1A44" : color }} />
        </button>
      </motion.nav>

      {/* Mega Menu Overlay (Mobile) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] bg-[#F8F5F2] flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-2 max-w-lg mx-auto w-full">
              <span className="font-mono-label text-xs uppercase tracking-widest text-[#0A1A44]/40 mb-8 border-b border-[#0A1A44]/10 pb-4">Menu</span>
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="group relative"
                >
                  <Link
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block font-serif italic font-bold text-6xl md:text-7xl lowercase text-[#0A1A44] hover:text-[#F05A28] transition-colors duration-300 leading-[0.9]"
                  >
                    {item.label}
                  </Link>
                  <span className="block font-heading text-sm text-[#0A1A44]/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {item.subtext}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.8 }}
               className="absolute bottom-12 left-8 right-8 flex justify-between font-mono-label text-[10px] uppercase tracking-widest text-[#0A1A44]/40"
            >
              <span>Socials</span>
              <span>Contact</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
