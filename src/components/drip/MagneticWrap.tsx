import { useRef, useState, type ReactNode } from "react";

interface MagneticWrapProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}

const MagneticWrap = ({ children, className = "", strength = 6, radius = 40 }: MagneticWrapProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const maxDist = Math.max(rect.width, rect.height) / 2 + radius;

    if (dist < maxDist) {
      const factor = (1 - dist / maxDist) * strength;
      setOffset({ x: (dx / dist) * factor, y: (dy / dist) * factor });
    }
  };

  const handleLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: offset.x === 0 && offset.y === 0
          ? "transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)"
          : "transform 0.15s ease-out",
      }}
    >
      {children}
    </div>
  );
};

export default MagneticWrap;
