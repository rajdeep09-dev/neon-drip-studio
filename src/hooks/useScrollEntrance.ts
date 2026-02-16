import { useRef } from "react";
import { useInView } from "framer-motion";
import type { Easing } from "framer-motion";

export type EntranceVariant =
  | "fade-up"
  | "fade-left"
  | "fade-right"
  | "scale-up"
  | "clip-left"
  | "clip-right"
  | "slide-up"
  | "cascade"
  | "flip-in"
  | "scale-fade"
  | "slide-meet";

const ease: Easing = [0.25, 0.1, 0.25, 1];

export const entranceVariants: Record<EntranceVariant, {
  hidden: Record<string, any>;
  visible: Record<string, any>;
}> = {
  "fade-up": {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease } },
  },
  "clip-left": {
    hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    visible: { opacity: 1, clipPath: "inset(0 0% 0 0)", transition: { duration: 0.9, ease } },
  },
  "clip-right": {
    hidden: { opacity: 0, clipPath: "inset(0 0 0 100%)" },
    visible: { opacity: 1, clipPath: "inset(0 0 0 0%)", transition: { duration: 0.9, ease } },
  },
  "slide-up": {
    hidden: { opacity: 0, y: 80, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease } },
  },
  cascade: {
    hidden: { opacity: 0, y: 40, x: -20 },
    visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.6, ease } },
  },
  "flip-in": {
    hidden: { opacity: 0, rotateY: 90 },
    visible: { opacity: 1, rotateY: 0, transition: { duration: 0.7, ease } },
  },
  "scale-fade": {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] } },
  },
  "slide-meet": {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
  },
};

export const useScrollEntrance = (variant: EntranceVariant = "fade-up", margin: string = "-100px") => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: margin as any });
  return { ref, inView, variants: entranceVariants[variant] };
};
