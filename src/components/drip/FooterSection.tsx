import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import type { Easing } from "framer-motion";

const ease: Easing = [0.25, 0.1, 0.25, 1];

const navLinks = ["menu", "about", "events", "shop", "journal", "reservations", "careers"];
const socialLinks = [
  { platform: "instagram", handle: "@dripcoffeestudio" },
  { platform: "tiktok", handle: "@dripcoffee" },
  { platform: "twitter", handle: "@drip_studio" },
  { platform: "spotify", label: "our playlist" },
];
const contactInfo = [
  "hey@dripcoffee.studio",
  "(555) DRIP-NOW",
  "420 Brew Street, Arts District",
  "Cooltown, CA 90210",
];

const OpenStatus = () => {
  const [status, setStatus] = useState<"open" | "closing" | "closed">("closed");

  useEffect(() => {
    const check = () => {
      const now = new Date();
      const h = now.getHours();
      const day = now.getDay();
      const isWeekend = day === 0 || day === 6;
      const open = isWeekend ? 8 : 7;
      const close = isWeekend ? 22 : 21;
      if (h >= open && h < close - 1) setStatus("open");
      else if (h === close - 1) setStatus("closing");
      else setStatus("closed");
    };
    check();
    const i = setInterval(check, 60000);
    return () => clearInterval(i);
  }, []);

  const colors = { open: "text-accent", closing: "text-primary", closed: "text-destructive" };
  const dotColors = { open: "bg-accent", closing: "bg-primary", closed: "bg-destructive" };
  const labels = { open: "open now", closing: "closing soon", closed: "closed rn" };

  return (
    <span className={`glass-pill !py-1 !px-3 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider ${colors[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[status]} ${status === "open" ? "animate-pulse" : ""}`} />
      {labels[status]}
    </span>
  );
};

const FooterSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer ref={ref} className="relative z-10 border-t border-foreground/[0.06] overflow-hidden">
      {/* Giant background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="text-outline font-heading font-black uppercase select-none"
          style={{ fontSize: "clamp(200px, 30vw, 400px)", opacity: 0.03, letterSpacing: "0.05em" }}
        >
          DRIP
        </span>
      </div>

      {/* Row 1: Big CTA */}
      <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="font-heading font-bold lowercase leading-tight mb-8"
          style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
        >
          let's get <span className="text-gradient-animated">caffeinated</span>.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6, ease }}
        >
          <Link
            to="/contact"
            className="inline-block bg-primary text-primary-foreground rounded-full px-10 py-4 font-heading font-semibold lowercase text-lg glow-orange hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            come say hi
          </Link>
        </motion.div>
      </div>

      {/* Row 2: Columns */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
        {/* Navigate */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-foreground/30 mb-5">navigate</h4>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link}>
                <Link
                  to={`/${link === "reservations" || link === "careers" ? "" : link}`}
                  className="group flex items-center gap-0 text-foreground/50 hover:text-primary text-sm lowercase transition-all duration-300"
                >
                  <span className="inline-block w-0 group-hover:w-4 overflow-hidden transition-all duration-300 text-primary">→</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{link}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-foreground/30 mb-5">follow the drip</h4>
          <ul className="space-y-3">
            {socialLinks.map((s) => (
              <li key={s.platform}>
                <a
                  href="#"
                  className="group flex items-center gap-2 text-foreground/50 hover:text-primary text-sm transition-colors duration-300"
                >
                  <span className="group-hover:-translate-y-0.5 transition-transform duration-300">
                    {s.platform === "instagram" && "📸"}
                    {s.platform === "tiktok" && "🎵"}
                    {s.platform === "twitter" && "🐦"}
                    {s.platform === "spotify" && "🎧"}
                  </span>
                  {s.handle || s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-foreground/30 mb-5">reach out</h4>
          <ul className="space-y-3">
            {contactInfo.map((c, i) => (
              <li key={i} className="text-foreground/50 text-sm">{c}</li>
            ))}
            <li>
              <a href="#" className="group inline-flex items-center gap-1 text-foreground/30 hover:text-primary text-xs transition-colors">
                open in maps <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-foreground/30 mb-5">hours</h4>
          <ul className="space-y-2 text-foreground/50 text-sm mb-4">
            <li>mon-fri: 7am - 9pm</li>
            <li>sat-sun: 8am - 10pm</li>
          </ul>
          <OpenStatus />
        </div>
      </div>

      {/* Row 3: Mini newsletter */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-t border-foreground/[0.04]">
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <span className="text-foreground/40 text-sm font-handwritten text-lg">want the inside scoop?</span>
          {subscribed ? (
            <span className="glass-pill !py-2 text-accent text-xs font-mono">✓ you're in!</span>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}
              className="flex gap-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="glass-input px-4 py-2 text-sm rounded-full w-48"
              />
              <button type="submit" className="bg-primary text-primary-foreground rounded-full px-5 py-2 text-sm font-heading font-medium lowercase hover:scale-105 active:scale-95 transition-transform">
                subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Row 4: Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-t border-foreground/[0.04]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-foreground/30 text-xs">© 2024 drip coffee studio. all rights reserved. we love you.</p>
          <div className="flex gap-4">
            {["privacy", "terms", "accessibility", "sitemap"].map((l) => (
              <a key={l} href="#" className="text-foreground/20 hover:text-foreground/50 text-xs transition-colors lowercase">
                {l}
              </a>
            ))}
          </div>
        </div>

        {/* Easter egg */}
        <p className="text-center mt-8 text-foreground/[0.15] hover:text-foreground/60 transition-opacity duration-500 text-xs font-handwritten cursor-default">
          you scrolled all the way down? respect. here's a secret: say "i found the drip" at the counter for a free shot of espresso. ☕
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
