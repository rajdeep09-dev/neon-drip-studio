import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const InstagramCTA = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const placeholders = Array.from({ length: 6 }, (_, i) => i);

  return (
    <section ref={ref} className="relative z-10 py-24 md:py-32 overflow-hidden">
      {/* Image grid */}
      <div className="relative">
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: [0, -100] }}
            transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
            className="flex shrink-0"
          >
            {[...placeholders, ...placeholders].map((_, i) => (
              <div
                key={i}
                className="w-[200px] md:w-[280px] aspect-square shrink-0 bg-muted relative group cursor-pointer overflow-hidden"
              >
                <div className="w-full h-full bg-gradient-to-br from-primary/5 via-muted to-accent/5 flex items-center justify-center">
                  <span className="text-3xl opacity-15">📸</span>
                </div>
                <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.2 }}
                    className="text-3xl"
                  >
                    ❤️
                  </motion.span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Centered overlay CTA */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="glass-heavy p-8 md:p-12 text-center max-w-md mx-6"
          >
            <h2 className="font-heading font-bold text-2xl md:text-3xl lowercase mb-4">
              we're <span className="text-primary">way more fun</span> on instagram.
            </h2>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 glass-pill !border-primary/30 text-foreground/80 hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-heading font-medium text-sm lowercase"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              follow @dripcoffeestudio
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InstagramCTA;
