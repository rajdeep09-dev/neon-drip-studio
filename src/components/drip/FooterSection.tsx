import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="relative bg-[#0A1229] text-[#F9F7F5] pt-40 pb-20 overflow-hidden rounded-t-[100px] -mt-[80px] z-50">
      <div className="absolute inset-0 bg-[#F05A28]/5 mix-blend-overlay pointer-events-none" />

      {/* Dynamic Background Noise */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="container px-6 md:px-12 mx-auto relative z-10 max-w-[1600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 items-start mb-32">

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-serif italic text-8xl md:text-[10rem] text-[#F9F7F5] leading-[0.8] mb-8 -ml-4 tracking-tighter mix-blend-difference">
              Artemis <br/> <span className="font-handwritten text-[#F05A28] text-[6rem] -rotate-6 block mt-4">& Artemis</span>
            </h2>
            <p className="font-heading text-xl text-[#F9F7F5]/50 max-w-sm mt-12 leading-relaxed">
              Brewing culture, design, and exceptional coffee in the heart of the city.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12 lg:pl-20"
          >
            <h3 className="font-mono-label text-[10px] uppercase tracking-[0.4em] text-[#F05A28]/80 border-b border-[#F9F7F5]/10 pb-4 w-12">Nav</h3>
            <ul className="space-y-4">
              {["Menu", "About", "Events", "Shop", "Journal"].map((item, i) => (
                <li key={item} className="overflow-hidden">
                  <Link to={`/${item.toLowerCase()}`} className="group relative block text-5xl md:text-6xl font-serif italic text-[#F9F7F5] hover:text-[#F05A28] transition-colors duration-500">
                    <span className="block translate-y-0 group-hover:-translate-y-[120%] transition-transform duration-500 ease-[0.76, 0, 0.24, 1]">{item}</span>
                    <span className="block absolute top-0 left-0 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.76, 0, 0.24, 1] text-[#F05A28]">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 140 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12 lg:pl-20"
          >
            <h3 className="font-mono-label text-[10px] uppercase tracking-[0.4em] text-[#F05A28]/80 border-b border-[#F9F7F5]/10 pb-4 w-12">Visit</h3>
            <address className="not-italic font-heading text-2xl text-[#F9F7F5] leading-relaxed opacity-80">
              420 Brew Street<br/>
              Arts District, CA 90013<br/>
              <a href="mailto:hello@artemis.coffee" className="block mt-8 text-base text-[#F9F7F5]/40 hover:text-[#F05A28] transition-colors font-mono-label uppercase tracking-widest">hello@artemis.coffee</a>
            </address>

            <div className="flex gap-4 pt-8">
              {["IG", "TW", "LI"].map((social) => (
                <a key={social} href="#" className="w-12 h-12 flex items-center justify-center border border-[#F9F7F5]/20 rounded-full font-mono-label text-[10px] hover:bg-[#F9F7F5] hover:text-[#0A1229] hover:border-transparent transition-all duration-300">
                  {social}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-[#F9F7F5]/5 pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono-label uppercase tracking-[0.2em] text-[#F9F7F5]/20 gap-8"
        >
          <span>© 2024 Artemis & Artemis Coffee Studio</span>
          <div className="flex gap-12">
            <a href="#" className="hover:text-[#F9F7F5] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#F9F7F5] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#F9F7F5] transition-colors">Credits</a>
          </div>
        </motion.div>
      </div>

      {/* Infinite Marquee Decoration */}
      <div className="absolute bottom-[-10%] left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] select-none">
        <motion.div
           animate={{ x: ["0%", "-50%"] }}
           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
           className="font-serif italic text-[25vw] whitespace-nowrap text-[#F9F7F5] leading-none flex gap-20"
        >
          <span>Coffee Studio</span><span>Coffee Studio</span><span>Coffee Studio</span>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
