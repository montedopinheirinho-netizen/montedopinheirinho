import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monte do Pinheirinho | Alojamento Rural",
  description: "O seu refúgio de tranquilidade na natureza.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${inter.className} min-h-screen flex flex-col bg-stone-50 text-stone-900`}>
        
        {/* HEADER */}
        <header className="w-full bg-white/80 backdrop-blur-md fixed top-0 z-50 border-b border-stone-200">
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="text-2xl font-semibold tracking-tight text-stone-800">
              Monte do Pinheirinho
            </Link>
            
            {/* Navegação Desktop (Escondida em mobile, podes adicionar um menu hambúrguer mais tarde) */}
            <nav className="hidden md:flex gap-8 items-center text-sm font-medium">
              <Link href="/o-monte" className="hover:text-green-700 transition-colors">O Monte</Link>
              <Link href="/galeria" className="hover:text-green-700 transition-colors">Galeria</Link>
              <Link href="/contactos" className="hover:text-green-700 transition-colors">Contactos</Link>
              <Link href="/reservas" className="bg-green-800 text-white px-5 py-2.5 rounded-full hover:bg-green-900 transition-colors">
                Reservar
              </Link>
            </nav>
          </div>
        </header>

        {/* CONTEÚDO DAS PÁGINAS (Children) */}
        <main className="flex-grow pt-20">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-stone-900 text-stone-300 py-12 text-sm mt-auto">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Monte do Pinheirinho</h3>
              <p className="max-w-xs">A sua escapadela perfeita para relaxar e desligar da rotina, rodeado pela natureza.</p>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Links Úteis</h3>
              <ul className="space-y-2 flex flex-col">
                <Link href="/o-monte" className="hover:text-white transition-colors">O Monte</Link>
                <Link href="/contactos" className="hover:text-white transition-colors">Contactos</Link>
                <Link href="/reservas" className="hover:text-white transition-colors">Reservas</Link>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Contactos</h3>
              <p>Email: info@montedopinheirinho.com</p>
              {/* Adicionar número de telefone se desejares */}
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-6 mt-12 pt-6 border-t border-stone-800 text-center">
            <p>&copy; {new Date().getFullYear()} Monte do Pinheirinho. Todos os direitos reservados.</p>
          </div>
        </footer>

      </body>
    </html>
  );
}