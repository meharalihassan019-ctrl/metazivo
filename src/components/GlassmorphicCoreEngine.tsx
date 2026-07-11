import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Sliders, BatteryCharging, Power } from "lucide-react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export default function GlassmorphicCoreEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [corePower, setCorePower] = useState(85); // 0 to 100 slider
  const [coolantLevel, setCoolantLevel] = useState(94);
  const [isStable, setIsStable] = useState(true);

  // Rotation angles
  const anglesRef = useRef({ pitch: 0.6, yaw: 0.6, roll: 0.3 });

  // 3D vertices of a Double Pyramid (Octahedron)
  const vertices: Point3D[] = [
    { x: 0, y: -100, z: 0 },   // Top apex
    { x: 80, y: 0, z: -80 },  // Base point 1
    { x: 80, y: 0, z: 80 },   // Base point 2
    { x: -80, y: 0, z: 80 },  // Base point 3
    { x: -80, y: 0, z: -80 }, // Base point 4
    { x: 0, y: 100, z: 0 },    // Bottom apex
  ];

  // Faces representing standard indices of vertices
  const faces = [
    [0, 1, 2], // Top faces
    [0, 2, 3],
    [0, 3, 4],
    [0, 4, 1],
    [5, 2, 1], // Bottom faces
    [5, 3, 2],
    [5, 4, 3],
    [5, 1, 4]
  ];

  // Flowing neon particles along crystal edges
  const particles = useRef<Array<{ edgeIndex: number; progress: number; speed: number; size: number }>>([]);
  if (particles.current.length === 0) {
    const list = [];
    for (let i = 0; i < 24; i++) {
      list.push({
        edgeIndex: Math.floor(Math.random() * 12),
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.012,
        size: 1.5 + Math.random() * 2,
      });
    }
    particles.current = list;
  }

  // Handle Resize
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

  // Frame rendering cycle
  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const cx = width / 2;
      const cy = height / 2;
      const focalLength = 300;

      // Slowly increment angles based on core power level
      const rotationMultiplier = 0.005 + (corePower / 100) * 0.015;
      anglesRef.current.yaw += rotationMultiplier;
      anglesRef.current.pitch += rotationMultiplier * 0.4;
      anglesRef.current.roll += rotationMultiplier * 0.25;

      const { pitch, yaw, roll } = anglesRef.current;

      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosR = Math.cos(roll);
      const sinR = Math.sin(roll);

      // Rotate and Project Vertices
      const projected: Point3D[] = vertices.map((v) => {
        // Roll rotation (Z-axis)
        let x1 = v.x * cosR - v.y * sinR;
        let y1 = v.x * sinR + v.y * cosR;
        let z1 = v.z;

        // Yaw rotation (Y-axis)
        let x2 = x1 * cosY - z1 * sinY;
        let y2 = y1;
        let z2 = x1 * sinY + z1 * cosY;

        // Pitch rotation (X-axis)
        let x3 = x2;
        let y3 = y2 * cosP - z2 * sinP;
        let z3 = y2 * sinP + z2 * cosP;

        // Projection
        const scale = focalLength / (focalLength + z3);
        return {
          x: cx + x3 * scale,
          y: cy + y3 * scale,
          z: z3, // store depth for painters sorting
        };
      });

      // Render outer bounding energy spheres
      ctx.globalAlpha = 0.04;
      ctx.fillStyle = "rgba(99, 102, 241, 0.2)";
      ctx.beginPath();
      ctx.arc(cx, cy, 110 + Math.sin(Date.now() * 0.004) * 5, 0, Math.PI * 2);
      ctx.fill();

      // Collect all unique edges for rendering particle flows
      // Index combinations of vertices that form edges
      const edges = [
        [0, 1], [0, 2], [0, 3], [0, 4], // upper edges
        [1, 2], [2, 3], [3, 4], [4, 1], // middle base edges
        [5, 1], [5, 2], [5, 3], [5, 4]  // lower edges
      ];

      // Sort faces by depth (painters algorithm) to render translucent glassy facets with authentic shading
      const faceDepth = faces.map((faceIndices, idx) => {
        const sumZ = faceIndices.reduce((acc, vIdx) => acc + projected[vIdx].z, 0);
        return { index: idx, depth: sumZ / 3 };
      });
      faceDepth.sort((a, b) => b.depth - a.depth);

      // Draw Glass Facets (back to front)
      faceDepth.forEach((fd) => {
        const faceIndices = faces[fd.index];
        const p1 = projected[faceIndices[0]];
        const p2 = projected[faceIndices[1]];
        const p3 = projected[faceIndices[2]];

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();

        // Shading depending on face depth
        // Dimmer facets on the backside, glowing neon cyan/indigo facets on frontside
        const shade = Math.max(0.08, 0.35 - (fd.depth + 100) / 400);
        const redFactor = Math.floor(corePower * 1.5);
        ctx.fillStyle = `rgba(${50 + redFactor}, 130, 246, ${shade})`;
        ctx.globalAlpha = 1.0;
        ctx.fill();

        // Facet stroke (creates glassy crystal borders)
        ctx.strokeStyle = `rgba(147, 197, 253, ${0.15 + shade * 0.4})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Update and draw flowing neon particles along edges
      ctx.globalAlpha = 1.0;
      particles.current.forEach((part) => {
        // Core power accelerates speed
        part.progress += part.speed * (0.4 + corePower / 100);
        if (part.progress > 1) {
          part.progress = 0;
          part.edgeIndex = Math.floor(Math.random() * edges.length);
        }

        const edge = edges[part.edgeIndex];
        const p1 = projected[edge[0]];
        const p2 = projected[edge[1]];

        // Linear interpolation to find current 2D particle position
        const px = p1.x + (p2.x - p1.x) * part.progress;
        const py = p1.y + (p2.y - p1.y) * part.progress;

        // Particle Glow
        const powerColor = corePower > 90 ? "#f43f5e" : corePower > 65 ? "#6366f1" : "#06b6d4";
        ctx.shadowColor = powerColor;
        ctx.shadowBlur = 6;
        ctx.fillStyle = powerColor;
        ctx.beginPath();
        ctx.arc(px, py, part.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Render glowing energy core at the exact dead center (0,0,0)
      const coreSize = 18 + Math.sin(Date.now() * 0.01) * 4 * (0.8 + corePower / 100);
      const coreGradient = ctx.createRadialGradient(cx, cy, 2, cx, cy, coreSize);
      
      const pColor1 = corePower > 90 ? "rgba(244, 63, 94, 0.9)" : "rgba(99, 102, 241, 0.9)";
      const pColor2 = corePower > 90 ? "rgba(244, 63, 94, 0)" : "rgba(6, 182, 212, 0)";
      
      coreGradient.addColorStop(0, pColor1);
      coreGradient.addColorStop(1, pColor2);

      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, coreSize, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [corePower]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full min-h-[300px] relative rounded-[32px] overflow-hidden bg-[#0a0f24]/30 border border-white/10 flex flex-col p-5 group select-none shadow-2xl"
    >
      {/* Dashboard Top Indicators */}
      <div className="flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest font-mono">Core Hydration Matrix</span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#030712]/70 border border-white/5 px-2 py-0.5 rounded-full">
          <span className={`w-1.5 h-1.5 rounded-full ${corePower > 90 ? "bg-rose-500 animate-ping" : "bg-cyan-400"}`} />
          <span className="text-[8px] font-mono font-bold text-slate-300">
            {corePower > 90 ? "BURST NODE ENGINE" : "STABLE COMPILER"}
          </span>
        </div>
      </div>

      {/* Render Canvas in Center */}
      <div className="flex-1 w-full relative flex items-center justify-center">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>

      {/* Control panel sliders (custom user interactivity) */}
      <div className="z-10 bg-[#030712]/90 border border-white/5 p-3.5 rounded-2xl space-y-3.5 shadow-xl font-mono">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-[9px] text-slate-400 uppercase font-bold">
            <Sliders className="w-3 h-3 text-cyan-400" />
            <span>Friction Adjusters</span>
          </div>
          <span className="text-[9px] text-slate-500">React Core Speed API</span>
        </div>

        {/* core power slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-[9px]">
            <span className="text-slate-400">CRYSTAL FREQUENCY:</span>
            <span className={`font-bold ${corePower > 90 ? "text-rose-400" : "text-cyan-400"}`}>{corePower}% MHz</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={corePower}
            onChange={(e) => {
              const val = Number(e.target.value);
              setCorePower(val);
              // Simple correlation
              setCoolantLevel(Math.max(40, 100 - Math.floor((val - 10) * 0.5)));
            }}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>

        {/* core performance summary log */}
        <div className="grid grid-cols-2 gap-2 text-[9px] border-t border-white/5 pt-2.5">
          <div className="flex items-center gap-1 text-slate-400">
            <BatteryCharging className="w-3 h-3 text-purple-400" />
            <span>SPEED SCORE:</span>
            <span className="text-white font-bold font-mono">{(corePower * 0.99).toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1 justify-end text-slate-400">
            <Power className="w-3 h-3 text-indigo-400" />
            <span>BUNDLE SIZE:</span>
            <span className="text-emerald-400 font-bold font-mono">0.0 kb</span>
          </div>
        </div>
      </div>
    </div>
  );
}
