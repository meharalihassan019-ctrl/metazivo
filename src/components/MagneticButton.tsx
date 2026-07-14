import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
  type?: "button" | "submit" | "reset";
  range?: number; // Distance threshold to trigger magnetism
  strength?: number; // Strength of pull (0 to 1)
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  id,
  type = "button",
  range = 45,
  strength = 0.38
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [prefersReduced, setPrefersReduced] = useState(false);

  // Position displacement motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // High-end spring configs for organic physics attraction
  const springConfig = { damping: 15, stiffness: 150, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current || prefersReduced) return;

    const rect = btnRef.current.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    // Displacement between mouse coordinates and button center
    const distanceX = e.clientX - btnCenterX;
    const distanceY = e.clientY - btnCenterY;

    // Check if the cursor is within the influence range
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < range) {
      // Pull button towards cursor
      x.set(distanceX * strength);
      y.set(distanceY * strength);
    } else {
      // Release button back to absolute center
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      id={id}
      type={type}
      className={`relative select-none ${className}`}
      style={
        prefersReduced
          ? {}
          : {
              x: springX,
              y: springY,
            }
      }
    >
      {children}
    </motion.button>
  );
}
