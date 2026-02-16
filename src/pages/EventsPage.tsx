import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import InnerPageLayout from "@/components/drip/InnerPageLayout";
import type { Easing } from "framer-motion";

const ease: Easing = [0.25, 0.1, 0.25, 1];

const events = [
  { title: "latte art throwdown", date: "feb 22", time: "6pm - 9pm", desc: "baristas compete. you judge. free coffee for everyone.", upcoming: true },
  { title: "vinyl + pour over night", date: "mar 1", time: "7pm - 10pm", desc: "bring your records. we'll make the coffee. lo-fi vibes only.", upcoming: true },
  { title: "bean to cup workshop", date: "mar 15", time: "10am - 12pm", desc: "learn the whole journey from farm to your mug. hands-on.", upcoming: true },
  { title: "open mic x drip", date: "mar 22", time: "7pm - 10pm", desc: "poetry, music, comedy. sign up at the counter.", upcoming: true },
];

const pastEvents = [
  { title: "holiday pop-up market", date: "dec 2024" },
  { title: "cold brew taste test", date: "nov 2024" },
  { title: "grand opening party", date: "jun 2024" },
];

const EventsPage = () => {
  const [rsvps, setRsvps] = useState<Set<number>>(new Set());
  const listRef = useRef<HTMLDivElement>(null);
  const listInView = useInView(listRef, { once: true, margin: "-100px" });

  const toggleRsvp = (i: number) => {
    setRsvps((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <InnerPageLayout
      heading={<>stuff happening at <span className="text-primary">drip</span></>}
      sub="workshops, tastings, live music, and general good times."
    >
      <section ref={listRef} className="max-w-4xl mx-auto px-6 py-12 space-y-6">
        {events.map((evt, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={listInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.6, ease }}
            className="glass-light glass-hover p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 group"
          >
            <div className="shrink-0">
              <span className="glass-pill !py-2 !px-4 font-mono text-xs text-primary font-bold uppercase">{evt.date}</span>
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-heading font-bold text-lg lowercase group-hover:text-primary transition-colors">{evt.title}</h3>
              <p className="text-foreground/40 text-xs font-mono uppercase tracking-wider">{evt.time}</p>
              <p className="text-foreground/50 text-sm lowercase">{evt.desc}</p>
            </div>
            <button
              onClick={() => toggleRsvp(i)}
              className={`shrink-0 rounded-full px-6 py-2 text-sm font-heading font-medium lowercase transition-all duration-300 ${
                rsvps.has(i)
                  ? "bg-accent/20 text-accent border border-accent/30"
                  : "glass-pill !border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {rsvps.has(i) ? "you're in! ✓" : "i'm in"}
            </button>
          </motion.div>
        ))}
      </section>

      {/* Past events */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h3 className="font-heading font-bold text-xl lowercase mb-8 text-foreground/50">
          stuff that already happened <span className="font-handwritten text-primary/50">(fomo material)</span>
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {pastEvents.map((e, i) => (
            <div key={i} className="glass-light glass-hover p-5 group cursor-pointer">
              <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                <span className="text-2xl opacity-20 group-hover:scale-110 transition-transform">📸</span>
              </div>
              <h4 className="font-heading font-bold text-sm lowercase">{e.title}</h4>
              <p className="text-foreground/30 text-xs font-mono">{e.date}</p>
            </div>
          ))}
        </div>
      </section>
    </InnerPageLayout>
  );
};

export default EventsPage;
