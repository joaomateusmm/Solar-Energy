import { ChevronDown, Menu, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeaderDesktopBlack() {
  return (
    <header className="header-black bg-opacity-90 sticky top-0 z-50 w-full border-b border-black/15">
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
              <p className="-mb-2 text-2xl font-bold text-[#141414]">Solar</p>
              <p className="text-2xl font-medium text-[#141414]">Energy</p>
            </div>
            <div className="mx-12 h-12 w-1 border-r border-black/15"></div>
            <div className="flex flex-col items-end text-sm font-semibold text-[#141414]">
              <p className="">+11 93492-4847</p>
              <p>solar@energy.com</p>
            </div>
          </Link>
          <div className="flex items-center justify-center gap-4">
            <button className="flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-black/10 bg-white/10 px-4 py-2 text-[#141414] backdrop-blur-xs duration-200 hover:bg-black/5 hover:active:scale-95">
              <Image
                src="/assets/page1/br.svg"
                alt="Logo"
                width={20}
                height={40}
                className=""
              />
              BRA
              <ChevronDown className="-ml-1 h-4 w-4 text-[#141414]" />
            </button>
            <button className="flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-black/10 bg-white/10 px-4 py-2 text-[#141414] backdrop-blur-xs duration-200 hover:bg-black/5 hover:active:scale-95">
              <PhoneCall className="h-4 w-4 text-[#141414]" />
              Contate-nos
            </button>
            <button className="flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-black/10 bg-white/10 px-3 py-3 text-[#141414] backdrop-blur-xs duration-200 hover:bg-black/5 hover:active:scale-95">
              <Menu className="h-5 w-5 text-[#141414]" />
            </button>
          </div>
        </ul>
      </nav>
    </header>
  );
}
