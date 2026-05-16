'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";

interface Guest {
  id: string;
  name: string;
  confirmed: boolean;
}

export default function PixForm() {
  const containerRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetch('/api/guests')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setGuests(data);
      })
      .catch(console.error);
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
    });

    tl.fromTo(".rsvp-title", {
      y: 30,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    })
    .fromTo(".rsvp-card", {
      scale: 0.9,
      y: 40,
      opacity: 0,
    }, {
      scale: 1,
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.4")
    .fromTo(".rsvp-item", {
      y: 20,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.2");

  }, { scope: containerRef });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    setMessage(null);

    if (val.trim().length > 0) {
      const filtered = guests.filter(g => 
        g.name.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 5); // limite a 5 para não quebrar o layout
      
      setFilteredGuests(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelectGuest = (selectedName: string) => {
    setName(selectedName);
    setShowDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ text: data.message, type: 'success' });
        setName("");
        setShowDropdown(false);
        // Atualizar estado local para refletir a confirmação
        setGuests(prev => prev.map(g => g.name === name ? { ...g, confirmed: true } : g));
      } else {
        setMessage({ text: data.error, type: 'error' });
      }
    } catch (err) {
      setMessage({ text: "Erro de conexão, tente novamente.", type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={containerRef}
      id="presenca"
      className="relative min-h-screen py-24 px-6 flex flex-col items-center justify-center z-10"
    >
      <div className="max-w-4xl w-full text-center text-white">
        <h2 className="rsvp-title wedding-title text-[40px] md:text-[60px] mb-12 opacity-0">
          Confirme sua Presença
        </h2>

        <div className="rsvp-card opacity-0 bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl flex flex-col gap-10 items-center justify-center">
          
          <div className="w-full max-w-md">
            <h3 className="rsvp-item opacity-0 font-montserrat text-2xl font-bold mb-4 text-white/95">
              Estamos muito felizes!
            </h3>
            <p className="rsvp-item opacity-0 font-montserrat text-white/80 mb-8 leading-relaxed">
              Por favor, insira o seu nome como está no convite para confirmarmos a sua presença neste dia tão especial.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="rsvp-item opacity-0 flex flex-col items-start w-full relative z-50">
                <label htmlFor="name" className="font-montserrat text-sm mb-2 text-white/80 font-medium">
                  Seu Nome
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  onFocus={() => {
                    if (name.trim() && filteredGuests.length > 0) setShowDropdown(true);
                  }}
                  onBlur={() => {
                    // Timeout para permitir que o clique no dropdown registre antes de esconder
                    setTimeout(() => setShowDropdown(false), 200);
                  }}
                  placeholder="Comece a digitar seu nome..."
                  className="w-full bg-white/5 border border-white/30 rounded-xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-white/90 focus:bg-white/10 transition-all"
                  required
                  autoComplete="off"
                />
                
                {/* Dropdown Autocomplete */}
                {showDropdown && filteredGuests.length > 0 && (
                  <ul className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl overflow-hidden shadow-2xl z-50 border border-gray-200">
                    {filteredGuests.map((guest) => (
                      <li
                        key={guest.id}
                        onClick={() => handleSelectGuest(guest.name)}
                        className={`px-5 py-3 text-left font-montserrat text-black cursor-pointer hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0 flex justify-between items-center ${guest.confirmed ? 'opacity-60 bg-gray-50' : ''}`}
                      >
                        <span className="font-semibold">{guest.name}</span>
                        {guest.confirmed && <span className="text-[10px] uppercase tracking-wider font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">Confirmado</span>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="rsvp-item opacity-0 w-full bg-white text-black font-bold font-montserrat py-4 rounded-xl mt-2 hover:bg-white/90 transition-all shadow-lg active:scale-95 duration-200 disabled:opacity-50"
              >
                {loading ? "Verificando..." : "Confirmar Presença"}
              </button>
            </form>

            {message && (
              <div className={`rsvp-item opacity-0 mt-6 p-4 rounded-xl font-montserrat text-sm border ${message.type === 'success' ? 'bg-green-500/20 border-green-500/50 text-green-100' : 'bg-red-500/20 border-red-500/50 text-red-100'}`}>
                {message.text}
              </div>
            )}
          </div>

          <div className="rsvp-item opacity-0 w-full h-px bg-white/20 my-2"></div>

          <div className="rsvp-item opacity-0 text-center">
            <h4 className="font-montserrat font-bold text-xl text-white/95 mb-2">
              Presentes
            </h4>
            <p className="font-montserrat text-white/80 text-sm max-w-sm mx-auto leading-relaxed">
              A sua presença é o nosso maior presente! Mas, caso deseje nos abençoar com algo a mais, por favor, entre em contato conosco.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
