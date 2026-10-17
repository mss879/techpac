"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

const customers = [
  ["dimo-logo", "DIMO"],
  ["maliban-logo", "Maliban"],
  ["bppl-logo", "BPPL Holdings"],
  ["gtn-logo", "GTN Technologies"],
  ["teejay", "Teejay Lanka"],
];

export default function LogoMarquee() {
  const [paused, setPaused] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const updateVisibility = () => { element.dataset.tabVisible = String(!document.hidden); };
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    if (!("IntersectionObserver" in window)) {
      element.dataset.inView = "true";
      return () => document.removeEventListener("visibilitychange", updateVisibility);
    }
    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.inView = String(entry.isIntersecting);
    }, { threshold: 0 });
    observer.observe(element);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  return <section className="trust wrap" aria-label="Selected customers">
    <div className="trust-label">
      <div><span className="eyebrow">IN GOOD COMPANY</span><p>Trusted by businesses<br />moving Sri Lanka forward.</p></div>
      <button className="marquee-toggle" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? "Play logo animation" : "Pause logo animation"}>
        {paused ? <Play size={11} aria-hidden="true" /> : <Pause size={11} aria-hidden="true" />}
        <span>{paused ? "Play" : "Pause"}</span>
      </button>
    </div>
    <div ref={viewport} className="logo-marquee" data-in-view="false" data-tab-visible="true" data-paused={paused}>
      <div className="logo-track">
        {[0,1].map(copy => <ul className="logo-group" key={copy} aria-hidden={copy===1 ? true : undefined}>
          {customers.map(([file,name]) => <li key={file} className={`logo-item logo-${file}`}>
            <img src={`/brand/optimized/${file}.webp`} alt={copy===0?name:""} width="140" height="68" loading="lazy" decoding="async" />
          </li>)}
        </ul>)}
      </div>
    </div>
  </section>;
}
