import React, { useState } from 'react';
import { HouseId } from './types';
import { magicAudio } from './audio';

// Visual & Effect Components
import { MagicParticles } from './components/MagicParticles';

// Exactly 10 Sections matching the criteria:
// 1. Header
import { Header } from './components/Header';
// 2. Hero
import { Hero } from './components/Hero';
// 3. Beneficios
import { Beneficios } from './components/Beneficios';
// 4. CTA (Call To Action 1: Admisión a Hogwarts)
import { CtaOne } from './components/CtaOne';
// 5. Explicación (Fases del camino mágico + Simulador de Hechizos)
import { Explicacion } from './components/Explicacion';
// 6. Testimonios (Reseñas de figuras legendarias)
import { Testimonios } from './components/Testimonios';
// 7. CTA 2 (Call To Action 2: Sombrero Seleccionador Interactivo)
import { CtaTwo } from './components/CtaTwo';
// 8. FAQ (Preguntas Frecuentes desplegables)
import { Faq } from './components/Faq';
// 9. Pre-footer (El Profeta Boletín Mágico)
import { PreFooter } from './components/PreFooter';
// 10. Footer (Estatutos, casas y Mapa del Merodeador)
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [currentHouse, setCurrentHouse] = useState<HouseId>('gryffindor');
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);

  const handleToggleMusic = () => {
    const newState = magicAudio.toggleAmbient();
    setIsMusicPlaying(newState);
  };

  const handleHouseAssigned = (house: HouseId) => {
    setCurrentHouse(house);
  };

  return (
    <div className="relative min-h-screen bg-[#0c0b12] text-[#eae5d9] selection:bg-[#e6ca65] selection:text-[#0c0b12]">
      {/* Background Golden Sparkles / Magic Field */}
      <MagicParticles />

      {/* 1. SECCIÓN: HEADER */}
      <Header
        currentHouse={currentHouse}
        onSelectHouse={setCurrentHouse}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
      />

      <main className="relative z-10">
        {/* 2. SECCIÓN: HERO */}
        <Hero currentHouse={currentHouse} />

        {/* 3. SECCIÓN: BENEFICIOS */}
        <Beneficios />

        {/* 4. SECCIÓN: CTA 1 (ADMISIÓN OFICIAL) */}
        <CtaOne />

        {/* 5. SECCIÓN: EXPLICACIÓN (ACADEMIA Y HECHIZOS) */}
        <Explicacion />

        {/* 6. SECCIÓN: TESTIMONIOS */}
        <Testimonios />

        {/* 7. SECCIÓN: CTA 2 (TEST SOMBRERO SELECCIONADOR) */}
        <CtaTwo onHouseAssigned={handleHouseAssigned} />

        {/* 8. SECCIÓN: FAQ (PREGUNTAS FRECUENTES) */}
        <Faq />

        {/* 9. SECCIÓN: PRE-FOOTER (EL PROFETA) */}
        <PreFooter />
      </main>

      {/* 10. SECCIÓN: FOOTER */}
      <Footer />
    </div>
  );
};

export default App;
