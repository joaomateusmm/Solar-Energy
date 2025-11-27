import Footer from "@/components/footer"; // 1. Importar
import HeroSection from "@/components/HeroSection";
import HeroSection3 from "@/components/HeroSection3";
import HeroSection5 from "@/components/HeroSection5";
import ModelSection from "@/components/ModelSection";
import PartnersSection from "@/components/PartnersSection";
import SolarSection from "@/components/SolarSection";
import VideoSection from "@/components/VideoSection";

export default function Home() {
  return (
    <main className="scroll-smooth text-white">
      <div className="w-full overflow-x-clip">
        <HeroSection />

        <section id="solar">
          <SolarSection />
        </section>

        <HeroSection3 />

        <VideoSection />

        <ModelSection />

        <HeroSection5 />

        <PartnersSection />

        {/* 2. Adicionar aqui no final */}
        <Footer />
      </div>
    </main>
  );
}
