import { useEffect, useRef, useCallback, useState } from "react";

const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type CursorState = "default" | "link" | "image" | "gallery" | "text" | "clicking";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringTextRef = useRef<HTMLSpanElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const trailPositions = useRef<{ x: number; y: number; opacity: number }[]>(
    Array.from({ length: 6 }, () => ({ x: -100, y: -100, opacity: 0 }))
  );
  const velocity = useRef({ x: 0, y: 0 });
  const prevMouse = useRef({ x: -100, y: -100 });
  const stateRef = useRef<CursorState>("default");
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const magnetTarget = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const clickTimeout = useRef<number>(0);
  const isHidden = useRef(false);

  const updateCursorState = useCallback((el: HTMLElement | null) => {
    if (!el) { stateRef.current = "default"; setCursorState("default"); return; }

    const tag = el.tagName.toLowerCase();
    const closest = el.closest("a, button, [role='button'], [data-cursor]");

    if (tag === "input" || tag === "textarea" || el.contentEditable === "true") {
      stateRef.current = "text";
      setCursorState("text");
      magnetTarget.current = null;
      return;
    }

    const dataCursor = el.getAttribute("data-cursor") || closest?.getAttribute("data-cursor");
    if (dataCursor === "gallery") {
      stateRef.current = "gallery";
      setCursorState("gallery");
      magnetTarget.current = null;
      return;
    }
    if (dataCursor === "image") {
      stateRef.current = "image";
      setCursorState("image");
      magnetTarget.current = null;
      return;
    }

    if (closest) {
      stateRef.current = "link";
      setCursorState("link");
      const rect = closest.getBoundingClientRect();
      magnetTarget.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      return;
    }

    stateRef.current = "default";
    setCursorState("default");
    magnetTarget.current = null;
  }, []);

  useEffect(() => {
    if (isTouchDevice()) {
      isHidden.current = true;
      return;
    }

    // Hide default cursor
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    const styleEl = document.createElement("style");
    styleEl.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(styleEl);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      updateCursorState(e.target as HTMLElement);
    };

    const onMouseDown = () => {
      stateRef.current = "clicking";
      setCursorState("clicking");
      clearTimeout(clickTimeout.current);
      clickTimeout.current = window.setTimeout(() => {
        // Restore to whatever it should be
        updateCursorState(document.elementFromPoint(mouse.current.x, mouse.current.y) as HTMLElement);
      }, 150);
    };

    const onMouseLeave = () => {
      mouse.current = { x: -100, y: -100 };
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    // Animation loop
    const animate = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) { rafRef.current = requestAnimationFrame(animate); return; }

      // Dot follows exactly
      dotPos.current.x = mouse.current.x;
      dotPos.current.y = mouse.current.y;

      // Ring follows with lerp
      let targetX = mouse.current.x;
      let targetY = mouse.current.y;

      // Magnetic pull for links/buttons
      if (magnetTarget.current && stateRef.current === "link") {
        const dist = Math.hypot(
          mouse.current.x - magnetTarget.current.x,
          mouse.current.y - magnetTarget.current.y
        );
        if (dist < 60) {
          const pull = 0.3;
          targetX = lerp(mouse.current.x, magnetTarget.current.x, pull);
          targetY = lerp(mouse.current.y, magnetTarget.current.y, pull);
        }
      }

      ringPos.current.x = lerp(ringPos.current.x, targetX, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, targetY, 0.12);

      // Velocity for trail
      velocity.current.x = mouse.current.x - prevMouse.current.x;
      velocity.current.y = mouse.current.y - prevMouse.current.y;
      const speed = Math.hypot(velocity.current.x, velocity.current.y);
      prevMouse.current = { ...mouse.current };

      // Dot styles based on state
      let dotScale = 1;
      let ringScale = 1;
      let ringSize = 32;
      let dotSize = 6;

      const state = stateRef.current;

      if (state === "link") {
        dotScale = 0.5;
        ringSize = 56;
        ring.style.background = "rgba(234, 88, 12, 0.08)";
        ring.style.borderColor = "rgba(234, 88, 12, 0.3)";
      } else if (state === "image") {
        dotScale = 0;
        ringSize = 72;
        ring.style.background = "rgba(234, 88, 12, 0.06)";
        ring.style.borderColor = "rgba(234, 234, 234, 0.3)";
      } else if (state === "gallery") {
        dotScale = 0;
        ringSize = 80;
        ring.style.background = "rgba(234, 88, 12, 0.1)";
        ring.style.borderColor = "rgba(234, 88, 12, 0.3)";
      } else if (state === "text") {
        dotScale = 0;
        ringScale = 0;
        // We'll show text cursor via dot morph
      } else if (state === "clicking") {
        dotScale = 1.5;
        ringScale = 0.8;
        ring.style.background = "transparent";
        ring.style.borderColor = "rgba(234, 234, 234, 0.5)";
      } else {
        ring.style.background = "transparent";
        ring.style.borderColor = "rgba(234, 234, 234, 0.5)";
      }

      // Apply dot
      if (state === "text") {
        dot.style.transform = `translate3d(${dotPos.current.x - 1}px, ${dotPos.current.y - 10}px, 0) scaleX(0.3) scaleY(1)`;
        dot.style.width = "2px";
        dot.style.height = "20px";
        dot.style.borderRadius = "1px";
        dot.style.mixBlendMode = "normal";
      } else {
        dot.style.width = `${dotSize}px`;
        dot.style.height = `${dotSize}px`;
        dot.style.borderRadius = "50%";
        dot.style.mixBlendMode = "difference";
        dot.style.transform = `translate3d(${dotPos.current.x - dotSize / 2}px, ${dotPos.current.y - dotSize / 2}px, 0) scale(${dotScale})`;
      }

      // Apply ring
      ring.style.width = `${ringSize}px`;
      ring.style.height = `${ringSize}px`;
      ring.style.transform = `translate3d(${ringPos.current.x - ringSize / 2}px, ${ringPos.current.y - ringSize / 2}px, 0) scale(${ringScale})`;

      // Ring text
      const ringText = ringTextRef.current;
      if (ringText) {
        if (state === "image") {
          ringText.textContent = "view";
          ringText.style.opacity = "1";
        } else if (state === "gallery") {
          ringText.textContent = "expand";
          ringText.style.opacity = "1";
        } else {
          ringText.style.opacity = "0";
        }
      }

      // Trail (only when moving fast)
      trailPositions.current.forEach((tp, i) => {
        const trail = trailRefs.current[i];
        if (!trail) return;

        const delay = (i + 1) * 3;
        if (speed > 8) {
          tp.x = lerp(tp.x, mouse.current.x - velocity.current.x * delay * 0.15, 0.3);
          tp.y = lerp(tp.y, mouse.current.y - velocity.current.y * delay * 0.15, 0.3);
          tp.opacity = Math.min(0.4 - i * 0.06, speed * 0.01);
        } else {
          tp.opacity = lerp(tp.opacity, 0, 0.1);
        }

        const s = Math.max(1, 4 - i * 0.5);
        trail.style.transform = `translate3d(${tp.x - s / 2}px, ${tp.y - s / 2}px, 0)`;
        trail.style.opacity = `${Math.max(0, tp.opacity)}`;
        trail.style.width = `${s}px`;
        trail.style.height = `${s}px`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(clickTimeout.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
      styleEl.remove();
    };
  }, [updateCursorState]);

  if (isTouchDevice()) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {/* Trail dots */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={`trail-${i}`}
          ref={(el) => { if (el) trailRefs.current[i] = el; }}
          className="fixed top-0 left-0 rounded-full"
          style={{
            background: "#EA580C",
            willChange: "transform, opacity",
            opacity: 0,
            transition: "none",
          }}
        />
      ))}

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0"
        style={{
          width: 6,
          height: 6,
          background: "#EA580C",
          borderRadius: "50%",
          mixBlendMode: "difference",
          willChange: "transform",
          transition: "width 0.3s, height 0.3s, border-radius 0.3s",
          zIndex: 2,
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 flex items-center justify-center"
        style={{
          width: 32,
          height: 32,
          border: "1.5px solid rgba(234, 234, 234, 0.5)",
          borderRadius: "50%",
          willChange: "transform, width, height",
          transition: "width 0.3s cubic-bezier(0.25,0.1,0.25,1), height 0.3s cubic-bezier(0.25,0.1,0.25,1), background 0.3s, border-color 0.3s",
          zIndex: 1,
        }}
      >
        <span
          ref={ringTextRef}
          className="font-handwritten text-xs"
          style={{
            color: "#EAEAEA",
            opacity: 0,
            transition: "opacity 0.2s",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
};

export default CustomCursor;
