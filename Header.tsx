/* =========================================================================
   SECCIÓN 1: HEADER
   Barra de navegación principal, escudo de Hogwarts, selector de Casas,
   reproductor de melodía mágica y acceso directo a admisión.
   ========================================================================= */

import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, Sparkles, Feather } from 'lucide-react';
import { HouseId } from '../types';
import { HOUSES } from '../data';
import { magicAudio } from '../audio';

interface HeaderProps {
  currentHouse: HouseId;
  onSelectHouse: (house: HouseId) => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentHouse,
  onSelectHouse,
  isMusicPlaying,
  onToggleMusic
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const houseData = HOUSES[currentHouse];

  const handleHouseChange = (hId: HouseId) => {
    magicAudio.playWandSpark();
    onSelectHouse(hId);
  };

  const navLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Beneficios', href: '#beneficios' },
    { label: 'Admisión 9¾', href: '#cta-admision' },
    { label: 'Academia', href: '#explicacion' },
    { label: 'Testimonios', href: '#testimonios' },
    { label: 'Sombrero Seleccionador', href: '#cta-seleccion' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0e0c15]/90 backdrop-blur-md border-b border-[#e6ca65]/20 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Hogwarts Crest */}
          <a
            href="#hero"
            className="flex items-center gap-3 group"
            onClick={() => magicAudio.playWandSpark()}
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#e6ca65] via-[#8c6b1a] to-[#392205] p-[2px] shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-[#120f1b] flex items-center justify-center text-xl">
                <span>🏰</span>
              </div>
            </div>
            <div>
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-gold-gradient block leading-tight">
                HOGWARTS
              </span>
              <span className="text-[10px] tracking-widest text-[#d4af37]/80 uppercase block font-medium">
                Colegio de Magia & Hechicería
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#c4b9a3] hover:text-[#e6ca65] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#e6ca65] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* House Selector & Audio & CTA */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Quick House switcher */}
            <div className="flex items-center bg-[#181424] border border-[#e6ca65]/25 rounded-full p-1 gap-1">
              {(Object.keys(HOUSES) as HouseId[]).map((h) => {
                const isSelected = currentHouse === h;
                return (
                  <button
                    key={h}
                    onClick={() => handleHouseChange(h)}
                    title={`Ver estilo de ${HOUSES[h].name}`}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                      isSelected
                        ? 'bg-[#e6ca65] text-[#0c0b12] font-bold scale-110 shadow-md ring-2 ring-[#e6ca65]/50'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {HOUSES[h].crestEmoji}
                  </button>
                );
              })}
            </div>

            {/* Ambient Music Toggle */}
            <button
              onClick={onToggleMusic}
              title={isMusicPlaying ? 'Silenciar melodía de Hogwarts' : 'Reproducir melodía mágica'}
              className={`p-2 rounded-full border transition-all ${
                isMusicPlaying
                  ? 'border-[#e6ca65] bg-[#e6ca65]/20 text-[#e6ca65] animate-pulse'
                  : 'border-gray-700 bg-[#161424] text-gray-400 hover:text-[#e6ca65] hover:border-[#e6ca65]/50'
              }`}
            >
              {isMusicPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>

            {/* Main Header CTA */}
            <a
              href="#cta-admision"
              onClick={() => magicAudio.playWandSpark()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold text-[#0c0b12] bg-gradient-to-r from-[#ffd700] via-[#e6ca65] to-[#b89328] hover:shadow-[0_0_20px_rgba(230,202,101,0.5)] transition-all hover:scale-105 active:scale-95"
            >
              <Feather size={14} />
              <span>Solicitar Carta</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onToggleMusic}
              className="p-2 text-gray-400 hover:text-[#e6ca65]"
            >
              {isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-[#e6ca65]"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#120f1b] border-b border-[#e6ca65]/30 px-5 pt-3 pb-6 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-gray-800">
            <span className="text-xs uppercase tracking-widest text-[#e6ca65]">Casa Seleccionada: {houseData.name}</span>
            <div className="flex gap-2">
              {(Object.keys(HOUSES) as HouseId[]).map((h) => (
                <button
                  key={h}
                  onClick={() => handleHouseChange(h)}
                  className={`w-7 h-7 rounded-full text-sm ${currentHouse === h ? 'ring-2 ring-[#e6ca65]' : ''}`}
                >
                  {HOUSES[h].crestEmoji}
                </button>
              ))}
            </div>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base text-gray-200 hover:text-[#e6ca65] py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta-admision"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold text-[#0c0b12] bg-[#e6ca65]"
          >
            <Sparkles size={16} />
            <span>Solicitar Carta de Hogwarts</span>
          </a>
        </div>
      )}
    </header>
  );
};
