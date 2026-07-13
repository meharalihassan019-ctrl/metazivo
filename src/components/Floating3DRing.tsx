import React, { useEffect, useRef, useState } from "react";

interface TorusPoint {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
  pz: number;
  alpha: number;
  color: string;
}

export default function Floating3DRing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const isHovered = useRef(false);

  // Track scroll position for subtle parallax speed changes
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set canvas size
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      canvas.width = container.clientWidth * window.devicePixelRatio;
      canvas.height = container.clientHeight * window.devicePixelRatio;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track mouse position over container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    // Normalize to [-1, 1]
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMouse({ x, y });
    isHovered.current = true;
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
  };

  // Build Torus points
  const torusPoints = useRef<TorusPoint[]>([]);
  if (torusPoints.current.length === 0) {
    const points: TorusPoint[] = [];
    const R = 90; // Major radius
    const r = 30; // Minor radius
    
    // Generate rings
    const segmentsMajor = 36;
    const segmentsMinor = 18;

    for (let i = 0; i < segmentsMajor; i++) {
      const phi = (i * 2 * Math.PI) / segmentsMajor;
      for (let j = 0; j < segmentsMinor; j++) {
        const theta = (j * 2 * Math.PI) / segmentsMinor;

        // Torus parametric formula
        const x = (R + r * Math.cos(theta)) * Math.cos(phi);
        const y = (R + r * Math.cos(theta)) * Math.sin(phi);
        const z = r * Math.sin(theta);

        // Neon orange theme coloring variation
        const alpha = 0.3 + Math.random() * 0.5;
        const orangeShade = Math.random() > 0.4 ? "rgba(255, 87, 34, " : "rgba(255, 138, 101, ";

        points.push({
          x,
          y,
          z,
          px: 0,
          py: 0,
          pz: 0,
          alpha,
          color: orangeShade,
        });
      }
    }
    torusPoints.current = points;
  }

  // Animation cycle
  useEffect(() => {
    let animationId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let angleX = 0.5;
    let angleY = 0.6;
    let angleZ = 0.2;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const cx = width / 2;
      const cy = height / 2;
      const focalLength = 350;

      // Gentle floating sine wave
      const floatOffset = Math.sin(Date.now() * 0.0018) * 14;

      // Mouse tracking inertia
      const targetAngleX = 0.5 + (isHovered.current ? mouse.y * 0.4 : 0);
      const targetAngleY = 0.6 + (isHovered.current ? mouse.x * 0.5 : 0) + (scrollOffset * 0.0005);

      angleX += (targetAngleX - angleX) * 0.08;
      angleY += (targetAngleY - angleY) * 0.08;
      angleZ += 0.006; // continuous spin

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosZ = Math.cos(angleZ);
      const sinZ = Math.sin(angleZ);

      // Rotate and Project points
      const projected = torusPoints.current.map((pt) => {
        // Rotate Z
        let x1 = pt.x * cosZ - pt.y * sinZ;
        let y1 = pt.x * sinZ + pt.y * cosZ;
        let z1 = pt.z;

        // Rotate Y
        let x2 = x1 * cosY - z1 * sinY;
        let y2 = y1;
        let z2 = x1 * sinY + z1 * cosY;

        // Rotate X
        let x3 = x2;
        let y3 = y2 * cosX - z2 * sinX;
        let z3 = y2 * sinX + z2 * cosX;

        // Perspective Projection
        const scale = focalLength / (focalLength + z3);
        const px = cx + x3 * scale;
        const py = cy + y3 * scale + floatOffset;

        return {
          ...pt,
          px,
          py,
          pz: z3,
        };
      });

      // Painter's sorting (back to front render)
      projected.sort((a, b) => b.pz - a.pz);

      // Draw Connection lines for glass skeleton effect
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i += 3) {
        const p1 = projected[i];
        if (p1.pz > 40) continue; // Skip far back points to keep it clean

        // Look for neighbors
        for (let j = i + 1; j < Math.min(i + 5, projected.length); j++) {
          const p2 = projected[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 45) {
            const depthAlpha = Math.max(0.1, 1 - (p1.pz + 50) / 100);
            ctx.strokeStyle = `rgba(255, 87, 34, ${0.12 * depthAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw Particles/Points
      projected.forEach((pt) => {
        // Calculate point visibility based on z depth
        const depthAlpha = Math.max(0.1, 1 - (pt.pz + 40) / 100);
        const ptSize = pt.pz < 0 ? 2.5 : 1.2;

        ctx.fillStyle = `${pt.color}${pt.alpha * depthAlpha})`;
        ctx.beginPath();
        ctx.arc(pt.px, pt.py, ptSize, 0, Math.PI * 2);
        ctx.fill();

        // Glowing core highlights for close points
        if (pt.pz < -60 && Math.random() > 0.98) {
          ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * depthAlpha})`;
          ctx.beginPath();
          ctx.arc(pt.px, pt.py, ptSize * 1.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.shadowColor = "#FF5722";
          ctx.shadowBlur = 8;
          ctx.strokeStyle = "rgba(255, 87, 34, 0.5)";
          ctx.beginPath();
          ctx.arc(pt.px, pt.py, ptSize * 4, 0, Math.PI * 2);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });

      // Subtle center ambient glow orb
      const glowGrad = ctx.createRadialGradient(cx, cy + floatOffset, 10, cx, cy + floatOffset, 110);
      glowGrad.addColorStop(0, "rgba(255, 87, 34, 0.08)");
      glowGrad.addColorStop(1, "rgba(255, 87, 34, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy + floatOffset, 110, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [mouse, scrollOffset]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-[320px] sm:h-[400px] md:h-[450px] relative rounded-3xl overflow-hidden flex items-center justify-center cursor-crosshair"
    >
      {/* Background glassmorphic layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5722]/5 to-transparent rounded-3xl opacity-40 pointer-events-none" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

      {/* Futuristic status coordinate overlay */}
      <div className="absolute bottom-4 left-6 z-20 text-[10px] font-mono text-slate-500 tracking-wider">
        SYS.CORE_DYNAMICS: <span className="text-[#FF5722]">ACTIVE_TORUS_3D</span>
      </div>
      <div className="absolute top-4 right-6 z-20 text-[10px] font-mono text-slate-500 tracking-wider">
        PERSPECTIVE_Z: <span className="text-[#FF5722]">{(mouse.x * 100).toFixed(0)}px</span>
      </div>
    </div>
  );
}
