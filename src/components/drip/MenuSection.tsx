import { motion } from "framer-motion";
import { useState } from "react";

const MENU_ITEMS = [
  { category: "Espresso", items: [
    { name: "Double Shot", price: "$4", desc: "Two shots of our signature blend", img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=2940&auto=format&fit=crop" },
    { name: "Americano", price: "$4.5", desc: "Espresso with hot water", img: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=2787&auto=format&fit=crop" },
    { name: "Cortado", price: "$5", desc: "Equal parts espresso and steamed milk", img: "https://images.unsplash.com/photo-1461023058943-48dbf1399f98?q=80&w=2940&auto=format&fit=crop" },
  ]},
  { category: "Pour Over", items: [
    { name: "Ethiopia Yirgacheffe", price: "$6", desc: "Floral, citrus notes, tea-like body", img: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=2864&auto=format&fit=crop" },
    { name: "Colombia Huila", price: "$5.5", desc: "Caramel sweetness, medium acidity", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2940&auto=format&fit=crop" },
    { name: "Kenya AA", price: "$6.5", desc: "Blackcurrant, bright acidity, juicy", img: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=2787&auto=format&fit=crop" },
  ]},
  { category: "Signature", items: [
    { name: "Honey Lavender Latte", price: "$7", desc: "House-made lavender syrup, local honey", img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2937&auto=format&fit=crop" },
    { name: "Spiced Maple Cold Brew", price: "$6.5", desc: "Cold brew infused with cinnamon & maple", img: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=2814&auto=format&fit=crop" },
    { name: "Matcha Tonic", price: "$6", desc: "Ceremonial matcha, tonic water, lime", img: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=2942&auto=format&fit=crop" },
  ]}
];

const MenuSection = () => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  return (
    <section className="relative py-40 bg-[#0A1229] text-[#F9F7F5] overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#F05A28]/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#8CAKB6]/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      {/* Hover Reveal Image Portal (Follows Cursor or Fixed Position) */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px] pointer-events-none z-0 rounded-[40px] overflow-hidden opacity-0 lg:opacity-100"
        animate={{
           opacity: hoveredImage ? 0.8 : 0,
           scale: hoveredImage ? 1 : 0.9,
           rotate: hoveredImage ? -5 : 0
        }}
        transition={{ duration: 0.5, ease: "circOut" }}
      >
         {hoveredImage && <img src={hoveredImage} alt="" className="w-full h-full object-cover grayscale brightness-75" />}
      </motion.div>

      <div className="container px-6 md:px-12 mx-auto relative z-10 max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-32"
        >
          <span className="font-mono-label text-[10px] uppercase tracking-[0.4em] text-[#F05A28] mb-6 block border border-[#F05A28]/20 px-4 py-2 rounded-full">Selection</span>
          <h2 className="font-serif italic text-7xl md:text-9xl text-[#F9F7F5] mb-8 tracking-tighter mix-blend-difference">Curated Menu</h2>
          <p className="font-heading text-xl text-[#F9F7F5]/50 max-w-2xl mx-auto text-center leading-relaxed">
            A rotating selection of seasonal coffees and signature beverages designed to highlight unique flavor profiles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 relative">
          {MENU_ITEMS.map((section, i) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <h3 className="font-serif italic text-5xl text-[#F9F7F5] mb-12 border-b border-[#F9F7F5]/10 pb-6 flex items-baseline justify-between">
                {section.category}
                <span className="font-mono-label text-xs tracking-widest text-[#F9F7F5]/30">0{i+1}</span>
              </h3>

              <div className="space-y-12">
                {section.items.map((item, j) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + j * 0.1 }}
                    className="relative group/item cursor-pointer"
                    onMouseEnter={() => setHoveredImage(item.img)}
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    <div className="flex justify-between items-baseline mb-3 overflow-hidden">
                      <h4 className="font-heading font-medium text-2xl text-[#F9F7F5] group-hover/item:text-[#F05A28] transition-colors duration-500">
                        <span className="inline-block group-hover/item:translate-x-2 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]">{item.name}</span>
                      </h4>
                      <span className="font-mono-label text-sm text-[#F9F7F5]/40">{item.price}</span>
                    </div>
                    <p className="font-serif italic text-[#F9F7F5]/30 text-lg group-hover/item:text-[#F9F7F5]/60 transition-colors duration-500 pl-2 border-l border-[#F9F7F5]/10 group-hover/item:border-[#F05A28] h-0 group-hover/item:h-auto overflow-hidden opacity-0 group-hover/item:opacity-100 transform translate-y-2 group-hover/item:translate-y-0">
                      {item.desc}
                    </p>
                    <div className="w-full h-[1px] bg-[#F9F7F5]/5 mt-6 group-hover/item:bg-[#F9F7F5]/20 transition-colors duration-500" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-40 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 border border-[#F9F7F5]/10 rounded-full font-heading uppercase tracking-widest text-xs text-[#F9F7F5] hover:bg-[#F9F7F5] hover:text-[#0A1229] transition-all duration-500 shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.3)]"
          >
            Download Full Menu
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
