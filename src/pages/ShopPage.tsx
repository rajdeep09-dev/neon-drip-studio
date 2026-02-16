import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import InnerPageLayout from "@/components/drip/InnerPageLayout";
import SEOHead from "@/components/drip/SEOHead";
import type { Easing } from "framer-motion";

const ease: Easing = [0.25, 0.1, 0.25, 1];

const products = [
  { name: "house blend beans", desc: "our signature. chocolatey. smooth. 12oz bag.", price: "$18", category: "beans" },
  { name: "single origin - ethiopia", desc: "bright. fruity. floral notes. limited batch.", price: "$22", category: "beans" },
  { name: "drip hoodie", desc: "heavyweight. embroidered logo. cozy as heck.", price: "$65", category: "merch" },
  { name: "ceramic pour-over set", desc: "handmade. matte black. includes filter.", price: "$45", category: "gear" },
  { name: "drip tote bag", desc: "canvas. screenprinted. holds many things.", price: "$25", category: "merch" },
  { name: "cold brew concentrate", desc: "just add water (or oat milk). makes 8 cups.", price: "$16", category: "beans" },
];

const ShopPage = () => {
  const [cart, setCart] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-100px" });

  const addToCart = (name: string) => {
    setCart((prev) => [...prev, name]);
  };

  return (
    <InnerPageLayout
      heading={<>bring the <span className="text-gradient-hero">drip</span> home.</>}
      sub="beans, merch, and gifts that don't suck."
    >
      <SEOHead title="Shop" description="shop drip coffee beans, merch, gear, and cold brew concentrate. bring the drip home." path="/shop" />
      <section ref={gridRef} className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5, ease }}
              className="glass-light glass-hover group cursor-pointer overflow-hidden relative"
            >
              <div className="aspect-square bg-muted flex items-center justify-center rounded-t-[20px] overflow-hidden">
                <span className="text-4xl opacity-20 group-hover:opacity-40 group-hover:-translate-y-3 transition-all duration-500">
                  {p.category === "beans" ? "☕" : p.category === "merch" ? "👕" : "⚙️"}
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-heading font-bold text-sm lowercase">{p.name}</h3>
                <p className="text-foreground/45 text-xs lowercase">{p.desc}</p>
                <span className="font-mono text-sm text-primary font-bold block">{p.price}</span>
              </div>
              {/* Add to bag button slides up */}
              <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-4 pt-0">
                <button
                  onClick={(e) => { e.stopPropagation(); addToCart(p.name); }}
                  className="w-full bg-primary text-primary-foreground rounded-full py-2.5 text-sm font-heading font-semibold lowercase hover:scale-[1.02] active:scale-95 transition-transform"
                >
                  add to bag
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cart floating button */}
      {cart.length > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center text-lg font-bold glow-orange hover:scale-110 active:scale-95 transition-transform"
        >
          {cart.length}
        </motion.button>
      )}

      {/* Cart drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-40 bg-background/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm z-50 glass-heavy !rounded-none !rounded-l-3xl p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-heading font-bold text-lg lowercase">your bag</h3>
                <button onClick={() => setCartOpen(false)} className="text-foreground/30 hover:text-foreground text-xl">×</button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3">
                {cart.map((item, i) => (
                  <div key={i} className="glass-pill flex justify-between items-center !py-3">
                    <span className="text-sm lowercase">{item}</span>
                    <button
                      onClick={() => setCart((prev) => prev.filter((_, j) => j !== i))}
                      className="text-foreground/30 hover:text-destructive text-xs"
                    >
                      remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-foreground/[0.06] space-y-3">
                <button className="w-full bg-primary text-primary-foreground rounded-full py-3 font-heading font-semibold lowercase glow-orange hover:scale-[1.02] active:scale-95 transition-transform">
                  checkout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </InnerPageLayout>
  );
};

export default ShopPage;
