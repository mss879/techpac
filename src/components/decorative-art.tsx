"use client";

import { useId, type CSSProperties } from "react";

// The track and its particle share one geometry, including at every loop seam.
const ORBIT_PATH = "M224 110a104 54 0 1 1-208 0a104 54 0 1 1 208 0Z";
const ORBIT_PLANES = [
  { angle: -25, duration: 14, phase: 0.12, radius: 5.2 },
  { angle: 35, duration: 19, phase: 0.54, radius: 4 },
  { angle: 90, duration: 23, phase: 0.79, radius: 3.3 },
];

export function OrbitArtwork() {
  const id = useId();
  return <div className="orbital-art" aria-hidden="true" data-decorative-motion="true" data-motion-active="false">
    <svg viewBox="0 0 240 220" width="240" height="220" fill="none" data-orbit-geometry="shared-path">
      <defs>
        <linearGradient id={`${id}-track`} x1="120" y1="56" x2="120" y2="164" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a7c8b2" stopOpacity=".24" />
          <stop offset="1" stopColor="#a7c8b2" stopOpacity=".78" />
        </linearGradient>
        <radialGradient id={`${id}-sphere`} cx="32%" cy="26%" r="76%">
          <stop stopColor="#e5f6d9" /><stop offset=".4" stopColor="#a9dca4" /><stop offset="1" stopColor="#4d936f" />
        </radialGradient>
        <radialGradient id={`${id}-light`}>
          <stop stopColor="#a9dca4" stopOpacity=".09" /><stop offset="1" stopColor="#a9dca4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="120" cy="110" r="55" fill={`url(#${id}-light)`} />
      {ORBIT_PLANES.map(({ angle, duration, phase, radius }) => <g key={angle} className="orbit-plane" transform={`rotate(${angle} 120 110)`}>
        <path className="orbit-track" d={ORBIT_PATH} stroke={`url(#${id}-track)`} strokeWidth=".85" />
        <g className="orbit-particle motion-layer" style={{
          offsetPath: `path("${ORBIT_PATH}")`,
          offsetDistance: `${phase * 100}%`,
          "--orbit-duration": `${duration}s`,
          "--orbit-delay": `${-duration * phase}s`,
        } as CSSProperties}>
          <g className="orbit-particle-depth motion-layer">
            <circle r={radius + 3} fill="#a9dca4" opacity=".08" />
            <circle className="orbit-sphere" r={radius} fill={`url(#${id}-sphere)`} />
          </g>
        </g>
      </g>)}
      <g className="orbit-core-svg" strokeWidth="1.5" strokeLinecap="round" stroke="currentColor"><path d="M120 97v26m-13-13h26" /></g>
    </svg>
  </div>;
}

export function SparkArtwork() {
  return <span className="hero-spark" aria-hidden="true" data-decorative-motion="true" data-motion-active="false">
    <svg className="spark-rotation motion-layer" viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M32 4v56M4 32h56M12 12l40 40M12 52l40-40" />
    </svg>
  </span>;
}
