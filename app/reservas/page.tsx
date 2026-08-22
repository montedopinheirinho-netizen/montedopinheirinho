"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Reservas() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; text: string }>({ type: null, text: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, text: "" });

    const formData = new FormData(e.currentTarget);
    
    // Verificação de RGPD Dupla Proteção
    if (!formData.get("rgpd")) {
      setStatus({ type: "error", text: "Por favor, aceite a política de privacidade para continuar." });
      setIsSubmitting(false);
      return;
    }

    const bookingData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      language: formData.get("language") as string,
      check_in: formData.get("check_in") as string,
      check_out: formData.get("check_out") as string,
      guests: parseInt(formData.get("guests") as string),
      notes: formData.get("notes") as string,
      status: 'pendente'
    };

    // 1. Inserir no Supabase
    const { error } = await supabase.from("booking_requests").insert([bookingData]);

    if (error) {
      setStatus({ type: "error", text: "Não foi possível enviar o pedido. Por favor, tente novamente." });
      setIsSubmitting(false);
      return;
    } 
    
    // 2. Disparar Email via API Interna (escondendo a Key)
    try {
      await fetch('/api/send-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      
      setStatus({ type: "success", text: "Pedido recebido. Enviámos um email de confirmação com os próximos passos." });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus({ type: "error", text: "Pedido recebido, mas houve um atraso no envio do email de confirmação." });
    }

    setIsSubmitting(false);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col w-full bg-stone-50 min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-6 py-16 w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light uppercase tracking-widest text-[#112535] mb-4">
            Pedido de Reserva
          </h1>
        </div>

        <div className="bg-white p-8 md:p-12 shadow-sm border border-stone-200">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 border-b border-stone-100">
              <div>
                <label htmlFor="check_in" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Check-in *</label>
                <input required type="date" min={today} id="check_in" name="check_in" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535] bg-white text-stone-600" />
              </div>
              <div>
                <label htmlFor="check_out" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Check-out *</label>
                <input required type="date" min={today} id="check_out" name="check_out" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535] bg-white text-stone-600" />
              </div>
              <div>
                <label htmlFor="guests" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Hóspedes *</label>
                <input required type="number" min="1" id="guests" name="guests" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535]" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-stone-100">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Nome Completo *</label>
                <input required type="text" id="name" name="name" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535]" />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Email *</label>
                <input required type="email" id="email" name="email" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535]" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Telemóvel *</label>
                <input required type="tel" id="phone" name="phone" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535]" />
              </div>
              <div>
                <label htmlFor="language" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Idioma / Language *</label>
                <select required id="language" name="language" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535] bg-white">
                  <option value="pt">Português (PT)</option>
                  <option value="en">English (EN)</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Pedidos Especiais / Notas</label>
                <textarea id="notes" name="notes" rows={4} className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535] resize-none"></textarea>
              </div>
            </div>

            {/* Checkbox RGPD OBRIGATÓRIA */}
            <div className="flex items-start gap-3">
              <input type="checkbox" id="rgpd" name="rgpd" required className="mt-1 border-stone-300 text-[#112535] focus:ring-[#112535]" />
              <label htmlFor="rgpd" className="text-sm font-light text-stone-500 leading-relaxed">
                Autorizo a recolha e o tratamento dos meus dados pessoais (nome, email e telemóvel) pelo Monte do Pinheirinho, exclusivamente para efeitos de gestão da reserva e contacto direto, de acordo com o Regulamento Geral de Proteção de Dados (RGPD).
              </label>
            </div>

            {status.text && (
              <div className={`p-4 text-sm font-light text-center ${status.type === "success" ? "bg-green-50 text-green-900 border border-green-200" : "bg-red-50 text-red-900 border border-red-200"}`}>
                {status.text}
              </div>
            )}

            <div className="pt-4 text-center">
              <button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-12 py-4 bg-[#112535] text-white text-xs font-medium tracking-[0.2em] uppercase hover:opacity-90 disabled:opacity-70">
                {isSubmitting ? "A Processar..." : "Submeter Pedido"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}