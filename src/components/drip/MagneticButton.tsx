import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const MagneticButton = ({ children, className = "", onClick }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [fillPosition, setFillPosition] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Magnetic pull strength
    const strength = 0.5;
    const x = (e.clientX - centerX) * strength;
    const y = (e.clientY - centerY) * strength;
    setPosition({ x, y });
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top } = ref.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setFillPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setFillPosition(null);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative overflow-hidden group rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-colors duration-500 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] ${className}`}
    >
      {/* Liquid Fill Effect */}
      <AnimatePresence>
        {fillPosition && (
          <motion.div
            initial={{ scale: 0, x: fillPosition.x, y: fillPosition.y, opacity: 0.5 }}
            animate={{ scale: 20, opacity: 1 }} // Scale huge to cover button
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="absolute top-0 left-0 w-4 h-4 rounded-full bg-white -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 mix-blend-overlay"
          />
        )}
      </AnimatePresence>

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-black transition-colors duration-300 mix-blend-difference">
        {children}
      </span>

      {/* Subtle Glow Border Animation */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_10px_rgba(255,255,255,0.2)]" />
    </motion.button>
  );
};

export default MagneticButton;
