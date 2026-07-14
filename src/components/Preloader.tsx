import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Cpu, Search, Code, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing Core Services...");

  useEffect(() => {
    // Elegant incremental loading simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        // Random elegant increment steps
        const diff = Math.floor(Math.random() * 12) + 5;
        const next = Math.min(prev + diff, 100);
        
        // Dynamic loading messages based on progress percentage
        if (next < 25) {
          setLoadingText("Booting High-Speed WordPress Engines...");
        } else if (next < 50) {
          setLoadingText("Calibrating Advanced SEO Schema Graphs...");
        } else if (next < 70) {
          setLoadingText("Optimizing Meta & Google Ad Retargeting Pixels...");
        } else if (next < 90) {
          setLoadingText("Caching Portfolio Case Studies & Media Assets...");
        } else {
          setLoadingText("Establishing Handshake & Security Layer...");
        }
        
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Small premium delay at 100% before resolving the preloader
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  // Icon mapping corresponding to the loading text
  const getProgressIcon = () => {
    if (progress < 25) return <Code className="w-5 h-5 text-[#FF5722]" />;
    if (progress < 50) return <Search className="w-5 h-5 text-[#FF5722]" />;
    if (progress < 70) return <TrendingUp className="w-5 h-5 text-[#FF5722]" />;
    if (progress < 90) return <Cpu className="w-5 h-5 text-[#FF5722]" />;
    if (progress < 100) return <Sparkles className="w-5 h-5 text-[#FF5722]" />;
    return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: -40,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
      }}
      className="fixed inset-0 bg-slate-950 z-[99999] flex flex-col items-center justify-center font-sans overflow-hidden select-none"
    >
      {/* Absolute Decorative Blurred Background Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-[#FF5722]/10 rounded-full blur-[150px]"
        />
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[150px]"
        />
      </div>

      {/* Main Loader Content Card */}
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-8 text-center space-y-8">
        
        {/* Animated Brand Logo Symbol */}
        <div className="relative flex items-center justify-center w-24 h-24">
          {/* Inner Spinning Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-[#FF5722]/20"
          />
          
          {/* Outer Glowing Pulsing Border */}
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-1.5 rounded-full border-2 border-[#FF5722]/10 blur-sm"
          />
          
          {/* Main Logo Container */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 rounded-2xl bg-[#FF5722]/10 border border-[#FF5722]/30 flex items-center justify-center text-[#FF5722] shadow-[0_0_25px_rgba(255,87,34,0.15)]"
          >
            <Cpu className="w-8 h-8" />
          </motion.div>
        </div>

        {/* Brand Name Typography */}
        <div className="space-y-1">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-2xl font-black text-white tracking-[0.25em] uppercase font-sans"
          >
            METAZIVO
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-[10px] text-slate-400 uppercase tracking-[0.4em] font-mono"
          >
            DIGITAL ENGINE
          </motion.p>
        </div>

        {/* Sleek Progress & Loading Feedback Bar */}
        <div className="w-full space-y-3.5 pt-4">
          <div className="flex items-center justify-between text-[11px] font-mono px-0.5">
            <div className="flex items-center gap-2 text-slate-400 transition-all duration-300">
              <motion.div
                key={loadingText}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 5 }}
                className="flex items-center gap-1.5"
              >
                {getProgressIcon()}
                <span className="font-sans font-medium text-slate-300">{loadingText}</span>
              </motion.div>
            </div>
            <span className="text-[#FF5722] font-semibold">{progress}%</span>
          </div>

          {/* Full Custom Track and Bar with glowing head */}
          <div className="h-[4px] w-full bg-slate-900 rounded-full overflow-hidden border border-white/[0.03] relative">
            <motion.div 
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-orange-600 via-[#FF5722] to-orange-400 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Technical Status Badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-4 text-[9px] font-mono text-slate-500 pt-2"
        >
          <span>ENV: PROD</span>
          <span>•</span>
          <span>LATENCY: 0.03s</span>
          <span>•</span>
          <span>SSL: ENABLED</span>
        </motion.div>

      </div>
    </motion.div>
  );
}
