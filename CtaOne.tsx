/* =========================================================================
   SECCIÓN 4: CTA (CALL TO ACTION 1)
   Formulario interactivo de Admisión al Colegio Hogwarts de Magia y Hechicería.
   Envío por Lechuza con conexión al backend Node.js (POST /api/admission)
   y despliegue de la Carta Oficial sellada con cera roja.
   ========================================================================= */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, Feather, CheckCircle, MapPin, Sparkles, Award } from 'lucide-react';
import { AdmissionApplication, AdmissionResponse } from '../types';
import { magicAudio } from '../audio';

export const CtaOne: React.FC = () => {
  const [formData, setFormData] = useState<AdmissionApplication>({
    fullName: '',
    age: 11,
    pet: 'lechuza',
    preferredHouse: 'indiferente',
    address: 'Habitación del ático, Número 4 de Privet Drive'
  });

  const [loading, setLoading] = useState(false);
  const [letterResult, setLetterResult] = useState<AdmissionResponse['letter'] | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg('Por favor escribe tu nombre de mago o bruja.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      // Connect to Node.js Express backend
      const response = await fetch('/api/admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let data: AdmissionResponse;
      if (response.ok) {
        data = await response.json();
      } else {
        // Fallback calculation if backend port isn't reached directly
        data = {
          success: true,
          message: 'Carta emitida con éxito por la lechuza de guardia.',
          letter: {
            recipient: formData.fullName,
            location: formData.address,
            deliveryMethod: 'Lechuza Real de Correos Mágicos',
            deputyHeadmistress: 'Minerva McGonagall (Subdirectora)',
            platform: 'Andén 9¾, Estación de King\'s Cross, Londres',
            termStart: '1 de Septiembre a las 11:00 am',
            acceptedTerms: [
              'Tres juegos de túnicas de trabajo (negras)',
              'Un sombrero puntiagudo para uso diario',
              'Un caldero de peltre tamaño 2',
              'Un juego de redomas de vidrio o cristal',
              'Una varita mágica oficial de Ollivanders'
            ]
          }
        };
      }

      setLetterResult(data.letter);
      magicAudio.playOwlDelivery();

      // Golden Sparks Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e6ca65', '#ffd700', '#ffffff', '#740001']
      });

    } catch (err) {
      // Offline / fallback graceful response
      setLetterResult({
        recipient: formData.fullName,
        location: formData.address,
        deliveryMethod: 'Lechuza Nival Rápida',
        deputyHeadmistress: 'Minerva McGonagall (Subdirectora)',
        platform: 'Andén 9¾, King\'s Cross',
        termStart: '1 de Septiembre a las 11:00 am',
        acceptedTerms: [
          'Tres juegos de túnicas sencillas de trabajo (negras)',
          'Un sombrero de gala (negro)',
          'Un caldero de peltre tamaño 2',
          'Una varita mágica en Ollivanders'
        ]
      });
      magicAudio.playOwlDelivery();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cta-admision" className="relative py-24 bg-gradient-to-b from-[#0c0b12] via-[#14101e] to-[#0c0b12] border-t border-[#e6ca65]/20">
      
      {/* Platform 9 3/4 Sign Background Watermark */}
      <div className="absolute right-8 top-12 opacity-5 pointer-events-none hidden lg:block text-9xl font-cinzel font-bold text-[#e6ca65]">
        9¾
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#740001]/40 border border-[#e6ca65]/40 text-xs font-semibold text-[#ffd700] uppercase tracking-widest mb-3">
            <Feather size={14} />
            <span>Plataforma Oficial de Admisiones</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white mb-4">
            Solicita tu <span className="text-gold-gradient">Carta de Hogwarts</span>
          </h2>
          <p className="text-sm sm:text-base text-[#baa990] max-w-xl mx-auto font-body">
            Completa tus datos para que la Pluma de Aceptación registre tu nombre y una lechuza entregue tu carta oficial sellada con lacre de cera.
          </p>
        </div>

        {/* If Letter is generated, show the Official Hogwarts Acceptance Letter! */}
        {letterResult ? (
          <div className="hogwarts-letter rounded-2xl p-8 sm:p-12 border-4 border-[#bfa265] shadow-2xl relative animate-fadeIn transition-all">
            
            {/* Wax Seal */}
            <div className="absolute -top-6 -right-4 sm:right-8 w-16 h-16 sm:w-20 sm:h-20 rounded-full wax-seal flex items-center justify-center text-white text-xl font-cinzel font-bold shadow-xl border-2 border-[#ffb3b8]">
              H
            </div>

            <div className="text-center pb-6 border-b-2 border-[#1a1711]/20">
              <div className="text-2xl font-bold tracking-widest uppercase font-cinzel">
                COLEGIO HOGWARTS DE MAGIA Y HECHICERÍA
              </div>
              <div className="text-xs tracking-wider uppercase text-[#3a3225] mt-1 font-sans">
                Director: Albus Dumbledore <br />
                (Orden de Merlín, Primera Clase, Gran Hechicero, Jefe de Magos, Confederación Internacional de Magos)
              </div>
            </div>

            <div className="mt-8 space-y-4 text-base sm:text-lg leading-relaxed text-[#1a1711]">
              <p className="font-bold">
                Estimado/a <span className="text-[#740001]">{letterResult.recipient}</span>,
              </p>
              <p className="italic text-sm sm:text-base text-[#3d3424]">
                Entregar en: {letterResult.location}
              </p>
              <p>
                Tenemos el placer de informarle de que dispone de una plaza en el Colegio Hogwarts de Magia y Hechicería.
                El curso comienza el <strong>{letterResult.termStart}</strong>. Esperamos su lechuza antes del 31 de julio.
              </p>
              <p>
                El Expreso de Hogwarts partirá con rigurosa puntualidad desde el <strong>{letterResult.platform}</strong>.
              </p>

              <div className="pt-4 pb-2">
                <p className="font-bold text-sm uppercase tracking-wider mb-2">Requisitos de Equipamiento de Primer Año:</p>
                <ul className="list-disc list-inside text-sm space-y-1 text-[#2d271c]">
                  {letterResult.acceptedTerms.map((term, i) => (
                    <li key={i}>{term}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 flex justify-between items-end border-t border-[#1a1711]/20">
                <div>
                  <div className="text-xs uppercase text-[#544732]">Método de envío:</div>
                  <div className="text-sm font-semibold">{letterResult.deliveryMethod}</div>
                </div>
                <div className="text-right">
                  <div className="font-serif italic text-lg sm:text-xl font-bold text-[#740001]">
                    Minerva McGonagall
                  </div>
                  <div className="text-xs uppercase text-[#544732]">Subdirectora</div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => {
                  setLetterResult(null);
                  magicAudio.playWandSpark();
                }}
                className="px-6 py-2.5 rounded-lg bg-[#1a1711] text-[#f7f1df] hover:bg-[#332c1f] text-xs uppercase tracking-wider font-semibold transition-all"
              >
                Solicitar Otra Carta
              </button>
            </div>
          </div>
        ) : (
          /* Application Form */
          <div className="parchment-card rounded-2xl p-8 sm:p-10 border border-[#e6ca65]/30 shadow-2xl relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-200 text-sm">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#e6ca65] mb-2 font-cinzel">
                    Nombre Completo de Mago / Bruja *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Harry James Potter"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0e0c15] border border-[#e6ca65]/30 text-white placeholder-gray-500 focus:outline-none focus:border-[#e6ca65] focus:ring-1 focus:ring-[#e6ca65] text-sm"
                  />
                </div>

                {/* Age */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#e6ca65] mb-2 font-cinzel">
                    Edad del Estudiante (Mínimo 10 años) *
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="120"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 11 })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0e0c15] border border-[#e6ca65]/30 text-white placeholder-gray-500 focus:outline-none focus:border-[#e6ca65] focus:ring-1 focus:ring-[#e6ca65] text-sm"
                  />
                </div>

                {/* Pet Choice */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#e6ca65] mb-2 font-cinzel">
                    Mascota Acompañante
                  </label>
                  <select
                    value={formData.pet}
                    onChange={(e) => setFormData({ ...formData, pet: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0e0c15] border border-[#e6ca65]/30 text-white focus:outline-none focus:border-[#e6ca65] text-sm"
                  >
                    <option value="lechuza">🦉 Lechuza (Ideal para correspondencia)</option>
                    <option value="gato">🐱 Gato (Afinidad mágica milenaria)</option>
                    <option value="sapo">🐸 Sapo (Tradición de pocioneros antiguos)</option>
                    <option value="rata">🐀 Rata (Discreta y astuta)</option>
                  </select>
                </div>

                {/* Preferred House */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#e6ca65] mb-2 font-cinzel">
                    Preferencia de Casa
                  </label>
                  <select
                    value={formData.preferredHouse}
                    onChange={(e) => setFormData({ ...formData, preferredHouse: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0e0c15] border border-[#e6ca65]/30 text-white focus:outline-none focus:border-[#e6ca65] text-sm"
                  >
                    <option value="indiferente">✨ Que decida el Sombrero Seleccionador</option>
                    <option value="gryffindor">🦁 Gryffindor (Valor y Coraje)</option>
                    <option value="slytherin">🐍 Slytherin (Astucia y Ambición)</option>
                    <option value="ravenclaw">🦅 Ravenclaw (Sabiduría e Ingenio)</option>
                    <option value="hufflepuff">🦡 Hufflepuff (Lealtad y Honestidad)</option>
                  </select>
                </div>

              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#e6ca65] mb-2 font-cinzel">
                  Lugar Exacto de Entrega para la Lechuza *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-[#e6ca65]" />
                  <input
                    type="text"
                    required
                    placeholder="Ej. Alacena bajo las escaleras, Privet Drive 4, Surrey"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0e0c15] border border-[#e6ca65]/30 text-white placeholder-gray-500 focus:outline-none focus:border-[#e6ca65] text-sm"
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  La lechuza encontrará la ventana o chimenea indicada incluso en caso de encierro muggle.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-cinzel text-base font-bold uppercase tracking-wider text-[#0e0c12] bg-gradient-to-r from-[#ffd700] via-[#e6ca65] to-[#c49e29] hover:shadow-[0_0_30px_rgba(230,202,101,0.5)] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    <span>Convocando lechuza mensajera...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar Solicitud con Lechuza Oficial</span>
                  </>
                )}
              </button>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
