'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";

import { petals, flowers } from "./lib/decorations";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Rules from "./components/Rules";
import PixForm from "./components/PixForm";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function Home() {
  useGSAP(() => {
    const lenis = new Lenis({
      duration: 1.2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const parallaxTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scene",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    parallaxTl.to(
      ".bg-parallax",
      {
        yPercent: -12,
        ease: "none",
      },
      0
    );

    gsap.utils.toArray<HTMLElement>(".flower-parallax").forEach((flower) => {
      const speed = Number(flower.dataset.speed || 120);
      const xDir = Number(flower.dataset.xdir || 1);

      // We multiply the movement by 2 to account for the longer scroll duration
      parallaxTl.to(
        flower,
        {
          y: -speed * 1.5,
          x: speed * 0.3 * xDir,
          rotation: `+=${speed * 0.1 * xDir}`,
          ease: "none",
        },
        0
      );

      const flowerFloat = flower.querySelector(".flower-float");

      gsap.to(flowerFloat, {
        y: "+=16",
        x: `+=${8 * xDir}`,
        rotation: `+=${4 * xDir}`,
        duration: gsap.utils.random(4, 6.5),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: gsap.utils.random(0, 1),
      });
    });

    gsap.utils.toArray<HTMLElement>(".petal").forEach((petal) => {
      const speed = Number(petal.dataset.speed || 150);

      // Increase multiplier due to longer page height
      parallaxTl.to(
        petal,
        {
          y: -speed * 2.5,
          x: speed * 1.5,
          rotation: `+=${speed * 0.5}`,
          ease: "none",
        },
        0
      );

      gsap.to(petal, {
        y: "+=18",
        x: "+=10",
        rotation: "+=8",
        duration: gsap.utils.random(2.8, 5.5),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: gsap.utils.random(0, 1.5),
      });
    });

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <main id="scene" className="relative min-h-[100vh] overflow-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="bg-parallax absolute inset-[-12%] h-[124vh]">
          <Image
            src="/bg.png"
            alt="Background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>
      </div>

      <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
        {flowers.map((flower, index) => (
          <div
            key={index}
            className="flower-parallax absolute will-change-transform"
            data-speed={flower.speed}
            data-xdir={flower.xDir}
            style={{
              top: flower.top,
              right: flower.right,
              bottom: flower.bottom,
              left: flower.left,
              width: flower.size,
              height: flower.size,
              transform: `rotate(${flower.rotate}deg)`,
            }}
          >
            <div className="flower-float relative w-full h-full will-change-transform">
              <Image
                src={flower.src}
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 220px, 460px"
                className="object-contain drop-shadow-[0_0_35px_rgba(255,220,200,0.45)]"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
        {petals.map((petal, index) => (
          <div
            key={index}
            className="petal absolute will-change-transform"
            data-speed={petal.speed}
            style={{
              top: petal.top,
              left: petal.left,
              width: `${petal.size}px`,
              height: `${petal.size}px`,
              transform: `rotate(${petal.rotate}deg)`,
            }}
          >
            <Image
              src={`/petalas/petala-${petal.img}.png`}
              alt=""
              fill
              sizes={`${petal.size}px`}
              className="object-contain drop-shadow-[0_0_18px_rgba(255,220,200,0.55)]"
            />
          </div>
        ))}
      </div>

      {/* Content wrapper should have higher z-index than the fixed decorations? No, decorations should be on top (z=2), but pointer-events-none makes them click-through */}
      <div className="relative z-10">
        <Hero />
        <Gallery />
        <Rules />
        <PixForm />
      </div>
    </main>
  );
}