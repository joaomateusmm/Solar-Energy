"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Importante importar explicitamente
import { Layers, MoveLeft, MoveRight, Sparkles, Sun } from "lucide-react";
import React, { useLayoutEffect, useRef } from "react";

export default function RightHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Registra o plugin caso ainda não tenha sido registrado no pai
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".right-anim");

      gsap.fromTo(
        elements,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.8, // Sincronizado com o lado esquerdo
        },
      );

      // Se quisesses adicionar o efeito de saída com ScrollTrigger (como fizemos antes),
      // podias adicionar aqui. Como está com delay fixo, ele entra e fica.
      // Se ele sumir "do nada" ao rolar, é porque o componente Pai (HeroSection)
      // está a remover o componente do DOM quando "visible" fica false.
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* --- BLOCO 2: Botões Flutuantes --- */}
      <div className="z-40 mb-4 flex flex-row justify-end gap-6">
        <button className="right-anim group flex h-15 w-15 cursor-pointer items-center justify-center rounded-full border-2 border-white/10 bg-white/5 opacity-0 shadow-md backdrop-blur-md duration-300 hover:scale-[1.05] hover:active:scale-95">
          <Sun className="h-6.5 w-6.5 text-gray-100 transition-transform duration-500 ease-in-out group-hover:rotate-[180deg]" />
        </button>

        <button className="right-anim group flex h-15 w-15 cursor-pointer items-center justify-center rounded-full border-2 border-white/10 bg-white/5 opacity-0 shadow-md backdrop-blur-md duration-300 hover:scale-[1.05] hover:active:scale-95">
          <Sparkles className="h-6.5 w-6.5 text-gray-100 transition-transform duration-500 ease-in-out group-hover:rotate-[180deg]" />
        </button>

        <button className="right-anim group flex h-15 w-15 cursor-pointer items-center justify-center rounded-full border-2 border-white/10 bg-white/5 opacity-0 shadow-md backdrop-blur-md duration-300 hover:scale-[1.05] hover:active:scale-95">
          <Layers className="h-6.5 w-6.5 text-gray-100 transition-transform duration-500 ease-in-out group-hover:rotate-[180deg]" />
        </button>
      </div>
      {/* --- BLOCO 1: Cartão de Notícias --- */}
      <div className="right-anim right-18 bottom-18 z-40 flex flex-col items-end gap-3 opacity-0">
        <div className="h-[250px] w-[400px] rounded-2xl border-2 border-white/10 bg-white/5 shadow-md backdrop-blur-xs">
          <div className="h-full w-full p-6">
            <div className="flex h-full flex-col justify-center">
              <p className="text-xs leading-relaxed text-white/70">
                Novembro 14, 2025
              </p>
              <div className="mb-2 flex items-center gap-3">
                <h3 className="text-2xl font-bold text-white">
                  Vale a pena Energia Solar em 2025?
                </h3>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-white/70">
                Sim, a energia solar ainda vale a pena em 2025, apesar da
                implementação de novas taxas e regulamentações...
              </p>
              <a
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 underline hover:text-white"
                href="https://www.portalsolar.com.br/noticias/mercado/geracao-distribuida/energia-solar-vale-a-pena-em-2025"
              >
                Continuar lendo
                <MoveRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className="flex w-full items-center justify-between gap-4">
          <div>
            <p className="text-white">Últimas Notícias</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-full text-white/90 shadow-sm hover:bg-white/10">
              <MoveLeft className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full text-white/90 shadow-sm hover:bg-white/10">
              <MoveRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
