import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import InnerPageLayout from "@/components/drip/InnerPageLayout";
import type { Easing } from "framer-motion";

const ease: Easing = [0.25, 0.1, 0.25, 1];

const categories = ["all", "coffee talk", "recipes", "culture", "behind the scenes"];

const posts = [
  { title: "why your home coffee sucks (and how to fix it)", excerpt: "hint: it's probably your water temperature.", category: "coffee talk", date: "feb 10, 2025", readTime: "4 min", featured: true },
  { title: "the perfect oat milk latte at home", excerpt: "we're giving away our secrets. you're welcome.", category: "recipes", date: "feb 3, 2025", readTime: "3 min" },
  { title: "our trip to ethiopia: finding the beans", excerpt: "we flew 8,000 miles for your morning cup.", category: "behind the scenes", date: "jan 28, 2025", readTime: "6 min" },
  { title: "cold brew vs iced coffee: the definitive guide", excerpt: "they're not the same thing. fight us.", category: "coffee talk", date: "jan 20, 2025", readTime: "5 min" },
  { title: "how to not be annoying at a coffee shop", excerpt: "a gentle guide from your barista friends.", category: "culture", date: "jan 14, 2025", readTime: "3 min" },
  { title: "cardamom croissant recipe (almost ours)", excerpt: "close enough. the real one you gotta come taste.", category: "recipes", date: "jan 7, 2025", readTime: "4 min" },
];

const JournalPage = () => {
  const [activeCat, setActiveCat] = useState("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-100px" });

  const filtered = activeCat === "all" ? posts : posts.filter((p) => p.category === activeCat);
  const featured = posts.find((p) => p.featured);

  return (
    <InnerPageLayout
      heading={<>the <span className="text-gradient-hero">drip</span> journal</>}
      sub="coffee thoughts, recipes, and things we think are cool."
    >
      {/* Featured post */}
      {featured && (
        <section className="max-w-5xl mx-auto px-6 pb-12">
          <div className="glass-light overflow-hidden group cursor-pointer">
            <div className="relative aspect-[21/9] bg-muted overflow-hidden rounded-t-[20px]">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 via-muted to-accent/5 flex items-center justify-center">
                <span className="text-6xl opacity-15 group-hover:scale-110 transition-transform duration-700">📝</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 glass-dark !rounded-none !border-x-0 !border-b-0 p-6">
                <span className="glass-pill !py-1 !px-3 text-[10px] font-mono uppercase tracking-wider text-primary mb-2 inline-block">{featured.category}</span>
                <h3 className="font-heading font-bold text-xl md:text-2xl lowercase group-hover:text-primary transition-colors">{featured.title}</h3>
                <p className="text-foreground/50 text-sm mt-1 lowercase">{featured.excerpt}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category tabs */}
      <div className="max-w-5xl mx-auto px-6 pb-8">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-heading font-medium lowercase tracking-wide transition-all duration-300 ${
                activeCat === cat ? "glass-orange text-primary glow-orange" : "glass-pill text-foreground/50 hover:text-foreground/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Post grid */}
      <section ref={gridRef} className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5, ease }}
              className="glass-light glass-hover group cursor-pointer overflow-hidden"
            >
              <div className="aspect-video bg-muted rounded-t-[20px] overflow-hidden flex items-center justify-center">
                <span className="text-3xl opacity-15 group-hover:scale-110 transition-transform duration-500">📝</span>
              </div>
              <div className="p-5 space-y-2">
                <span className="glass-pill !py-0.5 !px-2.5 text-[9px] font-mono uppercase tracking-wider text-primary">{post.category}</span>
                <h3 className="font-heading font-bold text-sm lowercase group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-foreground/40 text-xs lowercase line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-[10px] font-mono text-foreground/30 uppercase tracking-wider pt-1">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </InnerPageLayout>
  );
};

export default JournalPage;
