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

/* Bouncy letter logo with scatter easter egg */
const BouncyLogo = () => {
  const [hovered, setHovered] = useState(false);
  const { handleClick, scattering } = useLogoClickEasterEgg();
  const letters = "DRIP".split("");

  const scatterAngles = [
    { x: -40, y: -60, r: -45 },
    { x: -20, y: -80, r: 30 },
    { x: 30, y: -70, r: -20 },
    { x: 50, y: -50, r: 40 },
  ];

  return (
    <Link
      to="/"
      className="flex flex-col leading-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => { e.preventDefault(); handleClick(); }}
      aria-label="DRIP Coffee Studio - Home"
    >
      <span className="flex font-heading font-black text-xl tracking-[0.05em]">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            animate={
              scattering
                ? {
                    x: [0, scatterAngles[i].x, 0],
                    y: [0, scatterAngles[i].y, 0],
                    rotate: [0, scatterAngles[i].r, 0],
                    scale: [1, 0.8, 1],
                  }
                : hovered
                ? { y: [0, -6, 0], color: ["#EA580C", "#3B8EA5", "#EA580C"] }
                : { y: 0, color: "#EA580C", x: 0, rotate: 0, scale: 1 }
            }
            transition={
              scattering
                ? { duration: 1, ease: [0.68, -0.55, 0.27, 1.55] }
                : hovered
                ? { delay: i * 0.05, duration: 0.4, ease: "easeOut" }
                : { duration: 0.2 }
            }
            className="inline-block"
          >
            {l}
          </motion.span>
        ))}
      </span>
      <span className="font-handwritten text-[10px] text-foreground/50 -mt-0.5">coffee studio</span>
    </Link>
  );
};

/* Scramble text hook */
const useScramble = (text: string, active: boolean) => {
  const [display, setDisplay] = useState(text);
  const chars = "abcdefghijklmnopqrstuvwxyz";

  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    let frame = 0;
    const maxFrames = 8;
    const interval = setInterval(() => {
      frame++;
      setDisplay(
        text.split("").map((c, i) => {
          if (frame > i * 1.5) return c;
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (frame >= maxFrames) { clearInterval(interval); setDisplay(text); }
    }, 30);
    return () => clearInterval(interval);
  }, [active, text]);

  return display;
};

const NavLink = ({ item }: { item: typeof NAV_ITEMS[0] }) => {
  const [hovered, setHovered] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === item.href;
  const display = useScramble(item.label, hovered);

  return (
    <Link
      to={item.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative lowercase text-sm font-medium tracking-wide transition-colors duration-300 ${
        isActive ? "text-primary" : "text-foreground/70 hover:text-primary"
      }`}
    >
      {display}
      <motion.span
        className="absolute -bottom-1 left-1/2 w-1 h-1 rounded-full bg-primary"
        initial={false}
        animate={{
          scale: isActive || hovered ? 1 : 0,
          x: "-50%",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      />
    </Link>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScroll = useRef(0);

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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        animate={{ y: hidden && !mobileOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-dark !border-x-0 !border-t-0 !rounded-none" : "bg-transparent border-transparent"
        }`}
        style={{ height: scrolled ? 60 : 72 }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <BouncyLogo />

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8" role="menubar">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              to="/#reservation"
              className="glass-pill !py-2 !px-5 !border-primary/30 text-primary text-sm font-heading font-medium lowercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              reserve
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-50"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-primary rounded-full origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="block w-6 h-0.5 bg-primary rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-primary rounded-full origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 glass-heavy !rounded-none flex flex-col items-center justify-center gap-8"
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-heading font-bold text-4xl lowercase text-foreground/80 hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <Link
                to="/#reservation"
                onClick={() => setMobileOpen(false)}
                className="bg-primary text-primary-foreground rounded-full px-8 py-3 font-heading font-semibold lowercase"
              >
                reserve a table
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-8 text-center space-y-2"
            >
              <p className="font-handwritten text-foreground/30 text-sm">420 Brew Street, Arts District</p>
              <div className="glass-pill !py-1 !px-3 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                open now
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
