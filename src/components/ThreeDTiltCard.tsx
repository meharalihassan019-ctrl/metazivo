import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "motion/react";

interface ThreeDTiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. "rgba(255, 87, 34, 0.15)"
  tiltMaxAngle?: number; // Maximum tilt angle in degrees
}

export default function ThreeDTiltCard({
  children,
  className = "",
  glowColor = "rgba(255, 87, 34, 0.15)",
  tiltMaxAngle = 10
}: ThreeDTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  // Motion values for tilt angles
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Motion values for hover radial glow positioning
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  // Springs for smooth hardware-accelerated movement
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Detect system prefers-reduced-motion setting
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReduced) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Calculate rotation angles
    // Moving mouse to the right rotates card around Y axis positive, left rotates Y negative
    // Moving mouse down rotates card around X axis negative, up rotates X positive
    const rY = (mouseX / (width / 2)) * tiltMaxAngle;
    const rX = -(mouseY / (height / 2)) * tiltMaxAngle;

    rotateX.set(rX);
    rotateY.set(rY);

    // Update glow coordinate positions relative to card bounding box
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  // Build high-performance style properties
  const cardStyle = prefersReduced
    ? {}
    : {
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d" as const,
        perspective: 1000
      };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl transition-shadow duration-300 ${className}`}
      style={cardStyle}
    >
      {/* 3D Glass overlay glow follow cursor effect */}
      {!prefersReduced && isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl z-10 mix-blend-screen"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, ${glowColor}, transparent 80%)`
            )
          }}
        />
      )}

      {/* Subtle border outline glow */}
      {!prefersReduced && isHovered && (
        <motion.div
          className="absolute -inset-[1px] pointer-events-none rounded-3xl z-0"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(180px circle at ${x}px ${y}px, rgba(255, 87, 34, 0.45), transparent 70%)`
            )
          }}
        />
      )}

      {/* Main card content rendering container */}
      <div className="relative z-1 w-full h-full" style={prefersReduced ? {} : { transform: "translateZ(10px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
