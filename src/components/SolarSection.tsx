"use client";

import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef } from "react";

// 1. Importar o ImageTrail
import ImageTrail from "@/components/ImageTrail";

// Registra o plugin
gsap.registerPlugin(ScrollTrigger);

export default function SolarSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // --- 1. CONFIGURAÇÃO DO LENIS ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  // --- 2. CONFIGURAÇÃO DO GSAP ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef);
      const cards = q(".card");
      const wrapper = wrapperRef.current;

      if (!wrapper) return;

      // --- SCROLL HORIZONTAL ---
      const getScrollAmount = () => {
        const wrapperWidth = wrapper.scrollWidth;
        return -(wrapperWidth - window.innerWidth);
      };

      const tween = gsap.to(wrapper, {
        x: getScrollAmount,
        ease: "none",
      });

      // --- INTRO ---
      const introSection = q(".intro-text");
      const introElements = q(
        ".intro-text .overline, .intro-text .main-title, .intro-text .sub-text, .intro-text .scroll-hint",
      );

      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "top top",
          toggleActions: "play none none reverse",
        },
      });

      introTl.set(introSection, { autoAlpha: 1 });
      introTl.from(introElements, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // --- CARDS (Animação Limpa) ---
      (cards as HTMLElement[]).forEach((card, index) => {
        const img = card.querySelector(".img");
        const texts = card.querySelector(".texts");
        const textChildren = texts ? texts.children : [];

        let triggerConfig: ScrollTrigger.Vars;

        if (index === 0) {
          triggerConfig = {
            trigger: containerRef.current,
            start: "top center",
            end: "top top",
            scrub: 1,
          };
        } else {
          triggerConfig = {
            trigger: card,
            containerAnimation: tween,
            start: "left 75%",
            end: "center center",
            scrub: 1,
          };
        }

        const tl = gsap.timeline({ scrollTrigger: triggerConfig });

        tl.to(card, { autoAlpha: 1, duration: 0.1 });

        // Animação da imagem
        tl.fromTo(
          img,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          },
          "<",
        );

        // Animação do Texto
        if (texts) {
          tl.fromTo(
            texts,
            { opacity: 0 },
            { opacity: 1, duration: 0.1 },
            "-=0.8",
          );
        }

        if (textChildren.length > 0) {
          tl.fromTo(
            textChildren,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.8,
              ease: "back.out(1.2)",
            },
            "-=0.8",
          );
        }
      });

      // --- PINNING ---
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=4000",
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="page-2 relative z-20 flex h-screen w-full items-center overflow-hidden bg-[#191919]"
    >
      {/* --- CORREÇÃO FEITA AQUI --- */}
      {/* Removi 'pointer-events-none' para o rato ser detetado. */}
      <div className="absolute inset-0 z-30 h-full w-full overflow-hidden">
        <ImageTrail
          items={[
            "/assets/page2/trail/trail-1.png",
            "/assets/page2/trail/trail-5.png",
            "/assets/page2/trail/trail-8.png",
            "/assets/page2/trail/trail-3.png",
            "/assets/page2/trail/trail-4.png",
            "/assets/page2/trail/trail-2.png",
            "/assets/page2/trail/trail-7.png",
            "/assets/page2/trail/trail-6.png",
          ]}
          variant={5}
        />
      </div>

      <div
        ref={wrapperRef}
        className="horizontal-wrapper relative flex h-full flex-nowrap items-center gap-[10vw] pr-[25vw] pl-[12vw] will-change-transform"
      >
        {/* INTRO TEXTO (z-40 garante que fica acima do trail) */}
        <div className="intro-text invisible z-40 -mt-[50px] flex w-[35vw] shrink-0 flex-col items-start justify-center gap-10 opacity-0 lg:w-[40vw]">
          <div className="text-content flex flex-col gap-[15px]">
            <span className="mb-[5px] text-[0.85rem] font-semibold tracking-[3px] text-[#8b8b8b] uppercase overline">
              Energia do Futuro
            </span>
            <h1 className="main-title m-0 text-[3.2rem] leading-[1.1] font-bold lg:text-[4.5rem]">
              Que vale a pena,
              <br />
              <span className="highlight text-[#ffd700] italic">
                você já sabe.
              </span>
            </h1>
            <p className="sub-text m-0 max-w-[90%] text-lg leading-[1.3] font-normal text-[#cccccc]">
              Mas separamos aqui as{" "}
              <strong className="font-semibold text-white">
                principais vantagens
              </strong>
              <br />
              para você transformar sua economia.
            </p>
          </div>
          <div className="scroll-hint flex items-center gap-[15px] opacity-70">
            <div className="arrow-icon flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-[#ffd700]">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
            <span className="text-[0.8rem] tracking-[1px] text-white uppercase">
              Deslize para ver
            </span>
          </div>
        </div>

        {/* CARD 1 */}
        <div className="card card-1 invisible relative z-40 flex h-[600px] w-[20vw] shrink-0 flex-col opacity-0">
          <div className="img img-1 mb-5 h-[300px] w-full rounded-[10px] bg-[url('/assets/page2/img-1.webp')] bg-cover bg-center"></div>
          <div className="texts w-full opacity-0">
            <div className="titles my-[10px] flex flex-row items-center justify-between gap-[30px] text-[#cccccc]">
              <h1 className="number m-0 text-[3.5rem] font-bold">01.</h1>
              <h1 className="title m-0 text-end text-[1.8rem] font-bold">
                Redução de até
                <br />
                85% na Conta
              </h1>
            </div>
            <p className="desc m-0 text-[14px] font-medium text-[#8b8b8b]">
              Pare de alugar energia e comece a gerar a sua própria. Transforme
              sua conta de luz em apenas uma taxa mínima e sinta o alívio no
              orçamento mensal imediatamente após a instalação.
            </p>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="card card-2 invisible relative z-40 flex h-[600px] w-[20vw] shrink-0 translate-y-[100px] flex-col opacity-0">
          <div className="texts w-full opacity-0">
            <div className="titles my-[10px] flex flex-row items-center justify-between gap-[30px] text-[#cccccc]">
              <h1 className="number m-0 text-[3.5rem] font-bold">02.</h1>
              <h1 className="title m-0 text-end text-[1.8rem] font-bold">
                Imune a inflação energética
              </h1>
            </div>
            <p className="desc m-0 -mt-1 mb-3 text-[14px] font-medium text-[#8b8b8b]">
              Diga adeus às bandeiras vermelhas e aos aumentos abusivos da
              concessionária. Com energia solar, você blinda o seu orçamento e
              sabe exatamente quanto vai gastar pelos próximos 25 anos.
            </p>
          </div>
          <div className="img img-2 mb-5 h-[300px] w-full rounded-[10px] bg-[url('/assets/page2/img-2.webp')] bg-cover bg-center"></div>
        </div>

        {/* CARD 3 */}
        <div className="card card-3 invisible relative z-40 flex h-[600px] w-[28vw] shrink-0 flex-col opacity-0">
          <div className="img img-3 mb-5 h-[500px] w-full rounded-[10px] bg-[url('/assets/page2/img-3.webp')] bg-cover bg-center"></div>
          <div className="texts w-full opacity-0">
            <div className="titles my-[10px] flex flex-row items-center justify-between gap-[30px] text-[#cccccc]">
              <h1 className="number m-0 text-[3.5rem] font-bold">03.</h1>
              <h1 className="title m-0 text-end text-[1.8rem] font-bold">
                Retorno Superior à Poupança
              </h1>
            </div>
            <p className="desc m-0 text-[14px] font-medium text-[#8b8b8b]">
              O sistema se paga sozinho com a economia gerada (Payback médio de
              3 a 5 anos). Após esse período, é lucro líquido direto no seu
              bolso por décadas. É um investimento melhor que a renda fixa.
            </p>
          </div>
        </div>

        {/* CARD 4 */}
        <div className="card card-4 invisible relative z-40 flex h-[600px] w-[17vw] shrink-0 -translate-y-[0px] flex-col opacity-0">
          <div className="img img-4 mb-5 h-[400px] w-full rounded-[10px] bg-[url('/assets/page2/img-4.webp')] bg-cover bg-center"></div>
          <div className="texts w-full opacity-0">
            <div className="titles my-[10px] flex flex-row items-center justify-between gap-[30px] text-[#cccccc]">
              <h1 className="number m-0 text-[3.5rem] font-bold">04.</h1>
              <h1 className="title m-0 text-end text-[1.8rem] font-bold">
                Valorização do seu Imóvel
              </h1>
            </div>
            <p className="desc m-0 text-[14px] font-medium text-[#8b8b8b]">
              Casas e empresas com energia solar valem, em média, 10% a mais no
              mercado. Além de economizar, você torna seu imóvel mais atraente e
              valioso para uma futura venda ou locação.
            </p>
          </div>
        </div>

        {/* CARD 5 */}
        <div className="card card-4 invisible relative z-40 flex h-[600px] w-[25vw] shrink-0 -translate-y-[24px] flex-col opacity-0">
          <div className="texts w-full opacity-0">
            <div className="titles my-[10px] flex flex-row items-center justify-between gap-[30px] text-[#cccccc]">
              <h1 className="number m-0 text-[3.5rem] font-bold">05.</h1>
              <h1 className="title m-0 text-end text-[1.8rem] font-bold">
                Tecnologia de Longa Duração
              </h1>
            </div>
            <p className="desc m-0 mb-3 text-[14px] font-medium text-[#8b8b8b]">
              Nossos painéis são projetados para durar mais de 25 anos com
              eficiência máxima e exigem manutenção mínima (apenas limpeza
              básica). Instale hoje e tenha tranquilidade por uma vida.
            </p>
          </div>
          <div className="img img-4 mb-5 h-[300px] w-full rounded-[10px] bg-[url('/assets/page2/img-5.webp')] bg-cover bg-center"></div>
        </div>

        {/* CARD FINAL */}
        <div className="card card-4 invisible relative z-40 flex h-[600px] w-[25vw] shrink-0 -translate-y-[24px] flex-col opacity-0">
          <div className="texts flex w-full flex-col items-end justify-between opacity-0">
            <div className="titles my-[10px] flex flex-row items-center gap-[30px] text-[#cccccc]">
              <h1 className="title font-clash-display m-0 text-end text-[3.3rem] font-bold">
                Vem com a gente, o{" "}
                <span className="highlight font-clash-display text-[#ffd700] italic">
                  futuro é solar!
                </span>
              </h1>
            </div>
            <p className="desc m-0 mb-3 text-end text-[14px] font-medium text-[#8b8b8b]">
              Ajude o planeta e gaste menos no final do mês, o melhor dos 2
              mundos. Conheça sobre nós.
            </p>
            <Image
              src="/assets/page1/logo.svg"
              alt="Logo Solar Energy"
              width={180}
              height={180}
              className="mt-5"
            />
            <span className="mt-4 mb-[5px] text-[0.85rem] font-semibold tracking-[3px] text-[#8b8b8b] uppercase overline">
              Energia do Futuro
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
