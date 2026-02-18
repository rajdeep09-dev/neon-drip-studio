import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import type { Easing } from "framer-motion";

const ease: Easing = [0.25, 0.1, 0.25, 1];

const navLinks = ["menu", "about", "events", "shop", "journal", "reservations", "careers"];
const socialLinks = [
  { platform: "instagram", handle: "@dripcoffeestudio", label: "Instagram" },
  { platform: "tiktok", handle: "@dripcoffee", label: "TikTok" },
  { platform: "twitter", handle: "@drip_studio", label: "Twitter" },
  { platform: "spotify", label: "our playlist", handle: "Spotify" },
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

  const colors = { open: "text-artemis-orange", closing: "text-artemis-blue", closed: "text-gray-400" };
  const dotColors = { open: "bg-artemis-orange", closing: "bg-artemis-blue", closed: "bg-gray-400" };
  const labels = { open: "open now", closing: "closing soon", closed: "closed rn" };

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white text-[10px] font-mono uppercase tracking-wider ${colors[status]}`}>
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
    <footer ref={ref} className="relative z-10 border-t border-artemis-blue/5 overflow-hidden bg-artemis-bg">
      {/* Giant background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="font-serif italic font-black uppercase select-none text-artemis-blue/5"
          style={{ fontSize: "clamp(200px, 30vw, 400px)", letterSpacing: "-0.05em" }}
        >
          DRIP
        </span>
      </div>

      {/* Row 1: Big CTA */}
      <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-16 text-center relative z-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="font-serif italic text-artemis-blue leading-tight mb-8"
          style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
        >
          let's get <span className="text-artemis-orange underline decoration-wavy decoration-4 underline-offset-8">caffeinated</span>.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6, ease }}
        >
          <Link
            to="/contact"
            className="inline-block bg-artemis-orange text-white rounded-full px-12 py-5 font-heading font-medium lowercase text-xl shadow-lg hover:bg-orange-600 hover:-translate-y-1 transition-all duration-300"
          >
            come say hi
          </Link>
        </motion.div>
      </div>

      {/* Row 2: Columns */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 relative z-20">
        {/* Navigate */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-artemis-blue/40 mb-6">navigate</h4>
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link}>
                <Link
                  to={`/${link === "reservations" || link === "careers" ? "" : link}`}
                  className="group flex items-center gap-0 text-artemis-blue/70 hover:text-artemis-orange text-base font-serif italic lowercase transition-all duration-300"
                >
                  <span className="inline-block w-0 group-hover:w-4 overflow-hidden transition-all duration-300 text-artemis-orange">→</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{link}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-artemis-blue/40 mb-6">follow the drip</h4>
          <ul className="space-y-4">
            {socialLinks.map((s) => (
              <li key={s.platform}>
                <a
                  href="#"
                  className="group flex items-center gap-2 text-artemis-blue/70 hover:text-artemis-orange text-base font-serif italic transition-colors duration-300"
                >
                  {s.label || s.handle}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-artemis-blue/40 mb-6">reach out</h4>
          <ul className="space-y-4">
            {contactInfo.map((c, i) => (
              <li key={i} className="text-artemis-blue/70 text-sm font-heading">{c}</li>
            ))}
            <li>
              <a href="#" className="group inline-flex items-center gap-1 text-artemis-blue/40 hover:text-artemis-orange text-xs transition-colors border-b border-artemis-blue/20 hover:border-artemis-orange pb-0.5">
                open in maps
              </a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-artemis-blue/40 mb-6">hours</h4>
          <ul className="space-y-2 text-artemis-blue/70 text-sm font-heading mb-6">
            <li>mon-fri: 7am - 9pm</li>
            <li>sat-sun: 8am - 10pm</li>
          </ul>
          <OpenStatus />
        </div>
      </div>

      {/* Row 3: Mini newsletter */}
      <div className="max-w-7xl mx-auto px-6 py-12 border-t border-artemis-blue/5 relative z-20">
        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
          <span className="text-artemis-blue/60 font-serif italic text-xl">want the inside scoop?</span>
          {subscribed ? (
            <span className="px-4 py-2 bg-green-50 text-green-600 rounded-full text-xs font-mono border border-green-100">✓ you're in!</span>
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
                placeholder="email address"
                className="px-6 py-3 text-sm rounded-full w-64 bg-white border border-gray-200 text-artemis-blue focus:outline-none focus:border-artemis-orange focus:ring-1 focus:ring-artemis-orange transition-all font-heading placeholder:italic"
              />
              <button type="submit" className="bg-artemis-blue text-white rounded-full px-6 py-3 text-sm font-heading font-medium lowercase hover:bg-artemis-orange transition-colors">
                subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Row 4: Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-t border-artemis-blue/5 relative z-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-artemis-blue/30 text-xs font-heading">© 2024 drip coffee studio. all rights reserved.</p>
          <div className="flex gap-6">
            {["privacy", "terms", "accessibility", "sitemap"].map((l) => (
              <a key={l} href="#" className="text-artemis-blue/30 hover:text-artemis-blue/60 text-xs transition-colors lowercase font-heading">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
