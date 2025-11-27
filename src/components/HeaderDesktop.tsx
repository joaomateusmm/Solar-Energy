import { ChevronDown, Menu, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeaderDesktop() {
  return (
    // MUDANÇA AQUI: Adicionei 'absolute' para ele ficar por cima da imagem,
    // mas sem ficar preso na tela (fixed) ao scrollar.
    <header className="header-default absolute top-0 left-0 z-50 w-full border-b border-white/25 bg-transparent">
      <nav>
        <ul className="flex items-center justify-between gap-8 px-18 py-2 text-lg font-normal">
          <Link className="flex items-center justify-center" href="/">
            <Image
              src="/assets/page1/logo.svg"
              alt="Logo"
              width={50}
              height={40}
              className="rounded-lg shadow-md"
            />
            <div className="ml-3 flex flex-col">
              <p className="-mb-2 text-2xl font-bold text-[#f2f2f2]">Solar</p>
              <p className="text-2xl font-medium text-[#f2f2f2]">Energy</p>
            </div>
            <div className="mx-12 h-12 w-1 border-r border-white/20"></div>
            <div className="flex flex-col items-end text-sm font-semibold text-white">
              <p className="">+11 93492-4847</p>
              <p>solar@energy.com</p>
            </div>
          </Link>
          <div className="flex items-center justify-center gap-4">
            <button className="flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-white/10 bg-white/5 px-4 py-2 text-white/90 backdrop-blur-xs duration-200 hover:bg-white/10 hover:active:scale-95">
              <Image
                src="/assets/page1/br.svg"
                alt="Logo"
                width={20}
                height={40}
                className=""
              />
              BRA
              <ChevronDown className="-ml-1 h-4 w-4 text-white/90" />
            </button>
            <button className="flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-white/10 bg-white/5 px-4 py-2 text-white/90 backdrop-blur-xs duration-200 hover:bg-white/10 hover:active:scale-95">
              <PhoneCall className="h-4 w-4 text-white/90" />
              Contate-nos
            </button>
            <button className="flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-white/10 bg-white/5 px-3 py-3 text-white/90 backdrop-blur-xs duration-200 hover:bg-white/10 hover:active:scale-95">
              <Menu className="h-5 w-5 text-white/90" />
            </button>
          </div>
        </ul>
      </nav>
    </header>
  );
}
