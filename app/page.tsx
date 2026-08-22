import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white text-[#112535]">
      
      {/* 1. HERO SECTION MINIMALISTA */}
      <section className="relative h-screen w-full flex items-end pb-24 justify-center">
        {/* Atualizado para foto-hero.png */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/foto-hero.png')", backgroundColor: "#112535" }} 
        />
        <div className="absolute inset-0 bg-black/20 z-10" />

        <div className="relative z-20 text-center px-6">
          <h1 className="text-2xl md:text-3xl text-white font-light tracking-[0.3em] uppercase drop-shadow-md">
            O Seu Refúgio Exclusivo
          </h1>
        </div>
      </section>

      {/* 2. SOBRE O ESPAÇO */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2 flex flex-col items-start">
            <h2 className="text-3xl font-light uppercase tracking-widest mb-8 leading-tight">
              A Autenticidade <br /> de Santiago do Cacém
            </h2>
            <p className="text-stone-500 leading-loose font-light text-base mb-8">
              No Monte do Pinheirinho, o tempo abranda. Oferecemos-lhe a privacidade absoluta de seis hectares de tranquilidade, onde a casa tradicional alentejana se funde com um exterior vibrante. O espaço ideal para desligar do mundo sem abdicar do conforto contemporâneo.
            </p>
            <Link href="/o-monte" className="text-xs uppercase tracking-[0.2em] font-medium border-b border-[#112535] pb-1 hover:text-blue-700 transition-colors">
              Explorar a Propriedade
            </Link>
          </div>
          <div className="w-full md:w-1/2">
            {/* Atualizado para foto-espaco.jpeg */}
            <img 
              src="/foto-espaco.jpeg" 
              alt="Casa de Campo no Alentejo" 
              className="w-full h-[500px] object-cover bg-stone-100"
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
              className="w-full h-[500px] object-cover bg-stone-200"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-start">
            <h2 className="text-3xl font-light uppercase tracking-widest mb-8 leading-tight">
              Celebrações & <br /> Ar Livre
            </h2>
            <p className="text-stone-500 leading-loose font-light text-base mb-8">
              Um relvado luxuriante, a sombra dos pinheiros mansos e o alpendre espaçoso formam o cenário em branco perfeito. Das pausas revigorantes na piscina privada aos eventos corporativos e casamentos memoráveis, o nosso exterior adapta-se à sua visão.
            </p>
            <Link href="/eventos" className="text-xs uppercase tracking-[0.2em] font-medium border-b border-[#112535] pb-1 hover:text-blue-700 transition-colors">
              Opções de Eventos
            </Link>
          </div>
        </div>
      </section>

      {/* 4. A REGIÃO */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2 flex flex-col items-start">
            <h2 className="text-3xl font-light uppercase tracking-widest mb-8 leading-tight">
              Entre o Campo <br /> e o Mar
            </h2>
            <p className="text-stone-500 leading-loose font-light text-base mb-8">
              Estrategicamente posicionado para que não tenha de escolher. A tranquilidade do interior agrícola encontra a apenas vinte minutos a beleza selvagem da Costa Vicentina e das melhores praias piscatórias.
            </p>
            <Link href="/regiao" className="text-xs uppercase tracking-[0.2em] font-medium border-b border-[#112535] pb-1 hover:text-blue-700 transition-colors">
              Descobrir o Litoral
            </Link>
          </div>
          <div className="w-full md:w-1/2">
            <img 
              src="/foto-regiao.jpg" 
              alt="Costa Vicentina" 
              className="w-full h-[500px] object-cover bg-stone-100"
            />
          </div>
        </div>
      </section>

    </div>
  );
}