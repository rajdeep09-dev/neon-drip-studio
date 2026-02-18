import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const categories = [
  "all",
  "espresso drinks",
  "pour overs",
  "matcha + tea",
  "pastries",
  "cold stuff",
  "seasonal",
];

interface MenuItem {
  name: string;
  description: string;
  price: string;
  tags: string[];
  category: string;
}

const menuItems: MenuItem[] = [
  { name: "the classic drip", description: "house blend. smooth. chocolatey. no drama.", price: "$4", tags: ["house fav"], category: "pour overs" },
  { name: "oat milk latte", description: "espresso + oat milk + a little hug in a cup", price: "$6", tags: ["oat milk", "popular"], category: "espresso drinks" },
  { name: "matcha fog", description: "ceremonial grade matcha. lavender. oat milk. unreal.", price: "$7", tags: ["matcha", "oat milk"], category: "matcha + tea" },
  { name: "cold brew on tap", description: "steeped 20 hours. served on nitro. dangerously smooth.", price: "$5.50", tags: ["cold", "nitro"], category: "cold stuff" },
  { name: "dirty chai", description: "masala chai + espresso shot. spicy and strong like your personality.", price: "$6.50", tags: ["spicy", "espresso"], category: "espresso drinks" },
  { name: "cardamom croissant", description: "butter. layers. cardamom sugar. life-changing.", price: "$5", tags: ["pastry", "fresh daily"], category: "pastries" },
  { name: "avocado toast (obviously)", description: "sourdough + smashed avo + chili flake + poached egg", price: "$14", tags: ["brunch", "filling"], category: "pastries" },
  { name: "seasonal mystery drink", description: "we change it every month. trust us. its always fire.", price: "$7", tags: ["seasonal", "limited"], category: "seasonal" },
];

const MenuCard = ({ item, index }: { item: MenuItem; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="bg-white rounded-[30px] shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group h-full flex flex-col"
    >
      {/* Image area */}
      <div className="relative overflow-hidden aspect-square bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-blue-50/50" />
        <div className="w-full h-full flex items-center justify-center font-serif italic text-6xl text-artemis-orange/20">
          {item.name.charAt(0)}
        </div>
        {/* Price badge */}
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-sm font-serif italic text-artemis-blue border border-gray-200 shadow-sm">
          {item.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif italic font-bold text-xl text-artemis-blue">
              {item.name}
            </h3>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed font-heading">
            {item.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-4 mt-auto">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 rounded-md text-[10px] uppercase tracking-wider text-gray-500 font-heading border border-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const MenuSection = () => {
  const [active, setActive] = useState("all");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered =
    active === "all"
      ? menuItems
      : menuItems.filter((i) => i.category === active);

  return (
    <section ref={ref} className="relative z-10 py-24 md:py-32 px-6 max-w-7xl mx-auto bg-artemis-bg">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center mb-16 space-y-4"
      >
        <span className="inline-block px-4 py-1 rounded-full border border-artemis-orange/30 text-artemis-orange font-serif italic text-lg bg-orange-50/50">
          the goods
        </span>
        <h2 className="font-serif italic text-artemis-blue text-5xl md:text-7xl leading-tight">
          stuff you'll <span className="text-artemis-orange underline decoration-wavy decoration-2">actually want</span> to order.
        </h2>
      </motion.div>

      {/* Category tabs */}
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex gap-3 overflow-x-auto pb-6 mb-12 scrollbar-hide justify-start md:justify-center"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`shrink-0 rounded-full px-6 py-2 text-base font-serif italic transition-all duration-300 ${
              active === cat
                ? "bg-artemis-blue text-white shadow-lg"
                : "bg-white text-gray-500 border border-gray-200 hover:border-artemis-blue/50 hover:text-artemis-blue"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Cards grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filtered.map((item, i) => (
            <MenuCard key={item.name} item={item} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="text-center mt-20"
      >
        <button className="group inline-flex items-center gap-2 text-artemis-blue hover:text-artemis-orange font-serif italic text-xl transition-colors duration-300 border-b border-transparent hover:border-artemis-orange pb-1">
          see the full menu
          <span className="inline-block group-hover:translate-x-1.5 transition-transform duration-300">
            →
          </span>
        </button>
      </motion.div>
    </section>
  );
};

export default MenuSection;
