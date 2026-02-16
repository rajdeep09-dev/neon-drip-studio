import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "i genuinely reorganized my morning routine around this place. worth it.",
    author: "alex t.",
    source: "google",
    rating: 5,
  },
  {
    quote: "the matcha fog changed my life and i'm not being dramatic. okay maybe a little.",
    author: "priya s.",
    source: "yelp",
    rating: 5,
  },
  {
    quote: "best wifi, best coffee, best playlist. i basically live here now. send help.",
    author: "jordan m.",
    source: "google",
    rating: 5,
  },
  {
    quote: "brought a date here and they were so impressed they agreed to a second date. drip is my wingman.",
    author: "sam k.",
    source: "instagram",
    rating: 5,
  },
];

const StarRating = ({ rating, inView }: { rating: number; inView: boolean }) => (
  <div className="flex gap-1">
    {Array.from({ length: rating }).map((_, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 300 }}
        className="text-primary text-lg"
      >
        ★
      </motion.span>
    ))}
  </div>
);

const TestimonialsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="relative z-10 py-24 md:py-32 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="glass-pill font-handwritten text-foreground/60 text-lg inline-block"
        >
          don't take our word for it
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="font-heading font-bold text-3xl md:text-5xl lowercase"
        >
          real humans. real opinions. <span className="text-gradient-hero">real good</span> coffee.
        </motion.h2>
      </div>

      {/* Testimonial card */}
      <div className="relative max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 80, rotateY: 15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -80, rotateY: -15 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-light p-8 md:p-12 text-center group hover:border-primary/20 transition-colors duration-300"
          >
            {/* Big quotation mark */}
            <span className="font-handwritten text-7xl md:text-8xl text-primary/30 leading-none block mb-4 group-hover:text-primary/50 transition-colors duration-500">
              "
            </span>

            <p className="text-foreground/80 text-lg md:text-xl italic leading-relaxed mb-8 lowercase">
              {testimonials[current].quote}
            </p>

            <StarRating rating={testimonials[current].rating} inView={inView} />

            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="font-heading font-semibold text-sm">{testimonials[current].author}</span>
              <span className="glass-pill !py-1 !px-3 text-[10px] font-mono uppercase tracking-wider text-foreground/40">
                {testimonials[current].source}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-primary w-6" : "bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
