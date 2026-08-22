"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function Reservas() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; text: string }>({ type: null, text: "" });
  
  const [occupiedDates, setOccupiedDates] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookingType, setBookingType] = useState("Alojamento Exclusivo");
  const [guests, setGuests] = useState(2);

  // Carregar datas ocupadas do Supabase + buffer de 2 dias de limpeza/manutenção
  useEffect(() => {
    async function fetchBookings() {
      const { data, error } = await supabase
        .from("booking_requests")
        .select("check_in, check_out, status")
        .in("status", ["confirmado", "pendente"]);

      if (!error && data) {
        let dates: string[] = [];
        data.forEach((booking) => {
          let start = new Date(booking.check_in);
          let end = new Date(booking.check_out);
          
          // Adicionar 2 dias de folga obrigatória após o check-out para limpeza e arranjos
          end.setDate(end.getDate() + 2);
          
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

  // Tabela de Preços e Regras por Noite
  const getNightPricing = (dateStr: string) => {
    const d = new Date(dateStr);
    const m = d.getMonth() + 1;
    const day = d.getDate();

    // Natal / Fim de Ano (22 Dez - 3 Jan): 650€ | Min 3 noites
    if ((m === 12 && day >= 22) || (m === 1 && day <= 3)) {
      return { price: 650, minStay: 3 };
    }
    // Maio e Junho: 600€ | Min 3 noites
    if (m === 5 || m === 6) {
      return { price: 600, minStay: 3 };
    }
    // Julho: 650€ | Min 4 noites
    if (m === 7) {
      return { price: 650, minStay: 4 };
    }
    // Agosto: 700€ | Min 5 noites
    if (m === 8) {
      return { price: 700, minStay: 5 };
    }
    // Setembro: 600€ | Min 2 noites
    if (m === 9) {
      return { price: 600, minStay: 2 };
    }
    // Resto do Ano (Base): 550€ | Min 2 noites
    return { price: 550, minStay: 2 };
  };

  // Matemática On-The-Fly (Noites, Preço Base, Hóspedes Extras e Descontos)
  let baseNightlyTotal = 0;
  let totalNights = 0;
  let requiredMinStay = 2;

  if (checkIn && checkOut && checkIn < checkOut) {
    let curr = new Date(checkIn);
    const end = new Date(checkOut);

    const checkInRule = getNightPricing(checkIn);
    requiredMinStay = checkInRule.minStay;

    while (curr < end) {
      const dateStr = curr.toISOString().split("T")[0];
      const rate = getNightPricing(dateStr);
      baseNightlyTotal += rate.price;
      totalNights++;
      curr.setDate(curr.getDate() + 1);
    }
  }

  // Taxa de hóspedes extras (Acima de 10 pessoas: +75€ por pessoa/noite)
  const extraGuests = Math.max(0, guests - 10);
  const extraGuestsFee = extraGuests * 75 * totalNights;
  const subtotal = baseNightlyTotal + extraGuestsFee;

  // Descontos de Longa Duração (1 semana = 15% | 1 mês = 25%)
  let discountPercent = 0;
  let discountAmount = 0;

  if (totalNights >= 30) {
    discountPercent = 25;
    discountAmount = subtotal * 0.25;
  } else if (totalNights >= 7) {
    discountPercent = 15;
    discountAmount = subtotal * 0.15;
  }

  const totalPrice = Math.round((subtotal - discountAmount) * 100) / 100;

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

    if (!checkIn || !checkOut || checkIn >= checkOut) {
      setStatus({ type: "error", text: "Por favor, selecione um intervalo de datas válido." });
      setIsSubmitting(false);
      return;
    }

    if (guests > 12) {
      setStatus({ type: "error", text: "A lotação máxima da propriedade é de 12 hóspedes." });
      setIsSubmitting(false);
      return;
    }

    if (bookingType === "Alojamento Exclusivo" && totalNights < requiredMinStay) {
      setStatus({ type: "error", text: `Para estas datas, a estadia mínima exigida é de ${requiredMinStay} noites.` });
      setIsSubmitting(false);
      return;
    }

    const bookingData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      booking_type: bookingType,
      language: formData.get("language") as string,
      check_in: checkIn,
      check_out: checkOut,
      guests: guests,
      notes: formData.get("notes") as string,
      total_price: bookingType === "Alojamento Exclusivo" ? totalPrice : 0,
      status: 'pendente'
    };

    const { error } = await supabase.from("booking_requests").insert([bookingData]);

    if (error) {
      setStatus({ type: "error", text: "Não foi possível enviar o pedido. Por favor, tente novamente." });
      setIsSubmitting(false);
      return;
    } 
    
    try {
      await fetch('/api/send-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...bookingData, totalPrice, discountPercent, extraGuestsFee }),
      });
      
      setStatus({ type: "success", text: "Pedido submetido com sucesso. Enviámos um email de confirmação com os detalhes." });
      (e.target as HTMLFormElement).reset();
      setCheckIn("");
      setCheckOut("");
      setGuests(2);
    } catch (err) {
      setStatus({ type: "error", text: "Pedido registado, mas houve um atraso no envio do email." });
    }

    setIsSubmitting(false);
  };

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
            Disponibilidade & Tarifas
          </h1>
          <p className="text-stone-500 font-light text-sm tracking-wide">
            Consulte o calendário em tempo real, simule a sua estadia e aproveite os nossos descontos de longa duração.
          </p>
        </div>

        {/* CAIXA DE AVISO DE REGRAS E DESCONTOS VISÍVEIS */}
        <div className="bg-white p-6 border border-stone-200 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-600 font-light">
          <div className="border-b md:border-b-0 md:border-r border-stone-100 pb-4 md:pb-0 md:pr-4">
            <p className="font-medium uppercase tracking-widest text-[#112535] mb-1">Capacidade & Hóspedes</p>
            <p>Incluído para até <strong>10 hóspedes</strong>. Capacidade máxima de <strong>12 hóspedes</strong> (suplemento de 75€/noite por hóspede adicional a partir do 11º).</p>
          </div>
          <div className="border-b md:border-b-0 md:border-r border-stone-100 pb-4 md:pb-0 md:pr-4">
            <p className="font-medium uppercase tracking-widest text-[#112535] mb-1">Descontos de Estadia</p>
            <p>• <strong>15% de desconto</strong> em estadias de 1 semana (7+ noites).<br />• <strong>25% de desconto</strong> em estadias de 1 mês (30+ noites).</p>
          </div>
          <div>
            <p className="font-medium uppercase tracking-widest text-[#112535] mb-1">Manutenção & Limpeza</p>
            <p>O calendário inclui automaticamente um intervalo técnico de 2 dias entre estadias para preparação e higienização rigorosa da propriedade.</p>
          </div>
        </div>

        {/* CALENDÁRIO VISUAL */}
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

          <div className="flex flex-wrap gap-6 mb-6 text-xs text-stone-500 font-light">
            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-white border border-stone-300"></span> Disponível</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-red-500"></span> Ocupado / Manutenção</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#112535]"></span> Selecionado</div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-widest text-stone-400 font-medium mb-3">
            <div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sáb</div>
          </div>

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

              const dayRate = getNightPricing(dateStr);

              return (
                <button
                  key={dateStr}
                  type="button"
                  disabled={isPast || isOccupied}
                  onClick={() => handleDateClick(dateStr)}
                  className={`h-14 md:h-20 border flex flex-col items-center justify-between p-2 text-xs transition-all ${bgColor}`}
                >
                  <span className="font-medium text-sm">{dayNum}</span>
                  {!isPast && !isOccupied && (
                    <span className="text-[9px] opacity-70 hidden sm:block">{dayRate.price}€</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* FORMULÁRIO COM ORÇAMENTO AUTOMÁTICO */}
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
                <label htmlFor="guests" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Nº Hóspedes (Máx. 12) *</label>
                <input 
                  required 
                  type="number" 
                  min="1" 
                  max="12"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535]" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-stone-100">
              <div className="md:col-span-2">
                <label htmlFor="booking_type" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Tipologia de Reserva / Evento *</label>
                <select 
                  required 
                  id="booking_type" 
                  value={bookingType}
                  onChange={(e) => setBookingType(e.target.value)}
                  className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535] bg-white text-stone-700"
                >
                  <option value="Alojamento Exclusivo">Alojamento Exclusivo (Estadia Rural com Preço Automático)</option>
                  <option value="Evento Corporativo / Team Building">Evento Corporativo / Team Building (Orçamento Sob Consulta)</option>
                  <option value="Casamento ou Celebração Privada">Casamento ou Celebração Privada (Orçamento Sob Consulta)</option>
                  <option value="Retiro ou Produção Fotográfica">Retiro ou Produção Fotográfica (Orçamento Sob Consulta)</option>
                </select>
              </div>

              {/* Caixa de Resumo de Preço Dinâmico com Descontos e Hóspedes Extras */}
              {bookingType === "Alojamento Exclusivo" && checkIn && checkOut && checkIn < checkOut && (
                <div className="md:col-span-2 bg-stone-50 p-6 border border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-stone-500 mb-1">Resumo da Estadia</p>
                    <p className="text-sm font-medium text-[#112535]">
                      {totalNights} noites ({guests} hóspedes {extraGuests > 0 ? `• Inclui ${extraGuests} hóspedes extra` : ""})
                    </p>
                    {discountPercent > 0 && (
                      <p className="text-xs text-green-700 font-medium mt-1">
                        ✨ Desconto de longa duração aplicado: {discountPercent}% ({totalNights >= 30 ? "Estadia Mensal" : "Estadia Semanal"})
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-widest text-stone-500 mb-1">Valor Estimado</p>
                    <p className="text-2xl font-light text-[#112535]">{totalPrice}€</p>
                  </div>
                </div>
              )}

              {bookingType !== "Alojamento Exclusivo" && (
                <div className="md:col-span-2 bg-amber-50 p-6 border border-amber-200 text-amber-900 text-sm font-light">
                  ℹ️ Para eventos, casamentos ou retiros, os valores diferem e exigem uma proposta personalizada. Submeta o pedido e entraremos em contacto com um orçamento detalhado.
                </div>
              )}

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
                <textarea id="notes" name="notes" rows={4} placeholder="Indique eventuais pedidos especiais..." className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535] resize-none"></textarea>
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