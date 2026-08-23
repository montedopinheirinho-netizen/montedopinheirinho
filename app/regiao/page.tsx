import Link from "next/link";

export default function Regiao() {
  // Coordenadas exatas do Monte do Pinheirinho para o ponto de partida do GPS
  const originCoords = "37.9011002,-8.5109246";

  return (
    <div className="flex flex-col w-full bg-white text-[#084063] pt-20">
      
      {/* 1. HERO SECTION */}
      <section className="px-6 py-16 md:py-24 text-center max-w-4xl mx-auto">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-stone-400 font-medium mb-4 block">
          Roteiro do Alentejo Litoral
        </span>
        <h1 className="text-3xl md:text-5xl font-light uppercase tracking-widest mb-6 leading-tight">
          O Seu Guia Local <br/> de Descobertas
        </h1>
        <div className="w-12 h-[1px] bg-[#084063] mx-auto mb-8"></div>
        <p className="text-stone-500 font-light leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
          O Monte do Pinheirinho é o ponto de partida perfeito. Da calma das barragens e trilhos rurais até às praias selvagens da Costa Vicentina, prepare-se para explorar um diário vivo de experiências únicas.
        </p>
      </section>

      {/* 2. NATUREZA E BARRAGENS (À PORTA DE CASA) */}
      <section className="bg-stone-50 border-t border-stone-200 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="order-last md:order-first">
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-stone-400 font-medium mb-4 block">A Natureza ao Seu Redor</span>
            <h2 className="text-2xl md:text-3xl font-light uppercase tracking-widest mb-6 text-[#084063]">
              Trilhos & Barragens
            </h2>
            <div className="space-y-4 text-stone-500 font-light text-sm leading-relaxed mb-8">
              <p>
                <strong>Caminhos de Santiago (Rota Vicentina):</strong> Mesmo na extrema do nosso Monte passam trilhos míticos. É o cenário idílico para longas caminhadas matinais, explorar a região de bicicleta (BTT) ou para o seu jogging diário imerso na natureza.
              </p>
              <p>
                <strong>Refúgios de Água Doce:</strong> A escassos 2km de distância, poderá explorar a <strong>Barragem de Fonte Serne</strong>, e um pouco mais à frente a famosa <strong>Barragem de Campilhas</strong>. Espelhos de água perfeitos para piqueniques, pesca desportiva e contemplação absoluta.
              </p>
              <p>
                <strong>Aldeia de São Domingos:</strong> A 4km encontra o coração da comunidade local, com mini-mercado, pão quente alentejano e restaurantes típicos para uma refeição autêntica e descomplicada.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a 
                href={`https://www.google.com/maps/dir/${originCoords}/Barragem+de+Campilhas`}
                target="_blank" 
                rel="noreferrer"
                className="inline-block text-[10px] sm:text-xs uppercase tracking-widest font-medium border border-[#084063] px-6 py-3 text-[#084063] hover:bg-[#084063] hover:text-white transition-colors"
              >
                Direções: Campilhas
              </a>
              <a 
                href={`https://www.google.com/maps/dir/${originCoords}/Barragem+de+Fonte+Serne`}
                target="_blank" 
                rel="noreferrer"
                className="inline-block text-[10px] sm:text-xs uppercase tracking-widest font-medium border border-[#084063] px-6 py-3 text-[#084063] hover:bg-[#084063] hover:text-white transition-colors"
              >
                Direções: Fonte Serne
              </a>
              <a 
                href={`https://www.google.com/maps/dir/${originCoords}/S%C3%A3o+Domingos,+Santiago+do+Cac%C3%A9m`}
                target="_blank" 
                rel="noreferrer"
                className="inline-block text-[10px] sm:text-xs uppercase tracking-widest font-medium border border-[#084063] px-6 py-3 text-[#084063] hover:bg-[#084063] hover:text-white transition-colors"
              >
                Direções: São Domingos
              </a>
            </div>
          </div>
          <div className="h-64 md:h-[450px] w-full relative order-first md:order-last border border-stone-200 shadow-sm">
            <img src="/foto-barragem.jpg" alt="Barragem e Trilhos no Alentejo" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* 3. A CIDADE (SANTIAGO DO CACÉM) */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="h-64 md:h-[450px] w-full relative border border-stone-200 shadow-sm">
            <img src="/foto-santiago.jpg" alt="Castelo de Santiago do Cacém" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-stone-400 font-medium mb-4 block">História e Conveniência (15 min)</span>
            <h2 className="text-2xl md:text-3xl font-light uppercase tracking-widest mb-6 text-[#084063]">
              Santiago do Cacém
            </h2>
            <div className="space-y-4 text-stone-500 font-light text-sm leading-relaxed mb-8">
              <p>
                Dominada pelo seu imponente <strong>Castelo Medieval e Igreja Matriz</strong>, que se erguem no topo da colina com vista até ao mar, Santiago do Cacém é a fusão perfeita entre a riqueza histórica e a conveniência urbana.
              </p>
              <p>
                Sugerimos uma visita às impressionantes <strong>Ruínas Romanas de Miróbriga</strong>. A cidade oferece ainda todos os serviços modernos de que possa precisar durante a sua estadia: grandes supermercados, farmácias, e variadas opções de restauração que honram a gastronomia local.
              </p>
            </div>
            <a 
              href={`https://www.google.com/maps/dir/${originCoords}/Castelo+de+Santiago+do+Cac%C3%A9m`}
              target="_blank" 
              rel="noreferrer"
              className="inline-block text-[10px] sm:text-xs uppercase tracking-widest font-medium border border-[#084063] px-6 py-3 text-[#084063] hover:bg-[#084063] hover:text-white transition-colors"
            >
              Direções: Castelo de Santiago
            </a>
          </div>
        </div>
      </section>

      {/* 4. ROTEIRO DO LITORAL E PRAIAS (GRID DE CARDS) */}
      <section className="bg-stone-100 border-t border-stone-200 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-stone-400 font-medium mb-4 block">
              Mar e Gastronomia
            </span>
            <h2 className="text-3xl md:text-4xl font-light uppercase tracking-widest mb-6 text-[#084063]">
              A Costa Vicentina
            </h2>
            <p className="text-stone-500 font-light text-sm md:text-base">
              Passeios de barco, marisco fresco e areais a perder de vista. O Atlântico chama por si a uma curta viagem de carro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* CARD: PORTO COVO */}
            <div className="bg-white border border-stone-200 shadow-sm flex flex-col h-full group">
              <div className="h-48 overflow-hidden relative">
                <img src="/foto-portocovo.jpg" alt="Ilha do Pessegueiro e Porto Covo" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-medium uppercase tracking-widest mb-2 text-[#084063]">Porto Covo</h3>
                <span className="text-[10px] uppercase tracking-widest text-stone-400 mb-4 block">A 20 Minutos</span>
                <p className="text-stone-500 font-light text-sm leading-relaxed mb-6 flex-grow">
                  Passeie pela icónica Praça Marquês de Pombal. Relaxe nos areais resguardados da <strong>Praia dos Buizinhos</strong> ou da <strong>Praia Grande</strong>, e não perca a vista lendária para a mítica <strong>Ilha do Pessegueiro</strong>. O paraíso para quem procura robalos e percebes frescos.
                </p>
                <a 
                  href={`https://www.google.com/maps/dir/${originCoords}/Porto+Covo`}
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-auto block text-center bg-[#084063] text-white py-3 text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  Navegar para Porto Covo
                </a>
              </div>
            </div>

            {/* CARD: MILFONTES */}
            <div className="bg-white border border-stone-200 shadow-sm flex flex-col h-full group">
              <div className="h-48 overflow-hidden relative">
                <img src="/foto-milfontes.jpg" alt="Vila Nova de Milfontes" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-medium uppercase tracking-widest mb-2 text-[#084063]">V. N. de Milfontes</h3>
                <span className="text-[10px] uppercase tracking-widest text-stone-400 mb-4 block">A 25 Minutos</span>
                <p className="text-stone-500 font-light text-sm leading-relaxed mb-6 flex-grow">
                  A "Princesa do Alentejo", famosa pelo encontro sereno entre o <strong>Rio Mira</strong> e o oceano. Ideal para desportos náuticos e praias fluviais com crianças. Obrigatório saborear a gastronomia local em restaurantes de renome como a incontornável <a href="https://tascadocelso.pt/" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-[#084063] font-medium text-[#084063]">Tasca do Celso</a>.
                </p>
                <a 
                  href={`https://www.google.com/maps/dir/${originCoords}/Vila+Nova+de+Milfontes`}
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-auto block text-center bg-[#084063] text-white py-3 text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  Navegar para Milfontes
                </a>
              </div>
            </div>

            {/* CARD: SINES */}
            <div className="bg-white border border-stone-200 shadow-sm flex flex-col h-full group">
              <div className="h-48 overflow-hidden relative">
                <img src="/foto-sines.webp" alt="Baía de Sines" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-medium uppercase tracking-widest mb-2 text-[#084063]">Sines</h3>
                <span className="text-[10px] uppercase tracking-widest text-stone-400 mb-4 block">A 30 Minutos</span>
                <p className="text-stone-500 font-light text-sm leading-relaxed mb-6 flex-grow">
                  O berço de Vasco da Gama. Esconde um centro histórico debruçado sobre a baía e o porto de abrigo, praias como a de São Torpes (excelente para surf) e é o palco principal do famoso Festival Músicas do Mundo (FMM).
                </p>
                <a 
                  href={`https://www.google.com/maps/dir/${originCoords}/Sines`}
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-auto block text-center bg-[#084063] text-white py-3 text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  Navegar para Sines
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. PARCEIROS E PRODUTOS LOCAIS */}
      <section className="py-24 px-6 bg-white border-t border-stone-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-light uppercase tracking-widest mb-4">A Nossa Parceria de Excelência</h2>
            <p className="text-stone-500 font-light max-w-2xl mx-auto text-sm md:text-base">
              Valorizamos a produção sustentável e o comércio local. Por isso, criámos ligações estratégicas para lhe oferecer os verdadeiros sabores do Alentejo.
            </p>
          </div>
          
          <div className="border border-stone-200 bg-stone-50 p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/3 h-48 bg-white flex items-center justify-center p-6 border border-stone-200 shadow-sm">
              <img src="/logo-pecados.png" alt="Logótipo Pecados do Alentejo" className="w-full h-full object-contain" />
            </div>
            <div className="w-full md:w-2/3 flex flex-col">
              <h3 className="text-xl font-medium uppercase tracking-widest mb-4 text-[#084063]">Pecados do Alentejo</h3>
              <p className="text-stone-500 font-light text-sm md:text-base leading-relaxed mb-6">
                Uma marca dedicada exclusivamente aos produtos gourmet regionais, celebrando as receitas, os vinhos, os queijos e os doces únicos da nossa região. Durante a sua estadia no Monte do Pinheirinho, tem a comodidade de encomendar estes produtos online e levantá-los na loja da aldeia de São Domingos, a 5 minutos da sua porta.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://pecadosdoalentejo.pt" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[10px] sm:text-xs uppercase tracking-widest font-medium border border-[#084063] px-8 py-4 text-[#084063] hover:bg-[#084063] hover:text-white transition-colors"
                >
                  Visitar Loja do Parceiro
                </a>
                <a 
                  href={`https://www.google.com/maps/dir/${originCoords}/S%C3%A3o+Domingos,+Santiago+do+Cac%C3%A9m`}
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[10px] sm:text-xs uppercase tracking-widest font-medium border border-[#084063] px-8 py-4 bg-[#084063] text-white hover:opacity-90 transition-opacity"
                >
                  Direções: Loja
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}