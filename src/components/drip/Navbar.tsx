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

/* Elastic Menu Item */
const ElasticLink = ({ children, to, className }: { children: React.ReactNode, to: string, className?: string }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative z-50 p-4 -m-4 cursor-pointer"
    >
      <Link to={to} className={className}>
        {children}
      </Link>

      {/* Squishy Background Shape */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            layoutId="nav-bg"
            initial={{ opacity: 0, scale: 0.8, borderRadius: 20 }}
            animate={{ opacity: 1, scale: 1, borderRadius: 12 }}
            exit={{ opacity: 0, scale: 0.9, borderRadius: 20 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
            className="absolute inset-0 bg-white/10 backdrop-blur-sm -z-10 rounded-xl"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* Bouncy Logo */
const FluidLogo = ({ scrolled }: { scrolled: boolean }) => {
  const { handleClick } = useLogoClickEasterEgg();
  const letters = "DRIP".split("");

  return (
    <div className="relative z-50 cursor-pointer p-6 -m-6">
      <Link
        to="/"
        className="flex flex-col items-center leading-none"
        onClick={(e) => { e.preventDefault(); handleClick(); }}
      >
        <span className={`flex font-serif italic font-black text-3xl tracking-tight transition-colors duration-500 ${scrolled ? "text-[#050A14]" : "text-white"}`}>
          {letters.map((l, i) => (
            <motion.span
              key={i}
              whileHover={{ y: -8, scale: 1.2, rotate: i % 2 === 0 ? -10 : 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="inline-block origin-bottom"
            >
              {l}
            </motion.span>
          ))}
        </span>
      </Link>
    </div>
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

  // Ultra-Premium Pill Transformation
  const width = useTransform(scrollY, [0, 100], ["100%", "40%"]);
  const top = useTransform(scrollY, [0, 100], ["0px", "32px"]);
  const height = useTransform(scrollY, [0, 100], ["96px", "64px"]);
  const borderRadius = useTransform(scrollY, [0, 100], ["0px", "100px"]);
  const background = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.75)"]
  );
  const backdropFilter = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(24px)"]);
  const border = useTransform(scrollY, [0, 100], ["1px solid rgba(255,255,255,0)", "1px solid rgba(255,255,255,0.4)"]);
  const boxShadow = useTransform(scrollY, [0, 100], ["0px 0px 0px rgba(0,0,0,0)", "0px 20px 50px -10px rgba(5, 10, 20, 0.15)"]);

  const color = scrolled ? "#050A14" : "#F8FAFC";

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
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-0 right-0 mx-auto z-[100] flex items-center justify-between px-8 md:px-12 transition-colors duration-700`}
      >
        {/* Left Nav */}
        <div className="hidden md:flex items-center gap-8">
           {NAV_ITEMS.slice(0, 2).map((item) => (
              <ElasticLink key={item.label} to={item.href} className={`relative font-heading text-xs font-medium uppercase tracking-[0.1em] transition-colors duration-300`}>
                <span style={{ color }} className="group-hover:text-[#F05A28] transition-colors duration-300">
                   {item.label}
                </span>
              </ElasticLink>
           ))}
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
           <FluidLogo scrolled={scrolled} />
        </div>

        {/* Right Nav */}
        <div className="hidden md:flex items-center gap-8">
           {NAV_ITEMS.slice(2).map((item) => (
              <ElasticLink key={item.label} to={item.href} className={`relative font-heading text-xs font-medium uppercase tracking-[0.1em] transition-colors duration-300`}>
                <span style={{ color }} className="group-hover:text-[#F05A28] transition-colors duration-300">
                   {item.label}
                </span>
              </ElasticLink>
           ))}

           <div className="pl-4 border-l border-white/20 ml-4">
              <button className={`px-6 py-2 rounded-full overflow-hidden relative group transition-all duration-500 ${scrolled ? "bg-[#050A14]" : "bg-white"}`}>
                <div className="absolute inset-0 w-full h-full bg-[#F05A28] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]" />
                <span className={`relative z-10 text-[10px] font-mono-label font-bold uppercase tracking-widest transition-colors duration-300 ${scrolled ? "text-white" : "text-[#050A14] group-hover:text-white"}`}>
                  Reserve
                </span>
              </button>
           </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative z-[110] w-12 h-12 flex flex-col items-center justify-center gap-1.5 group"
        >
          {/* Hamburger Icon */}
          <motion.span
             animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
             className={`w-8 h-[2px] transition-colors duration-300 rounded-full`}
             style={{ backgroundColor: mobileOpen ? "#050A14" : color }}
          />
          <motion.span
             animate={mobileOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
             className={`w-8 h-[2px] transition-colors duration-300 rounded-full`}
             style={{ backgroundColor: mobileOpen ? "#050A14" : color }}
          />
          <motion.span
             animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
             className={`w-8 h-[2px] transition-colors duration-300 rounded-full`}
             style={{ backgroundColor: mobileOpen ? "#050A14" : color }}
          />
        </button>
      </motion.nav>

      {/* Fluid Mega Menu Overlay (Mobile) - Keep existing implementation but update colors */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] bg-[#F8FAFC] flex flex-col justify-center px-8 overflow-hidden text-[#050A14]"
          >
            {/* ... (Mega menu content with updated colors) ... */}
            <div className="flex flex-col gap-4 max-w-lg mx-auto w-full relative z-10">
              <span className="font-mono-label text-xs uppercase tracking-widest text-[#050A14]/40 mb-12 border-b border-[#050A14]/10 pb-4">Menu</span>
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.8 }}
                  className="group relative"
                >
                  <Link
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block font-heading font-bold text-6xl md:text-8xl lowercase text-[#050A14] hover:text-[#F05A28] transition-colors duration-500 tracking-tight"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
