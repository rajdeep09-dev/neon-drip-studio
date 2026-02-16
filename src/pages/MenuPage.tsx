import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import InnerPageLayout from "@/components/drip/InnerPageLayout";
import SEOHead from "@/components/drip/SEOHead";

const categories = ["all", "espresso drinks", "pour overs", "matcha + tea", "pastries", "cold stuff", "seasonal"];
const dietaryFilters = ["vegan", "oat milk", "caffeine-free", "gluten-free"];

const menuItems = [
  { name: "the classic drip", description: "house blend. smooth. chocolatey. no drama.", price: "$4", tags: ["house fav"], category: "pour overs", featured: true },
  { name: "oat milk latte", description: "espresso + oat milk + a little hug in a cup", price: "$6", tags: ["oat milk", "popular"], category: "espresso drinks" },
  { name: "matcha fog", description: "ceremonial grade matcha. lavender. oat milk. unreal.", price: "$7", tags: ["matcha", "oat milk", "vegan"], category: "matcha + tea" },
  { name: "cold brew on tap", description: "steeped 20 hours. served on nitro. dangerously smooth.", price: "$5.50", tags: ["cold", "nitro"], category: "cold stuff" },
  { name: "dirty chai", description: "masala chai + espresso shot. spicy and strong like your personality.", price: "$6.50", tags: ["spicy", "espresso"], category: "espresso drinks" },
  { name: "cardamom croissant", description: "butter. layers. cardamom sugar. life-changing.", price: "$5", tags: ["pastry", "fresh daily"], category: "pastries" },
  { name: "avocado toast (obviously)", description: "sourdough + smashed avo + chili flake + poached egg", price: "$14", tags: ["brunch", "filling"], category: "pastries", featured: true },
  { name: "seasonal mystery drink", description: "we change it every month. trust us. its always fire.", price: "$7", tags: ["seasonal", "limited"], category: "seasonal" },
  { name: "double espresso", description: "pure. intense. no fuss.", price: "$3.50", tags: ["classic"], category: "espresso drinks" },
  { name: "lavender oat cortado", description: "shot of espresso. oat milk. hint of lavender. smooth.", price: "$5.50", tags: ["oat milk", "vegan"], category: "espresso drinks" },
  { name: "iced americano", description: "espresso over ice. clean and crisp.", price: "$4.50", tags: ["cold", "classic"], category: "cold stuff" },
  { name: "banana bread", description: "warm. moist. walnuts. made fresh every morning.", price: "$4.50", tags: ["pastry", "fresh daily"], category: "pastries" },
];

const MenuPage = () => {
  const [activeCat, setActiveCat] = useState("all");
  const [activeDietary, setActiveDietary] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<typeof menuItems[0] | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true });

  const filtered = menuItems.filter((item) => {
    if (activeCat !== "all" && item.category !== activeCat) return false;
    if (activeDietary.length > 0 && !activeDietary.some((d) => item.tags.includes(d))) return false;
    return true;
  });

  const toggleDietary = (d: string) => {
    setActiveDietary((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);
  };

  return (
    <InnerPageLayout
      heading={<>everything we make. and yes, it's <span className="text-neon-orange">all good</span>.</>}
      sub="filter by what you're craving. we won't judge."
    >
      <SEOHead title="Menu" description="browse our full menu — espresso drinks, pour overs, matcha, pastries, and seasonal specials. all actually good." path="/menu" />
      {/* Sticky filter bar */}
      <div className="sticky top-[60px] z-30 py-4 px-6 glass-dark !rounded-none !border-x-0 transition-all">
        <div className="max-w-7xl mx-auto space-y-3">
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
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {dietaryFilters.map((d) => (
              <button
                key={d}
                onClick={() => toggleDietary(d)}
                className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-wider transition-all duration-300 ${
                  activeDietary.includes(d) ? "glass-teal text-accent" : "glass-pill text-foreground/30 hover:text-foreground/50"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div key={activeCat + activeDietary.join()} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                onClick={() => setSelectedItem(item)}
                className={`glass-light glass-hover group cursor-pointer overflow-hidden ${item.featured ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="aspect-square bg-muted overflow-hidden rounded-t-[20px] relative">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 via-muted to-accent/5 flex items-center justify-center">
                    <span className="text-4xl opacity-20 group-hover:scale-110 transition-transform duration-500">☕</span>
                  </div>
                  <div className="absolute top-3 right-3 glass-pill font-mono text-xs text-primary font-bold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {item.price}
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-sm lowercase group-hover:text-primary transition-colors">{item.name}</h3>
                    <span className="font-mono text-xs text-primary font-bold">{item.price}</span>
                  </div>
                  <p className="text-foreground/45 text-xs lowercase leading-relaxed">{item.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.tags.map((t) => (
                      <span key={t} className="glass-pill !py-0.5 !px-2 text-[9px] font-mono uppercase tracking-wider text-foreground/40">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-heavy max-w-lg w-full p-8 space-y-4"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-heading font-bold text-2xl lowercase text-primary">{selectedItem.name}</h3>
                <button onClick={() => setSelectedItem(null)} className="text-foreground/30 hover:text-foreground text-xl">×</button>
              </div>
              <p className="text-foreground/60 lowercase">{selectedItem.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedItem.tags.map((t) => (
                  <span key={t} className="glass-pill !py-1 !px-3 text-[10px] font-mono uppercase tracking-wider text-foreground/50">{t}</span>
                ))}
              </div>
              <div className="pt-4 flex items-center justify-between">
                <span className="font-mono text-2xl text-primary font-bold">{selectedItem.price}</span>
                <button className="bg-primary text-primary-foreground rounded-full px-6 py-2 font-heading font-semibold lowercase text-sm hover:scale-105 active:scale-95 transition-transform">
                  order ahead
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </InnerPageLayout>
  );
};

export default MenuPage;
