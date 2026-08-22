import Link from "next/link";

export default function OMonte() {
  return (
    <div className="flex flex-col w-full bg-white text-[#112535] pt-20">
      
      {/* 1. HERO / INTRODUÇÃO */}
      <section className="px-6 py-16 md:py-24 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-light uppercase tracking-widest mb-6">
          A Sua Casa de Campo
        </h1>
        <div className="w-12 h-[1px] bg-[#112535] mx-auto mb-8"></div>
        <p className="text-stone-500 font-light leading-relaxed text-sm md:text-base">
          6 hectares de privacidade absoluta no Baixo Alentejo, a apenas 1h15 de Lisboa e a 20 minutos das praias da Costa Vicentina. Um refúgio pensado para acolher o seu grupo com total conforto, unindo a traça típica alentejana a comodidades de excelência.
        </p>
      </section>

      {/* 2. ESPECIFICAÇÕES TÉCNICAS RÁPIDAS */}
      <section className="bg-stone-50 py-12 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 bg-white border border-stone-100 shadow-sm">
            <p className="text-2xl font-light mb-1">5</p>
            <p className="text-[10px] uppercase tracking-widest text-stone-500">Quartos Espaçosos</p>
          </div>
          <div className="p-6 bg-white border border-stone-100 shadow-sm">
            <p className="text-2xl font-light mb-1">200 m²</p>
            <p className="text-[10px] uppercase tracking-widest text-stone-500">Área Interior</p>
          </div>
          <div className="p-6 bg-white border border-stone-100 shadow-sm">
            <p className="text-2xl font-light mb-1">6 Ha</p>
            <p className="text-[10px] uppercase tracking-widest text-stone-500">Terreno Privado</p>
          </div>
          <div className="p-6 bg-white border border-stone-100 shadow-sm">
            <p className="text-2xl font-light mb-1">9.3</p>
            <p className="text-[10px] uppercase tracking-widest text-stone-500">Pontuação Média</p>
          </div>
        </div>
      </section>

      {/* 3. QUARTOS E ZONAS COMUNS (LAYOUT ALTERNADO) */}
      <section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="h-72 md:h-[600px] w-full relative">
            <img src="/quarto-principal.jpg" alt="Quarto Principal" className="w-full h-full object-cover" />
          </div>
          <div className="p-10 md:p-20 flex flex-col justify-center">
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-stone-400 font-medium mb-4">Descanso Absoluto</span>
            <h2 className="text-2xl md:text-3xl font-light uppercase tracking-widest mb-6">Quartos Acolhedores</h2>
            <ul className="space-y-4 text-stone-500 font-light text-sm md:text-base">
              <li className="flex items-start"><span className="text-[#112535] mr-3">•</span>Cinco quartos confortáveis decorados com detalhe e harmonia para o descanso do seu grupo.</li>
              <li className="flex items-start"><span className="text-[#112535] mr-3">•</span>Divisões versáteis equipadas com camas de casal e camas individuais de apoio.</li>
              <li className="flex items-start"><span className="text-[#112535] mr-3">•</span>Duas casas de banho completas (com bidé e chuveiro) para total conveniência.</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-stone-50">
          <div className="p-10 md:p-20 flex flex-col justify-center order-last md:order-first">
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-stone-400 font-medium mb-4">Convívio</span>
            <h2 className="text-2xl md:text-3xl font-light uppercase tracking-widest mb-6">Zonas Comuns</h2>
            <ul className="space-y-4 text-stone-500 font-light text-sm md:text-base">
              <li className="flex items-start"><span className="text-[#112535] mr-3">•</span>Ampla sala de estar com televisão de ecrã plano e lareira, o verdadeiro coração da casa.</li>
              <li className="flex items-start"><span className="text-[#112535] mr-3">•</span>Comunicação direta com o alpendre exterior, unindo o conforto interior à natureza.</li>
              <li className="flex items-start"><span className="text-[#112535] mr-3">•</span>Cozinha totalmente equipada com frigorífico, máquina de café e todos os utensílios essenciais.</li>
            </ul>
          </div>
          <div className="h-72 md:h-[600px] w-full relative order-first md:order-last">
            <img src="/sala-comum.jpg" alt="Sala Comum e Cozinha" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* 4. COMODIDADES DE EXCELÊNCIA */}
      <section className="py-24 px-6 bg-[#112535] text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-2xl font-light uppercase tracking-widest mb-16">
            Comodidades de Excelência
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-[1px] bg-white/30 mb-6"></div>
              <h3 className="text-lg uppercase tracking-widest mb-3 font-medium">Lazer & Ar Livre</h3>
              <p className="text-white/70 font-light text-sm leading-relaxed">Piscina exterior privada, relvado espaçoso para jogos, comodidades para churrascos e zonas de descanso sombreadas.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-[1px] bg-white/30 mb-6"></div>
              <h3 className="text-lg uppercase tracking-widest mb-3 font-medium">Conectividade Starlink</h3>
              <p className="text-white/70 font-light text-sm leading-relaxed">Acesso Wi-Fi de alta velocidade em toda a propriedade, permitindo total conforto para trabalho remoto ou partilha de momentos.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-[1px] bg-white/30 mb-6"></div>
              <h3 className="text-lg uppercase tracking-widest mb-3 font-medium">Localização Estratégica</h3>
              <p className="text-white/70 font-light text-sm leading-relaxed">Próximo da Barragem da Fonte do Serne (1.5 km) e a minutos das praias piscatórias e da Costa Vicentina.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GALERIA DE IMAGENS (CORRIGIDO PARA EXTENSÕES MINÚSCULAS) */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-2xl font-light uppercase tracking-widest mb-2">Galeria Fotográfica</h2>
              <p className="text-stone-500 font-light text-sm">Explore os recantos do Monte do Pinheirinho.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link href="/reservas" className="text-xs uppercase tracking-[0.2em] font-medium border-b border-[#112535] pb-1 hover:text-blue-700 transition-colors">
                Verificar Disponibilidade →
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            <img src="/galeria-1.jpg" alt="Galeria 1" className="w-full h-48 md:h-56 object-cover border border-stone-200" />
            <img src="/galeria-2.jpg" alt="Galeria 2" className="w-full h-48 md:h-56 object-cover border border-stone-200" />
            <img src="/galeria-3.jpg" alt="Galeria 3" className="w-full h-48 md:h-56 object-cover border border-stone-200" />
            <img src="/galeria-4.jpg" alt="Galeria 4" className="w-full h-48 md:h-56 object-cover border border-stone-200" />
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