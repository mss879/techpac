export function OrbitArtwork() {
  return <div className="orbital-art" aria-hidden="true" data-decorative-motion="true" data-motion-active="false">
    <svg viewBox="0 0 240 220" width="240" height="220" fill="none">
      <g className="orbit-rotation motion-layer" stroke="currentColor" strokeWidth="1.2">
        <ellipse cx="120" cy="110" rx="104" ry="54" transform="rotate(-25 120 110)" />
        <ellipse cx="120" cy="110" rx="104" ry="54" transform="rotate(35 120 110)" />
        <ellipse cx="120" cy="110" rx="104" ry="54" transform="rotate(90 120 110)" />
      </g>
      <g className="orbit-satellite motion-layer"><circle cx="214" cy="110" r="5.5" /></g>
      <g className="orbit-satellite orbit-satellite-secondary motion-layer"><circle cx="120" cy="16" r="3" /></g>
      <g className="orbit-core-svg motion-layer" strokeWidth="2" strokeLinecap="round" stroke="currentColor"><path d="M120 94v32m-16-16h32" /></g>
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
