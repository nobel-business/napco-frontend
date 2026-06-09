"use client";

import { useMemo } from "react";
import { SonarStage, useTime, Easing, interpolate, animate, clamp } from "@/lib/sonar-timeline";

// NAPCO Aqua "Sonar acquisition" brand intro — ported from the Cloud Design artifact (scene.jsx).
// A deep-ocean atmosphere + sonar sweep "paints" the brand fish + wordmark into being, ending on
// the glowing lockup with an Enter cue. Pure SVG + CSS; colours use the site's Aquatech tokens.

const CW = 1600,
  CH = 900;
const S = 2.25;
const SVG_L = 800 - 119.5 * S;
const SVG_T = 392 - 32 * S;
const FX = SVG_L + 60 * S;
const FY = SVG_T + (26 + 6) * S;
const LOCK_CX = 800;

const PARTS = [
  "M11,9 L23,16 L23,27 L10,31 L15,20 Z",
  "M23,15 L82,15 L82,42 C74,45 67,46 60,44 C50,42 40,37 31,30 C27,26 24,21 23,16 Z",
  "M59,13 L82,2 L82,13 Z",
  "M56,42 L57,51 L66,43 Z",
  "M84,15 L110,15 L111,16 L108,31 C102,36 93,39 85,41 Z",
  "M102,28 L108,29 L106,33 Z",
];
const EYE = { x: 88.3, y: 19.2, w: 3.2, h: 2.8 };
const LAT = { x1: 47, y1: 24, x2: 82, y2: 24 };

const bell = (p: number) => Math.sin(Math.PI * clamp(p, 0, 1));
const eo = Easing.easeOutCubic;

function DeepOcean() {
  return (
    <div className="ocean">
      <div className="ocean__base" />
      <div className="ocean__rays" />
      <div className="caustic a" />
      <div className="caustic b" />
      <div className="caustic c" />
      <div className="vignette" />
    </div>
  );
}

