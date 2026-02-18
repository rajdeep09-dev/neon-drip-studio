import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative z-10 w-full bg-white text-gray-900 pt-32 pb-20 px-4 md:px-8 overflow-hidden">

      {/* Main Hero Card */}
      <div className="relative w-full max-w-[1400px] mx-auto bg-[#1a1a1a] rounded-[3rem] p-8 md:p-12 lg:p-16 overflow-hidden min-h-[600px] md:min-h-[700px] flex flex-col md:flex-row items-center justify-between text-white shadow-2xl">

        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-600/20 blur-[100px] rounded-full" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-600/10 blur-[100px] rounded-full" />
           {/* Doodle Pattern Overlay (Simulated with CSS radial gradients for now) */}
           <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>

        {/* Left Column: Social Proof & Intro */}
        <div className="relative z-10 flex-1 flex flex-col items-start gap-8 max-w-md">
           {/* Social Proof Pill */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/5"
           >
              <div className="flex -space-x-3">
                 {[1, 2, 3].map((i) => (
                   <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} className="w-8 h-8 rounded-full border-2 border-[#1a1a1a]" alt="User" />
                 ))}
              </div>
              <div className="flex flex-col">
                 <span className="text-sm font-bold font-poppins">+38K</span>
                 <span className="text-[10px] text-gray-400 font-poppins uppercase tracking-wide">Enjoy Coffee With Us</span>
              </div>
           </motion.div>

           <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="text-gray-400 font-poppins text-sm leading-relaxed max-w-xs"
           >
             For those eager to delve into our coffee offerings, we provide a variety of blends to suit every taste.
           </motion.p>

           {/* More Button */}
           <motion.button
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.5 }}
             className="group flex items-center gap-2 bg-white text-black pl-2 pr-6 py-2 rounded-full font-bold font-poppins text-sm hover:bg-gray-200 transition-colors"
           >
             <div className="flex -space-x-2 mr-2">
                 {[4, 5].map((i) => (
                   <img key={i} src={`https://i.pravatar.cc/100?img=${i + 20}`} className="w-8 h-8 rounded-full border-2 border-white" alt="User" />
                 ))}
             </div>
             More
             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </motion.button>

           {/* Floating Bag 1 (Java) */}
           <motion.div
             initial={{ opacity: 0, x: -50, rotate: -15 }}
             animate={{ opacity: 1, x: 0, rotate: -5 }}
             transition={{ delay: 0.6, duration: 1, type: "spring" }}
             className="relative mt-8 md:absolute md:bottom-12 md:left-0 md:mt-0 w-48 hover:scale-105 transition-transform duration-500 z-0"
           >
             <div className="absolute inset-0 bg-orange-500 blur-[60px] opacity-20" />
             <img
               src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=400&auto=format&fit=crop"
               alt="Java Arabica"
               className="relative z-10 rounded-xl shadow-2xl rotate-[-5deg] grayscale-[0.2] contrast-125 hover:grayscale-0 transition-all"
             />
             <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur px-3 py-1 rounded text-xs font-bold font-mono text-white z-20">
               JAVA
             </div>
           </motion.div>
        </div>

        {/* Center Column: Title & Sticker */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center my-12 md:my-0">
           <motion.div
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 0.8, ease: "backOut" }}
             className="relative"
           >
             <h1 className="font-brush text-[6rem] md:text-[9rem] lg:text-[11rem] leading-none text-white drop-shadow-2xl rotate-[-2deg]">
               Coffee <br/>
               <span className="ml-12 md:ml-24">Bean</span>
             </h1>

             {/* Sticker Badge */}
             <motion.div
               animate={{ rotate: [0, 10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-1/2 right-[-20%] md:right-[-10%] -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 bg-yellow-400 rounded-full flex items-center justify-center p-4 shadow-xl border-4 border-dashed border-yellow-600 rotate-[15deg]"
             >
                <div className="text-center">
                   <span className="block text-black font-black text-xs md:text-sm uppercase leading-tight">Buy 1 Get</span>
                   <span className="block text-orange-600 font-brush text-xl md:text-2xl">One Free</span>
                </div>
             </motion.div>
           </motion.div>
        </div>

        {/* Right Column: Main Product */}
        <div className="relative z-10 flex-1 flex flex-col items-end h-full justify-center">
           <motion.div
             initial={{ opacity: 0, x: 50, rotate: 15 }}
             animate={{ opacity: 1, x: 0, rotate: 5 }}
             transition={{ delay: 0.8, duration: 1, type: "spring" }}
             className="relative w-64 md:w-80 hover:scale-105 transition-transform duration-500"
           >
              <div className="absolute inset-0 bg-orange-500 blur-[80px] opacity-20" />
              <img
               src="https://images.unsplash.com/photo-1582169296194-e9d648411dff?q=80&w=500&auto=format&fit=crop"
               alt="Sumatra Arabica"
               className="relative z-10 rounded-xl shadow-2xl rotate-[5deg]"
             />
             <div className="absolute top-4 right-4 bg-white text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg z-20">
               $24.00
             </div>
           </motion.div>

           {/* Inset Slider */}
           <div className="hidden lg:block absolute right-[-40px] top-1/2 -translate-y-1/2 w-24 h-64 bg-white/10 backdrop-blur rounded-2xl border border-white/5 p-2">
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                 <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" />
                 <div className="absolute bottom-0 w-full p-2 text-center text-[10px] font-bold">Shop</div>
              </div>
           </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-[1400px] mx-auto mt-16 md:mt-24 flex flex-col md:flex-row gap-12 items-start justify-between">

         {/* Headline */}
         <div className="flex-1 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black font-heading leading-[0.9] text-gray-900 mb-8 uppercase tracking-tighter">
               Coffee so good, <br/>
               <span className="text-gray-400">even your alarm clock</span> <br/>
               will smile.
            </h2>
            <button className="px-8 py-3 rounded-full border-2 border-black font-bold font-poppins hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-widest text-xs">
               Explore More
            </button>
         </div>

         {/* Cards */}
         <div className="flex gap-6 overflow-x-auto pb-4 md:pb-0 w-full md:w-auto scrollbar-hide">
            {[1, 2].map((i) => (
               <div key={i} className="min-w-[280px] h-[350px] rounded-[2rem] relative overflow-hidden group cursor-pointer">
                  <img
                    src={`https://images.unsplash.com/photo-${i === 1 ? "1497935586351-b67a49e012bf" : "1514432324607-b0905bf561c0"}?q=80&w=400&auto=format&fit=crop`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end text-white">
                     <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded w-fit mb-2">LATEST UPDATE</span>
                     <h3 className="font-serif font-bold text-xl mb-1">Brewing Guide</h3>
                     <p className="text-xs text-gray-300 line-clamp-2">Learn the secrets to the perfect pour over with our master barista.</p>
                  </div>
               </div>
            ))}
         </div>
      </div>

    </section>
  );
};

export default HeroSection;
