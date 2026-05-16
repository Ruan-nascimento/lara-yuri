'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { TopOrnament, SmallOrnament } from "./Ornaments";
import { useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;

    // We recreate the SplitText just for this component
    const split = new SplitText("#casamento", { type: "chars" });

    const introTl = gsap.timeline();

    introTl
      .from(split.chars, {
        opacity: 0,
        y: 50,
        stagger: 0.06,
        duration: 0.8,
        ease: "power3.out",
      })
      .from(
        ".wedding-ornament",
        {
          opacity: 0,
          scaleX: 0.65,
          y: 12,
          stagger: 0.16,
          duration: 1.1,
          ease: "power3.out",
        },
        "-=0.35"
      )
      .from(
        "#verso .verso-line",
        {
          opacity: 0,
          y: 18,
          stagger: 0.18,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.15"
      );

    return () => {
      split.revert();
    };
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative h-screen flex items-center justify-center"
    >
      <div className="casamento-wrap relative z-10 flex flex-col items-center justify-center text-center px-6">
        <div className="wedding-ornament">
          <TopOrnament />
        </div>

        <h1 id="casamento" className="wedding-title text-[30px] md:text-[50px] lg:text-[90px]">
          Yuri & Lara
        </h1>

        <div className="wedding-ornament">
          <SmallOrnament />
        </div>

        <h2 id="verso" className="wedding-verse">
          <span className="verso-line wedding-verse-ref">
            Eclesiastes 3:1
          </span>
          <span className="verso-line">
            Tudo tem o seu tempo determinado,
          </span>
          <span className="verso-line">
            e há tempo para todo propósito debaixo do céu
          </span>
        </h2>
      </div>
    </section>
  );
}
