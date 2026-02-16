import { useEffect, useRef, useCallback, useState } from "react";
import { toast } from "sonner";

// Konami: Up Up Down Down Left Right Left Right B A
const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

const coffeePuns: Record<string, string> = {
  "not your": "brew can",
  "average": "espresso",
  "cup": "yourself",
  "specialty coffee": "bean juice supreme",
  "see the menu": "sip the goods",
  "find us on the map": "follow the aroma",
  "scroll down": "drip down",
  "the goods": "the brews",
  "the vibes": "the grinds",
  "reserve": "percolate",
};

export const useKonamiCode = () => {
  const [activated, setActivated] = useState(false);
  const buffer = useRef<string[]>([]);
  const timeoutRef = useRef<number>(0);

  const activate = useCallback(() => {
    setActivated(true);

    // Flash orange
    const flash = document.createElement("div");
    flash.style.cssText = "position:fixed;inset:0;z-index:99999;background:#FF6B35;pointer-events:none;opacity:0.6;transition:opacity 0.5s;";
    document.body.appendChild(flash);
    requestAnimationFrame(() => { flash.style.opacity = "0"; });
    setTimeout(() => flash.remove(), 600);

    toast("☕ achievement unlocked: coffee connoisseur", {
      description: "show this to your barista for a free cookie.",
      duration: 5000,
    });

    // Revert after 5 seconds
    timeoutRef.current = window.setTimeout(() => {
      setActivated(false);
    }, 5000);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      buffer.current.push(e.key);
      if (buffer.current.length > KONAMI.length) {
        buffer.current.shift();
      }
      if (buffer.current.length === KONAMI.length && buffer.current.every((k, i) => k === KONAMI[i])) {
        buffer.current = [];
        activate();
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      clearTimeout(timeoutRef.current);
    };
  }, [activate]);

  return activated;
};

export const useLogoClickEasterEgg = () => {
  const clicks = useRef<number[]>([]);
  const [scattering, setScattering] = useState(false);

  const handleClick = useCallback(() => {
    const now = Date.now();
    clicks.current.push(now);
    // Keep only clicks within last 2 seconds
    clicks.current = clicks.current.filter((t) => now - t < 2000);

    if (clicks.current.length >= 5) {
      clicks.current = [];
      setScattering(true);
      setTimeout(() => setScattering(false), 1200);
    }
  }, []);

  return { handleClick, scattering };
};

export const useIdleAnimations = () => {
  const [idle, setIdle] = useState(false);
  const timeoutRef = useRef<number>(0);

  useEffect(() => {
    const reset = () => {
      setIdle(false);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setIdle(true), 5000);
    };

    reset();
    const events = ["mousemove", "scroll", "click", "keypress", "touchstart"];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));

    return () => {
      clearTimeout(timeoutRef.current);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, []);

  return idle;
};

export const useScrollVelocity = () => {
  const [velocity, setVelocity] = useState(0);
  const lastScroll = useRef(0);
  const lastTime = useRef(Date.now());
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        const dy = Math.abs(window.scrollY - lastScroll.current);
        const v = dy / dt * 16; // Normalize to ~per-frame
        setVelocity((prev) => prev * 0.8 + v * 0.2); // Smooth
        lastScroll.current = window.scrollY;
        lastTime.current = now;
      }
      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return velocity;
};
