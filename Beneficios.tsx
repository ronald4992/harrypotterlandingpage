/* =========================================================================
   SECCIÓN 3: BENEFICIOS
   Beneficios y privilegios del mundo mágico: varitas, asignaturas de
   hechicería, Quidditch, transporte por polvos Flu y comunidad de por vida.
   ========================================================================= */

import React from 'react';
import { Wand2, Sparkles, Compass, Trophy, Flame, Shield } from 'lucide-react';
import { BENEFITS } from '../data';
import { magicAudio } from '../audio';

export const Beneficios: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Wand2': return <Wand2 className="w-6 h-6 text-[#e6ca65]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#e6ca65]" />;
      case 'Compass': return <Compass className="w-6 h-6 text-[#e6ca65]" />;
      case 'Trophy': return <Trophy className="w-6 h-6 text-[#e6ca65]" />;
      case 'Flame': return <Flame className="w-6 h-6 text-[#e6ca65]" />;
      default: return <Shield className="w-6 h-6 text-[#e6ca65]" />;
    }
  };

  return (
    <section id="beneficios" className="relative py-24 bg-[#0a0910] border-t border-[#e6ca65]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6ca65]/10 border border-[#e6ca65]/30 text-xs font-semibold text-[#e6ca65] uppercase tracking-widest mb-3">
            <span>Privilegios del Mundo Mágico</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white mb-4">
            ¿Por qué Iniciar tu Viaje en <span className="text-gold-gradient">Hogwarts</span>?
          </h2>
          <p className="text-[#bfb5a3] text-base sm:text-lg font-body">
            Una educación sin parangón en el mundo terrenal. Formamos a los magos y brujas más influyentes desde el siglo X.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => magicAudio.playWandSpark()}
              className="parchment-card rounded-2xl p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(230,202,101,0.2)] group"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#1b162c] border border-[#e6ca65]/30 flex items-center justify-center group-hover:bg-[#e6ca65]/20 group-hover:border-[#e6ca65] transition-all">
                  {getIcon(item.iconName)}
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#1e1a2f] text-[#fbf0b9] border border-[#e6ca65]/20">
                  {item.badge}
                </span>
              </div>

              <h3 className="font-cinzel text-xl font-bold text-white mb-2 group-hover:text-[#e6ca65] transition-colors">
                {item.title}
              </h3>
              
              <div className="text-xs text-[#d3a625] font-medium tracking-wide uppercase mb-3">
                {item.subtitle}
              </div>

              <p className="text-sm text-[#b8ab96] leading-relaxed mb-4 font-body">
                {item.description}
              </p>

              <div className="pt-3 border-t border-[#e6ca65]/10 flex items-center gap-2 text-xs text-[#8c8273]">
                <Sparkles className="w-3.5 h-3.5 text-[#e6ca65]" />
                <span className="italic">Destacado: {item.spellTip}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner for Quidditch season */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-[#181424] via-[#221c33] to-[#181424] border border-[#e6ca65]/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="text-4xl">⚡</div>
            <div>
              <h4 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                Torneo Intercasas de Quidditch 2026
              </h4>
              <p className="text-sm text-[#baa990]">
                Los entrenamientos comienzan la primera semana tras la Ceremonia de Selección. ¿Tienes lo necesario para ser Buscador?
              </p>
            </div>
          </div>
          <a
            href="#cta-admision"
            className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-cinzel font-bold uppercase tracking-wider text-[#0e0c15] bg-[#e6ca65] hover:bg-[#ffe066] transition-colors whitespace-nowrap"
          >
            Inscribirse al Torneo
          </a>
        </div>

      </div>
    </section>
  );
};
