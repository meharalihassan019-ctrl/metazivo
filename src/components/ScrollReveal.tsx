import React, { useEffect, useState } from "react";
import { motion, Variants } from "motion/react";

// Premium cubic-bezier transition as requested
export const premiumEase = [0.16, 1, 0.3, 1] as [number, number, number, number]; // cubic-bezier(0.16, 1, 0.3, 1)

interface BaseProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

/**
 * 1. Standard ScrollReveal component
 * Slides elements upwards (25px offset) with premium cubic-bezier deceleration
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.85
}: BaseProps) {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);
  }, []);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: premiumEase
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerRevealProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
  baseDelay?: number;
}

/**
 * 2. StaggerReveal container
 * Automatically coordinates child items with an elegant chronological reveal
 */
export function StaggerReveal({
  children,
  className = "",
  staggerDelay = 0.12,
  baseDelay = 0
}: StaggerRevealProps) {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);
  }, []);

  if (prefersReduced) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: baseDelay
      }
    }
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: premiumEase
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {React.Children.map(children, (child) => {
        if (!child) return null;
        return (
          <motion.div variants={childVariants}>
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

/**
 * 3. TextReveal Component (Masked Slide-In / Clip-Path reveal)
 * Clips text at bounding box and slides up organically for the elite custom developer feel
 */
export function TextReveal({
  text,
  className = "",
  delay = 0,
  as: Component = "h2"
}: TextRevealProps) {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);
  }, []);

  if (prefersReduced) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <div className="overflow-hidden inline-block py-1">
      <motion.div
        initial={{ y: "115%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.9,
          delay,
          ease: premiumEase
        }}
        className={className}
        style={{ display: "inline-block" }}
      >
        {text}
      </motion.div>
    </div>
  );
}
