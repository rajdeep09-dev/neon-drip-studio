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
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      onMouseMove={handleMouse}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="glass-light glass-hover group cursor-pointer overflow-hidden"
      style={{
        transform: `perspective(600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: "transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.4s ease",
      }}
    >
      {/* Image area */}
      <div className="relative overflow-hidden rounded-t-[20px] aspect-square bg-muted">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 group-hover:from-primary/20 transition-all duration-500" />
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-4xl opacity-30 group-hover:scale-110 transition-transform duration-500">☕</span>
        </div>
        {/* Price badge slides in on hover */}
        <div className="absolute top-3 right-3 glass-pill font-mono text-sm text-primary font-bold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          {item.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-base lowercase group-hover:text-primary transition-colors duration-300">
            {item.name}
            <span className="inline-block ml-1 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300">
              →
            </span>
          </h3>
          <span className="font-mono text-sm text-primary font-bold group-hover:glow-orange transition-all duration-300 rounded px-1">
            {item.price}
          </span>
        </div>
        <p className="text-foreground/50 text-sm leading-relaxed lowercase">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="glass-pill !py-1 !px-2.5 text-[10px] font-mono uppercase tracking-wider text-foreground/50"
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
    <section ref={ref} className="relative z-10 py-24 md:py-32 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center mb-12 space-y-4"
      >
        <span className="glass-pill font-handwritten text-accent text-lg inline-block">
          the goods
        </span>
        <h2 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl lowercase leading-tight">
          stuff you'll <span className="text-gradient-hero">actually want</span> to order.
        </h2>
      </motion.div>

      {/* Category tabs */}
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex gap-2 overflow-x-auto pb-4 mb-10 scrollbar-hide justify-start md:justify-center"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`shrink-0 rounded-full px-5 py-2 text-sm font-heading font-medium lowercase tracking-wide transition-all duration-300 ${
              active === cat
                ? "glass-orange text-primary glow-orange"
                : "glass-pill text-foreground/50 hover:text-foreground/80 hover:bg-foreground/[0.06]"
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
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
        className="text-center mt-12"
      >
        <button className="group inline-flex items-center gap-2 text-foreground/60 hover:text-primary font-heading font-medium lowercase text-lg transition-colors duration-300">
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
