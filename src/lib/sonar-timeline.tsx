"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

// Minimal timeline runtime ported from the Cloud Design landing artifact (animations.jsx) —
// just what the Sonar intro needs: easings, clamp, interpolate, animate, and a RAF clock that
// runs 0 → duration once and then HOLDS the end-state (ambient loops are CSS). No dev scrubber.

export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

type Ease = (t: number) => number;

export const Easing: Record<string, Ease> = {
  linear: (t) => t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => --t * t * t + 1,
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeInSine: (t) => 1 - Math.cos((t * Math.PI) / 2),
  easeOutSine: (t) => Math.sin((t * Math.PI) / 2),
  easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
};

/** interpolate([0,0.5,1],[0,100,50], ease?) -> fn(t). Optional per-segment easing array. */
export function interpolate(input: number[], output: number[], ease: Ease | Ease[] = Easing.linear) {
  return (t: number) => {
    if (t <= input[0]) return output[0];
    if (t >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const span = input[i + 1] - input[i];
        const local = span === 0 ? 0 : (t - input[i]) / span;
        const easeFn = Array.isArray(ease) ? ease[i] || Easing.linear : ease;
        return output[i] + (output[i + 1] - output[i]) * easeFn(local);
      }
    }
    return output[output.length - 1];
  };
}

/** animate({from,to,start,end,ease})(t) — single-segment tween, clamped outside [start,end]. */
export function animate({
  from = 0,
  to = 1,
  start = 0,
  end = 1,
  ease = Easing.easeInOutCubic,
}: {
  from?: number;
  to?: number;
  start?: number;
  end?: number;
  ease?: Ease;
}) {
  return (t: number) => {
    if (t <= start) return from;
    if (t >= end) return to;
    return from + (to - from) * ease((t - start) / (end - start));
  };
}

const TimeContext = createContext(0);
export const useTime = () => useContext(TimeContext);

/**
 * Fixed full-screen stage. Runs a RAF clock 0 → duration then holds at duration (end-state),
 * and scales the fixed 1600×900 canvas to fit the viewport (letterboxed by the abyss background,
 * which matches the scene edges so the bars are invisible).
 */
export function SonarStage({
  width = 1600,
  height = 900,
  duration = 10,
  children,
}: {
  width?: number;
  height?: number;
  duration?: number;
  children: React.ReactNode;
}) {
  const [t, setT] = useState(0);
  const [scale, setScale] = useState(1);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let raf = 0;
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = (now - startRef.current) / 1000;
      setT(Math.min(elapsed, duration));
      if (elapsed < duration) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  useEffect(() => {
    const onResize = () => setScale(Math.min(window.innerWidth / width, window.innerHeight / height));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [width, height]);

  return (
    <div className="sonar-stage">
      <div style={{ width, height, transform: `scale(${scale})`, position: "relative" }}>
        <TimeContext.Provider value={t}>{children}</TimeContext.Provider>
      </div>
    </div>
  );
}
