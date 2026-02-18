import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#e0e0e0]">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d')",
          filter: "brightness(0.8) contrast(1.1) saturate(0.8)"
        }}
      />

      {/* Main Card Container */}
      <div className="relative z-10 w-[95%] max-w-[1400px] bg-artemis-bg rounded-[40px] border-[6px] border-[#7CA5B8]/40 shadow-2xl overflow-hidden min-h-[90vh] flex flex-col items-center justify-between p-8 md:p-12">

        {/* Header / Nav inside the card */}
        <header className="w-full flex justify-between items-start text-sm md:text-base font-medium text-gray-500 uppercase tracking-wide">
          <span>Works</span>

          <div className="flex flex-col items-center leading-none">
            <h2 className="font-serif text-artemis-orange text-2xl md:text-3xl italic font-bold">Artemis &</h2>
            <h2 className="font-serif text-artemis-orange text-2xl md:text-3xl italic font-bold ml-6">Artemis</h2>
          </div>

          <span>Playground</span>
        </header>

        {/* Main Hero Content */}
        <div className="relative flex flex-col items-center text-center max-w-4xl mx-auto mt-8 md:mt-0">
          <span className="text-gray-500 font-heading text-lg mb-2">This is Artemis</span>

          <h1 className="font-serif text-artemis-blue text-5xl md:text-7xl lg:text-8xl italic leading-tight mb-4">
            Visual and <br/>
            <span className="relative inline-block">
              Product
              {/* Decorative swash or ligature simulation could go here */}
            </span> designer
          </h1>

          <span className="text-gray-500 font-heading text-lg mb-10">startups can count on</span>

          <button className="bg-artemis-orange text-white px-8 py-4 rounded-full font-heading font-medium text-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
            Check out my works
          </button>
        </div>

        {/* Scattered Images (Absolute Positioned relative to the card content area) */}
        {/* Top Left - Woman and Dog */}
        <motion.div
          initial={{ opacity: 0, x: -50, rotate: -15 }}
          animate={{ opacity: 1, x: 0, rotate: -12 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-[20%] left-[5%] md:left-[10%] w-32 md:w-48 aspect-[3/4] shadow-xl rounded-sm overflow-hidden hidden lg:block"
        >
          <img src="https://placehold.co/300x400/2e4a33/white?text=Painting" alt="Painting" className="w-full h-full object-cover" />
        </motion.div>

        {/* Top Right - Cassie & Henry */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 15 }}
          animate={{ opacity: 1, x: 0, rotate: 12 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute top-[22%] right-[5%] md:right-[10%] w-32 md:w-44 aspect-[3/4] shadow-xl rounded-sm overflow-hidden hidden lg:block"
        >
          <img src="https://placehold.co/300x400/1a1a1a/white?text=Cassie+%26+Henry" alt="Cassie & Henry" className="w-full h-full object-cover" />
        </motion.div>

        {/* Bottom Left - Colorful Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: -8 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-[25%] left-[8%] md:left-[15%] w-40 md:w-56 aspect-[4/3] shadow-xl rounded-sm p-2 bg-[#f8f5f2] border border-gray-100 hidden lg:block"
        >
          <img src="https://placehold.co/400x300/e63946/white?text=Art" alt="Art" className="w-full h-full object-cover" />
        </motion.div>

        {/* Bottom Right - Gradient Card */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: 5 }}
          animate={{ opacity: 1, y: 0, rotate: 6 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-[20%] right-[8%] md:right-[15%] w-40 md:w-64 aspect-[4/3] shadow-xl rounded-xl overflow-hidden hidden lg:block"
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-yellow-100 p-4 flex flex-col justify-end">
            <span className="font-serif text-artemis-blue text-lg leading-tight">Ableton<br/>Springs &<br/>Summer</span>
          </div>
        </motion.div>

        {/* Footer / Bottom Elements */}
        <div className="flex flex-col items-center mt-12 md:mt-0">
          {/* Telescope Icon */}
          <div className="mb-4">
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Telescope Body */}
              <path d="M20 70 L50 60 L80 40" stroke="#0A1A44" strokeWidth="3" strokeLinecap="round"/>
              <rect x="75" y="35" width="15" height="10" transform="rotate(-35 82.5 40)" fill="#F05A28" stroke="#0A1A44" strokeWidth="2"/>
              <rect x="20" y="65" width="30" height="10" transform="rotate(-15 35 70)" fill="white" stroke="#0A1A44" strokeWidth="2"/>
              <path d="M45 65 L45 85 M55 62 L55 85" stroke="#0A1A44" strokeWidth="2"/>
              <path d="M40 85 L60 85" stroke="#0A1A44" strokeWidth="2"/>
              <circle cx="50" cy="85" r="2" fill="#0A1A44"/>
            </svg>
          </div>

          <p className="font-serif italic text-2xl md:text-3xl text-gray-700">Sneak peek of my works</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
