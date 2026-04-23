'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const petals = [
  { img: 1, top: "8%", left: "12%", size: 55, rotate: -20, speed: 130 },
  { img: 2, top: "18%", left: "72%", size: 42, rotate: 25, speed: 190 },
  { img: 3, top: "34%", left: "7%", size: 70, rotate: 40, speed: 160 },
  { img: 4, top: "48%", left: "86%", size: 58, rotate: -35, speed: 220 },
  { img: 5, top: "66%", left: "18%", size: 45, rotate: 15, speed: 140 },

  { img: 1, top: "78%", left: "62%", size: 60, rotate: -10, speed: 180 },
  { img: 2, top: "12%", left: "42%", size: 38, rotate: 60, speed: 120 },
  { img: 3, top: "28%", left: "92%", size: 50, rotate: -50, speed: 210 },
  { img: 4, top: "58%", left: "39%", size: 36, rotate: 25, speed: 150 },
  { img: 5, top: "82%", left: "84%", size: 75, rotate: -25, speed: 240 },

  { img: 1, top: "105%", left: "10%", size: 52, rotate: 35, speed: 190 },
  { img: 2, top: "118%", left: "74%", size: 44, rotate: -15, speed: 150 },
  { img: 3, top: "132%", left: "28%", size: 62, rotate: 50, speed: 230 },
  { img: 4, top: "145%", left: "90%", size: 48, rotate: -40, speed: 170 },
  { img: 5, top: "158%", left: "51%", size: 68, rotate: 20, speed: 260 },
];

const flowers = [
  {
    src: "/flor-esq.png",
    bottom: "-6%",
    left: "-4%",
    size: "clamp(220px, 28vw, 460px)",
    rotate: -8,
    speed: 120,
    xDir: -1,
  },
  {
    src: "/flor-dir.png",
    top: "-6%",
    right: "-4%",
    size: "clamp(220px, 28vw, 460px)",
    rotate: 8,
    speed: 150,
    xDir: 1,
  },
];

function TopOrnament() {
  return (
    <svg
      className="wedding-svg-line wedding-svg-line-top"
      viewBox="0 0 520 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 45H203"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M317 45H496"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="45" r="4" fill="currentColor" />
      <circle cx="496" cy="45" r="4" fill="currentColor" />

      <path
        d="M260 47C250 34 232 31 226 43C219 58 243 65 260 78C277 65 301 58 294 43C288 31 270 34 260 47Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />

      <path
        d="M245 51C231 52 218 58 208 69"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M275 51C289 52 302 58 312 69"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="M236 63C228 63 221 66 215 72"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M284 63C292 63 299 66 305 72"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SmallOrnament() {
  return (
    <svg
      className="wedding-svg-line wedding-svg-line-small"
      viewBox="0 0 380 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 35H145"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M235 35H362"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M190 18C183 29 176 35 162 35C176 35 183 41 190 52C197 41 204 35 218 35C204 35 197 29 190 18Z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />

      <path
        d="M174 24C183 27 187 31 190 35C193 31 197 27 206 24"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M174 46C183 43 187 39 190 35C193 39 197 43 206 46"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <circle cx="155" cy="35" r="2.5" fill="currentColor" />
      <circle cx="225" cy="35" r="2.5" fill="currentColor" />
    </svg>
  );
}

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
      )
      .from(
        ".flower-parallax",
        {
          opacity: 0,
          scale: 0.82,
          y: 55,
          filter: "blur(8px)",
          stagger: 0.16,
          duration: 1.5,
          ease: "power3.out",
        },
        "-=0.75"
      )
      .from(
        ".petal",
        {
          opacity: 0,
          scale: 0.4,
          stagger: 0.06,
          duration: 1.4,
          ease: "power3.out",
        },
        "-=1"
      );

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

    parallaxTl.to(
      ".casamento-wrap",
      {
        y: 90,
        ease: "none",
      },
      0
    );

    gsap.utils.toArray<HTMLElement>(".flower-parallax").forEach((flower) => {
      const speed = Number(flower.dataset.speed || 120);
      const xDir = Number(flower.dataset.xdir || 1);

      parallaxTl.to(
        flower,
        {
          y: -speed * 0.55,
          x: speed * 0.12 * xDir,
          rotation: `+=${speed * 0.04 * xDir}`,
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

      parallaxTl.to(
        petal,
        {
          y: -speed,
          x: speed * 0.8,
          rotation: `+=${speed * 0.25}`,
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
      split.revert();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <main id="scene" className="relative min-h-[200vh] overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-parallax absolute inset-[-8%]">
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

      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
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

      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
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

      <section
        id="hero"
        className="relative h-screen flex items-center justify-center"
      >
        <div className="casamento-wrap relative z-10 flex flex-col items-center justify-center text-center px-6">
          <div className="wedding-ornament">
            <TopOrnament />
          </div>

          <h1 id="casamento" className="wedding-title text-[90px]">
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

      <section className="relative h-screen flex items-center justify-center">
        <div className="relative z-10 text-white text-4xl drop-shadow-2xl">
          Segunda section
        </div>
      </section>
    </main>
  );
}