function Particles() {
  const dots = useMemo(() => {
    const r = (a: number, b: number) => a + Math.random() * (b - a);
    return Array.from({ length: 34 }, () => ({
      x: r(0, CW), y: r(60, CH), s: r(1, 2.6), o: r(0.1, 0.4), dur: r(9, 20), delay: r(-20, 0),
    }));
  }, []);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {dots.map((d, i) => (
        <span
          key={i}
          className="particle"
          style={
            {
              left: d.x, top: d.y, width: d.s, height: d.s,
              "--o": d.o, opacity: d.o,
              animation: `sonar-rise ${d.dur}s linear ${d.delay}s infinite`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function Sonar() {
  const t = useTime();
  const gate = interpolate([1.6, 2.0, 6.4, 7.2], [0, 1, 1, 0])(t);
  const maxR = 430,
    cycle = 2.4;
  const rings = [0, 1, 2, 3].map((i) => {
    const p = ((t - 1.6) / cycle + i / 4) % 1;
    const pp = p < 0 ? p + 1 : p;
    return { r: pp * maxR, o: (1 - pp) * gate * 0.5 };
  });
  const sweepAng = (t - 1.6) * 122;

  return (
    <svg width={CW} height={CH} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id="sweepFade" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform={`translate(${FX} ${FY})`}>
          <stop offset="0" stopColor="#54bbd6" stopOpacity="0.0" />
          <stop offset="0.5" stopColor="#54bbd6" stopOpacity="0.10" />
          <stop offset="1" stopColor="#54bbd6" stopOpacity="0.0" />
        </radialGradient>
        <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g opacity={gate * 0.35} stroke="#1f9fc2" fill="none">
        {[120, 250, 380].map((r) => (
          <circle key={r} cx={FX} cy={FY} r={r} strokeWidth="0.6" strokeDasharray="2 6" opacity="0.5" />
        ))}
        <line x1={FX - 430} y1={FY} x2={FX + 430} y2={FY} strokeWidth="0.5" strokeDasharray="2 8" opacity="0.4" />
        <line x1={FX} y1={FY - 300} x2={FX} y2={FY + 300} strokeWidth="0.5" strokeDasharray="2 8" opacity="0.4" />
      </g>

      <g fill="none" stroke="#54bbd6">
        {rings.map((r, i) => (
          <circle key={i} cx={FX} cy={FY} r={r.r} strokeWidth="1.2" opacity={r.o} />
        ))}
      </g>

      <g transform={`rotate(${sweepAng} ${FX} ${FY})`} opacity={gate} style={{ filter: "url(#lineGlow)" }}>
        <path d={`M${FX},${FY} L${FX + 430},${FY - 92} A430,430 0 0 1 ${FX + 430},${FY} Z`} fill="url(#sweepFade)" />
        <line x1={FX} y1={FY} x2={FX + 430} y2={FY} stroke="#9fe6f5" strokeWidth="1.4" opacity="0.9" />
      </g>
    </svg>
  );
}

function Lockup() {
  const t = useTime();
  const rx = interpolate([2.95, 5.3, 5.55, 6.4], [6, 116, 121, 236], [Easing.easeInOutSine, Easing.linear, Easing.easeInOutSine])(t);
  const beamO = interpolate([2.8, 3.05, 6.25, 6.55], [0, 1, 1, 0])(t);
  const wireO = interpolate([2.5, 3.0, 6.4, 7.1], [0, 0.9, 0.9, 0])(t);

  const eyeP = clamp((t - 4.85) / 0.85, 0, 1);
  const eyeOn = t > 4.85 && t < 5.85;

  const sheenP = clamp((t - 6.5) / 1.15, 0, 1);
  const sheenX = -16 + sheenP * 136;
  const sheenO = bell(sheenP) * 0.6;

  const buoyDot = interpolate([6.6, 6.95, 10], [0, 0.95, 0.95])(t);
  const ripP = clamp((t - 6.6) / 0.95, 0, 1);
  const ripOn = t > 6.6 && t < 7.7;

  const wordFrac = clamp((rx - 121) / 111, 0, 1);

  return (
    <div
      style={{
        position: "absolute", left: SVG_L, top: SVG_T,
        width: 240 * S, height: 66 * S, transformOrigin: "center",
        animation: "sonar-lockDrift 9s ease-in-out infinite",
      }}
    >
      <svg width={240 * S} height={66 * S} viewBox="0 -6 240 66" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="fishFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#f3fbfd" />
          </linearGradient>
          <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#54bbd6" stopOpacity="0" />
            <stop offset="1" stopColor="#9fe6f5" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="sheenGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <filter id="haloGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
          <filter id="wireglow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="0.9" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="oglow" x="-300%" y="-300%" width="700%" height="700%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.4" floodColor="#ff782c" floodOpacity="0.9" />
          </filter>
          <clipPath id="revClip">
            <rect x="-30" y="-14" width={rx + 30} height="94" />
          </clipPath>
          <clipPath id="fishClip">
            {PARTS.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </clipPath>
          <mask id="fishHoles">
            <rect x="-30" y="-20" width="300" height="110" fill="black" />
            <g fill="white">
              {PARTS.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>
            <line x1={LAT.x1} y1={LAT.y1} x2={LAT.x2} y2={LAT.y2} stroke="black" strokeWidth="1.7" />
            <rect x={EYE.x} y={EYE.y} width={EYE.w} height={EYE.h} rx="0.5" fill="black" />
          </mask>
        </defs>

        <g fill="none" stroke="#86d8e9" strokeWidth="0.7" strokeLinejoin="round" opacity={wireO} filter="url(#wireglow)">
          {PARTS.map((d, i) => (
            <path key={i} d={d} />
          ))}
          <line x1={LAT.x1} y1={LAT.y1} x2={LAT.x2} y2={LAT.y2} strokeWidth="1.1" />
          <rect x={EYE.x} y={EYE.y} width={EYE.w} height={EYE.h} />
        </g>

        <g clipPath="url(#revClip)">
          <rect x="0" y="-6" width="240" height="66" fill="#bfeefc" mask="url(#fishHoles)" filter="url(#haloGlow)" opacity="0.5" />
          <rect x="0" y="-6" width="240" height="66" fill="url(#fishFill)" mask="url(#fishHoles)" />
        </g>

        <g clipPath="url(#fishClip)" opacity={sheenO}>
          <rect x={sheenX} y="-14" width="11" height="90" fill="url(#sheenGrad)" transform="skewX(-20)" />
        </g>

        {eyeOn && (
          <circle cx={EYE.x + EYE.w / 2} cy={EYE.y + EYE.h / 2} r={1.6 + eyeP * 7} fill="none" stroke="#9fe6f5" strokeWidth="0.6" opacity={(1 - eyeP) * 0.9} />
        )}

        {beamO > 0.001 && (
          <g opacity={beamO} style={{ pointerEvents: "none" }}>
            <rect x={rx - 22} y="-12" width="22" height="90" fill="url(#beamGrad)" />
            <rect x={rx - 0.55} y="-13" width="1.1" height="92" fill="#e9fbff" filter="url(#wireglow)" />
          </g>
        )}

        {ripOn && (
          <circle cx="83" cy="1.5" r={2 + 13 * eo(ripP)} fill="none" stroke="#ff782c" strokeWidth="0.8" opacity={(1 - ripP) * 0.95} />
        )}
        {buoyDot > 0.001 && <circle cx="83" cy="1.5" r="1.7" fill="#ff782c" filter="url(#oglow)" opacity={buoyDot} />}
      </svg>

      <div
        style={{
          position: "absolute", left: 121 * S, top: 19 * S, width: 111 * S, height: 31 * S,
          clipPath: `inset(0 ${(1 - wordFrac) * 100}% 0 0)`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/napco-word.svg"
          alt="NAPCO"
          style={{ position: "absolute", left: 0, top: 0, width: 111 * S, height: 18.2 * S, filter: "drop-shadow(0 0 6px rgba(84,187,214,0.4))" }}
        />
        <div
          style={{
            position: "absolute", left: 2 * S, top: 21.4 * S,
            fontFamily: "var(--font-sans), sans-serif", fontWeight: 300,
            fontSize: 8.4 * S, lineHeight: 1, letterSpacing: "0.22em",
            color: "rgba(255,255,255,0.9)", textShadow: "0 0 6px rgba(84,187,214,0.4)",
            transform: "scaleX(0.96)", transformOrigin: "left top", whiteSpace: "nowrap",
          }}
        >
          AQUA
        </div>
      </div>
    </div>
  );
}

function Reticle() {
  const t = useTime();
  const o = interpolate([2.0, 2.5, 6.4, 7.0], [0, 1, 1, 0])(t);
  const L = FX - 124,
    R = FX + 112,
    T = FY - 70,
    B = FY + 60;
  const k = 16;
  const corner = (x: number, y: number, sx: number, sy: number) => `M${x + sx * k},${y} L${x},${y} L${x},${y + sy * k}`;
  const acquired = t > 6.4;
  const labelO = interpolate([2.0, 2.5, 8.0, 8.8], [0, 1, 1, 0])(t);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <svg width={CW} height={CH} style={{ position: "absolute", inset: 0 }}>
        <g stroke="#54bbd6" strokeWidth="1.3" fill="none" opacity={o} strokeLinecap="round">
          <path d={corner(L, T, 1, 1)} />
          <path d={corner(R, T, -1, 1)} />
          <path d={corner(L, B, 1, -1)} />
          <path d={corner(R, B, -1, -1)} />
        </g>
      </svg>
      <div
        style={{
          position: "absolute", left: L, top: T - 26, opacity: labelO,
          fontFamily: "var(--font-mono), monospace", fontSize: 12, letterSpacing: "0.18em",
          color: acquired ? "#93d6e7" : "#54bbd6", textTransform: "uppercase",
          display: "flex", alignItems: "center", gap: 8,
        }}
      >
        <span
          style={{
            width: 6, height: 6, borderRadius: "50%",
            background: acquired ? "#93d6e7" : "#54bbd6",
            animation: acquired ? "none" : "sonar-blink 1.1s steps(1) infinite",
          }}
        />
        {acquired ? "Target acquired" : "Sonar · acquiring target"}
      </div>
    </div>
  );
}

function Caption() {
  const t = useTime();
  const barW = animate({ from: 0, to: 58, start: 7.2, end: 7.95, ease: Easing.easeOutCubic })(t);
  const ebO = interpolate([7.8, 8.6, 10], [0, 1, 1])(t);
  const ebY = (1 - clamp((t - 7.8) / 0.8, 0, 1)) * 12;
  const enO = interpolate([8.8, 9.6, 10], [0, 1, 1])(t);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute", left: LOCK_CX, top: 500, transform: "translateX(-50%)",
          width: barW, height: 5, borderRadius: 3, background: "#ff782c", boxShadow: "0 0 14px rgba(255,120,44,0.6)",
        }}
      />
      <div
        style={{
          position: "absolute", left: LOCK_CX, top: 522, transform: `translate(-50%, ${ebY}px)`, opacity: ebO,
          color: "#93d6e7", fontFamily: "var(--font-sans), sans-serif", fontSize: 15, fontWeight: 500,
          letterSpacing: "0.34em", textTransform: "uppercase", whiteSpace: "nowrap",
        }}
      >
        Aquaculture&nbsp;&nbsp;·&nbsp;&nbsp;Engineering&nbsp;&nbsp;·&nbsp;&nbsp;Operations
      </div>
      <div
        style={{
          position: "absolute", left: LOCK_CX, top: 770, transform: "translateX(-50%)", opacity: enO,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10, color: "#54bbd6",
          fontFamily: "var(--font-sans), sans-serif",
        }}
      >
        <div style={{ width: 1, height: 30, background: "linear-gradient(#54bbd6,transparent)", opacity: 0.6 }} />
        <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.32em", textTransform: "uppercase" }}>Enter</div>
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none" style={{ animation: "sonar-enterBob 2.4s ease-in-out infinite" }}>
          <path d="M2 2 L10 9 L18 2" stroke="#54bbd6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

/** The full 1600×900 sonar scene, scaled to the viewport. */
export function SonarIntro() {
  return (
    <SonarStage width={CW} height={CH} duration={10}>
      <DeepOcean />
      <Particles />
      <div className="ambient-ring" style={{ left: FX, top: FY, width: 300, height: 300 }} />
      <Sonar />
      <Reticle />
      <Lockup />
      <Caption />
    </SonarStage>
  );
}
