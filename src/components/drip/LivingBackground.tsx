import { useEffect, useRef, useCallback } from "react";

const LEAF_COUNT_DESKTOP = 20;
const LEAF_COUNT_MOBILE = 10;

interface Leaf {
  el: HTMLDivElement;
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  driftSpeed: number;
  driftOffset: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: number; // 0=leaf, 1=bean, 2=dot
}

const LivingBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leavesRef = useRef<Leaf[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  const createLeafElement = useCallback((type: number, size: number) => {
    const el = document.createElement("div");
    el.style.position = "absolute";
    el.style.pointerEvents = "none";
    el.style.willChange = "transform, opacity";

    if (type === 0) {
      // Leaf shape
      el.style.width = `${size}px`;
      el.style.height = `${size * 1.4}px`;
      el.style.borderRadius = "50% 0 50% 0";
      const colors = [
        "rgba(232, 213, 183, 0.08)",
        "rgba(255, 107, 53, 0.06)",
        "rgba(78, 205, 196, 0.05)",
      ];
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
    } else if (type === 1) {
      // Bean shape
      el.style.width = `${size * 0.6}px`;
      el.style.height = `${size}px`;
      el.style.borderRadius = "50%";
      el.style.background = "rgba(232, 213, 183, 0.06)";
    } else {
      // Dot
      el.style.width = `${size * 0.4}px`;
      el.style.height = `${size * 0.4}px`;
      el.style.borderRadius = "50%";
      el.style.background = "rgba(232, 213, 183, 0.1)";
    }

    return el;
  }, []);

  const initLeaf = useCallback((leaf?: Partial<Leaf>, startTop?: boolean): Leaf => {
    const isMobile = window.innerWidth < 768;
    const size = 10 + Math.random() * 20;
    const type = Math.random() < 0.5 ? 0 : Math.random() < 0.7 ? 1 : 2;
    const el = leaf?.el ?? createLeafElement(type, size);

    return {
      el,
      x: Math.random() * window.innerWidth,
      y: startTop ? -(Math.random() * 100) : Math.random() * window.innerHeight,
      size,
      speed: 0.3 + Math.random() * 0.7,
      drift: 30 + Math.random() * 50,
      driftSpeed: 0.0003 + Math.random() * 0.0005,
      driftOffset: Math.random() * Math.PI * 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.5,
      opacity: 0.04 + Math.random() * 0.11,
      type,
    };
  }, [createLeafElement]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const container = containerRef.current;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? LEAF_COUNT_MOBILE : LEAF_COUNT_DESKTOP;

    // Create leaves
    for (let i = 0; i < count; i++) {
      const leaf = initLeaf(undefined, false);
      container.appendChild(leaf.el);
      leavesRef.current.push(leaf);
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const animate = (timestamp: number) => {
      const dt = Math.min(timestamp - timeRef.current, 32);
      timeRef.current = timestamp;

      leavesRef.current.forEach((leaf) => {
        leaf.y += leaf.speed * (dt * 0.06);
        leaf.x += Math.sin(timestamp * leaf.driftSpeed + leaf.driftOffset) * leaf.drift * 0.01;
        leaf.rotation += leaf.rotationSpeed * (dt * 0.06);

        // Wind effect from mouse
        const dx = leaf.x - mouseRef.current.x;
        const dy = leaf.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (200 - dist) / 200;
          leaf.x += (dx / dist) * force * 0.5;
        }

        // Recycle
        if (leaf.y > window.innerHeight + 50) {
          leaf.y = -30;
          leaf.x = Math.random() * window.innerWidth;
        }

        leaf.el.style.transform = `translate3d(${leaf.x}px, ${leaf.y}px, 0) rotate(${leaf.rotation}deg)`;
        leaf.el.style.opacity = `${leaf.opacity}`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      leavesRef.current.forEach((l) => l.el.remove());
      leavesRef.current = [];
    };
  }, [initLeaf]);

  return (
    <>
      {/* Layer 0: Dot grid */}
      <div className="fixed inset-0 dot-grid z-0 pointer-events-none" />

      {/* Layer 1: Animated mesh gradient blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-100"
          style={{
            background: "radial-gradient(circle, rgba(255,107,53,0.06) 0%, transparent 70%)",
            filter: "blur(100px)",
            animation: "float 30s ease-in-out infinite",
            left: "10%",
            top: "20%",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(78,205,196,0.04) 0%, transparent 70%)",
            filter: "blur(100px)",
            animation: "float-alt 40s ease-in-out infinite",
            right: "10%",
            top: "50%",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(232,213,183,0.05) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "float 50s ease-in-out infinite reverse",
            left: "50%",
            bottom: "10%",
          }}
        />
      </div>

      {/* Layer 2: Film grain */}
      <div className="film-grain" />

      {/* Layer 3: Falling leaves container */}
      <div ref={containerRef} className="fixed inset-0 z-[2] pointer-events-none overflow-hidden" />
    </>
  );
};

export default LivingBackground;
