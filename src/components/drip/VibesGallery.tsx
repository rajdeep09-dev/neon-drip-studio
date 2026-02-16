import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const images = [
  { label: "this light tho ✨", emoji: "☕" },
  { label: "core memory", emoji: "🎨" },
  { label: "main character energy", emoji: "📸" },
  { label: "literally obsessed", emoji: "🥐" },
  { label: "no filter needed", emoji: "🌿" },
  { label: "vibes on vibes", emoji: "💫" },
  { label: "chef's kiss", emoji: "✨" },
  { label: "mood forever", emoji: "🎵" },
];

const VibesGallery = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section ref={containerRef} className="relative z-10 h-[300vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Header */}
        <div className="px-6 mb-8 max-w-7xl mx-auto w-full">
          <span className="glass-pill font-handwritten text-accent text-lg inline-block mb-4">
            the vibes
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl lowercase">
            <span className="text-outline">aesthetic</span>
            <span className="text-gradient-animated">?</span> we got you.
          </h2>
        </div>

        {/* Horizontal scroll gallery */}
        <motion.div style={{ x }} className="flex gap-6 pl-6">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative shrink-0 group cursor-pointer"
              data-cursor="gallery"
              style={{
                width: `${280 + (i % 3) * 80}px`,
                height: "70vh",
                maxHeight: "500px",
                borderRadius: `${20 + (i % 4) * 8}px`,
              }}
            >
              {/* Image placeholder */}
              <div
                className="w-full h-full bg-muted overflow-hidden transition-transform duration-500 group-hover:scale-[1.03]"
                style={{
                  borderRadius: "inherit",
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-primary/10 via-muted to-accent/5 flex items-center justify-center">
                  <span className="text-6xl opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500">
                    {img.emoji}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ borderRadius: "inherit" }}>
                  <span className="font-handwritten text-xl text-foreground/80">
                    save to camera roll 📱
                  </span>
                </div>
              </div>

              {/* Annotation */}
              <span
                className="absolute -bottom-6 left-4 font-handwritten text-primary/70 text-base"
                style={{ transform: `rotate(${-3 + (i % 5) * 2}deg)` }}
              >
                {img.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VibesGallery;
