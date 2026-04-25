import { useEffect, useRef } from "react";
import "./Services.css";

/* ─── colour helpers ──────────────────────────────────────────────────────── */
function hexToRgb(hex: string) {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
}
function toHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
}
function lighten(hex: string, a: number) { const [r, g, b] = hexToRgb(hex); return toHex(r + a, g + a, b + a); }
function darken(hex: string, a: number) { const [r, g, b] = hexToRgb(hex); return toHex(r - a, g - a, b - a); }

/* ─── data ────────────────────────────────────────────────────────────────── */
const PILLARS = [
  { lines: ["EDUCATION", "SOLUTIONS"], color: "#4A90D9", icon: "book" },
  { lines: ["CONSULTING", "& STRATEGY"], color: "#3B82F6", icon: "chart" },
  { lines: ["TECH &", "PRODUCT"], color: "#E8855A", icon: "cpu" },
  { lines: ["FINANCE &", "ANALYTICS"], color: "#9B6FBF", icon: "finance" },
  { lines: ["START-UPS &", "EMERGING"], color: "#D4546A", icon: "rocket" },
];

/* ─── icon paths (stroke-based) ──────────────────────────────────────────── */
function PillarIcon({ type }: { type: string }) {
  const p = { fill: "none", stroke: "white", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  // Each icon is centred around 0,0, scaled to ~32×32
  switch (type) {
    case "book": return <g transform="scale(1.1)"><rect x="-14" y="-15" width="28" height="30" rx="2" {...p} /><line x1="-14" y1="-7" x2="14" y2="-7" {...p} /><line x1="-6" y1="-15" x2="-6" y2="15" {...p} /></g>;
    case "chart": return <g transform="scale(1.1)"><polyline points="-14,10 -6,0 0,5 10,-8" {...p} /><line x1="-14" y1="14" x2="14" y2="14" {...p} /></g>;
    case "cpu": return <g transform="scale(1.0)"><rect x="-12" y="-12" width="24" height="24" rx="2" {...p} /><rect x="-5" y="-5" width="10" height="10" rx="1" {...p} /><line x1="-6" y1="-17" x2="-6" y2="-12" {...p} /><line x1="6" y1="-17" x2="6" y2="-12" {...p} /><line x1="-6" y1="12" x2="-6" y2="17" {...p} /><line x1="6" y1="12" x2="6" y2="17" {...p} /><line x1="-17" y1="-6" x2="-12" y2="-6" {...p} /><line x1="-17" y1="6" x2="-12" y2="6" {...p} /><line x1="12" y1="-6" x2="17" y2="-6" {...p} /><line x1="12" y1="6" x2="17" y2="6" {...p} /></g>;
    case "finance": return <g transform="scale(1.1)"><circle cx="0" cy="0" r="14" {...p} /><line x1="0" y1="-10" x2="0" y2="10" {...p} /><path d="M-5,-5h8a3,3,0,0,1,0,6h-5a3,3,0,0,0,0,6h7" {...p} /></g>;
    case "rocket": return <g transform="scale(1.1)"><path d="M0,-14 C10,-4 10,8 0,14 C-10,8 -10,-4 0,-14Z" {...p} /><circle cx="0" cy="-4" r="4" {...p} /><path d="M-10,10 L-14,14 M10,10 L14,14" {...p} /></g>;
    default: return null;
  }
}

/* ─── 3-D LEGO block (SVG) ───────────────────────────────────────────────── */
function LegoBlock({ pillar, index }: { pillar: typeof PILLARS[0]; index: number }) {
  const c = pillar.color;
  const dk = darken(c, 35);
  const lt = lighten(c, 28);
  const bot = darken(c, 50);
  const isEven = index % 2 === 0;

  // octagon points for a 200×160 face starting at y=50
  const face = "32,50 168,50 196,78 196,178 168,206 32,206 4,178 4,78";
  const inner = "44,62 156,62 180,84 180,172 156,198 44,198 20,172 20,84";

  return (
    <div
      className={`lego-block ${isEven ? "lego-bob-up" : "lego-bob-down"}`}
      style={{ animationDelay: `${index * 0.25}s` }}
    >
      <svg viewBox="0 0 210 250" xmlns="http://www.w3.org/2000/svg" className="lego-svg">
        {/* ── studs (4 bumps on top) ── */}
        {[36, 76, 116, 156].map((x, si) => (
          <g key={si}>
            {/* stud side cylinder */}
            <rect x={x - 14} y="28" width="28" height="14" rx="4" fill={dk} />
            {/* stud top ellipse */}
            <ellipse cx={x} cy="28" rx="14" ry="6" fill={lt} />
          </g>
        ))}

        {/* ── main block face ── */}
        <polygon points={face} fill={c} />

        {/* ── bevel highlights ── */}
        <polygon points="32,50 100,50 72,78 4,78" fill={lt} opacity="0.45" />
        <polygon points="168,50 196,78 196,90 168,62" fill={darken(c, 15)} opacity="0.6" />

        {/* ── inner groove ── */}
        <polygon points={inner} fill="none" stroke={dk} strokeWidth="1.2" opacity="0.55" />

        {/* ── right side face (depth) ── */}
        <polygon points="196,78 212,66 212,166 196,178" fill={dk} />

        {/* ── bottom face ── */}
        <polygon points="32,206 168,206 196,178 212,166 168,220 32,220 4,206" fill={bot} />

        {/* ── icon ── */}
        <g transform="translate(100,118)">
          <PillarIcon type={pillar.icon} />
        </g>

        {/* ── label ── */}
        {pillar.lines.map((ln, li) => (
          <text
            key={li}
            x="100"
            y={pillar.lines.length > 1 ? 170 + li * 17 : 174}
            textAnchor="middle"
            fill="white"
            fontFamily="'Fredoka One', 'Exo 2', Arial Black, sans-serif"
            fontSize="12.5"
            fontWeight="700"
            letterSpacing="1.8"
          >
            {ln}
          </text>
        ))}
      </svg>
    </div>
  );
}

/* ─── Mascot ─────────────────────────────────────────────────────────────── */
function Mascot() {
  return (
    <svg viewBox="0 0 140 160" xmlns="http://www.w3.org/2000/svg" className="srv-mascot-svg">
      {/* bubble helmet */}
      <ellipse cx="70" cy="62" rx="46" ry="50" fill="rgba(180,210,255,0.12)" stroke="rgba(200,230,255,0.35)" strokeWidth="1.5" />
      {/* helmet shine */}
      <ellipse cx="56" cy="44" rx="14" ry="18" fill="rgba(255,255,255,0.08)" />

      {/* body */}
      <ellipse cx="70" cy="82" rx="32" ry="34" fill="#6B4FCF" />
      {/* body shine */}
      <ellipse cx="60" cy="68" rx="11" ry="14" fill="#8B70E8" opacity="0.65" />

      {/* eyes */}
      <circle cx="60" cy="84" r="6" fill="#180f38" />
      <circle cx="80" cy="84" r="6" fill="#180f38" />
      <circle cx="61.5" cy="82.5" r="2.2" fill="white" />
      <circle cx="81.5" cy="82.5" r="2.2" fill="white" />

      {/* smile */}
      <path d="M63 95 Q70 103 77 95" fill="none" stroke="#180f38" strokeWidth="1.8" strokeLinecap="round" />

      {/* lego studs hat */}
      {[52, 70, 88].map((x, i) => (
        <g key={i}>
          <rect x={x - 8} y="26" width="16" height="10" rx="3.5" fill="#2563EB" />
          <ellipse cx={x} cy="26" rx="8" ry="4" fill="#60A5FA" />
        </g>
      ))}

      {/* tentacle legs */}
      {[-24, -8, 8, 24].map((dx, i) => (
        <path key={i}
          d={`M${70 + dx} 112 Q${70 + dx + (i % 2 === 0 ? 6 : -6)} 130 ${70 + dx + (i % 2 === 0 ? -3 : 3)} 148`}
          fill="none" stroke="#5a3fbf" strokeWidth="9" strokeLinecap="round" />
      ))}
    </svg>
  );
}

/* ─── Sparkle canvas (stars + dots) ─────────────────────────────────────── */
function SparkleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d")!;
    let raf: number;

    const resize = () => { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; r: number; phase: number; speed: number; kind: "star" | "dot" };
    const pts: P[] = Array.from({ length: 55 }, (_, i) => ({
      x: (i * 37 + 11) % 100 / 100, y: (i * 53 + 7) % 100 / 100,
      r: (i % 4) + 1.5, phase: i * 0.61, speed: 0.015 + i * 0.001,
      kind: i % 3 === 0 ? "star" : "dot",
    }));

    const drawStar = (cx: number, cy: number, r: number, a: number) => {
      ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = "#fff"; ctx.lineWidth = 0.9;
      ctx.beginPath();
      for (let k = 0; k < 4; k++) {
        const ang = (k * Math.PI) / 2;
        ctx.moveTo(cx + Math.cos(ang) * r * 2.8, cy + Math.sin(ang) * r * 2.8);
        ctx.lineTo(cx - Math.cos(ang) * r * 0.4, cy - Math.sin(ang) * r * 0.4);
      }
      ctx.stroke(); ctx.restore();
    };

    let t = 0;
    const tick = () => {
      t += 0.018; ctx.clearRect(0, 0, cv.width, cv.height);
      for (const p of pts) {
        const a = Math.abs(Math.sin(p.phase + t * p.speed * 20)) * 0.85;
        const cx = p.x * cv.width, cy = p.y * cv.height;
        if (p.kind === "star") drawStar(cx, cy, p.r, a);
        else { ctx.beginPath(); ctx.arc(cx, cy, p.r * 0.55, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${a * 0.7})`; ctx.fill(); }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} className="srv-sparkle" />;
}

/* ─── Main export ────────────────────────────────────────────────────────── */
export const Services = () => (
  <section id="services" className="srv-section">
    {/* deep navy animated wave background */}
    <div className="srv-bg" />

    {/* twinkling stars + dot particles */}
    <SparkleCanvas />

    {/* floating mascot character */}
    <div className="srv-mascot-wrap">
      <Mascot />
    </div>

    <h2 className="srv-title">SERVICES &amp; PILLARS</h2>

    <div className="srv-blocks">
      {PILLARS.map((p, i) => <LegoBlock key={i} pillar={p} index={i} />)}
    </div>
  </section>
);
