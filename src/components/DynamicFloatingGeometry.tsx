import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

export default function DynamicFloatingGeometry() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track scroll metrics for realistic 3D scroll depth parallax
  const { scrollY } = useScroll();
  const springScroll = useSpring(scrollY, { stiffness: 40, damping: 15 });

  // Transforms for shapes to create varying depth layers
  const yLayer1 = useTransform(springScroll, (value) => value * -0.15);
  const yLayer2 = useTransform(springScroll, (value) => value * -0.3);
  const yLayer3 = useTransform(springScroll, (value) => value * -0.45);

  const rotateLayer1 = useTransform(springScroll, (value) => value * 0.05);
  const rotateLayer2 = useTransform(springScroll, (value) => value * -0.08);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to range [-0.5, 0.5]
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Compute interactive spring-smoothed values for mouse reaction
  const mouseX1 = mousePosition.x * 35;
  const mouseY1 = mousePosition.y * 35;
  const mouseX2 = mousePosition.x * -20;
  const mouseY2 = mousePosition.y * -20;
  const mouseX3 = mousePosition.x * 50;
  const mouseY3 = mousePosition.y * 50;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* SHAPE 1: Large Iridescent Glass Shard (Top-Left Background, deep depth layer) */}
      <motion.div
        className="absolute top-[15%] left-[5%] w-48 h-48 rounded-[40px] border border-white/10 bg-gradient-to-tr from-white/10 to-blue-500/10 backdrop-blur-[3px]"
        style={{
          y: yLayer1,
          rotate: rotateLayer1,
          transformStyle: "preserve-3d",
          perspective: 800,
        }}
      >
        <motion.div
          className="w-full h-full relative"
          style={{
            x: mouseX1,
            y: mouseY1,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            className="w-full h-full relative"
            animate={{
              y: [0, 15, -15, 0],
              rotate: [15, 20, 10, 15],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/10 via-transparent to-pink-400/5 rounded-[40px]" />
            {/* Subtle glowing reflection line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* SHAPE 2: Floating Chrome Sphere (Middle-Right Background, mid depth layer) */}
      <motion.div
        className="absolute top-[40%] right-[8%] w-24 h-24"
        style={{
          y: yLayer2,
        }}
      >
        <motion.div
          className="w-full h-full"
          style={{
            x: mouseX2,
            y: mouseY2,
          }}
        >
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-br from-slate-200 via-slate-400 to-slate-700 shadow-[inset_0_4px_12px_rgba(255,255,255,0.4),0_15px_30px_rgba(0,0,0,0.4)]"
            animate={{
              y: [0, -20, 20, 0],
              scale: [1, 1.05, 0.95, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>

      {/* SHAPE 3: Holographic Neon Triangle Shard (Lower-Left Background, front depth layer) */}
      <motion.div
        className="absolute bottom-[25%] left-[8%] w-32 h-32"
        style={{
          y: yLayer3,
          rotate: rotateLayer2,
        }}
      >
        <motion.div
          className="w-full h-full"
          style={{
            x: mouseX3,
            y: mouseY3,
          }}
        >
          <motion.div
            className="w-full h-full"
            animate={{
              y: [0, 18, -18, 0],
              rotate: [45, 55, 35, 45],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Custom pure CSS glassmorphic triangle */}
            <div 
              className="w-full h-full border-r border-b border-white/20 bg-gradient-to-tr from-purple-500/10 via-blue-500/10 to-transparent backdrop-blur-sm"
              style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* SHAPE 4: Soft Floating Cyan Light Bubbles */}
      <motion.div
        className="absolute top-[75%] right-[15%] w-36 h-36 rounded-full bg-cyan-500/10 blur-3xl"
        style={{
          y: yLayer1,
          x: mouseX2,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
