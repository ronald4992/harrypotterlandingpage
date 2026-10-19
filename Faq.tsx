/* =========================================================================
   SECCIÓN 8: FAQ (PREGUNTAS FRECUENTES)
   Acordeón interactivo con dudas sobre el mundo mágico, admisiones muggle,
   compras en el Callejón Diagon y reglamentos escolares.
   ========================================================================= */

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { FAQ_ITEMS } from '../data';
import { magicAudio } from '../audio';

export const Faq: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const categories = ['Todas', 'Admisiones', 'Materiales', 'Vida en Hogwarts', 'Seguridad'];

  const toggleItem = (id: string) => {
    if (openId !== id) {
      magicAudio.playWandSpark();
      setOpenId(id);
    } else {
      setOpenId(null);
    }
  };

  const filteredFaqs = selectedCategory === 'Todas'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="faq" className="relative py-24 bg-[#0a0910] border-t border-[#e6ca65]/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b162c] border border-[#e6ca65]/30 text-xs font-semibold text-[#e6ca65] uppercase tracking-widest mb-3">
            <HelpCircle size={14} />
            <span>Respuestas Oficiales del Claustro</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white mb-4">
            Preguntas <span className="text-gold-gradient">Frecuentes</span>
          </h2>
          <p className="text-sm sm:text-base text-[#baa990] max-w-xl mx-auto font-body">
            Todo lo que necesitas saber antes de subir al Expreso de Hogwarts el 1 de septiembre.
          </p>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  magicAudio.playWandSpark();
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-cinzel font-semibold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#e6ca65] text-[#0c0b12]'
                    : 'bg-[#161224] text-[#b8ab96] border border-[#e6ca65]/20 hover:border-[#e6ca65]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="parchment-card rounded-2xl border border-[#e6ca65]/25 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#e6ca65] shrink-0" />
                    <span className="font-cinzel text-base sm:text-lg font-bold text-white group-hover:text-[#e6ca65] transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`p-1 rounded-full border border-[#e6ca65]/30 text-[#e6ca65] transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#e6ca65]/20' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#c4baa7] font-body leading-relaxed border-t border-[#e6ca65]/10 animate-fadeIn">
                    <p>{faq.answer}</p>
                    <div className="mt-3 flex items-center gap-2 text-[11px] text-[#e6ca65]">
                      <Sparkles size={12} />
                      <span className="uppercase tracking-wider font-semibold">Categoría: {faq.category}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
