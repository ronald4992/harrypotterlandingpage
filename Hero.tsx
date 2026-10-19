/* =========================================================================
   SECCIÓN 2: HERO
   Apertura cinematográfica con bienvenida al Mundo Mágico, velas flotantes,
   Snitch dorada animada, estadísticas legendarias y botones de acción.
   ========================================================================= */

import React from 'react';
import { Sparkles, Compass, ShieldAlert, Award, Star } from 'lucide-react';
import { HouseId } from '../types';
import { HOUSES } from '../data';
import { magicAudio } from '../audio';

interface HeroProps {
  currentHouse: HouseId;
}

export const Hero: React.FC<HeroProps> = ({ currentHouse }) => {
  const house = HOUSES[currentHouse];

  return (
    <section id="hero" className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden">
      
      {/* Hogwarts Castle Silhouette & Mystic Glow Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 35%, ${house.accentHex}40 0%, transparent 60%)`
          }}
        />
        {/* Mystic starry rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#e6ca65]/10 animate-spin" style={{ animationDuration: '120s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] rounded-full border border-dashed border-[#e6ca65]/10 animate-spin" style={{ animationDuration: '180s', animationDirection: 'reverse' }} />
      </div>

      {/* Floating Hogwarts Candles */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden hidden md:block">
        {[
          { top: '18%', left: '12%', delay: '0s' },
          { top: '24%', left: '86%', delay: '1.2s' },
          { top: '38%', left: '8%', delay: '2.5s' },
          { top: '32%', left: '92%', delay: '0.7s' },
          { top: '55%', left: '15%', delay: '1.8s' },
          { top: '62%', left: '84%', delay: '3.1s' },
        ].map((candle, idx) => (
          <div
            key={idx}
            className="absolute animate-float-slow flex flex-col items-center opacity-85"
            style={{
              top: candle.top,
              left: candle.left,
              animationDelay: candle.delay,
            }}
          >
            {/* Candle Flame */}
            <div className="w-2.5 h-4 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_12px_#ffbb00] candle-flame" />
            {/* Candle Body */}
            <div className="w-2 h-10 bg-gradient-to-b from-[#f4ebd0] to-[#c7b594] rounded-sm shadow-sm" />
          </div>
        ))}
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        
        {/* House Banner Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181424]/90 border border-[#e6ca65]/40 shadow-[0_0_20px_rgba(230,202,101,0.2)] mb-8">
          <span className="text-lg">{house.crestEmoji}</span>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#e6ca65]">
            Casa Activa: {house.name} • {house.motto}
          </span>
          <span className="w-2 h-2 rounded-full bg-[#e6ca65] animate-ping" />
        </div>

        {/* Main Dramatic Headline */}
        <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
          Tu Carta de Aceptación a{' '}
          <span className="text-gold-gradient block mt-2 drop-shadow-[0_4px_30px_rgba(230,202,101,0.4)]">
            Hogwarts Ha Llegado
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-[#d4ccb8] font-normal mb-10 leading-relaxed font-body">
          Cruza la barrera de King’s Cross hacia el <strong className="text-[#fbf0b9]">Andén 9¾</strong>. 
          Aprende los secretos de las pociones milenarias, forja tu lealtad en las Cuatro Casas y empuña una varita con destino inmortal.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#cta-admision"
            onClick={() => magicAudio.playOwlDelivery()}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-cinzel text-sm sm:text-base font-bold uppercase tracking-wider text-[#0e0c15] bg-gradient-to-r from-[#ffe066] via-[#e6ca65] to-[#c49e29] shadow-[0_0_30px_rgba(230,202,101,0.4)] hover:shadow-[0_0_45px_rgba(230,202,101,0.7)] transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3"
          >
            <Sparkles className="w-5 h-5" />
            <span>Reclamar mi Carta Oficial</span>
          </a>

          <a
            href="#cta-seleccion"
            onClick={() => magicAudio.playSortingChime()}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-cinzel text-sm sm:text-base font-bold uppercase tracking-wider text-[#e6ca65] bg-[#161324]/80 border border-[#e6ca65]/50 hover:bg-[#e6ca65]/10 hover:border-[#e6ca65] transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3"
          >
            <Compass className="w-5 h-5 text-[#e6ca65]" />
            <span>Test del Sombrero</span>
          </a>
        </div>

        {/* Interactive Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-[#e6ca65]/15">
          <div className="p-4 rounded-xl bg-[#141120]/60 border border-[#e6ca65]/20 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-extrabold font-cinzel text-gold-gradient">4</div>
            <div className="text-xs uppercase tracking-wider text-[#b8ab96] mt-1">Casas Legendarias</div>
          </div>
          <div className="p-4 rounded-xl bg-[#141120]/60 border border-[#e6ca65]/20 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-extrabold font-cinzel text-gold-gradient">142</div>
            <div className="text-xs uppercase tracking-wider text-[#b8ab96] mt-1">Escaleras Movedizas</div>
          </div>
          <div className="p-4 rounded-xl bg-[#141120]/60 border border-[#e6ca65]/20 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-extrabold font-cinzel text-gold-gradient">9 ¾</div>
            <div className="text-xs uppercase tracking-wider text-[#b8ab96] mt-1">Andén Secreto Activo</div>
          </div>
          <div className="p-4 rounded-xl bg-[#141120]/60 border border-[#e6ca65]/20 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-extrabold font-cinzel text-gold-gradient">100%</div>
            <div className="text-xs uppercase tracking-wider text-[#b8ab96] mt-1">Magia Auténtica</div>
          </div>
        </div>

      </div>
    </section>
  );
};
