import { motion } from 'framer-motion';
import { Server, ShieldCheck, Monitor, BrainCircuit, Power, Globe, Camera, Rocket } from 'lucide-react';
import './ProgramCards.css';

const circuitPaths = [
  "M 400 250 L 350 200 L 250 200 L 200 150 L 200 100",
  "M 380 250 L 380 180 L 340 140 L 300 140 L 260 100 L 260 50",
  "M 400 220 L 360 220 L 310 170 L 280 170 L 250 140",
  "M 360 250 L 310 200 L 310 160 L 270 120 L 220 120",
  "M 400 180 L 370 150 L 370 90 L 320 40 L 280 40",
  "M 400 150 L 340 150 L 300 110 L 300 60",
  "M 330 250 L 280 200 L 240 200 L 200 160 L 150 160 L 130 140",
  "M 400 130 L 380 110 L 380 60",
  "M 400 100 L 350 100 L 310 60",
  "M 300 250 L 260 210 L 220 210 L 190 180",
];

const nodes = [
  { cx: 200, cy: 100, r: 3 },
  { cx: 260, cy: 50, r: 4 },
  { cx: 250, cy: 140, r: 2.5 },
  { cx: 220, cy: 120, r: 3.5 },
  { cx: 280, cy: 40, r: 3 },
  { cx: 300, cy: 60, r: 4 },
  { cx: 130, cy: 140, r: 2.5 },
  { cx: 380, cy: 60, r: 3 },
  { cx: 310, cy: 60, r: 2 },
  { cx: 190, cy: 180, r: 3 },
  { cx: 250, cy: 200, r: 2 },
  { cx: 340, cy: 140, r: 3 },
  { cx: 310, cy: 160, r: 2.5 },
  { cx: 370, cy: 90, r: 2 },
];

const floatingDots = Array.from({ length: 15 }).map(() => ({
  cx: 140 + Math.random() * 260,
  cy: 30 + Math.random() * 220,
  delay: Math.random() * 5,
}));

const diamondFlares = [
  { x: 280, y: 170, delay: 0 },
  { x: 370, y: 150, delay: 1.5 },
  { x: 220, y: 120, delay: 2 },
  { x: 340, y: 140, delay: 0.5 },
];

function CircuitBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', borderRadius: '16px', zIndex: 0 }}>
      {/* Soft gradient backgrounds for the bottom-right green glow */}
      <div style={{ position: 'absolute', bottom: '-6rem', right: '-6rem', width: '20rem', height: '20rem', backgroundColor: 'rgba(52, 211, 153, 0.2)', filter: 'blur(64px)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '-2.5rem', right: '-2.5rem', width: '12rem', height: '12rem', backgroundColor: 'rgba(45, 212, 191, 0.3)', filter: 'blur(40px)', borderRadius: '50%' }} />

      <svg 
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} 
        viewBox="0 0 400 250" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(16, 185, 129, 0)" />
            <stop offset="30%" stopColor="rgba(16, 185, 129, 0.15)" />
            <stop offset="100%" stopColor="rgba(16, 185, 129, 0.4)" />
          </linearGradient>
          <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(52, 211, 153, 0)" />
            <stop offset="50%" stopColor="rgba(52, 211, 153, 1)" />
            <stop offset="100%" stopColor="rgba(52, 211, 153, 0)" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="strongGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base circuit paths */}
        <g stroke="url(#lineGrad)" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          {circuitPaths.map((d, i) => (
            <path key={`base-${i}`} d={d} />
          ))}
        </g>

        {/* Animated pulse lines traveling across paths */}
        <g>
          {circuitPaths.map((d, i) => (
            <motion.path
              key={`pulse-${i}`}
              d={d}
              stroke="url(#pulseGrad)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
              whileInView={{
                pathLength: [0, 0.25, 0.25, 0],
                pathOffset: [0, 0, 0.75, 1],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2.5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 3,
              }}
            />
          ))}
        </g>

        {/* Static connection nodes */}
        <g className="nodes">
          {nodes.map((node, i) => (
            <circle
              key={`node-${i}`}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill="#10b981"
              opacity="0.9"
            />
          ))}
        </g>

        {/* Pulsing diamond flares for the shiny starburst effect */}
        <g className="diamond-flares">
          {diamondFlares.map((flare, i) => (
            <motion.polygon
              key={`flare-${i}`}
              points={`${flare.x},${flare.y - 5} ${flare.x + 1.5},${flare.y - 1.5} ${flare.x + 5},${flare.y} ${flare.x + 1.5},${flare.y + 1.5} ${flare.x},${flare.y + 5} ${flare.x - 1.5},${flare.y + 1.5} ${flare.x - 5},${flare.y} ${flare.x - 1.5},${flare.y - 1.5}`}
              fill="#a7f3d0"
              initial={{ opacity: 0.1, scale: 0.5 }}
              whileInView={{ opacity: [0.1, 1, 0.1], scale: [0.5, 1.2, 0.5] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: flare.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>

        {/* Ambient floating dots turning on and off */}
        <g className="floating-dots">
          {floatingDots.map((dot, i) => (
            <motion.circle
              key={`fdot-${i}`}
              cx={dot.cx}
              cy={dot.cy}
              r={Math.random() * 1.5 + 1}
              fill="#34d399"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: [0, 0.8, 0] }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: dot.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

const securityRipples = [
  { maxR: 150, border: "solid", delay: 0, duration: 4, width: 2, opacityMax: 0.6 },
  { maxR: 190, border: "dashed", dashArray: "12 24", delay: 1, duration: 4, width: 2.5, opacityMax: 0.4 },
  { maxR: 230, border: "solid", delay: 2, duration: 4, width: 1.5, opacityMax: 0.5 },
  { maxR: 270, border: "dashed", dashArray: "4 12", delay: 3, duration: 4, width: 1.5, opacityMax: 0.3 },
  { maxR: 310, border: "solid", delay: 4, duration: 4, width: 1, opacityMax: 0.2 },
];

const securityFloatingDots = Array.from({ length: 18 }).map(() => ({
  cx: 140 + Math.random() * 260,
  cy: 20 + Math.random() * 210,
  delay: Math.random() * 4,
}));

function CyberSecurityBackground() {
  const shieldCenterX = 320;
  const shieldCenterY = 125;

  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', borderRadius: '16px', zIndex: 0 }}>
      {/* Background soft glowing orbs */}
      <div style={{ position: 'absolute', top: '-2.5rem', right: '0', width: '20rem', height: '20rem', backgroundColor: 'rgba(74, 222, 128, 0.2)', filter: 'blur(60px)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '-5rem', right: '-5rem', width: '24rem', height: '24rem', backgroundColor: 'rgba(52, 211, 153, 0.25)', filter: 'blur(70px)', borderRadius: '50%' }} />

      <svg 
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 400 250" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="50%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>
          <filter id="softGlowSecurity" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="heavyGlowSecurity" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Expanding Ripple Waves */}
        {securityRipples.map((rip, i) => (
          <motion.circle
            key={`rip-${i}`}
            cx={shieldCenterX}
            cy={shieldCenterY}
            r={35}
            stroke="#4ade80"
            strokeWidth={rip.width}
            strokeDasharray={rip.dashArray || 'none'}
            strokeLinecap="round"
            fill="none"
            initial={{ r: 35, opacity: rip.opacityMax }}
            whileInView={{ r: rip.maxR, opacity: 0 }}
            transition={{
              duration: rip.duration,
              repeat: Infinity,
              delay: rip.delay,
              ease: "linear"
            }}
          />
        ))}

        {/* Orbiting Radar Tracks */}
        <motion.circle 
          cx={shieldCenterX} 
          cy={shieldCenterY} 
          r={75} 
          stroke="#4ade80" 
          strokeWidth="2" 
          strokeDasharray="10 30" 
          fill="none" 
          opacity="0.8" 
          whileInView={{ rotate: 360 }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
          style={{ transformOrigin: `${shieldCenterX}px ${shieldCenterY}px` }}
        />
        <motion.circle 
          cx={shieldCenterX} 
          cy={shieldCenterY} 
          r={115} 
          stroke="#22c55e" 
          strokeWidth="1.5" 
          strokeDasharray="4 16" 
          fill="none" 
          opacity="0.6" 
          whileInView={{ rotate: -360 }} 
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }} 
          style={{ transformOrigin: `${shieldCenterX}px ${shieldCenterY}px` }} 
        />
        <motion.circle 
          cx={shieldCenterX} 
          cy={shieldCenterY} 
          r={160} 
          stroke="#16a34a" 
          strokeWidth="1" 
          strokeDasharray="2 8" 
          fill="none" 
          opacity="0.4" 
          whileInView={{ rotate: 360 }} 
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }} 
          style={{ transformOrigin: `${shieldCenterX}px ${shieldCenterY}px` }} 
        />

        {/* Ambient floating particles */}
        <g className="floating-dots">
          {securityFloatingDots.map((dot, i) => (
            <motion.circle
              key={`sdot-${i}`}
              cx={dot.cx}
              cy={dot.cy}
              r={Math.random() * 2 + 1}
              fill="#bbf7d0"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: [0, 0.9, 0], scale: [0.5, 1.2, 0.5] }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: dot.delay,
                ease: "easeInOut",
              }}
              filter={Math.random() > 0.6 ? "url(#softGlowSecurity)" : ""}
            />
          ))}
        </g>

        {/* Central Glowing Shield element */}
        <g transform="translate(280, 75)">
          <path 
            d="M 40 0 L 80 15 L 80 50 C 80 75 60 95 40 105 C 20 95 0 75 0 50 L 0 15 Z"
            fill="#22c55e"
            opacity="0.4"
          />
        </g>

        <g transform="translate(280, 75)">
          <motion.path 
            d="M 40 0 L 80 15 L 80 50 C 80 75 60 95 40 105 C 20 95 0 75 0 50 L 0 15 Z"
            fill="url(#shieldGrad)"
            stroke="#f0fdf4"
            strokeWidth="3"
            initial={{ scale: 1 }}
            whileInView={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: '40px 52.5px' }}
          />
          {/* Checkmark inside the shield */}
          <motion.path
            d="M 24 52 L 36 64 L 60 38"
            fill="none"
            stroke="#ffffff"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ opacity: 0.9 }}
            whileInView={{ opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      </svg>
    </div>
  );
}

const linePatterns = [
  { array: "20 10 40 15 10 15 30 10", sum: 150 },
  { array: "40 12 12 12 24 16 18 16", sum: 150 },
  { array: "15 8 20 10 35 12 25 25", sum: 150 },
  { array: "50 15 20 25 30 10", sum: 150 },
  { array: "8 8 12 8 45 15 35 19", sum: 150 },
  { array: "80 20 15 15 10 10", sum: 150 },
];

const codeColors = ["#1e3a8a", "#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa", "#bfdbfe"];

const tracks = Array.from({ length: 34 }).map((_, i) => {
  const y = 25 + (i * 6.5) + (Math.random() * 3 - 1.5);
  const patternGroup = linePatterns[Math.floor(Math.random() * linePatterns.length)];
  const color = codeColors[Math.floor(Math.random() * codeColors.length)];
  const isFast = Math.random() > 0.8;
  const duration = isFast ? (1.5 + Math.random()) : (3 + Math.random() * 4);
  const width = Math.random() > 0.85 ? 4 : (Math.random() > 0.5 ? 2.5 : 1.5);
  const opacity = 0.4 + Math.random() * 0.6;
  return { y, color, duration, width, opacity, dashArray: patternGroup.array, patternSum: patternGroup.sum, isThick: width >= 3 };
});

const packets = Array.from({ length: 10 }).map(() => ({
  y: 35 + Math.random() * 180,
  length: 30 + Math.random() * 50,
  width: 2 + Math.random() * 2,
  color: codeColors[Math.floor(Math.random() * 3) + 2],
  delay: Math.random() * 6,
  duration: 1 + Math.random() * 1.5,
}));

const codeNodes = Array.from({ length: 15 }).map(() => ({
  cx: 240 + Math.random() * 140,
  cy: 30 + Math.random() * 190,
  delay: Math.random() * 4,
  duration: 1.5 + Math.random() * 2,
  color: codeColors[Math.floor(Math.random() * 4) + 2], 
}));

function CodeBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', borderRadius: '16px', zIndex: 0 }}>
      {/* Deep blue ambient backdrop glow concentrated on right edge */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '16rem', height: '100%', backgroundColor: 'rgba(59, 130, 246, 0.1)', filter: 'blur(80px)' }} />
      <div style={{ position: 'absolute', bottom: '-2.5rem', right: '-2.5rem', width: '12rem', height: '12rem', backgroundColor: 'rgba(37, 99, 235, 0.15)', filter: 'blur(60px)', borderRadius: '50%' }} />

      <svg 
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 400 250" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="fadeMaskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="25%" stopColor="rgba(0,0,0,0)" />
            <stop offset="65%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="100%" stopColor="rgba(255,255,255,1)" />
          </linearGradient>
          
          <mask id="fadeMask">
            {/* The mask hides elements on the left and reveals them smoothly on the right */}
            <rect x="0" y="0" width="400" height="250" fill="url(#fadeMaskGrad)" />
          </mask>
          
          <filter id="softBlueGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <filter id="heavyBlueGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g mask="url(#fadeMask)">
          {/* Continuous Code Streams */}
          {tracks.map((track, i) => (
            <motion.line
              key={`track-${i}`}
              x1="50"
              x2="500" // Extending beyond viewport to allow pattern flow
              y1={track.y}
              y2={track.y}
              stroke={track.color}
              strokeWidth={track.width}
              strokeDasharray={track.dashArray}
              strokeLinecap="round"
              opacity={track.opacity}
              filter={track.isThick ? "url(#softBlueGlow)" : ""}
              whileInView={{ strokeDashoffset: [0, track.patternSum] }}
              transition={{
                duration: track.duration,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}

          {/* Fast Moving Data Packets */}
          {packets.map((packet, i) => (
            <motion.path
              key={`packet-${i}`}
              d={`M 0 ${packet.y} L ${packet.length} ${packet.y}`}
              stroke={packet.color}
              strokeWidth={packet.width}
              strokeLinecap="round"
              opacity="0.9"
              initial={{ x: 420 }}
              whileInView={{ x: 100 }}
              transition={{
                duration: packet.duration,
                repeat: Infinity,
                delay: packet.delay,
                ease: "linear"
              }}
            />
          ))}

          {/* Pulsing Nodes/Dots */}
          {codeNodes.map((node, i) => (
            <motion.circle
              key={`node-${i}`}
              cx={node.cx}
              cy={node.cy}
              r={1.5}
              fill={node.color}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: [0, 0.9, 0], scale: [0.5, 1.5, 0.5] }}
              transition={{
                duration: node.duration,
                repeat: Infinity,
                delay: node.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

const neuralNodes = [
  { id: 0, x: 310, y: 180, r: 5.5, isHub: true },
  { id: 1, x: 250, y: 150, r: 3 },
  { id: 2, x: 210, y: 220, r: 2.5 },
  { id: 3, x: 270, y: 240, r: 3.5 },
  { id: 4, x: 370, y: 230, r: 3 },
  { id: 5, x: 350, y: 130, r: 4 },
  { id: 6, x: 280, y: 90, r: 2.5 },
  { id: 7, x: 220, y: 70, r: 2 },
  { id: 8, x: 270, y: 30, r: 3 },
  { id: 9, x: 330, y: 50, r: 3.5 },
  { id: 10, x: 380, y: 20, r: 2.5 },
  { id: 11, x: 390, y: 150, r: 3 },
  { id: 12, x: 170, y: 180, r: 2 },
  { id: 13, x: 130, y: 220, r: 1.5 },
  { id: 14, x: 310, y: 120, r: 4 },
  { id: 15, x: 230, y: 110, r: 2.5 },
  { id: 16, x: 380, y: 90, r: 2.5 },
  { id: 17, x: 180, y: 120, r: 2 }
];

const neuralConnectionPairs = [
  [0, 1], [0, 3], [0, 4], [0, 5], [0, 14], [0, 2], [0, 11],
  [14, 5], [14, 6], [14, 1], [14, 9],
  [5, 11], [5, 16], [5, 9],
  [16, 9], [16, 10], [16, 11],
  [9, 10], [9, 8], [9, 6],
  [6, 8], [6, 15], [6, 7], [6, 1],
  [15, 7], [15, 1], [15, 12], [15, 17],
  [7, 17],
  [1, 2], [1, 12],
  [12, 2], [12, 13], [12, 17],
  [2, 13], [2, 3],
  [3, 4],
  [4, 11]
];

const neuralPaths = neuralConnectionPairs.map(([start, end]) => {
  const n1 = neuralNodes[start];
  const n2 = neuralNodes[end];
  return `M ${n1.x} ${n1.y} L ${n2.x} ${n2.y}`;
});

const neuralFlares = [
  { x: 260, y: 130, delay: 0 },
  { x: 330, y: 90, delay: 1.5 },
  { x: 200, y: 150, delay: 1 },
  { x: 290, y: 220, delay: 2.5 },
  { x: 370, y: 160, delay: 0.5 },
  { x: 250, y: 60, delay: 2 },
  { x: 300, y: 160, delay: 1.8 }
];

function NeuralNetworkBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', borderRadius: '16px', zIndex: 0 }}>
      {/* Soft violet backdrop glows on the right */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '16rem', height: '100%', backgroundColor: 'rgba(167, 139, 250, 0.2)', filter: 'blur(80px)' }} />
      <div style={{ position: 'absolute', bottom: '-5rem', right: '-5rem', width: '20rem', height: '20rem', backgroundColor: 'rgba(168, 85, 247, 0.2)', filter: 'blur(70px)', borderRadius: '50%' }} />

      <svg 
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 400 250" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="fadeMaskGradNeural" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="25%" stopColor="rgba(0,0,0,0)" />
            <stop offset="65%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="100%" stopColor="rgba(255,255,255,1)" />
          </linearGradient>
          
          <mask id="fadeMaskNeural">
            <rect x="0" y="0" width="400" height="250" fill="url(#fadeMaskGradNeural)" />
          </mask>

          <linearGradient id="pulseGradNeural" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(216, 180, 254, 0)" />
            <stop offset="50%" stopColor="rgba(233, 213, 255, 1)" />
            <stop offset="100%" stopColor="rgba(216, 180, 254, 0)" />
          </linearGradient>
          
          <filter id="softPurpleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="heavyPurpleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g mask="url(#fadeMaskNeural)">
          {/* Base Connection Lines */}
          <g stroke="#a855f7" strokeWidth="0.8" opacity="0.35" strokeLinecap="round" strokeLinejoin="round">
            {neuralPaths.map((d, i) => (
              <path key={`base-${i}`} d={d} />
            ))}
          </g>

          {/* Data Pulses Traveling Along Lines */}
          <g>
            {neuralPaths.map((d, i) => (
              <motion.path
                key={`pulse-${i}`}
                d={d}
                stroke="url(#pulseGradNeural)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0, pathOffset: 0 }}
                whileInView={{
                  pathLength: [0, 0.2, 0.2, 0],
                  pathOffset: [0, 0, 0.8, 1],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 4
                }}
              />
            ))}
          </g>

          {/* Network Nodes */}
          <g className="nodes">
            {neuralNodes.map((node) => 
              node.isHub ? (
                <g key={`node-${node.id}`} transform={`translate(${node.x}, ${node.y})`}>
                  {/* Outer hub aura */}
                  <motion.circle
                    r={node.r * 2.5}
                    fill="none"
                    stroke="#d8b4fe"
                    strokeWidth="2"
                    initial={{ scale: 0.9, opacity: 0.3 }}
                    whileInView={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {/* Inner hub core */}
                  <circle r={node.r} fill="#ffffff" />
                </g>
              ) : (
                <motion.circle
                  key={`node-${node.id}`}
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  fill={Math.random() > 0.5 ? "#d8b4fe" : "#a855f7"}
                  initial={{ opacity: 0.5, scale: 0.8 }}
                  whileInView={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut"
                  }}
                  filter={Math.random() > 0.6 ? "url(#softPurpleGlow)" : ""}
                />
              )
            )}
          </g>

          {/* Starburst Flares */}
          <g className="diamond-flares">
            {neuralFlares.map((flare, i) => (
              <motion.polygon
                key={`flare-${i}`}
                points={`${flare.x},${flare.y - 4} ${flare.x + 1},${flare.y - 1} ${flare.x + 4},${flare.y} ${flare.x + 1},${flare.y + 1} ${flare.x},${flare.y + 4} ${flare.x - 1},${flare.y + 1} ${flare.x - 4},${flare.y} ${flare.x - 1},${flare.y - 1}`}
                fill="#ffffff"
                initial={{ opacity: 0.1, scale: 0.5 }}
                whileInView={{ opacity: [0.1, 1, 0.1], scale: [0.5, 1.5, 0.5] }}
                transition={{
                  duration: 2.5 + Math.random() * 2,
                  repeat: Infinity,
                  delay: flare.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}

const solarSunX = 330;
const solarSunY = 125;
const solarColors = ["#fcd34d", "#fbbf24", "#f59e0b", "#ea580c"];

const solarRays = Array.from({ length: 45 }).map((_, i) => {
  const angle = (i * 8) * (Math.PI / 180);
  const isDashed = Math.random() > 0.4;
  const length = 120 + Math.random() * 200;
  const width = 0.8 + Math.random() * 1.5;
  const dash1 = 6 + Math.random() * 12;
  const dash2 = 6 + Math.random() * 12;
  const dashArray = isDashed ? `${dash1} ${dash2}` : "none";
  
  return {
    x1: solarSunX + Math.cos(angle) * 45,
    y1: solarSunY + Math.sin(angle) * 45,
    x2: solarSunX + Math.cos(angle) * length,
    y2: solarSunY + Math.sin(angle) * length,
    width,
    dashArray,
    dashSum: dash1 + dash2,
    isDashed,
    color: solarColors[Math.floor(Math.random() * solarColors.length)],
    opacity: 0.2 + Math.random() * 0.6,
    duration: 3 + Math.random() * 3
  };
});

const solarParticles = Array.from({ length: 25 }).map(() => {
  const angle = Math.random() * 2 * Math.PI;
  const distance = 60 + Math.random() * 150;
  return {
    moveX: Math.cos(angle) * distance,
    moveY: Math.sin(angle) * distance,
    delay: Math.random() * 4,
    duration: 3 + Math.random() * 2,
    size: 1 + Math.random() * 2,
    color: solarColors[Math.floor(Math.random() * 2)] 
  };
});

function SolarBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', borderRadius: '16px', zIndex: 0 }}>
      {/* Warm ambient glows originating from the right */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '20rem', height: '100%', backgroundColor: 'rgba(251, 146, 60, 0.1)', filter: 'blur(80px)' }} />
      <div style={{ position: 'absolute', bottom: '-2.5rem', right: '-5rem', width: '24rem', height: '24rem', backgroundColor: 'rgba(251, 191, 36, 0.2)', filter: 'blur(70px)', borderRadius: '50%' }} />

      <svg 
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 400 250" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="fadeMaskGradSolar" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="20%" stopColor="rgba(0,0,0,0)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="100%" stopColor="rgba(255,255,255,1)" />
          </linearGradient>
          
          <mask id="fadeMaskSolar">
            <rect x="0" y="0" width="400" height="250" fill="url(#fadeMaskGradSolar)" />
          </mask>

          <radialGradient id="sunInnerGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#c2410c" />
          </radialGradient>
          
          <filter id="softWarmGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="heavyWarmGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g mask="url(#fadeMaskSolar)">
          {/* Radiating Light Rays */}
          <motion.g 
            whileInView={{ rotate: 360 }} 
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: `${solarSunX}px ${solarSunY}px` }}
          >
            {solarRays.map((ray, i) => (
              <motion.line
                key={`ray-${i}`}
                x1={ray.x1}
                y1={ray.y1}
                x2={ray.x2}
                y2={ray.y2}
                stroke={ray.color}
                strokeWidth={ray.width}
                strokeDasharray={ray.dashArray}
                strokeLinecap="round"
                opacity={ray.opacity}
                initial={{ strokeDashoffset: 0 }}
                whileInView={{ strokeDashoffset: ray.isDashed ? -ray.dashSum : 0 }}
                transition={{
                  duration: ray.duration,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </motion.g>

          {/* Light particles moving outwards */}
          {solarParticles.map((p, i) => (
            <motion.circle
              key={`particle-${i}`}
              cx={solarSunX}
              cy={solarSunY}
              r={p.size}
              fill={p.color}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
              whileInView={{ 
                x: p.moveX, 
                y: p.moveY, 
                opacity: [0, 1, 0], 
                scale: [0.5, 1.5, 0.5] 
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Sun Core Structure */}
          <g className="sun-center">
            {/* Expanding/Breathing Outer Aura */}
            <motion.circle
              cx={solarSunX}
              cy={solarSunY}
              r={55}
              fill="#f59e0b"
              opacity="0.3"
              initial={{ scale: 0.9, opacity: 0.2 }}
              whileInView={{ scale: [0.9, 1.25, 0.9], opacity: [0.2, 0.45, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Secondary inner glow */}
            <circle
              cx={solarSunX}
              cy={solarSunY}
              r={45}
              fill="#fbbf24"
              opacity="0.5"
            />

            {/* White Halo Ring */}
            <motion.circle
              cx={solarSunX}
              cy={solarSunY}
              r={42}
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              initial={{ scale: 0.98 }}
              whileInView={{ scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Solid 3D Sun Body */}
            <circle
              cx={solarSunX}
              cy={solarSunY}
              r={35}
              fill="url(#sunInnerGrad)"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

const networkCx = 330;
const networkCy = 125;

const networkNodes = [
  { id: 1, angle: -28, dist: 75, r: 11, delay: 0 },
  { id: 2, angle: 22, dist: 105, r: 8, delay: 0.5 },
  { id: 3, angle: 75, dist: 85, r: 13, delay: 1.2 },
  { id: 4, angle: 135, dist: 95, r: 7, delay: 0.8 },
  { id: 5, angle: 175, dist: 125, r: 10, delay: 2.1 },
  { id: 6, angle: -145, dist: 90, r: 9, delay: 1.5 },
  { id: 7, angle: -85, dist: 115, r: 12, delay: 0.3 },
  { id: 8, angle: -45, dist: 145, r: 6, delay: 2.5 },
  { id: 9, angle: 50, dist: 155, r: 8, delay: 1.8 }
].map(n => ({
  ...n,
  x: networkCx + Math.cos(n.angle * (Math.PI / 180)) * n.dist,
  y: networkCy + Math.sin(n.angle * (Math.PI / 180)) * n.dist,
  length: n.dist
}));

const networkExtraNodes = [
  { x: networkCx + 55, y: networkCy - 130, r: 6, delay: 0.5 },
  { x: networkCx - 20, y: networkCy + 130, r: 5, delay: 2.0 },
  { x: networkCx - 110, y: networkCy - 60, r: 7, delay: 3.5 },
];

function DigitalMarketingBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', borderRadius: '16px', zIndex: 0 }}>
      {/* Ambient digital blue backlights */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '18rem', height: '100%', backgroundColor: 'rgba(59, 130, 246, 0.1)', filter: 'blur(70px)' }} />
      <div style={{ position: 'absolute', bottom: '-2.5rem', right: '-2.5rem', width: '24rem', height: '24rem', backgroundColor: 'rgba(99, 102, 241, 0.1)', filter: 'blur(60px)', borderRadius: '50%' }} />

      <svg 
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 400 250" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="fadeMaskGradNet" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="10%" stopColor="rgba(0,0,0,0)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0.75)" />
            <stop offset="100%" stopColor="rgba(255,255,255,1)" />
          </linearGradient>
          
          <mask id="fadeMaskNet">
            <rect x="0" y="0" width="400" height="250" fill="url(#fadeMaskGradNet)" />
          </mask>
          
          <filter id="softBlueGlowNet" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <filter id="heavyBlueGlowNet" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g mask="url(#fadeMaskNet)">
          {/* Base Connection Lines (Network Mesh) */}
          {networkNodes.map(n => (
            <line 
              key={`base-line-${n.id}`} 
              x1={networkCx} y1={networkCy} 
              x2={n.x} y2={n.y} 
              stroke="#93c5fd" 
              strokeWidth="1.5" 
              opacity="0.3" 
            />
          ))}

          {/* Dynamic Data Pulses (Traveling center -> out) */}
          {networkNodes.map(n => (
            <motion.line
              key={`pulse-${n.id}`}
              x1={networkCx} y1={networkCy} 
              x2={n.x} y2={n.y}
              stroke="#ffffff" 
              strokeWidth="2.5" 
              strokeLinecap="round"
              strokeDasharray={`5 ${n.length + 20}`}
              initial={{ strokeDashoffset: 0 }}
              whileInView={{ strokeDashoffset: -(n.length + 10) }}
              transition={{ 
                duration: 2.5, 
                delay: n.delay, 
                repeat: Infinity, 
                ease: "easeIn" 
              }}
            />
          ))}

          {/* Static Background Radar Rings */}
          <circle cx={networkCx} cy={networkCy} r={65} fill="none" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />
          <circle cx={networkCx} cy={networkCy} r={115} fill="none" stroke="#93c5fd" strokeWidth="1" strokeDasharray="2 12" opacity="0.2" />

          {/* Expanding Reach/Signal Sweeps */}
          {[0, 1, 2].map((i) => (
             <motion.circle
               key={`sweep-${i}`}
               cx={networkCx} cy={networkCy}
               fill="none"
               stroke="#3b82f6"
               strokeWidth="1.5"
               initial={{ r: 20, opacity: 0.8 }}
               whileInView={{ r: 180, opacity: 0 }}
               transition={{ 
                 duration: 4.5, 
                 delay: i * 1.5, 
                 repeat: Infinity, 
                 ease: "linear" 
               }}
             />
          ))}

          {/* Active Audience Nodes */}
          {networkNodes.map(n => (
            <g key={`node-grp-${n.id}`}>
              {/* Outer pulsing ring */}
              <motion.circle
                cx={n.x} cy={n.y} r={n.r + 4}
                fill="none" stroke="#60a5fa" strokeWidth="1.5"
                whileInView={{ scale: [1, 1.25, 1], opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 3, delay: n.delay, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              />
              {/* Node core */}
              <circle cx={n.x} cy={n.y} r={n.r} fill="#1d4ed8" />
              {/* Inner highlight dot */}
              <circle cx={n.x} cy={n.y} r={n.r * 0.4} fill="#eff6ff" />
            </g>
          ))}

          {/* Growth / Fading External Nodes */}
          {networkExtraNodes.map((ext, i) => (
            <motion.g 
              key={`extra-${i}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: [0, 1, 0], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 4, delay: ext.delay, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: `${ext.x}px ${ext.y}px` }}
            >
              <circle cx={ext.x} cy={ext.y} r={ext.r} fill="#3b82f6" opacity="0.6" />
              <circle cx={ext.x} cy={ext.y} r={ext.r * 0.5} fill="#ffffff" />
            </motion.g>
          ))}

          {/* Central Campaign Source Hub (The Core) */}
          <g className="central-hub">
            {/* Massive ambient backing glow */}
            <motion.circle 
              cx={networkCx} cy={networkCy} r={32} 
              fill="#2563eb" 
              initial={{ opacity: 0.3 }}
              whileInView={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.1, 0.95] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: `${networkCx}px ${networkCy}px` }}
            />
            {/* Outer static housing */}
            <circle cx={networkCx} cy={networkCy} r={24} fill="#1e3a8a" opacity="0.4" />
            <circle cx={networkCx} cy={networkCy} r={24} fill="none" stroke="#60a5fa" strokeWidth="2" opacity="0.8" />
            
            {/* Inner dynamic cores */}
            <circle cx={networkCx} cy={networkCy} r={16} fill="#2563eb" />
            <circle cx={networkCx} cy={networkCy} r={10} fill="#3b82f6" />
            <motion.circle 
              cx={networkCx} cy={networkCy} r={5} 
              fill="#ffffff" 
              whileInView={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: `${networkCx}px ${networkCy}px` }}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

const photoCenterX = 330;
const photoCenterY = 125;

const photoRings = [
  { r: 96, stroke: "#fbcfe8", width: 1.5, dash: "6 12", dur: 18, dir: 1 },
  { r: 112, stroke: "#f9a8d4", width: 1, dash: "2 20", dur: 25, dir: -1 },
  { r: 138, stroke: "#fce7f3", width: 2, dash: "4 30", dur: 35, dir: 1 },
];

const photoBlades = [0, 60, 120, 180, 240, 300];

const photoParticles = Array.from({ length: 24 }).map(() => ({
  x: photoCenterX + (Math.random() - 0.5) * 260,
  y: photoCenterY + (Math.random() - 0.5) * 240,
  size: 1 + Math.random() * 2,
  delay: Math.random() * 4,
  dur: 2 + Math.random() * 3,
}));

function ApertureBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', borderRadius: '16px', zIndex: 0 }}>
      {/* Background ambient magenta/pink glows */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '20rem', height: '100%', backgroundColor: 'rgba(244, 114, 182, 0.1)', filter: 'blur(80px)' }} />
      <div style={{ position: 'absolute', bottom: '-2.5rem', right: '-5rem', width: '24rem', height: '24rem', backgroundColor: 'rgba(217, 70, 239, 0.15)', filter: 'blur(70px)', borderRadius: '50%' }} />

      <svg 
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 400 250" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="fadeMaskGradPhoto" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="10%" stopColor="rgba(0,0,0,0)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0.75)" />
            <stop offset="100%" stopColor="rgba(255,255,255,1)" />
          </linearGradient>
          
          <mask id="fadeMaskPhoto">
             {/* Mask keeps left section clear and fades the aperture gracefully */}
            <rect x="0" y="0" width="400" height="250" fill="url(#fadeMaskGradPhoto)" />
          </mask>

          <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" /> {/* pink-400 */}
            <stop offset="45%" stopColor="#d946ef" /> {/* fuchsia-500 */}
            <stop offset="100%" stopColor="#be185d" /> {/* pink-700 */}
          </linearGradient>

          <linearGradient id="sheenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="35%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="65%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          
          <filter id="softPinkGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <filter id="heavyPinkGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g mask="url(#fadeMaskPhoto)">
          {/* Ambient Particles */}
          <g className="particles">
             {photoParticles.map((p, i) => (
               <motion.circle
                  key={`particle-${i}`}
                  cx={p.x}
                  cy={p.y}
                  r={p.size}
                  fill="#fbcfe8"
                  initial={{ opacity: 0, scale: 0.5, y: p.y }}
                  whileInView={{ 
                    opacity: [0, 0.8, 0], 
                    scale: [0.5, 1.2, 0.5],
                    y: [p.y, p.y - 15] // Gentle upward drift
                  }}
                  transition={{
                    duration: p.dur,
                    repeat: Infinity,
                    delay: p.delay,
                    ease: "easeInOut"
                  }}
               />
             ))}
          </g>

          {/* Outer Rotating Rings */}
          {photoRings.map((ring, i) => (
             <motion.circle
                key={`ring-${i}`}
                cx={photoCenterX}
                cy={photoCenterY}
                r={ring.r}
                fill="none"
                stroke={ring.stroke}
                strokeWidth={ring.width}
                strokeDasharray={ring.dash}
                filter={i === 0 ? "url(#softPinkGlow)" : "none"}
                opacity="0.7"
                whileInView={{ rotate: 360 * ring.dir }}
                transition={{ duration: ring.dur, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: `${photoCenterX}px ${photoCenterY}px` }}
             />
          ))}

          {/* Main Aperture Mechanism */}
          <g className="aperture-core">
            {/* Outer casing ring */}
            <circle 
              cx={photoCenterX} cy={photoCenterY} r={88} 
              fill="none" stroke="url(#bladeGrad)" strokeWidth="4" opacity="0.6"
            />
            <circle 
              cx={photoCenterX} cy={photoCenterY} r={85} 
              fill="none" stroke="#fdf2f8" strokeWidth="1" 
              opacity="0.8"
            />

            {/* Inner rotating and breathing blades */}
            <motion.g
              initial={{ rotate: 0, scale: 0.94 }}
              whileInView={{ rotate: [0, 12, 0], scale: [0.94, 0.99, 0.94] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: `${photoCenterX}px ${photoCenterY}px` }}
            >
              {photoBlades.map((deg, i) => (
                 <g key={i} transform={`translate(${photoCenterX}, ${photoCenterY}) rotate(${deg})`}>
                    <path
                      d="M 23,-12 L 95,-45 A 95 95 0 0 1 50,80 Z"
                      fill="url(#bladeGrad)"
                      stroke="#fdf2f8"
                      strokeWidth="0.7"
                      strokeOpacity="0.7"
                    />
                 </g>
              ))}

              {/* Dynamic light sheen rotating across the blades */}
              <motion.circle 
                 cx={photoCenterX} cy={photoCenterY} r={85} 
                 fill="url(#sheenGrad)" 
                 style={{ transformOrigin: `${photoCenterX}px ${photoCenterY}px` }}
                 whileInView={{ rotate: [0, 180, 360] }}
                 transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </motion.g>
            
            {/* Soft inner glow masking the harsh edges of the hole */}
            <motion.circle 
              cx={photoCenterX} cy={photoCenterY} r={28} 
              fill="none" stroke="#fbcfe8" strokeWidth="12" opacity="0.3"
              initial={{ r: 28, opacity: 0.3 }}
              whileInView={{ r: [28, 31, 28], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

const growthDataPoints = [
  { x: 130, y: 195 },
  { x: 165, y: 180 },
  { x: 200, y: 150 },
  { x: 235, y: 140 },
  { x: 270, y: 100 },
  { x: 305, y: 85 },
  { x: 340, y: 45 },
  { x: 375, y: 20 },
];

const growthPathString = `M ${growthDataPoints.map(p => `${p.x} ${p.y}`).join(" L ")}`;

const growthParticles = Array.from({ length: 20 }).map(() => {
  return {
    x: 180 + Math.random() * 220,
    y: 50 + Math.random() * 200,
    delay: Math.random() * 4,
    duration: 3 + Math.random() * 3,
    size: 0.8 + Math.random() * 1.5,
  };
});

function GrowthBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', borderRadius: '16px', zIndex: 0 }}>
      {/* Background ambient green success glows */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '18rem', height: '100%', backgroundColor: 'rgba(52, 211, 153, 0.1)', filter: 'blur(80px)' }} />
      <div style={{ position: 'absolute', bottom: '-2.5rem', right: '-2.5rem', width: '24rem', height: '24rem', backgroundColor: 'rgba(34, 197, 94, 0.15)', filter: 'blur(60px)', borderRadius: '50%' }} />

      <svg 
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 400 250" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="fadeMaskGradGrowth" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="15%" stopColor="rgba(0,0,0,0)" />
            <stop offset="45%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="100%" stopColor="rgba(255,255,255,1)" />
          </linearGradient>
          
          <mask id="fadeMaskGrowth">
             {/* Mask keeps left section clear for typography */}
            <rect x="0" y="0" width="400" height="250" fill="url(#fadeMaskGradGrowth)" />
          </mask>

          <linearGradient id="barGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          <linearGradient id="barSheen" x1="0%" y1="0%" x2="100%" y2="0%">
             <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
             <stop offset="30%" stopColor="rgba(255,255,255,0.7)" />
             <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          
          <filter id="softGreenGlowGrowth" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g mask="url(#fadeMaskGrowth)">
          {/* Vertical 3D Style Chart Bars */}
          {growthDataPoints.map((p, i) => {
            // Drop the bar slightly below the data node so it grounds the chart visually
            const barTopY = p.y + 12;
            const barHeight = 250 - barTopY;
            return (
              <motion.g
                key={`bar-${i}`}
                style={{ transformOrigin: "50% 250px" }}
                whileInView={{ scaleY: [0.94, 1.05, 0.94] }}
                transition={{ 
                  duration: 4.5, 
                  repeat: Infinity, 
                  ease: "easeInOut", 
                  delay: i * 0.2 // Wave effect from left to right
                }}
              >
                 {/* Main Bar Fill */}
                 <rect x={p.x - 7} y={barTopY} width="14" height={barHeight} fill="url(#barGrad)" rx="2" opacity="0.8" />
                 {/* Premium glossy overlay sheen */}
                 <rect x={p.x - 7} y={barTopY} width="14" height={barHeight} fill="url(#barSheen)" rx="2" />
                 {/* Hard highlight edge for 3D pop */}
                 <rect x={p.x - 6} y={barTopY} width="3" height={barHeight} fill="rgba(255,255,255,0.6)" rx="1" />
              </motion.g>
            );
          })}

          {/* Connective Line Graph Background (Blurry Aura) */}
          <path 
            d={growthPathString} 
            stroke="#22c55e" 
            strokeWidth="3.5" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            opacity="0.5" 
          />

          {/* Connective Line Graph Core */}
          <path 
            d={growthPathString} 
            stroke="#16a34a" 
            strokeWidth="1.5" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* Animated data pulses traversing the main string */}
          <motion.path
            d={growthPathString}
            stroke="#bbf7d0"
            strokeWidth="3"
            strokeDasharray="4 56" // 4px dot, 56px empty space looping forward
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDashoffset: 60 }}
            whileInView={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />

          {/* Chart Data Nodes */}
          {growthDataPoints.map((p, i) => (
            <g key={`node-${i}`}>
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={4}
                fill="#ffffff"
                stroke="#16a34a"
                strokeWidth="2"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: [0.9, 1.3, 0.9] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15
                }}
              />
            </g>
          ))}

          {/* Upward Trend Arrow Head */}
          <motion.g 
             transform="translate(378, 17.5) rotate(-35)"
             initial={{ x: 0, y: 0 }}
             whileInView={{ x: [0, 2, 0], y: [0, -2, 0] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
             <polygon points="-7,-6 5,0 -7,6 -3,0" fill="#22c55e" />
          </motion.g>

          {/* Ambient Upward Growth Particles */}
          <g className="particles">
             {growthParticles.map((p, i) => (
               <motion.circle
                  key={`particle-${i}`}
                  cx={p.x}
                  cy={p.y}
                  r={p.size}
                  fill="#86efac"
                  initial={{ opacity: 0, scale: 0.5, y: p.y }}
                  whileInView={{ 
                    opacity: [0, 0.9, 0], 
                    scale: [0.5, 1.2, 0.5],
                    y: [p.y, p.y - 25] // Upward motion representing business rising
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    delay: p.delay,
                    ease: "easeInOut"
                  }}
               />
             ))}
          </g>
        </g>
      </svg>
    </div>
  );
}

export const Programs = () => {
  const programs = [
    { 
      icon: <Server size={22} strokeWidth={2} />, 
      name: 'Hardware & Software Maintenance', 
      animClass: 'anim-hardware',
      iconColor: '#00acc1',
      customBackground: <CircuitBackground />
    },
    { 
      icon: <ShieldCheck size={22} strokeWidth={2} />, 
      name: 'Networking & Cybersecurity', 
      animClass: 'anim-security',
      iconColor: '#42a5f5',
      customBackground: <CyberSecurityBackground />
    },
    { 
      icon: <Monitor size={22} strokeWidth={2} />, 
      name: 'Programming & Web Dev', 
      animClass: 'anim-programming',
      iconColor: '#42a5f5',
      customBackground: <CodeBackground />
    },
    { 
      icon: <BrainCircuit size={22} strokeWidth={2} />, 
      name: 'Data Science & AI', 
      animClass: 'anim-datascience',
      iconColor: '#ab47bc',
      customBackground: <NeuralNetworkBackground />
    },
    { 
      icon: <Power size={22} strokeWidth={2} />, 
      name: 'Renewable Energy (Solar PV)', 
      animClass: 'anim-energy',
      iconColor: '#ff9800',
      customBackground: <SolarBackground />
    },
    { 
      icon: <Globe size={22} strokeWidth={2} />, 
      name: 'Digital Marketing', 
      animClass: 'anim-marketing',
      iconColor: '#29b6f6',
      customBackground: <DigitalMarketingBackground />
    },
    { 
      icon: <Camera size={22} strokeWidth={2} />, 
      name: 'Photography & Video Editing', 
      animClass: 'anim-photography',
      iconColor: '#ec407a',
      customBackground: <ApertureBackground />
    },
    { 
      icon: <Rocket size={22} strokeWidth={2} />, 
      name: 'Tech for Business', 
      animClass: 'anim-business',
      iconColor: '#66bb6a',
      customBackground: <GrowthBackground />
    },
  ];

  return (
    <section id="programs" className="section container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="section-title" style={{ marginBottom: '1rem' }}>Academic & Training Programs</h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--gray-700)', maxWidth: '800px', margin: '0 auto' }}>
          We offer world-class Certificate, Professional Diploma, and Advanced Diploma programs, alongside workshops, seminars, and webinars.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '1.25rem', 
        marginBottom: '4rem' 
      }}>
        {programs.map((prog, idx) => (
          <motion.div 
            key={idx}
            className="program-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: idx * 0.08 }}
          >
            {/* Animated Background */}
            {prog.customBackground ? prog.customBackground : (
              <div className={`program-card-bg ${prog.animClass}`}></div>
            )}
            
            {/* Content */}
            <div className="program-card-content">
              <div className="program-card-icon" style={{ color: prog.iconColor }}>
                {prog.icon}
              </div>
              <h4 className="program-card-title">{prog.name}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="programs-banner glass-card"
        style={{ 
          background: 'linear-gradient(135deg, #6A63B7 0%, #4c4491 100%)',
          padding: '3rem', borderRadius: '24px', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '2rem'
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{ maxWidth: '600px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Globe color="rgba(255,255,255,0.7)" />
            <h3 style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.7)' }}>Global Inclusion Spotlight</h3>
          </div>
          <h4 className="programs-banner-title" style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)', color: '#fff' }}>Tsangayar Fasaha</h4>
          <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            Our dedicated Hausa-language version of the Digital Academy, expanding our global accessibility and bringing quality tech education to diverse linguistic communities.
          </p>
        </div>
        <button className="btn btn-outline btn-light" style={{ background: 'white', color: 'var(--blue-vibrant)', borderColor: 'white' }}>Learn More</button>
      </motion.div>
    </section>
  );
};
