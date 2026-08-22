export default function TermosCondicoes() {
  return (
    <div className="flex flex-col w-full bg-white text-[#112535] min-h-screen pt-16 pb-24">
      <div className="max-w-4xl mx-auto px-6 py-12 w-full">
        <h1 className="text-3xl font-light tracking-widest uppercase mb-8 text-center">Termos e Condições</h1>
        <p className="text-xs text-stone-400 text-center tracking-widest uppercase mb-16">Registo AL: 38186/AL | Atualizado em Agosto de 2026</p>

        <div className="space-y-12 font-light text-stone-600 leading-relaxed text-sm">
          <section>
            <h2 className="text-lg font-medium uppercase tracking-wider text-[#112535] mb-4">1. Âmbito e Caraterísticas da Propriedade</h2>
            <p>
              O Monte do Pinheirinho é uma propriedade privada com 6 hectares situada em Foros do Malhão / Foros do Moinho, Santiago do Cacém (Registo AL: 38186/AL). A casa de férias dispõe de 200 m², 5 quartos, 2 casas de banho, cozinha totalmente equipada e piscina exterior privada.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium uppercase tracking-wider text-[#112535] mb-4">2. Horários de Check-in e Check-out</h2>
            <p className="mb-2">
              <strong>Check-in:</strong> Realiza-se entre as 14:00 e as 19:30. É obrigatório informar a hora estimada de chegada com antecedência.
            </p>
            <p>
              <strong>Check-out:</strong> Realiza-se entre as 11:00 e as 13:00.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium uppercase tracking-wider text-[#112535] mb-4">3. Condições de Pagamento e Caução</h2>
            <p className="mb-3">
              As reservas diretas requerem a validação de disponibilidade e o pagamento de sinal acordado.
            </p>
            <p>
              É exigida uma <strong>caução reembolsável de 400€</strong> para acautelar eventuais danos na propriedade. Este valor é cobrado (habitualmente 7 dias antes da chegada) e será totalmente devolvido por transferência bancária até 7 dias após o check-out, após inspeção do espaço.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium uppercase tracking-wider text-[#112535] mb-4">4. Normas de Convivência e Ocupação</h2>
            <p>
              A propriedade destina-se ao descanso, lazer familiar e eventos devidamente planeados e autorizados pela gestão. Não é permitido fumar nos espaços interiores. O número de hóspedes alojados não pode exceder a lotação máxima contratada.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium uppercase tracking-wider text-[#112535] mb-4">5. Resolução de Litígios e Reclamações</h2>
            <p>
              Em caso de litígio, o consumidor pode recorrer à plataforma europeia de resolução de litígios em linha ou ao Livro de Reclamações Eletrónico oficial em <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener noreferrer" className="underline text-[#112535]">www.livroreclamacoes.pt</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}