import Link from "next/link";

export default function Eventos() {
  return (
    <div className="flex flex-col w-full bg-white text-[#112535] pt-20">
      
      <section className="px-6 py-16 md:py-24 text-center max-w-4xl mx-auto">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-stone-400 font-medium mb-4 block">
          Celebrações Únicas
        </span>
        <h1 className="text-3xl md:text-5xl font-light uppercase tracking-widest mb-6 leading-tight">
          O Cenário Perfeito <br/> Para o Seu Evento
        </h1>
        <div className="w-12 h-[1px] bg-[#112535] mx-auto mb-8"></div>
        <p className="text-stone-500 font-light leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
          Com vastas áreas exteriores e uma versatilidade ímpar, o Monte do Pinheirinho transforma-se na tela em branco ideal para acolher momentos inesquecíveis, longe da agitação urbana e em total exclusividade.
        </p>
      </section>

      <section className="bg-stone-50 border-t border-stone-200">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="h-72 md:h-[500px] w-full relative">
            {/* Atualizado para eventos-casamento.png */}
            <img src="/eventos-casamento.png" alt="Casamentos e Jantares Privados" className="w-full h-full object-cover" />
          </div>
          <div className="p-10 md:p-20 flex flex-col justify-center">
            <h2 className="text-2xl font-light uppercase tracking-widest mb-6">Celebrações Privadas</h2>
            <p className="text-stone-500 font-light text-sm md:text-base leading-relaxed mb-6">
              Desde batizados e baby showers intimistas a casamentos de sonho e jantares privados sob as estrelas. O nosso amplo jardim oferece o layout perfeito para a montagem de tendas elegantes ou cocktails ao final da tarde junto à piscina.
            </p>
            <Link href="/contactos" className="text-xs uppercase tracking-widest font-medium border-b border-[#112535] pb-1 self-start hover:text-blue-700 transition-colors">
              Pedir Orçamento
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-white">
          <div className="p-10 md:p-20 flex flex-col justify-center order-last md:order-first">
            <h2 className="text-2xl font-light uppercase tracking-widest mb-6">Corporate & Team Building</h2>
            <p className="text-stone-500 font-light text-sm md:text-base leading-relaxed mb-6">
              Para empresas que procuram reforçar laços ou realizar ativações de marca impactantes, os nossos seis hectares permitem atividades de team building diversificadas, reuniões estratégicas ao ar livre e alojamento conjunto para equipas.
            </p>
            <Link href="/contactos" className="text-xs uppercase tracking-widest font-medium border-b border-[#112535] pb-1 self-start hover:text-blue-700 transition-colors">
              Planear Evento de Empresa
            </Link>
          </div>
          <div className="h-72 md:h-[500px] w-full relative order-first md:order-last">
            {/* Atualizado para eventos-corporate.png */}
            <img src="/eventos-corporate.png" alt="Eventos Corporativos" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

    </div>
  );
}