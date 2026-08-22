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
    const bookingData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      check_in: formData.get("check_in") as string,
      check_out: formData.get("check_out") as string,
      guests: parseInt(formData.get("guests") as string),
      notes: formData.get("notes") as string,
      status: 'pendente'
    };

    const { error } = await supabase.from("booking_requests").insert([bookingData]);

    if (error) {
      setStatus({ type: "error", text: "Não foi possível enviar o pedido. Por favor, tente novamente." });
    } else {
      setStatus({ type: "success", text: "Pedido recebido com sucesso. Iremos confirmar a disponibilidade." });
      (e.target as HTMLFormElement).reset();
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
          <p className="text-stone-500 font-light text-sm">
            Selecione as suas datas. Iremos rever a disponibilidade e entrar em contacto imediato para finalizar a sua estadia.
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 shadow-sm border border-stone-200">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 border-b border-stone-100">
              <div>
                <label htmlFor="check_in" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Check-in *</label>
                <input required type="date" min={today} id="check_in" name="check_in" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535] bg-white transition-colors text-stone-600" />
              </div>
              <div>
                <label htmlFor="check_out" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Check-out *</label>
                <input required type="date" min={today} id="check_out" name="check_out" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535] bg-white transition-colors text-stone-600" />
              </div>
              <div>
                <label htmlFor="guests" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Hóspedes *</label>
                <input required type="number" min="1" id="guests" name="guests" placeholder="Ex: 4" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535] bg-white transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Nome Completo *</label>
                <input required type="text" id="name" name="name" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535] bg-white transition-colors" />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Email *</label>
                <input required type="email" id="email" name="email" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535] bg-white transition-colors" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="phone" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Telemóvel *</label>
                <input required type="tel" id="phone" name="phone" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535] bg-white transition-colors" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Pedidos Especiais / Notas</label>
                <textarea id="notes" name="notes" rows={4} placeholder="Algum requisito especial para a sua estadia?" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535] bg-white transition-colors resize-none"></textarea>
              </div>
            </div>

            {status.text && (
              <div className={`p-4 text-sm font-light text-center ${status.type === "success" ? "bg-green-50 text-green-900 border border-green-200" : "bg-red-50 text-red-900 border border-red-200"}`}>
                {status.text}
              </div>
            )}

            <div className="pt-4 text-center">
              <button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-12 py-4 bg-[#112535] text-white text-xs font-medium tracking-[0.2em] uppercase hover:opacity-90 transition-opacity disabled:opacity-70">
                {isSubmitting ? "A Processar..." : "Submeter Pedido"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}