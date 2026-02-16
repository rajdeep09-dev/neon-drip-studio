import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Easing } from "framer-motion";

const ease: Easing = [0.25, 0.1, 0.25, 1];

const timeSlots = ["7:00am", "8:00am", "9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm", "2:00pm", "3:00pm", "5:00pm", "6:00pm", "7:00pm"];
const vibeOptions = ["inside - cozy corner", "inside - window seat", "outside - patio", "surprise me"];

const ReservationSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [guests, setGuests] = useState(2);
  const [selectedTime, setSelectedTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const fieldVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.1, duration: 0.5, ease },
    }),
  };

  return (
    <section ref={ref} className="relative z-10 py-24 md:py-32 px-6">
      {/* Orange blob behind */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,107,53,0.06) 0%, transparent 70%)", filter: "blur(120px)" }}
      />

      <div className="max-w-2xl mx-auto text-center mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="glass-pill font-handwritten text-primary text-lg inline-block mb-4"
        >
          grab a spot
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7, ease }}
          className="font-heading font-bold text-3xl md:text-5xl lowercase leading-tight"
        >
          reserve a table before your <span className="text-neon-orange">favorite seat</span> is taken.
        </motion.h2>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8, ease, type: "spring", stiffness: 80, damping: 20 }}
        onSubmit={handleSubmit}
        className="glass-heavy max-w-[700px] mx-auto p-8 md:p-12 space-y-6"
      >
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="w-16 h-16 rounded-full bg-accent/20 mx-auto flex items-center justify-center"
              >
                <span className="text-accent text-2xl">✓</span>
              </motion.div>
              <h3 className="font-heading font-bold text-2xl text-accent lowercase">you're booked!</h3>
              <p className="text-foreground/50 text-sm lowercase">check your email for confirmation ✨</p>
            </motion.div>
          ) : (
            <motion.div key="form" className="space-y-6">
              {/* Name */}
              <motion.div custom={0} variants={fieldVariant} initial="hidden" animate={inView ? "visible" : "hidden"}>
                <label className="block text-xs font-mono uppercase tracking-wider text-foreground/40 mb-2">your name</label>
                <input type="text" placeholder="first name is fine, we're casual" className="glass-input w-full px-4 py-3 text-sm" />
              </motion.div>

              {/* Email */}
              <motion.div custom={1} variants={fieldVariant} initial="hidden" animate={inView ? "visible" : "hidden"}>
                <label className="block text-xs font-mono uppercase tracking-wider text-foreground/40 mb-2">email</label>
                <input type="email" placeholder="for the confirmation, not spam" className="glass-input w-full px-4 py-3 text-sm" />
              </motion.div>

              {/* Date */}
              <motion.div custom={2} variants={fieldVariant} initial="hidden" animate={inView ? "visible" : "hidden"}>
                <label className="block text-xs font-mono uppercase tracking-wider text-foreground/40 mb-2">when</label>
                <input type="date" className="glass-input w-full px-4 py-3 text-sm" />
              </motion.div>

              {/* Time */}
              <motion.div custom={3} variants={fieldVariant} initial="hidden" animate={inView ? "visible" : "hidden"}>
                <label className="block text-xs font-mono uppercase tracking-wider text-foreground/40 mb-2">what time</label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`shrink-0 rounded-full px-4 py-2 text-xs font-mono transition-all duration-300 ${
                        selectedTime === t
                          ? "glass-orange text-primary glow-orange"
                          : "glass-pill text-foreground/50 hover:text-foreground/80"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Guest count */}
              <motion.div custom={4} variants={fieldVariant} initial="hidden" animate={inView ? "visible" : "hidden"}>
                <label className="block text-xs font-mono uppercase tracking-wider text-foreground/40 mb-2">how many</label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="glass-pill !px-4 !py-2 text-foreground/60 hover:text-primary transition-colors"
                  >
                    −
                  </button>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={guests}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="font-mono text-2xl font-bold text-primary w-8 text-center"
                    >
                      {guests}
                    </motion.span>
                  </AnimatePresence>
                  <button
                    type="button"
                    onClick={() => setGuests(Math.min(12, guests + 1))}
                    className="glass-pill !px-4 !py-2 text-foreground/60 hover:text-primary transition-colors"
                  >
                    +
                  </button>
                </div>
              </motion.div>

              {/* Vibe check */}
              <motion.div custom={5} variants={fieldVariant} initial="hidden" animate={inView ? "visible" : "hidden"}>
                <label className="block text-xs font-mono uppercase tracking-wider text-foreground/40 mb-2">vibe check</label>
                <select className="glass-input w-full px-4 py-3 text-sm appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%23E8D5B7%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M1.646%204.646a.5.5%200%200%201%20.708%200L8%2010.293l5.646-5.647a.5.5%200%200%201%20.708.708l-6%206a.5.5%200%200%201-.708%200l-6-6a.5.5%200%200%201%200-.708z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center]">
                  <option value="" className="bg-[#111] text-foreground">choose your vibe...</option>
                  {vibeOptions.map((v) => (
                    <option key={v} value={v} className="bg-[#111] text-foreground">{v}</option>
                  ))}
                </select>
              </motion.div>

              {/* Notes */}
              <motion.div custom={6} variants={fieldVariant} initial="hidden" animate={inView ? "visible" : "hidden"}>
                <label className="block text-xs font-mono uppercase tracking-wider text-foreground/40 mb-2">anything else?</label>
                <textarea
                  placeholder="allergies? special occasion? just want extra oat milk?"
                  rows={3}
                  className="glass-input w-full px-4 py-3 text-sm resize-none"
                />
              </motion.div>

              {/* Submit */}
              <motion.div custom={7} variants={fieldVariant} initial="hidden" animate={inView ? "visible" : "hidden"}>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground rounded-full py-4 font-heading font-semibold lowercase text-base glow-orange hover:scale-[1.02] active:scale-95 transition-all duration-300 relative overflow-hidden"
                >
                  {loading ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="inline-block w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    />
                  ) : (
                    "lock it in"
                  )}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </section>
  );
};

export default ReservationSection;
