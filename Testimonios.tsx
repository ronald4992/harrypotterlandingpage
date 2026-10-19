/* =========================================================================
   SECCIÓN 6: TESTIMONIOS
   Testimonios y relatos de graduados célebres, profesores y figuras
   legendarias de las 4 Casas del Colegio Hogwarts.
   ========================================================================= */

import React, { useState } from 'react';
import { Star, Quote, Sparkles, Filter } from 'lucide-react';
import { TESTIMONIALS, HOUSES } from '../data';
import { HouseId } from '../types';
import { magicAudio } from '../audio';

export const Testimonios: React.FC = () => {
  const [filterHouse, setFilterHouse] = useState<HouseId | 'todas'>('todas');

  const filteredTestimonials = filterHouse === 'todas'
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.house === filterHouse);

  return (
    <section id="testimonios" className="relative py-24 bg-[#0c0b12] border-t border-[#e6ca65]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c182c] border border-[#e6ca65]/30 text-xs font-semibold text-[#e6ca65] uppercase tracking-widest mb-3">
            <Quote size={14} />
            <span>Testimonios del Anuario Mágico</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white mb-4">
            Voces de Quienes Vivieron la <span className="text-gold-gradient">Magia</span>
          </h2>
          <p className="text-sm sm:text-base text-[#baa990] font-body">
            Descubre las experiencias de brujas y magos que cruzaron las puertas de roble del Gran Comedor y cambiaron la historia.
          </p>

          {/* House Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => {
                magicAudio.playWandSpark();
                setFilterHouse('todas');
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-cinzel font-semibold uppercase tracking-wider transition-all ${
                filterHouse === 'todas'
                  ? 'bg-[#e6ca65] text-[#0c0b12] shadow-md'
                  : 'bg-[#181424] text-[#b8ab96] border border-[#e6ca65]/20 hover:border-[#e6ca65]'
              }`}
            >
              Todas las Casas
            </button>
            {(Object.keys(HOUSES) as HouseId[]).map((hId) => {
              const h = HOUSES[hId];
              const isSelected = filterHouse === hId;
              return (
                <button
                  key={hId}
                  onClick={() => {
                    magicAudio.playWandSpark();
                    setFilterHouse(hId);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-cinzel font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-[#e6ca65] text-[#0c0b12] shadow-md'
                      : 'bg-[#181424] text-[#b8ab96] border border-[#e6ca65]/20 hover:border-[#e6ca65]'
                  }`}
                >
                  <span>{h.crestEmoji}</span>
                  <span>{h.name}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((t) => {
            const house = HOUSES[t.house];
            return (
              <div
                key={t.id}
                className="parchment-card rounded-2xl p-7 border border-[#e6ca65]/25 flex flex-col justify-between hover:shadow-[0_10px_25px_rgba(230,202,101,0.15)] transition-all group"
              >
                <div>
                  
                  {/* Top Bar: House Badge & Golden Snitch Stars */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#1b162c] text-[#fbf0b9] border border-[#e6ca65]/30">
                      <span>{house.crestEmoji}</span>
                      <span>{house.name}</span>
                    </span>

                    {/* 5 Stars */}
                    <div className="flex gap-1 text-[#ffd700]">
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <Star key={i} size={15} fill="#ffd700" className="text-[#ffd700]" />
                      ))}
                    </div>
                  </div>

                  {/* Quote Content */}
                  <p className="text-sm sm:text-base text-[#ded4c3] italic leading-relaxed mb-6 font-body">
                    "{t.content}"
                  </p>

                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-[#e6ca65]/15 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatarUrl}
                      alt={t.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#e6ca65]/40"
                    />
                    <div>
                      <h4 className="font-cinzel text-sm sm:text-base font-bold text-white group-hover:text-[#e6ca65] transition-colors">
                        {t.name}
                      </h4>
                      <p className="text-[11px] text-[#baa990]">
                        {t.title}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-[#8a7f70] block">Hechizo Predilecto</span>
                    <span className="text-xs text-[#e6ca65] font-semibold">{t.favoriteSpell}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
