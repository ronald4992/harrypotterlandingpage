/* =========================================================================
   SECCIÓN 5: EXPLICACIÓN
   Explicación detallada de la vida estudiantil y las 4 fases del camino mágico,
   junto con un Simulador / Demostrador interactivo de Encantamientos con varita.
   ========================================================================= */

import React, { useState } from 'react';
import { BookOpen, Sparkles, Train, GraduationCap, Trophy, Wand2 } from 'lucide-react';
import { SPELL_ITEMS } from '../data';
import { magicAudio } from '../audio';
import { SpellItem } from '../types';

export const Explicacion: React.FC = () => {
  const [activeSpell, setActiveSpell] = useState<SpellItem | null>(null);
  const [spellCastEffect, setSpellCastEffect] = useState<'lumos' | 'patronus' | 'leviosa' | 'alohomora' | null>(null);

  const phases = [
    {
      num: '01',
      title: 'El Andén 9¾ y el Expreso Escarlata',
      icon: <Train className="w-6 h-6 text-[#e6ca65]" />,
      desc: 'El viaje comienza cruzando el muro mágico entre los andenes 9 y 10 en King\'s Cross. A bordo de la locomotora roja conocerás a tus amigos de por vida y probarás Ranás de Chocolate.'
    },
    {
      num: '02',
      title: 'La Ceremonia de Selección',
      icon: <Sparkles className="w-6 h-6 text-[#e6ca65]" />,
      desc: 'Bajo el techo encantado del Gran Comedor y miles de velas suspendidas, el milenario Sombrero Seleccionador juzgará tus virtudes para integrarte en Gryffindor, Slytherin, Ravenclaw o Hufflepuff.'
    },
    {
      num: '03',
      title: 'Siete Cursos de Artes Arcanas',
      icon: <BookOpen className="w-6 h-6 text-[#e6ca65]" />,
      desc: 'Desde Pociones en las mazmorras con calderos burbujeantes hasta Cuidado de Criaturas con Hipogrifos en los lindes del Bosque Prohibido, preparándote para los TIMOs y ÉXTASIS.'
    },
    {
      num: '04',
      title: 'La Copa de las Casas & Graduación',
      icon: <Trophy className="w-6 h-6 text-[#e6ca65]" />,
      desc: 'Cada respuesta sabia y victoria en Quidditch suma gemas a los relojes de arena gigantes. Al graduarte, podrás aspirar a ser Auror, Sanador de San Mungo o Magizoólogo por el mundo.'
    }
  ];

  const handleCastSpell = (spell: SpellItem) => {
    setActiveSpell(spell);
    setSpellCastEffect(spell.soundType);

    if (spell.soundType === 'lumos') {
      magicAudio.playLumos();
    } else if (spell.soundType === 'patronus') {
      magicAudio.playPatronus();
    } else {
      magicAudio.playWandSpark();
    }

    setTimeout(() => {
      setSpellCastEffect(null);
    }, 1800);
  };

  return (
    <section id="explicacion" className="relative py-24 bg-[#09080e] border-t border-[#e6ca65]/15">
      
      {/* Spell Screen Flash Overlay */}
      {spellCastEffect === 'lumos' && (
        <div className="fixed inset-0 pointer-events-none z-50 bg-amber-100/30 backdrop-blur-[2px] transition-opacity duration-1000 animate-pulse" />
      )}
      {spellCastEffect === 'patronus' && (
        <div className="fixed inset-0 pointer-events-none z-50 bg-sky-400/25 backdrop-blur-[2px] transition-opacity duration-1000" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1730] border border-[#e6ca65]/30 text-xs font-semibold text-[#e6ca65] uppercase tracking-widest mb-3">
            <GraduationCap size={14} />
            <span>Guía de Vida en el Colegio</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white mb-4">
            ¿Cómo Funciona el <span className="text-gold-gradient">Mundo Mágico</span>?
          </h2>
          <p className="text-sm sm:text-base text-[#bfb5a3] font-body">
            Conoce el paso a paso desde el primer silbato del tren hasta la consagración de tu magia en los anales de Hogwarts.
          </p>
        </div>

        {/* 4 Phases Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {phases.map((phase) => (
            <div
              key={phase.num}
              className="parchment-card rounded-2xl p-6 border border-[#e6ca65]/20 hover:border-[#e6ca65]/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-cinzel text-3xl font-extrabold text-[#e6ca65]/40">
                    {phase.num}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-[#181424] border border-[#e6ca65]/30 flex items-center justify-center">
                    {phase.icon}
                  </div>
                </div>
                <h3 className="font-cinzel text-lg font-bold text-white mb-2">
                  {phase.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#b8ab96] leading-relaxed font-body">
                  {phase.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#e6ca65]/10 text-[11px] text-[#e6ca65] flex items-center gap-1 font-semibold uppercase tracking-wider">
                <span>Tradición Milenaria</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Wand & Spell Laboratory */}
        <div className="rounded-3xl bg-gradient-to-br from-[#151224] via-[#1a152d] to-[#120f1e] border-2 border-[#e6ca65]/40 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-cinzel text-[#e6ca65] uppercase tracking-widest mb-2 font-bold">
                <Wand2 size={16} />
                <span>Simulador Oficial de Encantamientos</span>
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-3">
                Practica tus Primeros Hechizos
              </h3>
              <p className="text-sm text-[#c7bcab] mb-6">
                Haz clic en cualquier encantamiento para conjurarlo en tiempo real, sintonizar tu varita con el sonido arcano y observar el efecto de su luz.
              </p>

              {/* Spell Buttons */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {SPELL_ITEMS.map((spell) => {
                  const isCurrent = activeSpell?.name === spell.name;
                  return (
                    <button
                      key={spell.name}
                      onClick={() => handleCastSpell(spell)}
                      className={`px-4 py-2.5 rounded-xl font-cinzel text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                        isCurrent
                          ? 'bg-[#e6ca65] text-[#0e0c15] shadow-[0_0_20px_#e6ca65]'
                          : 'bg-[#221c35] text-[#fbf0b9] border border-[#e6ca65]/30 hover:border-[#e6ca65] hover:bg-[#2b2443]'
                      }`}
                    >
                      <Sparkles size={14} />
                      <span>{spell.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Spell Display Card */}
            <div className="w-full lg:w-96 rounded-2xl bg-[#0c0b12] border border-[#e6ca65]/30 p-6 text-center relative shadow-inner">
              {activeSpell ? (
                <div className="animate-fadeIn">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[#e6ca65] mb-1">
                    {activeSpell.category}
                  </div>
                  <h4 className="font-cinzel text-2xl font-bold text-white mb-1">
                    {activeSpell.name}
                  </h4>
                  <p className="italic text-xs text-[#a69b89] mb-4">
                    Pronunciación: "{activeSpell.pronunciation}"
                  </p>
                  <p className="text-sm text-[#ded4c3] leading-relaxed font-body bg-[#161324] p-4 rounded-xl border border-[#e6ca65]/20">
                    {activeSpell.effect}
                  </p>
                  <div className="mt-4 text-[11px] text-[#e6ca65] flex items-center justify-center gap-1">
                    <Sparkles size={12} />
                    <span>¡Hechizo conjurado con éxito!</span>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-[#9c8f7d]">
                  <Wand2 className="w-12 h-12 mx-auto mb-3 opacity-40 animate-pulse text-[#e6ca65]" />
                  <p className="font-cinzel text-sm uppercase tracking-wider text-[#ded4c3]">
                    Elige un hechizo de la izquierda para empuñar tu varita
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
