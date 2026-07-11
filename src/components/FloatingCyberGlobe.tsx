import React, { useEffect, useRef, useState } from "react";
import { Globe, Shield, Zap, RefreshCw } from "lucide-react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  px: number; // 2D projected x
  py: number; // 2D projected y
  pz: number; // 2D projected z (depth for layering)
  color: string;
  size: number;
  label?: string;
  pulse: number;
}

export default function FloatingCyberGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [rotation, setRotation] = useState({ x: 0.5, y: 0.8 }); // Pitch, Yaw
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeMetrics, setActiveMetrics] = useState({
    pings: 14,
    nodeSpeed: "0.2s",
    activePackets: 1240,
    integrity: 100,
  });

  // Track rotational state inside refs for high performance rendering without React state latency
  const anglesRef = useRef({ pitch: 0.5, yaw: 0.8 });
  const isDraggingRef = useRef(false);

  // Generate 3D grid points on a sphere (latitude & longitude)
  const sphereNodes = useRef<Node3D[]>([]);
  if (sphereNodes.current.length === 0) {
    const nodes: Node3D[] = [];
    const numLatitudes = 8;
    const numLongitudes = 14;
    const radius = 120;

    // Standard grid nodes
    for (let i = 0; i < numLatitudes; i++) {
      const theta = (i * Math.PI) / numLatitudes;
      for (let j = 0; j < numLongitudes; j++) {
        const phi = (j * 2 * Math.PI) / numLongitudes;
        
        const x = radius * Math.sin(theta) * Math.cos(phi);
        const y = radius * Math.cos(theta);
        const z = radius * Math.sin(theta) * Math.sin(phi);

        nodes.push({
          x,
          y,
          z,
          px: 0,
          py: 0,
          pz: 0,
          color: "rgba(96, 165, 250, 0.5)", // Tailwind blue-400
          size: 2,
          pulse: Math.random() * Math.PI,
        });
      }
    }

    // High fidelity "Cyber Nodes" (floating active servers)
    const activeServers = [
      { theta: Math.PI / 4, phi: Math.PI / 3, label: "SEO Node Alpha", color: "#34d399" }, // emerald-400
      { theta: Math.PI / 2, phi: Math.PI / 1.5, label: "React Core Sync", color: "#60a5fa" }, // blue-400
      { theta: Math.PI / 1.5, phi: Math.PI * 1.2, label: "Hostinger Edge", color: "#c084fc" }, // purple-400
      { theta: Math.PI / 3, phi: Math.PI * 1.7, label: "PageSpeed Engine", color: "#fb7185" }, // rose-400
    ];

    activeServers.forEach((srv) => {
      const x = (radius + 8) * Math.sin(srv.theta) * Math.cos(srv.phi);
      const y = (radius + 8) * Math.cos(srv.theta);
      const z = (radius + 8) * Math.sin(srv.theta) * Math.sin(srv.phi);

      nodes.push({
        x,
        y,
        z,
        px: 0,
        py: 0,
        pz: 0,
        color: srv.color,
        size: 5,
        label: srv.label,
        pulse: Math.random() * Math.PI,
      });
    });

    sphereNodes.current = nodes;
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

  // Frame simulation loop
  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      // Dynamic scaling
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      // Auto rotation when not dragging
      if (autoRotate && !isDraggingRef.current) {
        anglesRef.current.yaw += 0.003;
        anglesRef.current.pitch += 0.001;
      }

      const { pitch, yaw } = anglesRef.current;

      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);

      // Project all 3D points
      const cx = width / 2;
      const cy = height / 2;
      const focalLength = 320;

      // Project nodes and calculate coordinates
      const nodes = sphereNodes.current.map((node) => {
        // Rotate around Y axis (Yaw)
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.x * sinY + node.z * cosY;

        // Rotate around X axis (Pitch)
        let y2 = node.y * cosP - z1 * sinP;
        let z2 = node.y * sinP + z1 * cosP;

        // Perspective projection
        const scale = focalLength / (focalLength + z2);
        const px = cx + x1 * scale;
        const py = cy + y2 * scale;

        node.pulse += 0.03;

        return {
          ...node,
          px,
          py,
          pz: z2,
        };
      });

      // Sort nodes by depth (back to front) for flawless overlay rendering
      nodes.sort((a, b) => b.pz - a.pz);

      // Draw subtle abstract rings background
      ctx.strokeStyle = "rgba(59, 130, 246, 0.03)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(168, 85, 247, 0.03)";
      ctx.beginPath();
      ctx.arc(cx, cy, 180, 0, Math.PI * 2);
      ctx.stroke();

      // Render connection lines (only for nodes that are close to each other, to look like a neural net)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        // Only draw connections if node is not strictly on the backside
        if (n1.pz > 120) continue;

        let connectionsCount = 0;
        for (let j = i + 1; j < nodes.length; j++) {
          if (connectionsCount > 2) break;
          const n2 = nodes[j];
          if (n2.pz > 120) continue;

          // Spatial 3D distance threshold
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dz = n1.z - n2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 65) {
            const alpha = Math.min(0.25, (1 - dist / 65) * (1 - n1.pz / 150));
            ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.px, n1.py);
            ctx.lineTo(n2.px, n2.py);
            ctx.stroke();
            connectionsCount++;
          }
        }
      }

      // Draw points & glowing pulses
      nodes.forEach((node) => {
        // Calculate visibility multiplier based on depth (z coordinate)
        // Nodes in front (pz < 0) are brighter, nodes in back (pz > 0) are dimmer
        const depthAlpha = Math.max(0.1, 1 - (node.pz + 120) / 240);

        if (node.label) {
          // Dynamic pulse size
          const pulseRadius = node.size + Math.sin(node.pulse) * 4;
          
          // Outer glow circle
          ctx.fillStyle = node.color;
          ctx.globalAlpha = 0.15 * depthAlpha;
          ctx.beginPath();
          ctx.arc(node.px, node.py, pulseRadius, 0, Math.PI * 2);
          ctx.fill();

          // Central core node
          ctx.fillStyle = node.color;
          ctx.globalAlpha = 1.0 * depthAlpha;
          ctx.beginPath();
          ctx.arc(node.px, node.py, node.size - 1, 0, Math.PI * 2);
          ctx.fill();

          // Text label (if in front of center axis for pristine UI hierarchy)
          if (node.pz < -10) {
            ctx.font = "bold 9px monospace";
            ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
            ctx.textAlign = "left";
            ctx.shadowColor = node.color;
            ctx.shadowBlur = 4;
            ctx.fillText(node.label, node.px + 8, node.py + 3);
            ctx.shadowBlur = 0; // reset
          }
        } else {
          // Standard grid dot
          ctx.fillStyle = node.color;
          ctx.globalAlpha = 0.6 * depthAlpha;
          ctx.beginPath();
          ctx.arc(node.px, node.py, node.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw orbit rings
      ctx.globalAlpha = 1.0;
      ctx.strokeStyle = "rgba(59, 130, 246, 0.15)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      // Draw outer elliptical orbital line
      ctx.ellipse(cx, cy, 140, 45, Math.PI / 12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]); // reset

      // Draw active orbiting signal packet
      const packetAngle = (Date.now() * 0.001) % (Math.PI * 2);
      const px = cx + 140 * Math.cos(packetAngle);
      const py = cy + 45 * Math.sin(packetAngle);
      
      ctx.shadowColor = "#3b82f6";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "#60a5fa";
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [autoRotate]);

  // Mouse drag handles
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || !dragStart) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    // Apply delta yaw & pitch
    anglesRef.current.yaw += dx * 0.005;
    anglesRef.current.pitch += dy * 0.005;

    // Constrain pitch to avoid flippingupside-down (gimbal lock)
    anglesRef.current.pitch = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, anglesRef.current.pitch));

    setRotation({ x: anglesRef.current.pitch, y: anglesRef.current.yaw });
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setDragStart(null);
  };

  // Randomize some active packets metrics just to feel hyper-responsive and live
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMetrics((prev) => ({
        pings: Math.floor(Math.random() * 8) + 10,
        nodeSpeed: `${(0.18 + Math.random() * 0.04).toFixed(3)}s`,
        activePackets: 1200 + Math.floor(Math.random() * 80),
        integrity: 100,
      }));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-[320px] md:h-[400px] relative rounded-[32px] overflow-hidden bg-gradient-to-br from-slate-900/40 to-slate-950/60 border border-white/10 flex flex-col items-center justify-center p-4 group select-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_15px_30px_rgba(0,0,0,0.5)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseUp();
      }}
    >
      {/* 3D Drag HUD */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 text-left">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-400 animate-spin-slow" />
          <span className="text-xs font-bold text-white tracking-wide uppercase font-sans">Deployment Grid Node</span>
        </div>
        <p className="text-[9px] text-slate-400 font-mono">DRAG MOUSE TO ROTATE SYSTEM PLANE</p>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono border transition-all ${
            autoRotate 
              ? "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_8px_rgba(59,130,246,0.2)]" 
              : "bg-white/5 text-slate-400 border-white/10 hover:text-white"
          }`}
        >
          <RefreshCw className={`w-2.5 h-2.5 ${autoRotate ? "animate-spin" : ""}`} />
          <span>{autoRotate ? "AUTO ROTATION" : "DRAG ONLY"}</span>
        </button>
      </div>

      {/* Interactive 3D Render Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="w-full h-full cursor-grab active:cursor-grabbing z-0"
      />

      {/* Interactive overlay status nodes */}
      <div className="absolute bottom-4 left-4 right-4 z-10 grid grid-cols-3 gap-2 text-left bg-[#020617]/85 backdrop-blur-md p-3 border border-white/5 rounded-2xl">
        <div className="border-r border-white/5 pr-1">
          <div className="text-[8px] text-slate-500 font-mono uppercase tracking-wider">Telemetry Speed</div>
          <div className="text-[11px] font-bold text-emerald-400 font-mono flex items-center gap-1">
            <Zap className="w-2.5 h-2.5 shrink-0" />
            <span>{activeMetrics.nodeSpeed}</span>
          </div>
        </div>
        <div className="border-r border-white/5 px-2">
          <div className="text-[8px] text-slate-500 font-mono uppercase tracking-wider">Packet Frequency</div>
          <div className="text-[11px] font-bold text-blue-400 font-mono flex items-center gap-1">
            <RefreshCw className="w-2.5 h-2.5 shrink-0 animate-spin-slow" />
            <span>{activeMetrics.activePackets} p/s</span>
          </div>
        </div>
        <div className="pl-2">
          <div className="text-[8px] text-slate-500 font-mono uppercase tracking-wider">Health Vector</div>
          <div className="text-[11px] font-bold text-purple-400 font-mono flex items-center gap-1">
            <Shield className="w-2.5 h-2.5 shrink-0" />
            <span>{activeMetrics.integrity}% Sec</span>
          </div>
        </div>
      </div>
    </div>
  );
}
