/* =========================================================================
   SECCIÓN 10: FOOTER
   Pie de página oficial con mapa del sitio, las cuatro casas, lugares
   mágicos, estatuto del secreto y el interruptor del Mapa del Merodeador.
   ========================================================================= */

import React, { useState } from 'react';
import { Footprints, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { magicAudio } from '../audio';
import { HOUSES } from '../data';
import { HouseId } from '../types';

export const Footer: React.FC = () => {
  const [marauderActive, setMarauderActive] = useState(false);

  const toggleMarauder = () => {
    magicAudio.playWandSpark();
    setMarauderActive(!marauderActive);
  };

  return (
    <footer className="relative bg-[#06050a] text-[#a89d8b] pt-16 pb-12 border-t border-[#e6ca65]/20 overflow-hidden">
      
      {/* Marauder's Map Mode Easter Egg Notification */}
      {marauderActive && (
        <div className="bg-[#1c1626] border-b border-[#e6ca65] py-2.5 px-4 text-center text-xs font-serif text-[#ffd700] animate-fadeIn">
          👣 <em>"Los señores Lunático, Colagusano, Canuto y Cornamenta presentan sus respetos al lector y le aconsejan vigilar el pasillo del tercer piso..."</em> 👣
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#e6ca65]/15">
          
          {/* Column 1: Brand & Crest */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#e6ca65] via-[#8c6b1a] to-[#392205] p-[2px] shadow-lg">
                <div className="w-full h-full rounded-full bg-[#120f1b] flex items-center justify-center text-2xl">
                  🏰
                </div>
              </div>
              <div>
                <span className="font-cinzel text-xl font-bold tracking-wider text-gold-gradient block">
                  HOGWARTS
                </span>
                <span className="text-[10px] tracking-widest text-[#d4af37] uppercase block font-semibold">
                  Draco Dormiens Nunquam Titillandus
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#8c8172] leading-relaxed max-w-sm font-body">
              Institución líder en la enseñanza de las Artes Mágicas y la Hechicería desde el 990 d.C. Protegida por encantamientos ancestrales en las Tierras Altas de Escocia.
            </p>

            {/* Marauder's Map Toggle */}
            <div className="pt-2">
              <button
                onClick={toggleMarauder}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-serif text-[#e6ca65] bg-[#161224] border border-[#e6ca65]/30 hover:border-[#e6ca65] transition-all hover:bg-[#201a33]"
              >
                <Footprints size={14} />
                <span>{marauderActive ? 'Travesura Realizada (Cerrar)' : 'Juro solemnemente que mis intenciones no son buenas'}</span>
              </button>
            </div>
          </div>

          {/* Column 2: Navegación Rápida */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-widest mb-4">
              Explorar
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#hero" className="hover:text-[#e6ca65] transition-colors">Inicio & Bienvenida</a>
              </li>
              <li>
                <a href="#beneficios" className="hover:text-[#e6ca65] transition-colors">Privilegios Mágicos</a>
              </li>
              <li>
                <a href="#cta-admision" className="hover:text-[#e6ca65] transition-colors">Admisión Andén 9¾</a>
              </li>
              <li>
                <a href="#explicacion" className="hover:text-[#e6ca65] transition-colors">Academia de Artes</a>
              </li>
              <li>
                <a href="#testimonios" className="hover:text-[#e6ca65] transition-colors">Voces y Anuario</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#e6ca65] transition-colors">Preguntas Frecuentes</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Las Cuatro Casas */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-widest mb-4">
              Las 4 Casas
            </h4>
            <ul className="space-y-2.5 text-xs">
              {(Object.keys(HOUSES) as HouseId[]).map((hId) => (
                <li key={hId}>
                  <a
                    href="#cta-seleccion"
                    className="hover:text-[#e6ca65] transition-colors flex items-center gap-1.5"
                  >
                    <span>{HOUSES[hId].crestEmoji}</span>
                    <span>Casa {HOUSES[hId].name}</span>
                  </a>
                </li>
              ))}
              <li className="pt-1 text-[#6a6053]">
                <span>Copa de las Casas: En disputa</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Estatuto & Ministerio */}
          <div>
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-widest mb-4">
              Estatutos Mágicos
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="text-[#877c6c]">Estatuto Internacional del Secreto Mágico (1689)</span>
              </li>
              <li>
                <span className="text-[#877c6c]">Código de Uso Razonable de Varitas</span>
              </li>
              <li>
                <span className="text-[#877c6c]">Confederación Internacional de Magos</span>
              </li>
              <li>
                <span className="text-[#877c6c]">Reglamento de Lechuzas Mensajeras</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Tech Stack */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6b6254]">
          <div className="flex items-center gap-2">
            <span>© 2026 Colegio Hogwarts de Magia y Hechicería.</span>
            <span>•</span>
            <span className="text-[#c4b9a3]">Construido con TypeScript & Node.js</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span>Hecho con</span>
              <Sparkles size={12} className="text-[#e6ca65]" />
              <span>para aspirantes a magos y brujas</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
