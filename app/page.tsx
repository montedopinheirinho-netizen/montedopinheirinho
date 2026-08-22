import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      
      {/* HERO SECTION */}
      <section className="relative h-[85vh] w-full flex items-center justify-center">
        {/* Background Imagem (Depois tens de colocar uma foto real tua na pasta /public com o nome hero-bg.jpg) */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundColor: "#4a5568" }} 
        />
        {/* Overlay escuro para o texto ler-se bem */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="relative z-20 text-center px-6 max-w-4xl flex flex-col items-center">
          <span className="text-stone-200 uppercase tracking-widest text-sm font-semibold mb-4 drop-shadow-md">
            Turismo Rural
          </span>
          <h1 className="text-4xl md:text-6xl text-white font-bold mb-6 drop-shadow-lg leading-tight">
            Desacelere e respire <br /> em pleno Santiago do Cacém
          </h1>
          <p className="text-lg md:text-xl text-stone-100 mb-10 max-w-2xl drop-shadow-md">
            Um refúgio exclusivo no coração do Alentejo, desenhado para quem procura tranquilidade, natureza e conforto autêntico.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/reservas" 
              className="bg-green-800 text-white px-8 py-4 rounded-full font-medium hover:bg-green-900 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Ver Disponibilidade
            </Link>
            <Link 
              href="/o-monte" 
              className="bg-white text-stone-900 px-8 py-4 rounded-full font-medium hover:bg-stone-100 transition-all shadow-lg"
            >
              Conhecer o Espaço
            </Link>
          </div>
        </div>
      </section>

      {/* DESTAQUES (Features Section) */}
      <section className="py-24 bg-stone-50 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-stone-800 mb-16">O que nos torna únicos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 text-green-800 rounded-full flex items-center justify-center mb-6 text-2xl">
                🌳
              </div>
              <h3 className="text-xl font-semibold mb-3">Natureza Intacta</h3>
              <p className="text-stone-600">Passeios envolventes pelos nossos terrenos rurais e ar puro garantido todos os dias.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 text-green-800 rounded-full flex items-center justify-center mb-6 text-2xl">
                🏊
              </div>
              <h3 className="text-xl font-semibold mb-3">Piscina & Lazer</h3>
              <p className="text-stone-600">Espaços exteriores preparados para os dias quentes, ideais para famílias e amigos.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 text-green-800 rounded-full flex items-center justify-center mb-6 text-2xl">
                🌐
              </div>
              <h3 className="text-xl font-semibold mb-3">Conexão Total</h3>
              <p className="text-stone-600">Internet de alta velocidade garantida caso precise de manter contacto com o mundo exterior.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}