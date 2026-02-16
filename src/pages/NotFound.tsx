import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LivingBackground from "@/components/drip/LivingBackground";
import Navbar from "@/components/drip/Navbar";
import FooterSection from "@/components/drip/FooterSection";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main id="main-content" className="relative min-h-screen overflow-x-hidden bg-background">
      <LivingBackground />
      <Navbar />
      <section className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="text-center max-w-xl mx-auto space-y-6">
          <motion.h1
            animate={{
              x: [0, -3, 3, -2, 0],
              textShadow: [
                "0 0 0 transparent",
                "-3px 0 #FF6B35, 3px 0 #4ECDC4",
                "3px 0 #FF6B35, -3px 0 #4ECDC4",
                "-2px 0 #FF6B35, 2px 0 #4ECDC4",
                "0 0 0 transparent",
              ],
            }}
            transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 5 }}
            className="text-outline font-heading font-black"
            style={{ fontSize: "clamp(7rem, 25vw, 18rem)", lineHeight: 1 }}
          >
            404
          </motion.h1>

          <h2 className="font-heading font-bold text-xl md:text-2xl lowercase text-foreground/80">
            this page got lost. like your airpods.
          </h2>
          <p className="text-foreground/50 text-base lowercase">
            maybe it's taking a coffee break. can we help you find something else?
          </p>

          <div className="pt-4 space-y-4">
            <Link
              to="/"
              className="inline-block bg-primary text-primary-foreground rounded-full px-8 py-3 font-heading font-semibold lowercase glow-orange hover:scale-105 active:scale-95 transition-transform"
            >
              go home
            </Link>
            <div>
              <input
                type="text"
                placeholder="try searching for something"
                className="glass-input px-5 py-3 text-sm rounded-full w-full max-w-sm"
              />
            </div>
          </div>

          <span className="font-handwritten text-primary/50 text-2xl inline-block rotate-[-5deg] mt-4">
            oops 😅
          </span>
        </div>
      </section>
      <FooterSection />
    </main>
  );
};

export default NotFound;
