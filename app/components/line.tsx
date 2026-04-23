'use client';

import { useEffect } from "react";
import gsap from "gsap";

interface LineSVGProps {
  className?: string;
}

export default function LineSVG({ className = "" }: LineSVGProps) {
  useEffect(() => {
    const path = document.querySelector("#linha") as SVGPathElement;
    const length = path.getTotalLength();

    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.out",
    });
  }, []);

  return (
    <svg
      width="400"
      height="120"
      viewBox="0 0 400 120"
      className={`absolute bottom-0 left-1/2 -translate-x-1/2 ${className}`}
    >
      <path
        id="linha"
        d="M20 60 Q200 10 380 60"
        fill="none"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}