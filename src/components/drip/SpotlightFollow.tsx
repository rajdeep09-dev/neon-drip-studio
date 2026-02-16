import { useEffect, useRef } from "react";

const SpotlightFollow = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.setProperty("--spotlight-x", `${e.clientX}px`);
      el.style.setProperty("--spotlight-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(400px circle at var(--spotlight-x, -100px) var(--spotlight-y, -100px), rgba(255, 107, 53, 0.03), transparent 70%)",
        willChange: "background",
      }}
    />
  );
};

export default SpotlightFollow;
