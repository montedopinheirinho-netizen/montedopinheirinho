"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#084063] shadow-md py-4" : "bg-[#084063] py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logotipo e Nome Oficial */}
        <Link href="/" className="flex items-center gap-4">
          <div className="w-10 h-10 md:w-16 md:h-12 relative flex-shrink-0">
            {/* O NOME FOI ALTERADO PARA QUEBRAR A CACHE */}
            <img src="/logo.JPG" alt="Logotipo Monte do Pinheirinho" className="w-full h-full object-contain mix-blend-screen" />
          </div>
          <span className="text-base md:text-xl font-light tracking-widest uppercase text-white">
            Monte do Pinheirinho
          </span>
        </Link>
        
        {/* Navegação Desktop */}
        <nav className="hidden md:flex gap-10 items-center text-xs font-medium text-white uppercase tracking-widest">
          <Link href="/o-monte" className="hover:text-stone-300 transition-colors">O Monte</Link>
          <Link href="/eventos" className="hover:text-stone-300 transition-colors">Eventos</Link>
          <Link href="/regiao" className="hover:text-stone-300 transition-colors">Região</Link>
          <Link href="/contactos" className="hover:text-stone-300 transition-colors">Contactos</Link>
          <Link href="/reservas" className="border border-white text-white px-8 py-3 hover:bg-white hover:text-[#084063] transition-colors">
            Reservar
          </Link>
        </nav>

        {/* Botão Mobile */}
        <button 
          className="md:hidden text-white p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menu Mobile Expandido */}
      {isOpen && (
        <div className="md:hidden bg-[#084063] border-t border-white/10 absolute w-full left-0 top-full shadow-2xl">
          <div className="flex flex-col px-6 py-4">
            <Link href="/o-monte" onClick={() => setIsOpen(false)} className="text-white text-xs font-medium uppercase tracking-widest py-4 border-b border-white/10">O Monte</Link>
            <Link href="/eventos" onClick={() => setIsOpen(false)} className="text-white text-xs font-medium uppercase tracking-widest py-4 border-b border-white/10">Eventos</Link>
            <Link href="/regiao" onClick={() => setIsOpen(false)} className="text-white text-xs font-medium uppercase tracking-widest py-4 border-b border-white/10">Região</Link>
            <Link href="/contactos" onClick={() => setIsOpen(false)} className="text-white text-xs font-medium uppercase tracking-widest py-4 border-b border-white/10">Contactos</Link>
            <Link href="/reservas" onClick={() => setIsOpen(false)} className="bg-white text-[#084063] text-xs font-medium uppercase tracking-widest px-5 py-4 mt-4 text-center hover:bg-stone-100 transition-colors">
              Reservar Estadia
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}