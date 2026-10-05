"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function AosInit() {
  useEffect(() => {
    // On phones blocks slide in from alternating sides; on larger screens they rise top to bottom.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      document.querySelectorAll<HTMLElement>('[data-aos="fade-up"]').forEach((el, i) => {
        el.setAttribute("data-aos", i % 2 === 0 ? "fade-right" : "fade-left");
      });
    }
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 40,
      disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, []);
  return null;
}
