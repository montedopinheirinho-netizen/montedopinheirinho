import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#112535] text-white/70 py-16 text-sm mt-auto w-full font-light">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Coluna 1: Manifesto */}
        <div>
          <h3 className="text-white text-lg font-light tracking-widest uppercase mb-6">Monte do Pinheirinho</h3>
          <p className="max-w-xs leading-relaxed">
            A sua escapadela perfeita para relaxar e desligar da rotina, rodeado pela natureza autêntica e exclusividade total em pleno Alentejo.
          </p>
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
        
        {/* Coluna 3: Informação de Contacto e Morada */}
        <div>
          <h3 className="text-white text-lg font-light tracking-widest uppercase mb-6">Contactos</h3>
          <p className="mb-4">
            <span className="block text-xs tracking-widest uppercase text-white/50 mb-1">Morada</span>
            Monte do Pinheirinho, Foros do Moinho<br />
            7540-000 Santiago do Cacém
          </p>
          <p>
            <span className="block text-xs tracking-widest uppercase text-white/50 mb-1">Email</span>
            <a href="mailto:montedopinheirinho@gmail.com" className="hover:text-white transition-colors">
              montedopinheirinho@gmail.com
            </a>
          </p>
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