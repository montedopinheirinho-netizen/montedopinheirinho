export default function TermosCondicoes() {
  return (
    <div className="flex flex-col w-full bg-white text-[#112535] min-h-screen pt-16 pb-24">
      <div className="max-w-4xl mx-auto px-6 py-12 w-full">
        <h1 className="text-3xl font-light tracking-widest uppercase mb-8 text-center">Termos e Condições</h1>
        <p className="text-xs text-stone-400 text-center tracking-widest uppercase mb-16">Última atualização: Agosto de 2026</p>

        <div className="space-y-12 font-light text-stone-600 leading-relaxed text-sm">
          <section>
            <h2 className="text-lg font-medium uppercase tracking-wider text-[#112535] mb-4">1. Âmbito e Objeto</h2>
            <p>
              Os presentes Termos e Condições regulam a utilização do website do <strong>Monte do Pinheirinho</strong>, bem como os procedimentos de reserva de alojamento e organização de eventos na propriedade localizada em Foros do Moinho, Santiago do Cacém (Registo AL: 38186/AL).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium uppercase tracking-wider text-[#112535] mb-4">2. Reservas e Pagamentos</h2>
            <p className="mb-3">
              As solicitações de reserva efetuadas através do nosso website ou formulários de contacto constituem uma proposta contratual de alojamento ou evento, sujeita a confirmação posterior por parte da nossa equipa.
            </p>
            <p>
              Após a validação da disponibilidade, serão enviadas as instruções de pagamento de sinal para garantia da reserva. A não liquidação do valor estipulado no prazo indicado poderá resultar no cancelamento automático da pré-reserva.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium uppercase tracking-wider text-[#112535] mb-4">3. Condições de Cancelamento</h2>
            <p>
              As políticas de cancelamento variam consoante a tipologia da reserva (estadia particular, retiro ou evento exclusivo). Os prazos específicos, taxas aplicáveis e eventuais reembolsos serão comunicados por escrito no momento da confirmação da reserva.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium uppercase tracking-wider text-[#112535] mb-4">4. Regras da Propriedade e Alojamento</h2>
            <p>
              O Monte do Pinheirinho preza pela tranquilidade absoluta, respeito pela natureza envolvente e segurança dos seus hóspedes. É expressamente proibido exceder a lotação máxima contratada, fumar nos espaços interiores ou perturbar o sossego local. O incumprimento grave destas regras poderá motivar a cessação imediata da estadia sem direito a reembolso.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium uppercase tracking-wider text-[#112535] mb-4">5. Livro de Reclamações</h2>
            <p>
              Em cumprimento da legislação em vigor, o Monte do Pinheirinho disponibiliza o acesso ao Livro de Reclamações Eletrónico. Poderá apresentar reclamações ou sugestões através da plataforma oficial em <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener noreferrer" className="underline text-[#112535]">www.livroreclamacoes.pt</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}