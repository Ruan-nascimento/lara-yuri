'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

const rulesList = [
  {
    title: "Horário",
    desc: "A cerimônia terá início pontualmente às 16:00. Pedimos que cheguem com 30 minutos de antecedência.",
    icon: "⏰",
  },
  {
    title: "Local",
    desc: "Espaço das Flores - Rua Exemplo, 123. Haverá estacionamento gratuito no local.",
    icon: "📍",
  },
  {
    title: "Dress Code",
    desc: "Passeio Completo. Evite usar tons de branco ou pérola (exclusivos da noiva).",
    icon: "👔",
  },
  {
    title: "Celulares",
    desc: "Sintam-se livres para tirar fotos, mas evitem usar o flash durante a cerimônia.",
    icon: "📱",
  },
  {
    title: "Crianças",
    desc: "Teremos um espaço kids com monitores para garantir a diversão dos pequenos.",
    icon: "🎈",
  },
];

export default function Rules() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from(".rule-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".rules-title", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="regras"
      className="relative min-h-screen py-24 px-6 flex flex-col items-center justify-center z-10"
    >
      <div className="absolute inset-0 bg-black/20 -z-10 backdrop-blur-sm"></div>
      
      <div className="max-w-4xl w-full text-center text-white">
        <h2 className="rules-title wedding-title text-[50px] md:text-[70px] mb-12">
          Informações Importantes
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rulesList.map((rule, index) => (
            <div
              key={index}
              className="rule-card bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-left shadow-xl"
            >
              <div className="text-4xl mb-4">{rule.icon}</div>
              <h3 className="font-montserrat text-xl font-bold mb-2 text-white/95">
                {rule.title}
              </h3>
              <p className="font-montserrat text-white/80 leading-relaxed text-sm">
                {rule.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
