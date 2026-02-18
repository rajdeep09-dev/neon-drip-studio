import { useEffect, useRef } from "react";

const ScrollProgressBar = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (!barRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      barRef.current.style.width = `${progress}%`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9997] h-[2px]" aria-hidden="true">
      <div
        ref={barRef}
        className="h-full"
        style={{
          background: "linear-gradient(90deg, #FF6B35, #E8D5B7)",
          width: "0%",
          willChange: "width",
          transition: "width 0.05s linear",
        }}
      />
    </div>
  );
};

export default ScrollProgressBar;
