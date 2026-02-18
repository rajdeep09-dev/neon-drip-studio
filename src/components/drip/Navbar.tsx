import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useLogoClickEasterEgg } from "@/hooks/useEasterEggs";

const NAV_ITEMS = [
  { label: "menu", href: "/menu" },
  { label: "about", href: "/about" },
  { label: "events", href: "/events" },
  { label: "shop", href: "/shop" },
  { label: "journal", href: "/journal" },
];

/* Magnetic Hook */
const useMagnetic = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
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

/* Bouncy Logo */
const BouncyLogo = () => {
  const [hovered, setHovered] = useState(false);
  const { handleClick, scattering } = useLogoClickEasterEgg();
  const letters = "DRIP".split("");

  return (
    <Link
      to="/"
      className="flex flex-col items-center leading-none group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => { e.preventDefault(); handleClick(); }}
      aria-label="Home"
    >
      <span className="flex font-serif italic font-black text-3xl tracking-tight text-artemis-orange relative z-10">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            animate={hovered ? { y: [0, -6, 0], scale: [1, 1.1, 1], rotate: [0, i % 2 === 0 ? -5 : 5, 0] } : {}}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="inline-block origin-bottom"
          >
            {l}
          </motion.span>
        ))}
      </span>
      <span className="font-mono-label text-[9px] text-artemis-blue/50 uppercase tracking-[0.2em] mt-1 group-hover:tracking-[0.3em] transition-all duration-300">
        coffee studio
      </span>
    </Link>
  );
};

/* Nav Link with Scramble & Hover Indicator */
const NavLink = ({ item }: { item: typeof NAV_ITEMS[0] }) => {
  const [hovered, setHovered] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === item.href;

  return (
    <MagneticLink to={item.href} className="relative px-2 py-1 group">
      <span
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative lowercase text-sm font-medium tracking-wide transition-colors duration-300 font-heading z-10 ${
          isActive ? "text-artemis-orange" : "text-artemis-blue/80 group-hover:text-artemis-orange"
        }`}
      >
        {item.label}
      </span>

      {/* Animated Underline */}
      <motion.span
        className="absolute bottom-0 left-0 w-full h-[1.5px] bg-artemis-orange/30 rounded-full origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive || hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "circOut" }}
      />

      {/* Glow Effect */}
      {isActive && (
         <motion.div layoutId="nav-glow" className="absolute inset-0 bg-artemis-orange/5 blur-md rounded-lg -z-10" />
      )}
    </MagneticLink>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScroll = useRef(0);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 20);
    setHidden(y > 100 && y > lastScroll.current);
    lastScroll.current = y;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden && !mobileOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
          scrolled
            ? "bg-white/70 backdrop-blur-xl border-white/20 shadow-sm h-16"
            : "bg-transparent border-transparent h-24"
        }`}
      >
        <div className="max-w-[1400px] mx-auto h-full px-6 md:px-12 flex items-center justify-between">

          {/* Left Nav */}
          <div className="hidden md:flex items-center gap-10">
             {NAV_ITEMS.slice(0, 2).map((item) => (
                <NavLink key={item.label} item={item} />
             ))}
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
             <BouncyLogo />
          </div>

          {/* Right Nav */}
          <div className="hidden md:flex items-center gap-10">
             {NAV_ITEMS.slice(2).map((item) => (
                <NavLink key={item.label} item={item} />
             ))}
             <MagneticLink to="/#reservation" className="">
                <button className="px-6 py-2.5 rounded-full bg-artemis-orange text-white text-xs font-heading font-bold uppercase tracking-widest hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5">
                  Reserve
                </button>
             </MagneticLink>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-[110] w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
          >
            <span className={`w-6 h-0.5 bg-current transition-transform duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-0.5 bg-current transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-0.5 bg-current transition-transform duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] bg-[#F8F5F2] flex flex-col items-center justify-center gap-8"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-serif italic font-bold text-5xl lowercase text-artemis-blue hover:text-artemis-orange transition-colors"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
