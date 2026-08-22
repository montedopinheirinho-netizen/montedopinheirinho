export default function PoliticaPrivacidade() {
  return (
    <div className="flex flex-col w-full bg-white text-[#112535] min-h-screen pt-16 pb-24">
      <div className="max-w-4xl mx-auto px-6 py-12 w-full">
        <h1 className="text-3xl font-light tracking-widest uppercase mb-8 text-center">Política de Privacidade</h1>
        <p className="text-xs text-stone-400 text-center tracking-widest uppercase mb-16">Em conformidade com o RGPD (Regulamento Geral de Proteção de Dados)</p>

        <div className="space-y-12 font-light text-stone-600 leading-relaxed text-sm">
          <section>
            <h2 className="text-lg font-medium uppercase tracking-wider text-[#112535] mb-4">1. Responsável pelo Tratamento</h2>
            <p>
              O Monte do Pinheirinho é o responsável pelo tratamento dos dados pessoais recolhidos através deste website, garantindo a sua total confidencialidade e segurança em cumprimento do Regulamento Geral de Proteção de Dados (RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium uppercase tracking-wider text-[#112535] mb-4">2. Recolha e Finalidade dos Dados</h2>
            <p className="mb-3">
              Recolhemos dados estritamente necessários (nome, email, telemóvel, datas de estadia e preferências) através dos nossos formulários de reserva e contacto.
            </p>
            <p>
              Estes dados são utilizados exclusivamente para:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Gestão de pedidos de reserva e comunicação direta com o cliente;</li>
              <li>Envio de confirmações de estadia e notificações operacionais;</li>
              <li>Cumprimento de obrigações legais fiscais e de alojamento local.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium uppercase tracking-wider text-[#112535] mb-4">3. Partilha e Conservação de Dados</h2>
            <p>
              Os dados recolhidos são armazenados de forma segura em bases de dados encriptadas (Supabase) e não são comercializados ou cedidos a terceiros. Os registos são conservados apenas durante o período estritamente necessário para cumprir as finalidades indicadas ou exigências legais.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium uppercase tracking-wider text-[#112535] mb-4">4. Direitos do Utilizador</h2>
            <p>
              Nos termos da lei aplicável, o titular dos dados tem o direito de aceder, retificar ou solicitar a eliminação dos seus dados pessoais a qualquer momento. Para exercer estes direitos, basta enviar um email direto para <a href="mailto:montedopinheirinho@gmail.com" className="underline text-[#112535]">montedopinheirinho@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}