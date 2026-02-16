import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import InnerPageLayout from "@/components/drip/InnerPageLayout";
import SEOHead from "@/components/drip/SEOHead";
import type { Easing } from "framer-motion";

const ease: Easing = [0.25, 0.1, 0.25, 1];

const team = [
  { name: "riley chen", title: "head bean whisperer", emoji: "☕" },
  { name: "jordan wells", title: "chaos coordinator", emoji: "🌀" },
  { name: "sam okafor", title: "latte art wizard", emoji: "🎨" },
  { name: "alex kim", title: "pastry sorcerer", emoji: "🥐" },
];

const values = [
  { title: "quality over everything", icon: "☕", description: "we never serve anything we wouldn't drink ourselves." },
  { title: "no gatekeeping", icon: "🔓", description: "coffee should be inclusive. no snobby baristas here." },
  { title: "sustainability isn't a buzzword", icon: "🌱", description: "compostable cups. direct trade beans. we actually try." },
  { title: "community first", icon: "❤️", description: "this is your third place. study, create, hang, exist." },
];

const timeline = [
  { year: "2023", title: "the idea", desc: "two friends tired of bad coffee start scheming." },
  { year: "early 2024", title: "the build", desc: "gutted an old warehouse. learned drywall. cried a little." },
  { year: "mid 2024", title: "the open", desc: "doors opened. line around the block. happy tears." },
  { year: "late 2024", title: "the growth", desc: "847 five-star reviews. a community, not just a café." },
];

const AboutPage = () => {
  const storyRef = useRef<HTMLDivElement>(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });
  const teamRef = useRef<HTMLDivElement>(null);
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" });
  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });

  return (
    <InnerPageLayout
      heading={<>we're <span className="line-through decoration-primary decoration-2">not like other</span> <span className="font-handwritten text-primary">different from</span> other coffee shops.</>}
      sub="and we mean that."
    >
      <SEOHead title="About" description="the story behind drip coffee studio — who we are, what we believe, and why we started this whole thing." path="/about" />
      {/* Story + Timeline */}
      <section ref={storyRef} className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        {/* Story body */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={storyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="space-y-6"
        >
          <p className="text-foreground/60 text-lg leading-loose lowercase">
            we started drip because we were tired of burnt, overpriced coffee served by people who clearly hate their jobs.
            our beans are sourced directly from small farms, roasted in-house, and served by people who genuinely love what they do.
          </p>
          {/* Pull quote */}
          <div className="glass-pill inline-block font-handwritten text-primary text-2xl rotate-[-2deg] !py-4 !px-8">
            "we just wanted a place where the coffee slaps and the vibes are immaculate."
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-foreground/10" />
          {timeline.map((t, i) => (
            <motion.div
              key={t.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6, ease }}
              className={`relative flex items-start gap-6 mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } flex-row`}
            >
              <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 mt-1.5 z-10" />
              <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <span className="glass-pill !py-1 !px-3 text-xs font-mono text-primary inline-block mb-2">{t.year}</span>
                <h4 className="font-heading font-bold text-lg lowercase">{t.title}</h4>
                <p className="text-foreground/50 text-sm lowercase mt-1">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="max-w-5xl mx-auto px-6 py-16">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={teamInView ? { opacity: 1, y: 0 } : {}}
          className="font-heading font-bold text-2xl md:text-4xl lowercase text-center mb-12"
        >
          the humans behind the <span className="text-primary">drip</span>
        </motion.h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, rotate: -5, y: 20 }}
              animate={teamInView ? { opacity: 1, rotate: 0, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6, ease }}
              className="glass-light glass-hover text-center p-6 group cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center text-3xl group-hover:ring-2 group-hover:ring-primary/50 transition-all duration-300">
                {member.emoji}
              </div>
              <h4 className="font-heading font-bold text-sm lowercase">{member.name}</h4>
              <p className="font-handwritten text-primary/70 text-base">{member.title}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="max-w-5xl mx-auto px-6 py-16">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={valuesInView ? { opacity: 1, y: 0 } : {}}
          className="font-heading font-bold text-2xl md:text-4xl lowercase text-center mb-12"
        >
          what we <span className="text-gradient-hero">actually care about</span>
        </motion.h3>
        <div className="grid sm:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, rotate: -3, y: 20 }}
              animate={valuesInView ? { opacity: 1, rotate: 0, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6, ease }}
              className="glass-light glass-hover p-6 space-y-3"
            >
              <span className="text-2xl">{v.icon}</span>
              <h4 className="font-heading font-bold text-sm lowercase text-primary">{v.title}</h4>
              <p className="text-foreground/50 text-sm lowercase">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </InnerPageLayout>
  );
};

export default AboutPage;
