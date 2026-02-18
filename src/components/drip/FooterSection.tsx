import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="relative bg-[#0A1A44] text-[#F8F5F2] pt-24 pb-8 overflow-hidden rounded-t-[60px] mt-[-60px]">
      <div className="absolute inset-0 bg-[#F05A28]/5 mix-blend-overlay" />

      <div className="container px-4 md:px-8 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:w-1/3"
          >
            <h2 className="font-serif italic text-6xl md:text-8xl text-white mb-6">
              Artemis <br/> & <span className="text-[#F05A28]">Artemis</span>
            </h2>
            <p className="font-heading text-lg text-white/60 max-w-sm">
              Brewing culture, design, and exceptional coffee in the heart of the city.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:w-1/3 space-y-8"
          >
            <h3 className="font-heading text-xs uppercase tracking-[0.3em] text-[#F05A28]">Navigation</h3>
            <ul className="space-y-4 font-serif text-2xl italic">
              {["Menu", "About", "Events", "Shop", "Journal"].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="hover:text-[#F05A28] transition-colors duration-300 flex items-center gap-2 group">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#F05A28] text-sm">→</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:w-1/3 space-y-8"
          >
            <h3 className="font-heading text-xs uppercase tracking-[0.3em] text-[#F05A28]">Visit Us</h3>
            <address className="not-italic font-heading text-lg text-white/80 leading-relaxed">
              420 Brew Street<br/>
              Arts District, CA 90013<br/>
              <a href="mailto:hello@artemis.coffee" className="hover:text-[#F05A28] transition-colors">hello@artemis.coffee</a>
            </address>

            <div className="flex gap-4 pt-4">
              {["Instagram", "Twitter", "LinkedIn"].map((social) => (
                <a key={social} href="#" className="px-4 py-2 border border-white/20 rounded-full font-heading text-xs uppercase tracking-widest hover:bg-white hover:text-[#0A1A44] transition-all duration-300">
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
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono-label text-white/30 uppercase tracking-widest gap-4"
        >
          <span>© 2024 Artemis & Artemis Coffee Studio</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Credits</a>
          </div>
        </motion.div>
      </div>

      {/* Big Typographic Decoration */}
      <div className="absolute bottom-[-5%] left-0 w-full overflow-hidden pointer-events-none opacity-5">
        <span className="font-serif italic text-[20vw] whitespace-nowrap text-white leading-none">
          Coffee Studio Coffee Studio
        </span>
      </div>
    </footer>
  );
};

export default FooterSection;
