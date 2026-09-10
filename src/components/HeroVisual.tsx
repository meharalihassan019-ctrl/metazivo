import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import ErrorBoundary from "./ErrorBoundary";
import Floating3DRing from "./Floating3DRing";

interface HeroVisualProps {
  prefersReduced: boolean;
  heroImage: string;
}

export default function HeroVisual({ prefersReduced, heroImage }: HeroVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // High-performance MotionValues - 0 React re-renders on mouse movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Rotations for 3D tilt
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [18, -18]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);

  // Badge parallax transforms
  const badge1X = useTransform(smoothX, [-0.5, 0.5], [-35, 35]);
  const badge1Y = useTransform(smoothY, [-0.5, 0.5], [-35, 35]);

  const badge2X = useTransform(smoothX, [-0.5, 0.5], [28, -28]);
  const badge2Y = useTransform(smoothY, [-0.5, 0.5], [28, -28]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={containerRef}
      className="lg:col-span-5 relative flex justify-center items-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute w-[450px] h-[450px] bg-[#FF5722]/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Floating badges with translateZ offsets */}
      <div className="relative w-full flex justify-center items-center">
        {/* Floating3DRing ambient backdrop */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <ErrorBoundary fallbackName="3D Floating Ring">
            <Floating3DRing />
          </ErrorBoundary>
        </div>

        {/* Main Hero 3D Picture with elegant tilt glass frame */}
        <motion.div 
          className="relative z-10 w-4/5 aspect-square rounded-[32px] overflow-hidden border border-slate-200/60 shadow-2xl bg-white group"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={prefersReduced ? {} : {
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            perspective: 1000
          }}
        >
          <img 
            src={heroImage} 
            alt="Metazivo Expert Digital Engineering and SEO Strategy Team" 
            width={800}
            height={800}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent pointer-events-none" />
        </motion.div>
        
        {/* Floating badge 1: SEO score */}
        <motion.div 
          className="absolute -top-6 -right-2 z-20 bg-white/95 backdrop-blur-md border border-orange-100 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-[0_10px_30px_rgba(255,87,34,0.1)]"
          style={prefersReduced ? {} : {
            x: badge1X,
            y: badge1Y
          }}
          animate={prefersReduced ? {} : {
            y: [0, -8, 0]
          }}
          transition={{
            y: {
              duration: 5,
              repeat: Infinity,
              ease: [0.445, 0.05, 0.55, 0.95]
            }
          }}
        >
          <div className="w-8 h-8 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/20 flex items-center justify-center text-[#FF5722] text-xs font-bold font-mono">SEO</div>
          <div>
            <div className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">SEO Optimization</div>
            <div className="text-xs font-bold text-slate-900 font-sans">99.2% Score</div>
          </div>
        </motion.div>

        {/* Floating badge 2: PageSpeed score */}
        <motion.div 
          className="absolute -bottom-4 -left-2 z-20 bg-white/95 backdrop-blur-md border border-slate-150 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
          style={prefersReduced ? {} : {
            x: badge2X,
            y: badge2Y
          }}
          animate={prefersReduced ? {} : {
            y: [0, 8, 0]
          }}
          transition={{
            y: {
              duration: 7,
              repeat: Infinity,
              ease: [0.445, 0.05, 0.55, 0.95]
            }
          }}
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 text-xs font-bold font-mono">100</div>
          <div>
            <div className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">PageSpeed Mobile</div>
            <div className="text-xs font-bold text-slate-900 font-sans">0.8s Load Time</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
