'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

const rulesList = [
  {
    title: "Data",
    desc: "17 de Outubro de 2026. Estamos ansiosos para celebrar com você!",
    icon: "📅",
  },
  {
    title: "Horário",
    desc: "A cerimônia terá início pontualmente às 15:30. Pedimos que cheguem com antecedência.",
    icon: "⏰",
  },
  {
    title: "Local",
    desc: "Rua Eurico Marinho, casa do Júnior Pirauá.",
    icon: "📍",
  },
  {
    title: "Dress Code: Traje",
    desc: "Sugerimos traje Esporte Fino. Venha elegante e confortável para aproveitarmos muito.",
    icon: "👔",
  },
  {
    title: "Dress Code: Cores",
    desc: "Evitem o uso das cores Branco (exclusivo da noiva) e Marsala (cor do casamento).",
    icon: "👗",
  },
  {
    title: "Fotos e Celulares",
    desc: "Sintam-se livres para tirar fotos, mas pedimos gentilmente que evitem usar flash na cerimônia.",
    icon: "📱",
  },
  {
    title: "Aproveite a Festa!",
    desc: "O mais importante para nós é que todos se divirtam muito nesse dia especial.",
    icon: "🥂",
  }
];

export default function Rules() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(".rule-card", 
      {
        y: 50,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      }
    );

    gsap.fromTo(".rules-title", 
      {
        y: 30,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }
    );

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="regras"
      className="relative min-h-screen py-24 px-6 flex flex-col items-center justify-center z-10"
    >
      <div className="absolute inset-0 bg-black/20 -z-10 backdrop-blur-sm"></div>

      <div className="max-w-6xl w-full text-center text-white">
        <h2 className="rules-title wedding-title text-[20px] md:text-[40px] mb-12 opacity-0">
          Informações Importantes
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rulesList.map((rule, index) => (
            <div
              key={index}
              className="rule-card opacity-0 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-left shadow-xl hover:bg-white/20 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              <div className="text-4xl mb-4 transform hover:scale-110 transition-transform duration-300 origin-left">{rule.icon}</div>
              <h3 className="font-montserrat text-lg font-bold mb-2 text-white/95">
                {rule.title}
              </h3>
              <p className="font-montserrat text-white/80 leading-relaxed text-sm flex-grow">
                {rule.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
