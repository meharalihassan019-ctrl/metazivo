import React, { useState, useRef } from "react";

interface ParallaxBentoCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  accentColor?: string; // e.g. #FF5722 or rgba(255, 87, 34, 0.4)
}

export default function ParallaxBentoCard({
  children,
  className = "",
  onClick,
  accentColor = "#FF5722"
}: ParallaxBentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Calculate rotation: maximum 10 degrees tilt
    const rotateX = -(mouseY / (height / 2)) * 8;
    const rotateY = (mouseX / (width / 2)) * 8;

    // Shine coordinates in percentage (0% to 100%)
    const shineX = ((e.clientX - rect.left) / width) * 100;
    const shineY = ((e.clientY - rect.top) / height) * 100;

    setTilt({ x: rotateX, y: rotateY });
    setShine({ x: shineX, y: shineY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setShine({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        transformStyle: "preserve-3d"
      }}
      className={`relative cursor-pointer select-none rounded-3xl overflow-hidden border transition-all duration-300 ${
        isHovered
          ? "border-orange-200/60 shadow-[0_20px_50px_rgba(255,87,34,0.12)]"
          : "border-slate-200/70 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
      } bg-white ${className}`}
    >
      {/* Interactive reflective glass highlights */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-60 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255, 87, 34, 0.05) 0%, transparent 50%)`,
        }}
      />

      {/* Energy neon orange glow on bottom-right background */}
      <div
        className="absolute -right-20 -bottom-20 w-44 h-44 rounded-full blur-[80px] pointer-events-none transition-all duration-500"
        style={{
          backgroundColor: isHovered ? "rgba(255, 87, 34, 0.1)" : "rgba(255, 87, 34, 0.02)",
        }}
      />

      {/* Interactive internal lighting grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:16px_16px]"
      />

      {/* Main card contents wrapper to allow 3D depth layering */}
      <div style={{ transform: "translateZ(20px)" }} className="relative z-20 w-full h-full p-6 sm:p-8 flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}
