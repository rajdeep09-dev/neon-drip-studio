import { motion } from "framer-motion";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative z-10 w-full h-full will-change-[transform,opacity,filter]"
    >
      {/* Wipe/Curtain Effect */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "circInOut" }}
        style={{ originX: 1 }} // Wipe from right
        className="fixed inset-0 z-[9999] bg-[#0A1A44] pointer-events-none"
      />
      {children}
    </motion.div>
  );
};

export default PageTransition;
