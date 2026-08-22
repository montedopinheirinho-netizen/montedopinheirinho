import Link from "next/link";

export default function Regiao() {
  return (
    <div className="flex flex-col w-full bg-white text-[#112535] pt-20">
      
      <section className="px-6 py-16 md:py-24 text-center max-w-4xl mx-auto">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-stone-400 font-medium mb-4 block">
          Alentejo Litoral
        </span>
        <h1 className="text-3xl md:text-5xl font-light uppercase tracking-widest mb-6 leading-tight">
          Praias, Natureza e <br/> Gastronomia
        </h1>
        <div className="w-12 h-[1px] bg-[#112535] mx-auto mb-8"></div>
        <p className="text-stone-500 font-light leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
          O Monte do Pinheirinho é o seu ponto de partida privilegiado para explorar o melhor da Costa Vicentina e do interior alentejano. Um verdadeiro tesouro de paisagens protegidas e experiências autênticas.
        </p>
      </section>

      <section className="bg-stone-50 border-t border-stone-200">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="h-72 md:h-[600px] w-full relative">
            <img src="/regiao-costa.jpg" alt="Costa Vicentina" className="w-full h-full object-cover" />
          </div>
          <div className="p-10 md:p-20 flex flex-col justify-center">
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-stone-400 font-medium mb-4">A 20 Minutos de Distância</span>
            <h2 className="text-2xl md:text-3xl font-light uppercase tracking-widest mb-6">Costa Vicentina</h2>
            <p className="text-stone-500 font-light text-sm md:text-base leading-relaxed mb-6">
              Descubra praias selvagens e águas cristalinas, desde a imponente Praia do Malhão às carismáticas vilas piscatórias de Porto Covo e Vila Nova de Milfontes. O Parque Natural do Sudoeste Alentejano convida a trilhos pedestres inesquecíveis entre sobreiros e a observação de uma rica fauna local.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-light uppercase tracking-widest mb-4">Os Nossos Parceiros</h2>
            <p className="text-stone-500 font-light max-w-2xl mx-auto">
              Valorizamos os produtos locais e a gastronomia regional. Criámos ligações estratégicas para lhe oferecer uma experiência verdadeiramente autêntica.
            </p>
          </div>
          <div className="border border-stone-200 bg-stone-50 p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/3 h-48 bg-white flex items-center justify-center p-6 border border-stone-200">
              <img src="/logo-pecados.png" alt="Logótipo Pecados do Alentejo" className="w-full h-full object-contain" />
            </div>
            <div className="w-full md:w-2/3 flex flex-col">
              <h3 className="text-xl font-light uppercase tracking-widest mb-4 text-[#112535]">Pecados do Alentejo</h3>
              <p className="text-stone-500 font-light text-sm md:text-base leading-relaxed mb-6">
                Uma marca dedicada aos produtos gourmet regionais, celebrando os sabores e tradições únicas da nossa região. Durante a sua estadia no Monte do Pinheirinho, pode encomendar estes produtos e levantá-los na aldeia de São Domingos, a apenas 4km do Monte.
              </p>
              <a 
                href="https://pecadosdoalentejo.pt" 
                target="_blank" 
                rel="noreferrer"
                className="self-start text-xs uppercase tracking-widest font-medium border border-[#112535] px-8 py-3 text-[#112535] hover:bg-[#112535] hover:text-white transition-colors"
              >
                Visitar Loja do Parceiro
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}