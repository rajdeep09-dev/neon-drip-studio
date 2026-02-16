import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Easing } from "framer-motion";

const ease: Easing = [0.25, 0.1, 0.25, 1];

const infoItems = [
  { icon: "📍", label: "address", value: "420 Brew Street, Arts District, Cooltown, CA 90210" },
  { icon: "🕐", label: "weekdays", value: "7am - 9pm" },
  { icon: "☀️", label: "weekends", value: "8am - 10pm" },
  { icon: "📞", label: "phone", value: "(555) DRIP-NOW" },
  { icon: "✉️", label: "email", value: "hey@dripcoffee.studio" },
  { icon: "🚗", label: "parking", value: "street parking + bike rack out front" },
  { icon: "📶", label: "wifi", value: "fast. free. no judgment if you camp out all day." },
];

const LocationSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative z-10 py-24 md:py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="glass-pill font-handwritten text-accent text-lg inline-block"
        >
          find us irl
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7, ease }}
          className="font-heading font-bold text-3xl md:text-5xl lowercase leading-tight"
        >
          <span className="text-primary">come hang.</span> we don't bite.{" "}
          <span className="font-handwritten text-foreground/50">(the coffee might though)</span>
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="glass-light p-1 overflow-hidden"
          style={{ borderRadius: "24px" }}
        >
          <div className="w-full aspect-[4/3] bg-muted rounded-[20px] flex items-center justify-center relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-[20px]" />
            <div className="text-center space-y-2">
              <span className="text-4xl">🗺️</span>
              <p className="font-handwritten text-foreground/40 text-lg">tap to explore</p>
            </div>
          </div>
        </motion.div>

        {/* Info card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="glass-light p-8 space-y-1"
        >
          {infoItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease }}
              className="flex items-start gap-4 py-3 border-b border-foreground/[0.05] last:border-0"
            >
              <span className="text-lg shrink-0">{item.icon}</span>
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-foreground/30 mb-0.5">
                  {item.label}
                </span>
                <span className="text-foreground/80 text-sm">{item.value}</span>
              </div>
            </motion.div>
          ))}

          {/* Handwritten annotation */}
          <div className="pt-4">
            <span className="font-handwritten text-primary/60 text-base inline-block rotate-[-2deg]">
              we never close early, pinky promise ✌️
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;
