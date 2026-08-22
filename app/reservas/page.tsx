"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function Reservas() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; text: string }>({ type: null, text: "" });
  
  // Estados para o calendário visual e datas ocupadas
  const [occupiedDates, setOccupiedDates] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  // Carregar datas ocupadas do Supabase ao abrir a página
  useEffect(() => {
    async function fetchBookings() {
      const { data, error } = await supabase
        .from("booking_requests")
        .select("check_in, check_out, status")
        .in("status", ["confirmado", "pendente"]); // Bloqueia confirmados e pendentes para evitar sobreposição

      if (!error && data) {
        let dates: string[] = [];
        data.forEach((booking) => {
          let start = new Date(booking.check_in);
          let end = new Date(booking.check_out);
          
          // Preencher todos os dias entre o check-in e o check-out
          while (start < end) {
            dates.push(start.toISOString().split("T")[0]);
            start.setDate(start.getDate() + 1);
          }
        });
        setOccupiedDates(dates);
      }
    }
    fetchBookings();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, text: "" });

    const formData = new FormData(e.currentTarget);
    
    if (!formData.get("rgpd")) {
      setStatus({ type: "error", text: "Por favor, aceite a política de privacidade para continuar." });
      setIsSubmitting(false);
      return;
    }

    const bookingData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      booking_type: formData.get("booking_type") as string,
      language: formData.get("language") as string,
      check_in: checkIn,
      check_out: checkOut,
      guests: parseInt(formData.get("guests") as string),
      notes: formData.get("notes") as string,
      status: 'pendente'
    };

    if (!checkIn || !checkOut) {
      setStatus({ type: "error", text: "Por favor, selecione as datas de check-in e check-out." });
      setIsSubmitting(false);
      return;
    }

    // 1. Inserir no Supabase
    const { error } = await supabase.from("booking_requests").insert([bookingData]);

    if (error) {
      setStatus({ type: "error", text: "Não foi possível enviar o pedido. Por favor, tente novamente." });
      setIsSubmitting(false);
      return;
    } 
    
    // 2. Disparar Email via API Interna
    try {
      await fetch('/api/send-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      
      setStatus({ type: "success", text: "Pedido recebido com sucesso. Enviámos um email de confirmação com os próximos passos." });
      (e.target as HTMLFormElement).reset();
      setCheckIn("");
      setCheckOut("");
    } catch (err) {
      setStatus({ type: "error", text: "Pedido recebido, mas houve um atraso no envio do email de confirmação." });
    }

    setIsSubmitting(false);
  };

  // Lógica de Renderização do Calendário Visual
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayStr = new Date().toISOString().split("T")[0];

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const handleDateClick = (dateStr: string) => {
    if (occupiedDates.includes(dateStr) || dateStr < todayStr) return;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(dateStr);
      setCheckOut("");
    } else if (checkIn && !checkOut) {
      if (dateStr < checkIn) {
        setCheckIn(dateStr);
      } else {
        setCheckOut(dateStr);
      }
    }
  };

  return (
    <div className="flex flex-col w-full bg-stone-50 min-h-screen pt-20">
      <div className="max-w-5xl mx-auto px-6 py-16 w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light uppercase tracking-widest text-[#112535] mb-4">
            Disponibilidade & Reserva
          </h1>
          <p className="text-stone-500 font-light text-sm tracking-wide">
            Consulte o nosso calendário em tempo real e selecione as suas datas.
          </p>
        </div>

        {/* CALENDÁRIO VISUAL INTERATIVO */}
        <div className="bg-white p-8 md:p-10 shadow-sm border border-stone-200 mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-light uppercase tracking-wider text-[#112535]">
              {monthNames[month]} {year}
            </h2>
            <div className="flex gap-2">
              <button 
                type="button" 
                onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
                className="px-4 py-2 border border-stone-200 text-xs uppercase tracking-widest hover:bg-stone-50 transition-colors"
              >
                Anterior
              </button>
              <button 
                type="button" 
                onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
                className="px-4 py-2 border border-stone-200 text-xs uppercase tracking-widest hover:bg-stone-50 transition-colors"
              >
                Seguinte
              </button>
            </div>
          </div>

          {/* Legenda de Cores */}
          <div className="flex flex-wrap gap-6 mb-6 text-xs text-stone-500 font-light">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-white border border-stone-300"></span> Disponível (Branco)
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500"></span> Reservado / Indisponível (Vermelho)
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-stone-200"></span> Bloqueado / Passado (Cinzento)
            </div>
          </div>

          {/* Grelha de Dias da Semana */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-widest text-stone-400 font-medium mb-3">
            <div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sáb</div>
          </div>

          {/* Grelha de Dias do Mês */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="h-12 md:h-16 bg-transparent"></div>
            ))}

            {Array.from({ length: daysInMonth }).map((_, index) => {
              const dayNum = index + 1;
              const formattedDay = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
              const formattedMonth = (month + 1) < 10 ? `0${month + 1}` : `${month + 1}`;
              const dateStr = `${year}-${formattedMonth}-${formattedDay}`;

              const isOccupied = occupiedDates.includes(dateStr);
              const isPast = dateStr < todayStr;
              const isSelected = dateStr === checkIn || dateStr === checkOut;
              const isInRange = checkIn && checkOut && dateStr > checkIn && dateStr < checkOut;

              let bgColor = "bg-white text-[#112535] border-stone-200 hover:border-[#112535]";
              if (isPast || isOccupied) {
                bgColor = isOccupied ? "bg-red-500 text-white border-red-500 cursor-not-allowed" : "bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed";
              } else if (isSelected) {
                bgColor = "bg-[#112535] text-white border-[#112535] font-medium";
              } else if (isInRange) {
                bgColor = "bg-stone-100 text-[#112535] border-stone-300";
              }

              return (
                <button
                  key={dateStr}
                  type="button"
                  disabled={isPast || isOccupied}
                  onClick={() => handleDateClick(dateStr)}
                  className={`h-12 md:h-16 border flex flex-col items-center justify-center text-sm transition-all ${bgColor}`}
                >
                  <span>{dayNum}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FORMULÁRIO DE RESERVA */}
        <div className="bg-white p-8 md:p-12 shadow-sm border border-stone-200">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 border-b border-stone-100">
              <div>
                <label className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Check-in *</label>
                <input 
                  required 
                  type="date" 
                  value={checkIn} 
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535] bg-white text-stone-600" 
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Check-out *</label>
                <input 
                  required 
                  type="date" 
                  value={checkOut} 
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535] bg-white text-stone-600" 
                />
              </div>
              <div>
                <label htmlFor="guests" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Nº Hóspedes *</label>
                <input required type="number" min="1" id="guests" name="guests" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535]" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-stone-100">
              <div className="md:col-span-2">
                <label htmlFor="booking_type" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Tipologia de Reserva / Evento *</label>
                <select required id="booking_type" name="booking_type" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535] bg-white text-stone-700">
                  <option value="">Selecione uma opção...</option>
                  <option value="Alojamento Exclusivo">Alojamento Exclusivo (Estadia Rural)</option>
                  <option value="Evento Corporativo / Team Building">Evento Corporativo / Team Building</option>
                  <option value="Casamento ou Celebração Privada">Casamento ou Celebração Privada</option>
                  <option value="Retiro ou Produção Fotográfica">Retiro ou Produção Fotográfica</option>
                  <option value="Outro Pedido Não Standard">Outro Pedido / Personalizado</option>
                </select>
              </div>

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
                <label htmlFor="notes" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Detalhes e Pedidos Especiais</label>
                <textarea id="notes" name="notes" rows={4} placeholder="Descreva os detalhes específicos..." className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535] resize-none"></textarea>
              </div>
            </div>

            {/* Checkbox RGPD */}
            <div className="flex items-start gap-3">
              <input type="checkbox" id="rgpd" name="rgpd" required className="mt-1 border-stone-300 text-[#112535] focus:ring-[#112535]" />
              <label htmlFor="rgpd" className="text-sm font-light text-stone-500 leading-relaxed">
                Autorizo a recolha e o tratamento dos meus dados pessoais pelo Monte do Pinheirinho, exclusivamente para efeitos de gestão da reserva ou evento, de acordo com o RGPD.
              </label>
            </div>

            {status.text && (
              <div className={`p-4 text-sm font-light text-center ${status.type === "success" ? "bg-green-50 text-green-900 border border-green-200" : "bg-red-50 text-red-900 border border-red-200"}`}>
                {status.text}
              </div>
            )}

            <div className="pt-4 text-center">
              <button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-12 py-4 bg-[#112535] text-white text-xs font-medium tracking-[0.2em] uppercase hover:opacity-90 disabled:opacity-70">
                {isSubmitting ? "A Processar..." : "Submeter Pedido de Reserva"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}