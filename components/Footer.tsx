import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#084063] text-white/70 py-16 text-sm mt-auto w-full font-light">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Coluna 1: Manifesto e Redes Sociais */}
        <div>
          <h3 className="text-white text-lg font-light tracking-widest uppercase mb-6">Monte do Pinheirinho</h3>
          <p className="max-w-xs leading-relaxed mb-8">
            A sua escapadela perfeita para relaxar e desligar da rotina, rodeado pela natureza autêntica e exclusividade total em pleno Alentejo.
          </p>
          
          <div>
            <p className="text-[10px] tracking-widest uppercase text-white/50 mb-3">Siga-nos</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/montedopinheirinho/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-xs uppercase tracking-widest">
                Instagram
              </a>
              <span className="text-white/30">|</span>
              <a href="https://www.facebook.com/montedopinheirinho/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-xs uppercase tracking-widest">
                Facebook
              </a>
            </div>
          </div>
        </div>
        
        {/* Coluna 2: Navegação Rápida */}
        <div>
          <h3 className="text-white text-lg font-light tracking-widest uppercase mb-6">Links Úteis</h3>
          <ul className="space-y-4 flex flex-col">
            <Link href="/o-monte" className="hover:text-white transition-colors uppercase tracking-widest text-xs">O Monte</Link>
            <Link href="/eventos" className="hover:text-white transition-colors uppercase tracking-widest text-xs">Eventos</Link>
            <Link href="/regiao" className="hover:text-white transition-colors uppercase tracking-widest text-xs">Região</Link>
            <Link href="/contactos" className="hover:text-white transition-colors uppercase tracking-widest text-xs">Contactos</Link>
            <Link href="/reservas" className="hover:text-white transition-colors uppercase tracking-widest text-xs">Reservas</Link>
          </ul>
        </div>
        
        {/* Coluna 3: Informação Legal e Contactos */}
        <div>
          <h3 className="text-white text-lg font-light tracking-widest uppercase mb-6">Legal & Apoio</h3>
          <ul className="space-y-3 flex flex-col mb-6">
            <Link href="/termos" className="hover:text-white transition-colors uppercase tracking-widest text-xs">Termos e Condições</Link>
            <Link href="/privacidade" className="hover:text-white transition-colors uppercase tracking-widest text-xs">Política de Privacidade</Link>
            <a 
              href="https://www.livroreclamacoes.pt" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors uppercase tracking-widest text-xs text-stone-300 underline underline-offset-4"
            >
              Livro de Reclamações Eletrónico
            </a>
          </ul>
          
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-xs mb-4">
              <span className="block tracking-widest uppercase text-white/50 mb-1">Email Direto</span>
              <a href="mailto:montedopinheirinho@gmail.com" className="hover:text-white transition-colors">
                montedopinheirinho@gmail.com
              </a>
            </p>
            <p className="text-xs">
              <span className="block tracking-widest uppercase text-white/50 mb-2">Linhas de Apoio</span>
              <a href="tel:+351910907432" className="hover:text-white transition-colors block mb-1">
                +351 910 907 432
              </a>
              <a href="tel:+351919435664" className="hover:text-white transition-colors block">
                +351 919 435 664
              </a>
            </p>
          </div>
        </div>
      </div>
      
      {/* Linha de Copyright e Alojamento Local */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center text-[10px] sm:text-xs tracking-widest uppercase text-white/40 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Monte do Pinheirinho. Todos os direitos reservados.</p>
        <p>Registo AL: 38186/AL</p>
      </div>
    </footer>
  );
}