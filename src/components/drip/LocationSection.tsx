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
    <section ref={ref} className="relative z-10 py-24 md:py-32 px-6 max-w-7xl mx-auto bg-artemis-bg">
      <div className="text-center mb-16 space-y-4">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="inline-block px-4 py-1 rounded-full border border-artemis-orange/30 text-artemis-orange font-serif italic text-lg bg-orange-50/50"
        >
          find us irl
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7, ease }}
          className="font-serif italic text-artemis-blue text-4xl md:text-6xl lowercase leading-tight"
        >
          <span className="text-artemis-orange">come hang.</span> we don't bite.{" "}
          <span className="font-heading text-lg text-gray-400 block mt-2">(the coffee might though)</span>
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -80, scale: 0.95 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease }}
          className="bg-white rounded-[30px] p-2 overflow-hidden shadow-lg border border-gray-100"
        >
          <div className="w-full aspect-[4/3] bg-gray-100 rounded-[24px] flex items-center justify-center relative group cursor-pointer overflow-hidden">
             {/* Use a map image placeholder */}
             <img
               src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2948&auto=format&fit=crop"
               alt="Map"
               className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
             />
            <div className="text-center space-y-2 relative z-10 bg-white/80 backdrop-blur px-6 py-3 rounded-full shadow-sm">
              <span className="text-2xl">🗺️</span>
              <p className="font-serif italic text-artemis-blue text-lg">tap to explore</p>
            </div>
          </div>
        </motion.div>

        {/* Info card */}
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.95 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="bg-white rounded-[30px] p-8 space-y-2 shadow-lg border border-gray-100"
        >
          {infoItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease }}
              className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0"
            >
              <span className="text-xl shrink-0">{item.icon}</span>
              <div>
                <span className="block text-[10px] font-heading uppercase tracking-wider text-gray-400 mb-1">
                  {item.label}
                </span>
                <span className="text-artemis-blue text-base font-serif italic">{item.value}</span>
              </div>
            </motion.div>
          ))}

          {/* Handwritten annotation */}
          <div className="pt-6 text-center">
            <span className="font-serif italic text-artemis-orange text-lg inline-block rotate-[-2deg] bg-orange-50 px-4 py-1 rounded-full border border-orange-100">
              we never close early, pinky promise ✌️
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;
