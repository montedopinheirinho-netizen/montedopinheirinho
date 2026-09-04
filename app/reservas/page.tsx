"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

// --- Componente de Dropdown Personalizado ---
interface Option {
  value: string;
  label: string;
}

function CustomSelect({ 
  options, 
  value, 
  onChange, 
  label, 
  name 
}: { 
  options: Option[], 
  value: string, 
  onChange: (val: string) => void, 
  label: string, 
  name: string 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value);

  return (
    <div className="relative w-full" ref={selectRef}>
      <label className="block text-xs uppercase tracking-widest font-medium text-[#084063] mb-2">{label}</label>
      <input type="hidden" name={name} value={value} />
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 border border-stone-200 bg-white text-stone-700 text-sm sm:text-base cursor-pointer flex justify-between items-center transition-colors hover:border-[#084063]"
      >
        <span className="truncate pr-4">{selectedOption ? selectedOption.label : "Selecione uma opção..."}</span>
        <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-stone-200 shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`px-4 py-3 text-sm cursor-pointer hover:bg-stone-50 transition-colors ${value === option.value ? "bg-stone-50 font-medium text-[#084063]" : "text-stone-600"}`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// -------------------------------------------

export default function Reservas() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; text: string }>({ type: null, text: "" });
  
  const [occupiedDates, setOccupiedDates] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookingType, setBookingType] = useState("Alojamento Exclusivo");
  const [language, setLanguage] = useState("pt");
  const [guests, setGuests] = useState(2);

  // Carregar bloqueios (Supabase + Buffer Limpeza 2 dias)
  useEffect(() => {
    async function fetchBookings() {
      const { data, error } = await supabase
        .from("booking_requests")
        .select("check_in, check_out, status")
        .in("status", ["confirmado", "pendente", "externo"]);

      if (!error && data) {
        let dates: string[] = [];
        data.forEach((booking) => {
          let start = new Date(booking.check_in);
          let end = new Date(booking.check_out);
          end.setDate(end.getDate() + 2); // Buffer de 2 dias
          
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

  const getNightPricing = (dateStr: string) => {
    const d = new Date(dateStr);
    const m = d.getMonth() + 1;
    const day = d.getDate();

    if ((m === 12 && day >= 22) || (m === 1 && day <= 3)) {
      return { price: 650, minStay: 3 }; // Natal / Fim de Ano
    }
    if (m === 5 || m === 6) {
      return { price: 600, minStay: 3 }; // Maio / Junho
    }
    if (m === 7) {
      return { price: 650, minStay: 4 }; // Julho
    }
    if (m === 8) {
      return { price: 700, minStay: 5 }; // Agosto
    }
    if (m === 9) {
      return { price: 600, minStay: 2 }; // Setembro
    }
    return { price: 550, minStay: 2 }; // Época Base
  };

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

  const extraGuests = Math.max(0, guests - 10);
  const extraGuestsFee = extraGuests * 75 * totalNights;
  const subtotal = baseNightlyTotal + extraGuestsFee;

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

  const handleActionSubmit = async (actionType: 'reservar' | 'informacao', e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, text: "" });

    const form = e.currentTarget.form;
    if (!form) {
      setStatus({ type: "error", text: "Erro ao processar o formulário. Tente novamente." });
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData(form);
    
    // 1. O TIPO DE DEFESA HONEYPOT
    const honeypot = formData.get("website");
    if (honeypot) {
      const successText = actionType === 'reservar' 
        ? "Reserva iniciada com sucesso! Verifique o seu email para consultar os dados de pagamento (prazo de 24h)." 
        : "Pedido de informações enviado com sucesso. Entraremos em contacto brevemente.";
      setStatus({ type: "success", text: successText });
      form.reset();
      setIsSubmitting(false);
      return;
    }

    const name = formData.get("name") as string;
    const notes = formData.get("notes") as string;

    // 2. VALIDAÇÃO LÓGICA (Anti-Gibberish Spam)
    const isGibberish = (text: string) => text && text.length > 15 && !text.includes(" ");
    if (isGibberish(name) || isGibberish(notes)) {
      const successText = actionType === 'reservar' 
        ? "Reserva iniciada com sucesso! Verifique o seu email para consultar os dados de pagamento (prazo de 24h)." 
        : "Pedido de informações enviado com sucesso. Entraremos em contacto brevemente.";
      setStatus({ type: "success", text: successText });
      form.reset();
      setIsSubmitting(false);
      return;
    }

    if (!formData.get("rgpd")) {
      setStatus({ type: "error", text: "Por favor, aceite os Termos e a Política de Privacidade para continuar." });
      setIsSubmitting(false);
      return;
    }

    if (bookingType === "Alojamento Exclusivo" && (!checkIn || !checkOut || checkIn >= checkOut)) {
      setStatus({ type: "error", text: "Por favor, selecione as datas de check-in e check-out." });
      setIsSubmitting(false);
      return;
    }

    if (bookingType === "Alojamento Exclusivo" && totalNights < requiredMinStay) {
      setStatus({ type: "error", text: `Para o período selecionado, a estadia mínima exigida é de ${requiredMinStay} noites.` });
      setIsSubmitting(false);
      return;
    }

    if (guests > 12) {
      setStatus({ type: "error", text: "A capacidade máxima da propriedade é de 12 hóspedes." });
      setIsSubmitting(false);
      return;
    }

    const bookingData = {
      name: name,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      booking_type: bookingType,
      language: language,
      check_in: checkIn || null,
      check_out: checkOut || null,
      guests: guests,
      notes: notes,
      total_price: bookingType === "Alojamento Exclusivo" ? totalPrice : 0,
      action_type: actionType,
      status: actionType === 'reservar' ? 'pendente_pagamento' : 'pendente'
    };

    const { error } = await supabase.from("booking_requests").insert([bookingData]);

    if (error) {
      setStatus({ type: "error", text: "Não foi possível processar o pedido. Tente novamente." });
      setIsSubmitting(false);
      return;
    } 
    
    try {
      await fetch('/api/send-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...bookingData, totalPrice, discountPercent, extraGuestsFee, totalNights }),
      });
      
      const successText = actionType === 'reservar' 
        ? "Reserva iniciada com sucesso! Verifique o seu email para consultar os dados de pagamento (prazo de 24h)." 
        : "Pedido de informações enviado com sucesso. Entraremos em contacto brevemente.";

      setStatus({ type: "success", text: successText });
      form.reset();
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
        const rule = getNightPricing(checkIn);
        const tempStart = new Date(checkIn);
        const tempEnd = new Date(dateStr);
        const diffTime = Math.abs(tempEnd.getTime() - tempStart.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < rule.minStay) {
          alert(`As regras exigem um mínimo de ${rule.minStay} noites para esta data. Modifique o check-out ou escolha outro check-in.`);
          return;
        }

        setCheckOut(dateStr);
      }
    }
  };

  return (
    <div className="flex flex-col w-full bg-stone-50 min-h-screen pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16 w-full">
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-light uppercase tracking-widest text-[#084063] mb-3">
            Disponibilidade & Tarifas
          </h1>
          <p className="text-stone-500 font-light text-xs sm:text-sm tracking-wide max-w-xl mx-auto">
            Consulte o calendário em tempo real, simule a sua estadia e faça a sua reserva com total clareza e transparência.
          </p>
        </div>

        {/* CAIXA DE REGRAS VISÍVEIS */}
        <div className="bg-white p-6 border border-stone-200 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-600 font-light shadow-xs">
          <div className="border-b md:border-b-0 md:border-r border-stone-100 pb-4 md:pb-0 md:pr-4">
            <p className="font-medium uppercase tracking-widest text-[#084063] mb-1">Capacidade & Suplementos</p>
            <p>Incluído para até <strong>10 hóspedes</strong>. Máximo de <strong>12 hóspedes</strong> (+75€/noite por pessoa adicional).</p>
          </div>
          <div className="border-b md:border-b-0 md:border-r border-stone-100 pb-4 md:pb-0 md:pr-4">
            <p className="font-medium uppercase tracking-widest text-[#084063] mb-1">Descontos de Estadia</p>
            <p>• <strong>15% de desconto</strong> em 7+ noites.<br />• <strong>25% de desconto</strong> em estadias mensais (30+ noites).</p>
          </div>
          <div>
            <p className="font-medium uppercase tracking-widest text-[#084063] mb-1">Regras de Reserva</p>
            <p>Época base: min. 2 noites | Maio/Junho: min. 3 | Julho: min. 4 | Agosto: min. 5 | Natal: min. 3 noites.</p>
          </div>
        </div>

        {/* CALENDÁRIO VISUAL OTIMIZADO MOBILE */}
        <div className="bg-white p-4 sm:p-8 md:p-10 shadow-sm border border-stone-200 mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <h2 className="text-base sm:text-lg font-light uppercase tracking-wider text-[#084063]">
              {monthNames[month]} {year}
            </h2>
            <div className="flex gap-2 w-full sm:w-auto justify-center">
              <button 
                type="button" 
                onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
                className="flex-1 sm:flex-none px-4 py-2 border border-stone-200 text-xs uppercase tracking-widest hover:bg-stone-50 transition-colors"
              >
                Anterior
              </button>
              <button 
                type="button" 
                onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
                className="flex-1 sm:flex-none px-4 py-2 border border-stone-200 text-xs uppercase tracking-widest hover:bg-stone-50 transition-colors"
              >
                Seguinte
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-6 mb-6 text-xs text-stone-500 font-light justify-center sm:justify-start">
            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-white border border-stone-300"></span> Disponível</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-red-500"></span> Ocupado</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#084063]"></span> Selecionado</div>
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-[10px] sm:text-xs uppercase tracking-widest text-stone-400 font-medium mb-3">
            <div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sáb</div>
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="h-12 sm:h-16 md:h-20 bg-transparent"></div>
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

              let bgColor = "bg-white text-[#084063] border-stone-200 hover:border-[#084063]";
              if (isPast || isOccupied) {
                bgColor = isOccupied ? "bg-red-500 text-white border-red-500 cursor-not-allowed opacity-90" : "bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed";
              } else if (isSelected) {
                bgColor = "bg-[#084063] text-white border-[#084063] font-medium";
              } else if (isInRange) {
                bgColor = "bg-stone-100 text-[#084063] border-stone-300";
              }

              const dayRate = getNightPricing(dateStr);

              return (
                <button
                  key={dateStr}
                  type="button"
                  disabled={isPast || isOccupied}
                  onClick={() => handleDateClick(dateStr)}
                  className={`h-12 sm:h-16 md:h-20 border flex flex-col items-center justify-center sm:justify-between p-1 sm:p-2 text-xs transition-all ${bgColor}`}
                >
                  <span className="font-medium text-xs sm:text-sm">{dayNum}</span>
                  {!isPast && !isOccupied && (
                    <span className="text-[8px] sm:text-[10px] opacity-75 mt-auto block">{dayRate.price}€</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* FORMULÁRIO RESPONSIVO COM DROPDOWNS CUSTOMIZADOS */}
        <div className="bg-white p-6 sm:p-8 md:p-12 shadow-sm border border-stone-200 relative">
          
          {/* HONEYPOT FIELD NO FORMULÁRIO GERAL (Impede submissão pelo enter se focado) */}
          <form className="space-y-6 sm:space-y-8">
            <div className="absolute opacity-0 -z-50 h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 sm:pb-8 border-b border-stone-100">
              <div>
                <label className="block text-xs uppercase tracking-widest font-medium text-[#084063] mb-2">Check-in *</label>
                <input 
                  required 
                  type="date" 
                  value={checkIn} 
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#084063] bg-white text-stone-600 text-sm sm:text-base rounded-none" 
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-medium text-[#084063] mb-2">Check-out *</label>
                <input 
                  required 
                  type="date" 
                  value={checkOut} 
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#084063] bg-white text-stone-600 text-sm sm:text-base rounded-none" 
                />
              </div>
              <div>
                <label htmlFor="guests" className="block text-xs uppercase tracking-widest font-medium text-[#084063] mb-2">Nº Hóspedes (Máx. 12) *</label>
                <input 
                  required 
                  type="number" 
                  min="1" 
                  max="12"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#084063] text-sm sm:text-base rounded-none" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 sm:pb-8 border-b border-stone-100">
              
              <div className="md:col-span-2 relative z-20">
                <CustomSelect 
                  label="Tipologia de Reserva / Evento *"
                  name="booking_type"
                  value={bookingType}
                  onChange={setBookingType}
                  options={[
                    { value: "Alojamento Exclusivo", label: "Alojamento Exclusivo (Estadia Rural)" },
                    { value: "Evento Corporativo / Team Building", label: "Evento Corporativo / Team Building" },
                    { value: "Casamento ou Celebração Privada", label: "Casamento ou Celebração Privada" },
                    { value: "Retiro ou Produção Fotográfica", label: "Retiro ou Produção Fotográfica" }
                  ]}
                />
              </div>

              {/* Caixa de Resumo de Preço Dinâmico */}
              {bookingType === "Alojamento Exclusivo" && checkIn && checkOut && checkIn < checkOut && (
                <div className="md:col-span-2 bg-stone-50 p-5 sm:p-6 border border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-0">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-stone-500 mb-1">Resumo da Estadia</p>
                    <p className="text-sm font-medium text-[#084063]">
                      {totalNights} noites ({guests} hóspedes {extraGuests > 0 ? `• Inclui ${extraGuests} hóspedes extra` : ""})
                    </p>
                    {discountPercent > 0 && (
                      <p className="text-xs text-green-700 font-medium mt-1">
                        ✨ Desconto aplicado: {discountPercent}% ({totalNights >= 30 ? "Estadia Mensal" : "Estadia Semanal"})
                      </p>
                    )}
                  </div>
                  <div className="text-right w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200">
                    <p className="text-xs uppercase tracking-widest text-stone-500 mb-1">Valor Estimado</p>
                    <p className="text-2xl font-light text-[#084063]">{totalPrice}€</p>
                  </div>
                </div>
              )}

              <div className="relative z-0">
                <label htmlFor="name" className="block text-xs uppercase tracking-widest font-medium text-[#084063] mb-2">Nome Completo *</label>
                <input required type="text" id="name" name="name" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#084063] text-sm sm:text-base rounded-none" />
              </div>
              <div className="relative z-0">
                <label htmlFor="email" className="block text-xs uppercase tracking-widest font-medium text-[#084063] mb-2">Email *</label>
                <input required type="email" id="email" name="email" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#084063] text-sm sm:text-base rounded-none" />
              </div>
              <div className="relative z-0">
                <label htmlFor="phone" className="block text-xs uppercase tracking-widest font-medium text-[#084063] mb-2">Telemóvel *</label>
                <input required type="tel" id="phone" name="phone" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#084063] text-sm sm:text-base rounded-none" />
              </div>
              
              <div className="relative z-10">
                <CustomSelect 
                  label="Idioma / Language *"
                  name="language"
                  value={language}
                  onChange={setLanguage}
                  options={[
                    { value: "pt", label: "Português (PT)" },
                    { value: "en", label: "English (EN)" }
                  ]}
                />
              </div>

              <div className="md:col-span-2 relative z-0">
                <label htmlFor="notes" className="block text-xs uppercase tracking-widest font-medium text-[#084063] mb-2">Detalhes e Pedidos Especiais</label>
                <textarea id="notes" name="notes" rows={4} placeholder="Indique eventuais pedidos especiais..." className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#084063] resize-none text-sm sm:text-base rounded-none"></textarea>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input type="checkbox" id="rgpd" name="rgpd" required className="mt-1 h-4 w-4 border-stone-300 text-[#084063] focus:ring-[#084063]" />
              <label htmlFor="rgpd" className="text-xs sm:text-sm font-light text-stone-500 leading-relaxed mt-0.5">
                Li e aceito os <Link href="/termos" className="underline hover:text-[#084063] transition-colors">Termos e Condições</Link> e a <Link href="/privacidade" className="underline hover:text-[#084063] transition-colors">Política de Privacidade</Link>, e autorizo o tratamento dos meus dados para efeitos de gestão da reserva.
              </label>
            </div>

            {status.text && (
              <div className={`p-4 text-sm font-light text-center ${status.type === "success" ? "bg-green-50 text-green-900 border border-green-200" : "bg-red-50 text-red-900 border border-red-200"}`}>
                {status.text}
              </div>
            )}

            {/* BOTÕES DE DUPLA AÇÃO OTIMIZADOS MOBILE */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                type="button"
                disabled={isSubmitting}
                onClick={(e) => handleActionSubmit('reservar', e)}
                className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-[#084063] text-white text-xs font-medium tracking-[0.2em] uppercase hover:opacity-90 disabled:opacity-70 transition-opacity"
              >
                {isSubmitting ? "A Processar..." : "Reservar de Imediato (Pagar Sinal)"}
              </button>
              <button 
                type="button"
                disabled={isSubmitting}
                onClick={(e) => handleActionSubmit('informacao', e)}
                className="w-full sm:w-auto px-8 sm:px-10 py-4 border border-[#084063] text-[#084063] text-xs font-medium tracking-[0.2em] uppercase hover:bg-[#084063] hover:text-white disabled:opacity-70 transition-colors"
              >
                {isSubmitting ? "A Processar..." : "Pedir Apenas Informações"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}