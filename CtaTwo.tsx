/* =========================================================================
   SECCIÓN 7: CTA 2 (CALL TO ACTION 2)
   Test interactivo de Selección de Casas del Sombrero Seleccionador.
   Conexión con el backend Node.js (POST /api/sorting) para deliberación
   y otorgamiento oficial del diploma de Casa mágica.
   ========================================================================= */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Compass, Sparkles, RefreshCw, CheckCircle2, Award } from 'lucide-react';
import { QUIZ_QUESTIONS, HOUSES } from '../data';
import { HouseId } from '../types';
import { magicAudio } from '../audio';

interface CtaTwoProps {
  onHouseAssigned: (house: HouseId) => void;
}

export const CtaTwo: React.FC<CtaTwoProps> = ({ onHouseAssigned }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<HouseId[]>([]);
  const [isDeliberating, setIsDeliberating] = useState(false);
  const [assignedResult, setAssignedResult] = useState<{
    house: HouseId;
    announcement: string;
    speech: string;
  } | null>(null);

  const handleSelectOption = (house: HouseId) => {
    magicAudio.playWandSpark();
    const newAnswers = [...selectedAnswers, house];
    setSelectedAnswers(newAnswers);

    if (currentStep + 1 < QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Evaluate results with Node.js backend
      submitSorting(newAnswers);
    }
  };

  const submitSorting = async (answers: HouseId[]) => {
    setIsDeliberating(true);
    magicAudio.playSortingChime();

    try {
      const res = await fetch('/api/sorting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });

      let data;
      if (res.ok) {
        data = await res.json();
      } else {
        // Fallback calculation
        const counts: Record<HouseId, number> = {
          gryffindor: 0,
          slytherin: 0,
          ravenclaw: 0,
          hufflepuff: 0,
        };
        answers.forEach((h) => counts[h]++);
        let bestHouse: HouseId = 'gryffindor';
        let max = -1;
        for (const [h, count] of Object.entries(counts) as [HouseId, number][]) {
          if (count > max) {
            max = count;
            bestHouse = h;
          }
        }
        data = {
          house: bestHouse,
          announcement: `¡${HOUSES[bestHouse].name.toUpperCase()}!`,
          speech: `El Sombrero ha visto en tu espíritu las virtudes más excelsas de ${HOUSES[bestHouse].name}.`
        };
      }

      setTimeout(() => {
        setAssignedResult(data);
        setIsDeliberating(false);
        onHouseAssigned(data.house as HouseId);

        // Confetti matching house colors
        const colors = data.house === 'gryffindor'
          ? ['#740001', '#eeba30', '#ffffff']
          : data.house === 'slytherin'
          ? ['#1a472a', '#aaaaaa', '#ffffff']
          : data.house === 'ravenclaw'
          ? ['#0e1a40', '#946b2d', '#ffffff']
          : ['#ecb939', '#372e29', '#ffffff'];

        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors
        });
      }, 1400);

    } catch (e) {
      const fallbackHouse: HouseId = answers[0] || 'gryffindor';
      setAssignedResult({
        house: fallbackHouse,
        announcement: `¡${HOUSES[fallbackHouse].name.toUpperCase()}!`,
        speech: `¡Tu destino brilla con honor en la Casa ${HOUSES[fallbackHouse].name}!`
      });
      setIsDeliberating(false);
      onHouseAssigned(fallbackHouse);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setAssignedResult(null);
    magicAudio.playWandSpark();
  };

  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  return (
    <section id="cta-seleccion" className="relative py-24 bg-gradient-to-b from-[#0c0b12] via-[#171226] to-[#0c0b12] border-t border-[#e6ca65]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6ca65]/10 border border-[#e6ca65]/40 text-xs font-semibold text-[#e6ca65] uppercase tracking-widest mb-3">
            <Compass size={14} />
            <span>Ceremonia del Sombrero Seleccionador</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white mb-4">
            ¿A Qué Casa de <span className="text-gold-gradient">Hogwarts</span> Perteneces?
          </h2>
          <p className="text-sm sm:text-base text-[#bfb5a3] max-w-xl mx-auto font-body">
            Colócate el Sombrero Seleccionador. Responde a sus preguntas sinceras y deja que descifre el verdadero templo de tu alma.
          </p>
        </div>

        {/* Deliberation Loading Screen */}
        {isDeliberating && (
          <div className="parchment-card rounded-2xl p-12 text-center border-2 border-[#e6ca65]/40 shadow-2xl animate-pulse">
            <div className="text-6xl mb-4 animate-bounce">🧙‍♂️</div>
            <h3 className="font-cinzel text-2xl font-bold text-gold-gradient mb-2">
              "¡Hmm... difícil, muy difícil...!"
            </h3>
            <p className="text-sm text-[#b8ab96] italic">
              El Sombrero Seleccionador está examinando tus recuerdos, virtudes y coraje...
            </p>
          </div>
        )}

        {/* Assigned Result View */}
        {!isDeliberating && assignedResult && (
          <div className="rounded-3xl p-8 sm:p-12 border-2 border-[#e6ca65] bg-gradient-to-br from-[#1b152d] via-[#141021] to-[#0d0a17] text-center shadow-2xl animate-fadeIn relative">
            <div className="text-6xl sm:text-7xl mb-4">
              {HOUSES[assignedResult.house].crestEmoji}
            </div>

            <div className="text-xs uppercase tracking-widest text-[#ffd700] font-semibold mb-2">
              El Sombrero Seleccionador ha hablado
            </div>

            <h3 className="font-cinzel text-4xl sm:text-6xl font-extrabold text-gold-gradient mb-4">
              {assignedResult.announcement}
            </h3>

            <p className="italic text-base sm:text-lg text-[#efe7d3] max-w-xl mx-auto mb-6 bg-[#0a0812]/60 p-4 rounded-xl border border-[#e6ca65]/30">
              "{assignedResult.speech}"
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8 text-left">
              <div className="p-3 rounded-lg bg-[#181326] border border-[#e6ca65]/20">
                <span className="text-[10px] text-gray-400 uppercase block">Fundador</span>
                <span className="text-xs font-bold text-white">{HOUSES[assignedResult.house].founder}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#181326] border border-[#e6ca65]/20">
                <span className="text-[10px] text-gray-400 uppercase block">Elemento</span>
                <span className="text-xs font-bold text-white">{HOUSES[assignedResult.house].element}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#181326] border border-[#e6ca65]/20">
                <span className="text-[10px] text-gray-400 uppercase block">Animal</span>
                <span className="text-xs font-bold text-white">{HOUSES[assignedResult.house].animal}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#181326] border border-[#e6ca65]/20">
                <span className="text-[10px] text-gray-400 uppercase block">Fantasma</span>
                <span className="text-xs font-bold text-white">{HOUSES[assignedResult.house].ghost.split('(')[0]}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#cta-admision"
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-cinzel text-xs uppercase tracking-wider font-bold text-[#0c0b12] bg-[#e6ca65] hover:bg-[#ffd700] transition-all flex items-center justify-center gap-2"
              >
                <Award size={16} />
                <span>Registrar en mi Carta de Admisión</span>
              </a>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-cinzel text-xs uppercase tracking-wider font-semibold text-[#ded4c3] bg-[#221c35] border border-[#e6ca65]/30 hover:border-[#e6ca65] transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw size={14} />
                <span>Repetir Selección</span>
              </button>
            </div>
          </div>
        )}

        {/* Ongoing Quiz Step */}
        {!isDeliberating && !assignedResult && currentQuestion && (
          <div className="parchment-card rounded-2xl p-6 sm:p-10 border border-[#e6ca65]/30 shadow-2xl relative">
            
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e6ca65]/15">
              <div className="text-xs font-cinzel font-semibold uppercase tracking-wider text-[#e6ca65]">
                Pregunta {currentStep + 1} de {QUIZ_QUESTIONS.length}
              </div>
              <div className="flex gap-1.5">
                {QUIZ_QUESTIONS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentStep
                        ? 'w-8 bg-[#e6ca65]'
                        : idx < currentStep
                        ? 'w-4 bg-[#740001]'
                        : 'w-4 bg-[#2b2440]'
                    }`}
                  />
                ))}
              </div>
            </div>

            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-2">
              {currentQuestion.question}
            </h3>
            <p className="text-xs sm:text-sm text-[#b8ab96] italic mb-8 font-body">
              {currentQuestion.description}
            </p>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option.house)}
                  className="w-full text-left p-4 sm:p-5 rounded-xl bg-[#13101f] border border-[#e6ca65]/20 hover:border-[#e6ca65] hover:bg-[#1f1933] transition-all flex items-start gap-4 group"
                >
                  <div className="w-6 h-6 rounded-full bg-[#1e1830] border border-[#e6ca65]/40 flex items-center justify-center text-xs font-bold text-[#e6ca65] group-hover:bg-[#e6ca65] group-hover:text-[#0c0b12] transition-colors shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div>
                    <span className="text-sm sm:text-base text-[#f0e8d9] group-hover:text-white transition-colors block font-body">
                      {option.text}
                    </span>
                    <span className="text-[11px] text-[#e6ca65] mt-1 font-medium block">
                      Afinidad: {option.trait}
                    </span>
                  </div>
                </button>
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
