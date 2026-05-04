'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import Image from "next/image";

export default function PixForm() {
  const containerRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
    });

    tl.from(".pix-title", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    .from(".pix-card", {
      scale: 0.9,
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.4")
    .from(".pix-item", {
      x: -20,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.2");

  }, { scope: containerRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    alert(`Obrigado pelo carinho, ${name}!`);
    setName("");
  };

  return (
    <section
      ref={containerRef}
      id="presentes"
      className="relative min-h-screen py-24 px-6 flex flex-col items-center justify-center z-10"
    >
      <div className="max-w-5xl w-full text-center text-white">
        <h2 className="pix-title wedding-title text-[50px] md:text-[70px] mb-12">
          Lista de Presentes
        </h2>

        <div className="pix-card bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl flex flex-col md:flex-row gap-12 items-center justify-between">
          
          <div className="flex-1 flex flex-col items-center text-center">
            <div className="pix-item bg-white p-4 rounded-xl shadow-inner mb-6 relative w-[220px] h-[220px]">
              {/* Usando uma imagem genérica de QR Code do Unsplash temporariamente */}
              <Image
                src="https://images.unsplash.com/photo-1595054224765-5c1dfa009087?q=80&w=600&auto=format&fit=crop"
                alt="QR Code PIX"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <p className="pix-item font-montserrat text-lg text-white/90 font-medium">
              Escaneie o QR Code ou use a chave PIX:
            </p>
            <p className="pix-item font-montserrat font-bold text-xl mt-2 select-all bg-black/20 py-2 px-4 rounded-lg">
              yuri.lara@casamento.com
            </p>
          </div>

          <div className="hidden md:block w-px h-64 bg-white/20"></div>

          <div className="flex-1 w-full max-w-md">
            <h3 className="pix-item font-montserrat text-2xl font-bold mb-4 text-white/95">
              Deixe sua mensagem
            </h3>
            <p className="pix-item font-montserrat text-white/80 mb-8">
              Sua presença é o nosso maior presente. Mas se quiser nos abençoar com algo a mais, ficaremos muito gratos!
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="pix-item flex flex-col items-start w-full">
                <label htmlFor="name" className="font-montserrat text-sm mb-2 text-white/80">
                  Seu Nome
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: João Silva"
                  className="w-full bg-white/5 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/70 transition-colors"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="pix-item w-full bg-white text-black font-bold font-montserrat py-4 rounded-xl mt-2 hover:bg-white/90 transition-colors shadow-lg active:scale-95 duration-200"
              >
                Enviar e Confirmar
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
