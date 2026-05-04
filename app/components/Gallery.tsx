'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop",
    title: "Nossa História",
    text: "Tudo começou com um olhar, e hoje estamos prestes a dizer sim para o resto de nossas vidas.",
  },
  {
    img: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2000&auto=format&fit=crop",
    title: "Companheirismo",
    text: "Cada momento juntos tem sido uma aventura inesquecível.",
  },
  {
    img: "https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=2000&auto=format&fit=crop",
    title: "Alegria",
    text: "Nossos sorrisos se encontram e o mundo faz mais sentido.",
  },
  {
    img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop",
    title: "O Grande Dia",
    text: "Mal podemos esperar para compartilhar esse momento tão especial com vocês.",
  },
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !pinRef.current) return;

    const sections = gsap.utils.toArray(".gallery-slide");
    
    // Set initial state
    gsap.set(sections.slice(1), { autoAlpha: 0, scale: 1.1 });
    gsap.set(".gallery-text-wrap", { y: 30, autoAlpha: 0 });
    gsap.set(".gallery-text-wrap:nth-child(1)", { y: 0, autoAlpha: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        pin: pinRef.current,
        scrub: 1,
      },
    });

    sections.forEach((section, i) => {
      if (i === 0) return; // Skip first slide as it's already visible
      
      const prevSection = sections[i - 1] as HTMLElement;
      const prevText = document.querySelectorAll(".gallery-text-wrap")[i - 1];
      const currentText = document.querySelectorAll(".gallery-text-wrap")[i];

      tl.to(prevText, { y: -30, autoAlpha: 0, duration: 1 }, `slide${i}`)
        .to(prevSection, { autoAlpha: 0, duration: 1 }, `slide${i}`)
        .to(section as HTMLElement, { autoAlpha: 1, scale: 1, duration: 1 }, `slide${i}`)
        .to(currentText, { y: 0, autoAlpha: 1, duration: 1 }, `slide${i}`);
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full">
      <div ref={pinRef} className="sticky top-0 h-screen w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="gallery-slide absolute inset-0 h-full w-full"
          >
            <Image
              src={slide.img}
              alt={slide.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <div className="relative w-full max-w-2xl">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="gallery-text-wrap absolute top-1/2 left-0 w-full -translate-y-1/2 text-white drop-shadow-2xl"
              >
                <h3 className="font-montserrat text-4xl font-bold md:text-6xl mb-4">
                  {slide.title}
                </h3>
                <p className="font-montserrat text-lg md:text-2xl text-white/90">
                  {slide.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
