"use client";

import { useEffect } from "react";

/** One observer, one reveal per element, and no JavaScript scroll loop. */
export default function ScrollMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = Array.from(document.querySelectorAll<HTMLElement>(
      ".section-heading,.about-heading,.solution-card,.detail-copy,.detail-products,.infrastructure-image,.about-copy,.company-stats>div,.approach-step,.story-card,.testimonial-label,.testimonial-body,.faq-intro,.faq-item,.contact-details,.contact-form,.footer-top"
    ));
    let observer: IntersectionObserver | undefined;

    function prepare() {
      observer?.disconnect();
      targets.forEach(element => {
        delete element.dataset.reveal;
        element.style.removeProperty("--reveal-delay");
      });
      if (preference.matches || !("IntersectionObserver" in window)) return;

      // Read positions together before writes, avoiding repeated forced layout.
      const positions = targets.map(element => ({element, top:element.getBoundingClientRect().top}));
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.reveal = "visible";
          observer?.unobserve(entry.target);
        });
      }, { rootMargin:"0px 0px -24px 0px", threshold:0.06 });

      positions.forEach(({element,top}) => {
        // Above-the-fold content stays visible from the server-rendered HTML.
        if (top < window.innerHeight-24) return;
        const parent = element.parentElement;
        const stagger = parent?.matches(".solution-grid,.story-grid,.approach-steps,.company-stats")
          ? Array.from(parent.children).indexOf(element)%3*65 : 0;
        element.style.setProperty("--reveal-delay",`${stagger}ms`);
        element.dataset.reveal = "pending";
        observer?.observe(element);
      });
    }

    prepare();
    preference.addEventListener("change",prepare);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change",prepare);
      targets.forEach(element => {
        delete element.dataset.reveal;
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, []);
  return null;
}
