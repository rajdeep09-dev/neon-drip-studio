import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const TiltCard = ({ children, className = "", onClick }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const mouseXPos = (e.clientX - left) / width - 0.5;
    const mouseYPos = (e.clientY - top) / height - 0.5;

    x.set(mouseXPos);
    y.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative group cursor-pointer perspective-[1000px] ${className}`}
    >
      <div className="relative z-10 w-full h-full transform transition-all duration-300 group-hover:scale-[1.02]">
        {children}
      </div>

      {/* Glossy Overlay */}
      <motion.div
        style={{
          x: useTransform(mouseX, [-0.5, 0.5], ["-50%", "50%"]),
          y: useTransform(mouseY, [-0.5, 0.5], ["-50%", "50%"]),
        }}
        className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/20 to-transparent rounded-3xl mix-blend-overlay"
      />

      {/* Subtle Drop Shadow */}
      <div className="absolute inset-0 z-0 rounded-3xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-black/20 translate-y-4" />
    </motion.div>
  );
};

export default TiltCard;
