"use client";

import gsap from "gsap";
import { ChevronsDown } from "lucide-react";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

// Importações dos componentes filhos da primeira página
import HeaderDesktop from "@/components/HeaderDesktop";
import RightHeroSection from "@/components/HeroSection2"; // Confirma se o nome do arquivo é HeroSection2

export default function HeroSection() {
  // Ref para a secção inteira (container relativo)
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState<boolean>(true);

  // Lógica de Visibilidade:
  // Usa IntersectionObserver para saber se a Page 1 ainda está na tela.
  // Se sair da tela, ocultamos os elementos fixos (Header, Textos, etc).
  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Se a secção page-1 intersetar, mostramos os elementos
          setVisible(entry.isIntersecting);
        });
      },
      { threshold: 0 }, // 0 significa: se qualquer pedaço estiver visível
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  // Animação GSAP (Entrada)
  useLayoutEffect(() => {
    // Só anima se estiver visível e o container existir
    if (!visible || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".hero-anim");

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
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.5,
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [visible]);

  return (
    // ESTA É A SECÇÃO PRINCIPAL (FUNDO + ALTURA)
    <section
      ref={sectionRef}
      className="page-1 relative z-10 flex h-screen w-full flex-row items-center justify-between px-18 text-[#191919]"
    >
      {/* Renderizamos os conteúdos fixos apenas se 'visible' for true.
         Isso faz com que o Header e os textos sumam ao rolar para a próxima secção.
      */}
      {visible && (
        <>
          <HeaderDesktop />

          {/* CONTEÚDO ESQUERDA (Fixo) */}
          <div
            ref={containerRef}
            className="hero-foreground bottom-18 left-18 z-40"
          >
            <div className="flex flex-col gap-6">
              {/* Botão Explorar Site */}
              <div className="hero-anim opacity-0">
                <a
                  href="#solar"
                  className="group flex w-[190px] cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-white/10 bg-white/5 px-5 py-3 text-white/90 shadow-md backdrop-blur-xs duration-200 hover:bg-white/10"
                  aria-label="Explorar site"
                >
                  <ChevronsDown className="h-5 w-5 transform text-white/90 duration-300 group-hover:-rotate-90" />
                  Explorar Site
                </a>
              </div>

              {/* Título Principal */}
              <h1 className="hero-anim font-clash-display text-[84px] leading-24 font-semibold text-white opacity-0">
                Reduza em até 85%
                <br /> sua conta de luz
              </h1>

              {/* Parágrafo Descritivo */}
              <p className="hero-anim -mt-3 mb-3 text-2xl text-white opacity-0">
                Ajude o planeta e gaste menos no final do mês,
                <br /> o melhor dos 2 mundos. Conheça sobre nós.
              </p>

              {/* Formulário */}
              <div className="hero-anim opacity-0">
                <form
                  action="#"
                  className="flex h-16 w-[400px] items-center gap-3 rounded-full bg-white px-2 shadow-md"
                >
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Coloque seu telefone aqui..."
                    aria-label="Fazer Orçamento"
                    required
                    className="flex-1 rounded-full bg-transparent px-4 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none"
                  />
                  <button
                    type="submit"
                    className="ml-1 cursor-pointer rounded-full bg-gray-800 px-7 py-3.5 text-sm font-semibold text-white shadow-md duration-200 hover:bg-gray-900 hover:brightness-90 hover:active:scale-95"
                  >
                    Fazer Orçamento
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* CONTEÚDO DIREITA (Importado) */}
          <RightHeroSection />
        </>
      )}
    </section>
  );
}
