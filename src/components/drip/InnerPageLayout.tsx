import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import LivingBackground from "@/components/drip/LivingBackground";
import Navbar from "@/components/drip/Navbar";
import FooterSection from "@/components/drip/FooterSection";
import type { Easing } from "framer-motion";

const ease: Easing = [0.25, 0.1, 0.25, 1];

interface Props {
  preHeading?: string;
  heading: ReactNode;
  sub?: string;
  children?: ReactNode;
}

const InnerPageLayout = ({ preHeading, heading, sub, children }: Props) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <main id="main-content" className="relative min-h-screen overflow-x-hidden bg-background">
      <LivingBackground />
      <Navbar />

      {/* Hero */}
      <section ref={ref} className="relative z-10 pt-32 pb-16 md:pt-44 md:pb-24 px-6 max-w-5xl mx-auto text-center">
        {preHeading && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="glass-pill font-handwritten text-primary text-lg inline-block mb-6"
          >
            {preHeading}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8, ease }}
          className="font-heading font-bold lowercase leading-tight"
          style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
        >
          {heading}
        </motion.h1>
        {sub && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6, ease }}
            className="text-foreground/50 text-lg mt-6 lowercase max-w-xl mx-auto"
          >
            {sub}
          </motion.p>
        )}
      </section>

      {children}
      <FooterSection />
    </main>
  );
};

export default InnerPageLayout;
