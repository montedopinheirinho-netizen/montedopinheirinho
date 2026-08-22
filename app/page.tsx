import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white text-[#084063]">
      
      {/* 1. HERO SECTION MINIMALISTA COM CTA */}
      <section className="relative h-screen w-full flex items-end pb-24 justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/foto-hero.png')", backgroundColor: "#084063" }} 
        />
        <div className="absolute inset-0 bg-black/30 z-10" />

        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl text-white font-light tracking-[0.3em] uppercase drop-shadow-md mb-6">
            O Seu Refúgio Exclusivo
          </h1>
          <p className="text-white/80 font-light text-xs md:text-sm tracking-widest uppercase mb-8">
            Santiago do Cacém · Alentejo · Portugal
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/reservas" className="px-8 py-4 bg-white text-[#084063] text-xs font-medium tracking-[0.2em] uppercase hover:bg-stone-100 transition-colors">
              Reservar Estadia
            </Link>
            <Link href="/contactos" className="px-8 py-4 border border-white text-white text-xs font-medium tracking-[0.2em] uppercase hover:bg-white/10 transition-colors">
              Pedir Orçamento para Evento
            </Link>
          </div>
        </div>
      </section>

      {/* BARRA DE DESTAQUES RÁPIDOS (CONFIANÇA E ESCALA) */}
      <section className="bg-stone-50 py-10 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-xl md:text-2xl font-light mb-1">6 Hectares</p>
            <p className="text-[10px] uppercase tracking-widest text-stone-500">Privacidade Absoluta</p>
          </div>
          <div>
            <p className="text-xl md:text-2xl font-light mb-1">5 Quartos</p>
            <p className="text-[10px] uppercase tracking-widest text-stone-500">Até 10+ Hóspedes</p>
          </div>
          <div>
            <p className="text-xl md:text-2xl font-light mb-1">9.3 / 10</p>
            <p className="text-[10px] uppercase tracking-widest text-stone-500">Avaliação Soberba</p>
          </div>
          <div>
            <p className="text-xl md:text-2xl font-light mb-1">1h30 de Lisboa</p>
            <p className="text-[10px] uppercase tracking-widest text-stone-500">Acesso Próximo</p>
          </div>
        </div>
      </section>

      {/* 2. SOBRE O ESPAÇO */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2 flex flex-col items-start">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-4">Alojamento Local (AL: 38186/AL)</span>
            <h2 className="text-3xl font-light uppercase tracking-widest mb-8 leading-tight">
              A Autenticidade <br /> de Santiago do Cacém
            </h2>
            <p className="text-stone-500 leading-loose font-light text-base mb-8">
              No Monte do Pinheirinho, o tempo abranda. Oferecemos-lhe a privacidade absoluta de seis hectares de tranquilidade, onde a casa tradicional alentejana se funde com um exterior vibrante. O espaço ideal para desligar do mundo sem abdicar do conforto contemporâneo.
            </p>
            <Link href="/o-monte" className="text-xs uppercase tracking-[0.2em] font-medium border-b border-[#084063] pb-1 hover:text-[#084063]/70 transition-colors">
              Explorar a Propriedade →
            </Link>
          </div>
          <div className="w-full md:w-1/2">
            <img 
              src="/foto-espaco.jpeg" 
              alt="Casa de Campo no Alentejo" 
              className="w-full h-[500px] object-cover bg-stone-100 shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* 3. EXTERIORES E EVENTOS */}
      <section className="py-24 px-6 bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
            <img 
              src="/foto-piscina.jpeg" 
              alt="Exterior e Lazer" 
              className="w-full h-[500px] object-cover bg-stone-200 shadow-sm"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-start">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-4">Lazer & Celebrações</span>
            <h2 className="text-3xl font-light uppercase tracking-widest mb-8 leading-tight">
              Celebrações & <br /> Ar Livre
            </h2>
            <p className="text-stone-500 leading-loose font-light text-base mb-8">
              Um relvado luxuriante, a sombra dos pinheiros mansos e o alpendre espaçoso formam o cenário em branco perfeito. Das pausas revigorantes na piscina privada aos eventos corporativos e casamentos memoráveis, o nosso exterior adapta-se à sua visão.
            </p>
            <Link href="/eventos" className="text-xs uppercase tracking-[0.2em] font-medium border-b border-[#084063] pb-1 hover:text-[#084063]/70 transition-colors">
              Opções de Eventos →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. A REGIÃO */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2 flex flex-col items-start">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-4">Localização Única</span>
            <h2 className="text-3xl font-light uppercase tracking-widest mb-8 leading-tight">
              Entre o Campo <br /> e o Mar
            </h2>
            <p className="text-stone-500 leading-loose font-light text-base mb-8">
              Estrategicamente posicionado para que não tenha de escolher. A tranquilidade do interior agrícola encontra a apenas vinte minutos a beleza selvagem da Costa Vicentina e das melhores praias piscatórias.
            </p>
            <Link href="/regiao" className="text-xs uppercase tracking-[0.2em] font-medium border-b border-[#084063] pb-1 hover:text-[#084063]/70 transition-colors">
              Descobrir o Litoral →
            </Link>
          </div>
          <div className="w-full md:w-1/2">
            <img 
              src="/foto-regiao.jpg" 
              alt="Costa Vicentina" 
              className="w-full h-[500px] object-cover bg-stone-100 shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* 5. TESTEMUNHOS / PROVA SOCIAL */}
      <section className="py-24 px-6 bg-[#084063] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-widest text-white/50 font-medium mb-4 block">Experiências Reais</span>
          <h2 className="text-2xl md:text-3xl font-light uppercase tracking-widest mb-16">
            O Que Dizem os Nossos Hóspedes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div className="bg-white/5 p-8 border border-white/10 flex flex-col justify-between">
              <p className="font-light italic text-white/90 leading-relaxed mb-6">
                &ldquo;Uma verdadeira casa de família. Bem equipado e espaçoso. Muitas áreas diferentes para explorar e desfrutar.&rdquo;
              </p>
              <div className="text-xs tracking-widest uppercase text-white/60">
                — Jason <span className="text-white/40 font-normal">/ Portugal</span>
              </div>
            </div>

            <div className="bg-white/5 p-8 border border-white/10 flex flex-col justify-between">
              <p className="font-light italic text-white/90 leading-relaxed mb-6">
                &ldquo;Très calme, bel environnement, des hôtes attentionnés avec un petit panier d&apos;accueil à l&apos;arrivée, uma grande maison bien équipée et propre.&rdquo;
              </p>
              <div className="text-xs tracking-widest uppercase text-white/60">
                — Christelle <span className="text-white/40 font-normal">/ França</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION FINAL */}
      <section className="py-20 px-6 bg-stone-50 text-center border-t border-stone-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light uppercase tracking-widest mb-6">
            Pronto para Viver o Alentejo?
          </h2>
          <p className="text-stone-500 font-light mb-8 text-sm md:text-base">
            Garanta a sua estadia ou consulte a disponibilidade para o seu próximo evento exclusivo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/reservas" className="px-10 py-4 bg-[#084063] text-white text-xs font-medium tracking-[0.2em] uppercase hover:opacity-90 transition-opacity">
              Fazer Pedido de Reserva
            </Link>
            <Link href="/contactos" className="px-10 py-4 border border-[#084063] text-[#084063] text-xs font-medium tracking-[0.2em] uppercase hover:bg-[#084063] hover:text-white transition-colors">
              Fale Connosco
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}