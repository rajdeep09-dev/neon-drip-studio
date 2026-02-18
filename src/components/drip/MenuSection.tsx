import { motion } from "framer-motion";

const MENU_ITEMS = [
  { category: "Espresso", items: [
    { name: "Double Shot", price: "$4", desc: "Two shots of our signature blend" },
    { name: "Americano", price: "$4.5", desc: "Espresso with hot water" },
    { name: "Cortado", price: "$5", desc: "Equal parts espresso and steamed milk" },
  ]},
  { category: "Pour Over", items: [
    { name: "Ethiopia Yirgacheffe", price: "$6", desc: "Floral, citrus notes, tea-like body" },
    { name: "Colombia Huila", price: "$5.5", desc: "Caramel sweetness, medium acidity" },
    { name: "Kenya AA", price: "$6.5", desc: "Blackcurrant, bright acidity, juicy" },
  ]},
  { category: "Signature", items: [
    { name: "Honey Lavender Latte", price: "$7", desc: "House-made lavender syrup, local honey" },
    { name: "Spiced Maple Cold Brew", price: "$6.5", desc: "Cold brew infused with cinnamon & maple" },
    { name: "Matcha Tonic", price: "$6", desc: "Ceremonial matcha, tonic water, lime" },
  ]}
];

const MenuSection = () => {
  return (
    <section className="relative py-32 bg-[#0A1A44] text-[#F8F5F2] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F05A28]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#7CA5B8]/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="container px-4 md:px-8 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="font-heading text-xs uppercase tracking-[0.3em] text-[#F05A28] mb-4 block">Selection</span>
          <h2 className="font-serif italic text-6xl md:text-8xl text-white mb-6">Curated Menu</h2>
          <p className="font-heading text-lg text-white/60 max-w-2xl mx-auto">
            A rotating selection of seasonal coffees and signature beverages designed to highlight unique flavor profiles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {MENU_ITEMS.map((section, i) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="group"
            >
              <h3 className="font-serif italic text-4xl text-[#F05A28] mb-8 border-b border-white/10 pb-4">
                {section.category}
              </h3>

              <div className="space-y-8">
                {section.items.map((item, j) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + j * 0.1 }}
                    className="relative group/item"
                  >
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="font-heading font-medium text-xl text-white group-hover/item:text-[#F05A28] transition-colors duration-300">
                        {item.name}
                      </h4>
                      <span className="font-mono-label text-sm text-white/50">{item.price}</span>
                    </div>
                    <p className="font-serif italic text-white/40 text-sm group-hover/item:text-white/70 transition-colors duration-300">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 border border-white/20 rounded-full font-heading uppercase tracking-widest text-sm hover:bg-white hover:text-[#0A1A44] transition-all duration-300"
          >
            Download Full Menu
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
