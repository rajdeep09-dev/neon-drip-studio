import { useEffect, useRef, useCallback } from "react";

const ClickRipple = () => {
  const rippleRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((e: MouseEvent) => {
    const ripple = rippleRef.current;
    if (!ripple) return;

    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    ripple.style.transform = "translate(-50%, -50%) scale(0)";
    ripple.style.opacity = "0.15";

    // Force reflow
    ripple.offsetHeight;

    ripple.style.transition = "transform 0.6s ease-out, opacity 0.6s ease-out";
    ripple.style.transform = "translate(-50%, -50%) scale(1)";
    ripple.style.opacity = "0";
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleClick, { passive: true });
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <div
      ref={rippleRef}
      className="fixed pointer-events-none z-[9998]"
      aria-hidden="true"
      style={{
        width: 100,
        height: 100,
        borderRadius: "50%",
        background: "radial-gradient(circle, #EA580C 0%, transparent 70%)",
        opacity: 0,
        willChange: "transform, opacity",
      }}
    />
  );
};

export default ClickRipple;
