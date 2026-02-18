import { motion } from "framer-motion";
import { Coffee, Play, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-coffee-bg pt-32 pb-20 px-6 md:px-12 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div className="flex flex-col items-start gap-6 z-10 order-2 lg:order-1">
           {/* Badge */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex items-center gap-2 text-coffee-red font-sans font-semibold text-sm tracking-wide uppercase"
           >
             <span>Coffee Time....</span>
             <Coffee className="w-4 h-4" />
           </motion.div>

           {/* Heading */}
           <motion.h1
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] text-coffee-brown"
           >
             Enjoy Your <br/>
             Morning <span className="text-coffee-red">Coffee.</span>
           </motion.h1>

           {/* Description */}
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4 }}
             className="text-coffee-taupe font-sans text-lg leading-relaxed max-w-md"
           >
             Boost your productivity and build your mood with a glass of coffee in the morning.
           </motion.p>

           {/* Buttons */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6 }}
             className="flex items-center gap-6 mt-4"
           >
             <button className="px-8 py-4 bg-coffee-red text-white rounded-full font-sans font-semibold shadow-lg hover:bg-red-700 transition-colors transform hover:scale-105 active:scale-95 duration-200">
               Order Now
             </button>
             <button className="flex items-center gap-3 font-sans font-semibold text-coffee-brown group hover:text-coffee-red transition-colors">
               <div className="w-12 h-12 rounded-full border border-coffee-brown flex items-center justify-center group-hover:bg-coffee-brown group-hover:text-white transition-all duration-300">
                 <Play className="w-4 h-4 fill-current ml-0.5" />
               </div>
               Play video
             </button>
           </motion.div>
        </div>

        {/* Right Visual */}
        <div className="relative flex justify-center items-center order-1 lg:order-2 min-h-[500px]">
           {/* Blob Background */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-coffee-cream rounded-full blur-3xl opacity-60 pointer-events-none" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFF2E0] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] scale-100 z-0" />

           {/* Main Image Container */}
           <motion.div
             initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
             animate={{ opacity: 1, scale: 1, rotate: 0 }}
             transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
             className="relative z-10 w-full max-w-[500px]"
           >
              {/* Coffee Cup Image */}
              <img
                src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop"
                alt="Coffee Cup"
                className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 rounded-2xl"
              />
           </motion.div>

           {/* Floating Badge 1: 12 Years Experience */}
           <motion.div
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", opacity: { duration: 0.5, delay: 0.8 } }}
             className="absolute top-[10%] right-0 lg:-right-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl flex flex-col items-center gap-1 z-20 border border-white/50"
           >
              <span className="font-serif font-bold text-3xl text-coffee-brown">12+</span>
              <span className="text-xs text-coffee-taupe text-center font-bold">Years<br/>Experience</span>
              <div className="flex gap-0.5 mt-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-orange-400 fill-orange-400" />)}
              </div>
           </motion.div>

           {/* Floating Badge 2: Happy Customers */}
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", opacity: { duration: 0.5, delay: 1.0 } }}
             className="absolute bottom-[10%] left-0 lg:-left-8 bg-white/80 backdrop-blur-md p-3 pr-6 rounded-full shadow-xl flex items-center gap-3 z-20 border border-white/50"
           >
              <div className="flex -space-x-3">
                 {[1, 2, 3].map((i) => (
                   <img key={i} src={`https://i.pravatar.cc/100?img=${i + 25}`} className="w-10 h-10 rounded-full border-2 border-white" alt="User" />
                 ))}
                 <div className="w-10 h-10 rounded-full border-2 border-white bg-coffee-red flex items-center justify-center text-white text-[10px] font-bold">
                   2M+
                 </div>
              </div>
              <div className="flex flex-col">
                 <span className="text-xs font-bold text-coffee-brown">Happy Customers</span>
                 <div className="flex items-center gap-1">
                   <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                   <span className="text-[10px] text-coffee-taupe font-semibold">4.9 (15k Reviews)</span>
                 </div>
              </div>
           </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
