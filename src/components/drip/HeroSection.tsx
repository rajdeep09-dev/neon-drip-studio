import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#e0e0e0]">
      {/* Background Image Layer - Vintage Landscape Painting Style */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1685648043756-124a4adad0ec?q=80&w=2835&auto=format&fit=crop')", // Lighter, painting style
          filter: "brightness(0.9) contrast(1.1) saturate(0.8) blur(2px)"
        }}
      />

      {/* Overlay for tinting the background if needed */}
      <div className="absolute inset-0 z-0 bg-amber-50/20 mix-blend-overlay pointer-events-none" />

      {/* Main Card Container */}
      <div className="relative z-10 w-[95%] max-w-[1400px] bg-artemis-bg rounded-[50px] border-[1px] border-[#7CA5B8]/30 shadow-2xl overflow-hidden min-h-[90vh] flex flex-col justify-between p-8 md:p-12">

        {/* Branding (Centered) */}
        <div className="w-full flex justify-center pt-4 z-20 relative">
          <Link to="/" className="flex flex-col items-center leading-none hover:opacity-80 transition-opacity">
            <h2 className="font-serif text-artemis-orange text-2xl md:text-3xl italic font-bold">Artemis &</h2>
            <h2 className="font-serif text-artemis-orange text-2xl md:text-3xl italic font-bold ml-8">Artemis</h2>
          </Link>
        </div>

        {/* Main Hero Content */}
        <div className="relative flex flex-col items-center text-center max-w-5xl mx-auto mt-8 md:mt-0 z-20">
          <span className="text-gray-600 font-heading text-lg mb-4 tracking-wide">This is Artemis</span>

          <h1 className="font-serif text-artemis-blue text-5xl md:text-7xl lg:text-9xl italic leading-[1.1] mb-6 drop-shadow-sm">
            Visual and <br/>
            <span className="relative inline-block ml-4 md:ml-12">
              Product designer
            </span>
          </h1>

          <span className="text-gray-600 font-heading text-lg mb-12 tracking-wide">startups can count on</span>

          <button className="bg-artemis-orange text-white px-10 py-4 rounded-full font-heading font-medium text-lg hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300">
            Check out my works
          </button>
        </div>

        {/* Scattered Images (Absolute Positioned relative to the card content area) */}
        {/* Top Left - Woman and Dog (Painting) - Tilted Left - Moved further left and smaller */}
        <motion.div
          initial={{ opacity: 0, x: -50, rotate: -15 }}
          animate={{ opacity: 1, x: 0, rotate: -12 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-[18%] left-[2%] md:left-[3%] w-28 md:w-40 aspect-[3/4] shadow-xl rounded-sm overflow-hidden hidden lg:block z-10 origin-center"
        >
          <img src="https://images.unsplash.com/photo-1571159346336-a29a1b400029?q=80&w=2787&auto=format&fit=crop" alt="Painting" className="w-full h-full object-cover grayscale-[20%] sepia-[10%]" />
        </motion.div>

        {/* Top Right - Cassie & Henry (Abstract Green/Black) - Tilted Right - Moved further right and smaller */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 15 }}
          animate={{ opacity: 1, x: 0, rotate: 12 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute top-[20%] right-[2%] md:right-[3%] w-28 md:w-40 aspect-[3/4] shadow-xl rounded-sm overflow-hidden hidden lg:block z-10 origin-center bg-black"
        >
           <div className="relative w-full h-full bg-gradient-to-br from-green-900 to-black p-4 flex flex-col items-center justify-center text-white">
              <span className="font-serif italic text-center text-sm absolute top-4">Cassie & Henry</span>
              <div className="border border-white/50 rounded-full w-16 h-16 flex items-center justify-center font-serif text-2xl italic">&</div>
           </div>
        </motion.div>

        {/* Bottom Left - Colorful Illustration (Red/White/Blue) - Tilted Left */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: -8 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-[20%] left-[8%] md:left-[12%] w-40 md:w-60 aspect-[4/3] shadow-xl rounded-sm p-3 bg-[#f8f5f2] border border-gray-100 hidden lg:block z-10 origin-center rotate-[-8deg]"
        >
          <div className="w-full h-full bg-red-500 relative overflow-hidden flex items-center justify-center">
             <img src="https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?q=80&w=2865&auto=format&fit=crop" alt="Art" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
             <div className="absolute inset-0 border-4 border-white m-2"></div>
          </div>
        </motion.div>

        {/* Bottom Right - Gradient Card (Blue/Yellow) - Tilted Right */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: 5 }}
          animate={{ opacity: 1, y: 0, rotate: 6 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-[18%] right-[8%] md:right-[12%] w-40 md:w-64 aspect-[16/10] shadow-xl rounded-xl overflow-hidden hidden lg:block z-10 origin-center rotate-[6deg]"
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-100 via-white to-yellow-100 p-6 flex flex-col justify-end">
            <span className="font-serif text-artemis-blue text-xl leading-tight">Ableton<br/>Springs &<br/>Summer</span>
          </div>
        </motion.div>

        {/* Footer / Bottom Elements */}
        <div className="flex flex-col items-center mt-12 md:mt-0 mb-8 z-20 relative">
          {/* Telescope Icon */}
          <div className="mb-6 transform scale-110">
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Telescope Body */}
              <path d="M25 75 L55 65 L85 45" stroke="#0A1A44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="78" y="40" width="18" height="12" transform="rotate(-35 87 46)" fill="#F05A28" stroke="#0A1A44" strokeWidth="2"/>
              <rect x="25" y="70" width="30" height="12" transform="rotate(-18 40 76)" fill="white" stroke="#0A1A44" strokeWidth="2"/>
              <path d="M50 70 L50 90 M60 67 L60 90" stroke="#0A1A44" strokeWidth="2" strokeLinecap="round"/>
              <path d="M45 90 L65 90" stroke="#0A1A44" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="55" cy="90" r="2.5" fill="#0A1A44"/>
            </svg>
          </div>

          <p className="font-serif italic text-2xl md:text-3xl text-gray-700 font-light">Sneak peek of my works</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
