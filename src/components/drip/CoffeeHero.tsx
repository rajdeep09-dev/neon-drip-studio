import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Menu, ShoppingBag, ArrowRight, Star, Heart, ArrowUpRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CoffeeHero = () => {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-heading relative w-full overflow-hidden text-[#1a1a1a]">
      {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-center p-6 md:px-12 relative z-20 gap-4 md:gap-0">

        {/* Left: Menu & Search */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white px-6 py-2 rounded-full shadow-sm border border-gray-200 flex items-center gap-2 font-medium text-sm hover:shadow-md transition-all"
          >
            Menu
            <div className="bg-[#1a1a1a] rounded-full p-1 ml-1">
              <Menu className="w-3 h-3 text-white" />
            </div>
          </motion.button>

          <div className={`relative flex items-center transition-all duration-300 ${searchFocused ? 'w-64' : 'w-48'}`}>
            <span className="text-gray-400 text-sm absolute left-0 pointer-events-none">Searching...</span>
            <div className="absolute right-0 bg-[#D22B2B] p-2 rounded-full cursor-pointer hover:bg-red-700 transition-colors">
              <Search className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Center: Logo */}
        <div className="text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
          <h1 className="font-bold tracking-widest text-sm md:text-base border-b-2 border-[#1a1a1a] pb-1">
            COFFEE SHOP <span className="text-[10px] align-top">EST 1980</span>
          </h1>
        </div>

        {/* Right: Profile */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full border border-gray-200/50 backdrop-blur-sm cursor-pointer hover:bg-white transition-colors">
            <Avatar className="w-8 h-8 border border-gray-200">
              <AvatarImage src="https://i.pravatar.cc/150?u=sohan" alt="Sohan" />
              <AvatarFallback>SH</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">Sohan</span>
            <ArrowRight className="w-3 h-3 rotate-90 text-gray-400" />
          </div>
        </div>
      </header>

      {/* --- MAIN HERO CARD --- */}
      <main className="px-4 md:px-8 pb-8 relative z-10">
        <div className="bg-[#1a1a1a] rounded-[2.5rem] relative overflow-hidden text-white min-h-[600px] md:h-[75vh] w-full flex flex-col md:flex-row shadow-2xl">

          {/* Decorative Background Pattern inside Card */}
          <div className="absolute inset-0 opacity-10 pointer-events-none"
               style={{
                 backgroundImage: 'radial-gradient(circle at 50% 50%, #333 1px, transparent 1px)',
                 backgroundSize: '30px 30px'
               }}>
          </div>

          {/* LEFT COLUMN */}
          <div className="w-full md:w-1/4 p-8 md:p-12 flex flex-col justify-between relative z-10 order-2 md:order-1">
            <div className="space-y-6">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="space-y-2"
               >
                 <h2 className="text-5xl md:text-6xl font-bold">+38K</h2>
                 <p className="text-gray-400 text-sm max-w-[150px] leading-relaxed">
                   Enjoy Coffee With Us
                 </p>
               </motion.div>

               <div className="flex -space-x-3">
                 {[1,2,3].map((i) => (
                   <Avatar key={i} className="border-2 border-[#1a1a1a] w-10 h-10">
                     <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                     <AvatarFallback>U{i}</AvatarFallback>
                   </Avatar>
                 ))}
                 <div className="w-10 h-10 rounded-full bg-[#D22B2B] border-2 border-[#1a1a1a] flex items-center justify-center text-xs font-bold">
                   +
                 </div>
               </div>

               <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group">
                 More
                 <div className="bg-white/10 p-1 rounded-full group-hover:bg-white/20 transition-colors">
                   <ArrowRight className="w-3 h-3" />
                 </div>
               </button>
            </div>

            <div className="hidden md:block">
               {/* Spacer for bottom alignment if needed */}
            </div>
          </div>

          {/* CENTER COLUMN (Hero Image & Title) - REPLACED CONTENT */}
          <div className="w-full md:w-2/4 relative flex items-center justify-center order-1 md:order-2 p-4 md:p-8">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-full rounded-[2rem] overflow-hidden group"
            >
                <img
                    src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=2574&auto=format&fit=crop"
                    alt="Coffee Hero"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

                {/* Round Badge */}
                <div className="absolute top-6 right-6 w-28 h-28 bg-[#D22B2B] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer z-20">
                    <div className="relative w-full h-full animate-[spin_10s_linear_infinite]">
                         <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                            <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
                            <text>
                                <textPath href="#curve" className="text-[12px] font-bold fill-white tracking-[0.2em] uppercase" startOffset="0%">
                                    Premium • Quality • Coffee •
                                </textPath>
                            </text>
                        </svg>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-white font-bold text-2xl leading-none">100%</span>
                        <span className="text-white/80 text-[10px] uppercase tracking-wide">Organic</span>
                    </div>
                </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN (Slider/Card) */}
          <div className="w-full md:w-1/4 p-8 md:p-12 flex flex-col justify-center items-end relative z-10 order-3">
             <motion.div
               initial={{ x: 50, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 0.8 }}
               className="w-full max-w-[200px] aspect-[4/5] bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col gap-4 hover:bg-white/15 transition-colors cursor-pointer group"
             >
                <div className="w-full h-3/4 bg-black/40 rounded-xl overflow-hidden relative">
                   <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80" alt="Coffee" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm p-1.5 rounded-full">
                     <Heart className="w-3 h-3 text-white fill-white/50" />
                   </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="text-sm font-medium">Cappuccino</h4>
                    <p className="text-xs text-gray-400">With Oat Milk</p>
                  </div>
                  <div className="bg-[#D22B2B] p-1.5 rounded-full">
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
             </motion.div>

             <div className="mt-8 flex gap-2">
               <div className="w-2 h-2 rounded-full bg-white"></div>
               <div className="w-2 h-2 rounded-full bg-white/30"></div>
               <div className="w-2 h-2 rounded-full bg-white/30"></div>
             </div>
          </div>
        </div>
      </main>

      {/* --- BOTTOM SECTION --- */}
      <section className="px-6 md:px-12 pb-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] max-w-xl">
            COFFEE SO GOOD,<br/>
            EVEN YOUR ALARM<br/>
            CLOCK WILL SMILE.
          </h2>
          <button className="rounded-full border border-[#1a1a1a] px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-[#1a1a1a] hover:text-white transition-colors">
            Explore More
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: "BEAN BLISS: UNVEILING THE SECRETS", img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80" },
            { title: "GLOBAL BEANSCAPE: EXPLORING UNIQUE", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80" }
          ].map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-3">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="font-bold text-sm leading-tight group-hover:text-[#D22B2B] transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 mt-2 text-xs font-medium text-gray-500">
                <span>READ ARTICLE</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CoffeeHero;
