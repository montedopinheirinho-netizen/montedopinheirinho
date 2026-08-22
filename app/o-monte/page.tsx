import Link from "next/link";

export default function OMonte() {
  return (
    <div className="flex flex-col w-full bg-white text-[#112535] pt-20">
      
      <section className="px-6 py-16 md:py-24 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-light uppercase tracking-widest mb-6">
          A Sua Casa de Campo
        </h1>
        <div className="w-12 h-[1px] bg-[#112535] mx-auto mb-8"></div>
        <p className="text-stone-500 font-light leading-relaxed text-sm md:text-base">
          Pensada para acolher o seu grupo com total conforto e privacidade. O Monte do Pinheirinho funde a traça típica alentejana com comodidades de excelência, criando o cenário ideal para férias inesquecíveis ou retiros de trabalho.
        </p>
      </section>

      <section className="bg-stone-50 border-t border-stone-200">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="h-72 md:h-[600px] w-full relative">
            <img src="/quarto-principal.jpeg" alt="Quarto Principal" className="w-full h-full object-cover" />
          </div>
          <div className="p-10 md:p-20 flex flex-col justify-center">
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-stone-400 font-medium mb-4">Descanso Absoluto</span>
            <h2 className="text-2xl md:text-3xl font-light uppercase tracking-widest mb-6">Quartos Acolhedores</h2>
            <ul className="space-y-4 text-stone-500 font-light text-sm md:text-base">
              <li className="flex items-start"><span className="text-[#112535] mr-3">•</span>Quatro quartos de casal decorados com detalhe e harmonia.</li>
              <li className="flex items-start"><span className="text-[#112535] mr-3">•</span>Divisão multifuncional (sala de lazer ou quarto infantil) com capacidade para 3 a 4 pessoas (beliche e camas de solteiro).</li>
              <li className="flex items-start"><span className="text-[#112535] mr-3">•</span>Duas casas de banho completas para total conveniência do seu grupo.</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-white">
          <div className="p-10 md:p-20 flex flex-col justify-center order-last md:order-first">
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-stone-400 font-medium mb-4">Convívio</span>
            <h2 className="text-2xl md:text-3xl font-light uppercase tracking-widest mb-6">Zonas Comuns</h2>
            <ul className="space-y-4 text-stone-500 font-light text-sm md:text-base">
              <li className="flex items-start"><span className="text-[#112535] mr-3">•</span>Ampla sala comum com lareira, o verdadeiro coração da casa.</li>
              <li className="flex items-start"><span className="text-[#112535] mr-3">•</span>Comunicação direta com o alpendre, unindo harmoniosamente o interior e o exterior.</li>
              <li className="flex items-start"><span className="text-[#112535] mr-3">•</span>Cozinha vasta e totalmente equipada para que nada falte na preparação das suas refeições.</li>
            </ul>
          </div>
          <div className="h-72 md:h-[600px] w-full relative order-first md:order-last">
            {/* Atualizado para sala-comum.jpg */}
            <img src="/sala-comum.jpg" alt="Sala Comum e Cozinha" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#112535] text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-2xl font-light uppercase tracking-widest mb-16">
            Comodidades de Excelência
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-[1px] bg-white/30 mb-6"></div>
              <h3 className="text-lg uppercase tracking-widest mb-3 font-medium">Lazer Privado</h3>
              <p className="text-white/70 font-light text-sm leading-relaxed">Piscina privada para dias soalheiros, área envolvente com espreguiçadeiras, relvado espaçoso para jogos e um grande alpendre coberto.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-[1px] bg-white/30 mb-6"></div>
              <h3 className="text-lg uppercase tracking-widest mb-3 font-medium">Conectividade Rápida</h3>
              <p className="text-white/70 font-light text-sm leading-relaxed">Equipado com o sistema de satélite Starlink, garantimos internet de alta velocidade mesmo no coração da natureza rural.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-[1px] bg-white/30 mb-6"></div>
              <h3 className="text-lg uppercase tracking-widest mb-3 font-medium">Conforto Total</h3>
              <p className="text-white/70 font-light text-sm leading-relaxed">Um espaço que respira tranquilidade mas garante todas as facilidades modernas, com climatização para uma estadia perfeita.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria com extensões atualizadas */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-2xl font-light uppercase tracking-widest mb-2">Galeria</h2>
              <p className="text-stone-500 font-light text-sm">Explore os recantos do Monte do Pinheirinho.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            <img src="/galeria-1.JPG" alt="Galeria 1" className="w-full h-48 md:h-56 object-cover border border-stone-200" />
            <img src="/galeria-2.jpg" alt="Galeria 2" className="w-full h-48 md:h-56 object-cover border border-stone-200" />
            <img src="/galeria-3.jpg" alt="Galeria 3" className="w-full h-48 md:h-56 object-cover border border-stone-200" />
            <img src="/galeria-4.JPG" alt="Galeria 4" className="w-full h-48 md:h-56 object-cover border border-stone-200" />
            <img src="/galeria-5.jpeg" alt="Galeria 5" className="w-full h-48 md:h-56 object-cover border border-stone-200" />
            
            <img src="/galeria-6.jpeg" alt="Galeria 6" className="w-full h-48 md:h-56 object-cover border border-stone-200" />
            <img src="/galeria-7.jpg" alt="Galeria 7" className="w-full h-48 md:h-56 object-cover border border-stone-200" />
            <img src="/galeria-8.jpg" alt="Galeria 8" className="w-full h-48 md:h-56 object-cover border border-stone-200" />
            <img src="/galeria-9.jpg" alt="Galeria 9" className="w-full h-48 md:h-56 object-cover border border-stone-200" />
            <img src="/galeria-10.jpg" alt="Galeria 10" className="w-full h-48 md:h-56 object-cover border border-stone-200" />
          </div>
        </div>
      </section>

    </div>
  );
}