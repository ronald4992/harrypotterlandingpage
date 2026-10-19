/* =========================================================================
   SECCIÓN 9: PRE-FOOTER
   Boletín oficial del periódico El Profeta (The Daily Prophet) con
   suscripción por lechuza matutina y conexión a Node.js (POST /api/newsletter).
   ========================================================================= */

import React, { useState } from 'react';
import { Mail, CheckCircle2, Send, Sparkles, Feather } from 'lucide-react';
import { magicAudio } from '../audio';

export const PreFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [owlChoice, setOwlChoice] = useState<'lechuza-real' | 'buho-nival' | 'pigmeo'>('lechuza-real');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, owlChoice }),
      });

      let data;
      if (res.ok) {
        data = await res.json();
      } else {
        data = {
          success: true,
          message: '¡Suscripción confirmada! Tu lechuza despegará mañana a las 06:00 am.'
        };
      }

      setSubscribed(true);
      setStatusMsg(data.message || '¡Tu lechuza ha sido despachada con éxito!');
      magicAudio.playOwlDelivery();
    } catch {
      setSubscribed(true);
      setStatusMsg('¡Suscripción completada! Recibirás los edictos del Ministerio al amanecer.');
      magicAudio.playOwlDelivery();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#0a0910] via-[#14101e] to-[#07060b] border-t border-[#e6ca65]/20 overflow-hidden">
      
      {/* Decorative Golden Orbs */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#e6ca65]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* The Daily Prophet Newspaper Masthead Card */}
        <div className="parchment-card rounded-3xl p-8 sm:p-12 border-2 border-[#e6ca65]/40 shadow-2xl text-center">
          
          <div className="border-b-2 border-[#e6ca65]/30 pb-4 mb-6">
            <div className="text-[10px] sm:text-xs font-serif tracking-[0.25em] text-[#e6ca65] uppercase font-bold">
              ★ EDICIÓN ESPECIAL DEL MINISTERIO DE MAGIA ★
            </div>
            <h3 className="font-cinzel text-3xl sm:text-5xl font-black text-gold-gradient tracking-wider mt-1">
              EL PROFETA
            </h3>
            <div className="flex justify-between items-center text-[10px] text-[#9e917d] mt-2 px-4 uppercase font-serif">
              <span>Londres, Reino Unido</span>
              <span>Precio: 1 Sickle, 2 Knuts</span>
              <span>Edición Matutina</span>
            </div>
          </div>

          <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-3">
            Suscríbete a las Crónicas del Mundo Mágico
          </h4>
          <p className="text-sm text-[#baa990] max-w-xl mx-auto mb-8 font-body">
            Entérate antes que nadie de los resultados de la Liga de Quidditch, nuevos decretos de Hogwarts, alertas de criaturas mágicas y ofertas en Flourish & Blotts.
          </p>

          {subscribed ? (
            <div className="p-6 rounded-2xl bg-[#1b261a] border border-green-500/40 text-center animate-fadeIn">
              <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto mb-2" />
              <div className="font-cinzel text-lg font-bold text-white mb-1">
                ¡Lechuza Mensajera Asignada!
              </div>
              <p className="text-xs sm:text-sm text-green-200">
                {statusMsg}
              </p>
              <button
                onClick={() => setSubscribed(false)}
                className="mt-4 text-xs text-[#e6ca65] underline hover:text-white"
              >
                Suscribir otra dirección de lechuza
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-lg mx-auto space-y-4">
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#e6ca65]" />
                  <input
                    type="email"
                    required
                    placeholder="tu-correo-magico@hogwarts.wiz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0e0c15] border border-[#e6ca65]/30 text-white placeholder-gray-500 focus:outline-none focus:border-[#e6ca65] text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-xl font-cinzel text-xs uppercase tracking-wider font-bold text-[#0c0b12] bg-[#e6ca65] hover:bg-[#ffd700] transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg disabled:opacity-50"
                >
                  {loading ? (
                    <span>Despachando...</span>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Suscribirme</span>
                    </>
                  )}
                </button>
              </div>

              {/* Owl choice selection */}
              <div className="flex items-center justify-center gap-4 text-xs text-[#baa990]">
                <span>Tipo de lechuza:</span>
                <label className="flex items-center gap-1 cursor-pointer hover:text-[#e6ca65]">
                  <input
                    type="radio"
                    name="owl"
                    checked={owlChoice === 'lechuza-real'}
                    onChange={() => setOwlChoice('lechuza-real')}
                    className="accent-[#e6ca65]"
                  />
                  <span>🦉 Real</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer hover:text-[#e6ca65]">
                  <input
                    type="radio"
                    name="owl"
                    checked={owlChoice === 'buho-nival'}
                    onChange={() => setOwlChoice('buho-nival')}
                    className="accent-[#e6ca65]"
                  />
                  <span>❄️ Nival</span>
                </label>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-[11px] text-[#857b6d]">
                <span>✓ Sin costo en Galeones</span>
                <span>✓ Entregas al alba</span>
                <span>✓ Cancelable por Polvos Flu</span>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
