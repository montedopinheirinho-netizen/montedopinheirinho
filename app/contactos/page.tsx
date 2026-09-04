"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Contactos() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error" | null; text: string }>({ type: null, text: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ type: null, text: "" });

    const formData = new FormData(e.currentTarget);
    
    // 1. O TIPO DE DEFESA HONEYPOT: Se o campo oculto for preenchido, é um bot.
    const honeypot = formData.get("website");
    if (honeypot) {
      // Simula sucesso para enganar o bot e fazê-lo ir embora
      setStatusMessage({ type: "success", text: "Mensagem enviada com sucesso. Verifique o seu email e entraremos em contacto brevemente." });
      (e.target as HTMLFormElement).reset();
      setIsSubmitting(false);
      return;
    }

    const name = formData.get("name") as string;
    const message = formData.get("message") as string;
    const guests = parseInt(formData.get("guests") as string) || 0;

    // 2. VALIDAÇÃO LÓGICA RESTRITA (Lotação e Padrões de Bot)
    if (guests > 12) {
      setStatusMessage({ type: "error", text: "A capacidade máxima da propriedade é de 12 hóspedes. Para eventos de maior dimensão, por favor especifique na mensagem com hóspedes definidos a 12." });
      setIsSubmitting(false);
      return;
    }

    // Se o nome ou a mensagem tiverem palavras enormes sem espaços, é spam provado.
    const isGibberish = (text: string) => text.length > 15 && !text.includes(" ");
    if (isGibberish(name) || isGibberish(message)) {
       // Simula sucesso para despistar o bot
      setStatusMessage({ type: "success", text: "Mensagem enviada com sucesso. Verifique o seu email e entraremos em contacto brevemente." });
      (e.target as HTMLFormElement).reset();
      setIsSubmitting(false);
      return;
    }

    // Validação RGPD
    if (!formData.get("rgpd")) {
      setStatusMessage({ type: "error", text: "Por favor, aceite a política de privacidade para continuar." });
      setIsSubmitting(false);
      return;
    }

    const contactData = {
      name: name,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      guests: guests,
      message: message,
    };

    // Inserir na tabela do Supabase
    const { error } = await supabase.from("contacts").insert([contactData]);

    if (error) {
      setStatusMessage({ type: "error", text: "Ocorreu um erro ao guardar o pedido. Por favor, tente novamente." });
      setIsSubmitting(false);
      return;
    }

    // Disparar emails via API do Resend
    try {
      await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });

      setStatusMessage({ type: "success", text: "Mensagem enviada com sucesso. Verifique o seu email e entraremos em contacto brevemente." });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatusMessage({ type: "error", text: "Mensagem guardada, mas houve um atraso no envio do email de notificação." });
    }

    setIsSubmitting(false);
  };

  const lat = "37.9011002";
  const lng = "-8.5109246";
  const coordsQuery = `${lat},${lng}`;

  return (
    <div className="flex flex-col w-full bg-white text-[#084063] min-h-screen pt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 py-16 w-full">
        
        {/* Bloco de Informação e Mapa */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-light tracking-widest uppercase mb-12">Entre em Contacto</h1>
            <div className="mb-12 space-y-8 font-light">
              <div>
                <p className="font-medium uppercase tracking-widest text-xs mb-2">Morada</p>
                <p className="text-stone-500">Monte do Pinheirinho<br />Foros do Moinho<br />7540-000 Santiago do Cacém, Portugal</p>
              </div>
              <div>
                <p className="font-medium uppercase tracking-widest text-xs mb-2">Email</p>
                <p className="text-stone-500">montedopinheirinho@gmail.com</p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="w-full h-80 mb-6 relative border border-stone-200 bg-stone-100">
              <iframe 
                src={`https://maps.google.com/maps?q=${lat},${lng}&hl=pt-PT&z=16&output=embed`}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de Localização do Monte do Pinheirinho"
              ></iframe>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <a href={`https://maps.google.com/?q=${coordsQuery}`} target="_blank" rel="noreferrer" className="border border-[#084063] text-[#084063] py-3 text-[10px] sm:text-xs tracking-widest uppercase text-center hover:bg-[#084063] hover:text-white transition-colors">Google Maps</a>
              <a href={`http://maps.apple.com/?q=${coordsQuery}`} target="_blank" rel="noreferrer" className="border border-[#084063] text-[#084063] py-3 text-[10px] sm:text-xs tracking-widest uppercase text-center hover:bg-[#084063] hover:text-white transition-colors">Apple Maps</a>
              <a href={`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`} target="_blank" rel="noreferrer" className="border border-[#084063] text-[#084063] py-3 text-[10px] sm:text-xs tracking-widest uppercase text-center hover:bg-[#084063] hover:text-white transition-colors">Waze</a>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div className="bg-stone-50 p-8 md:p-12 border border-stone-200 flex flex-col justify-center relative">
          <h2 className="text-xl font-light tracking-widest uppercase mb-8">Envie uma Mensagem</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* HONEYPOT FIELD - Visivelmente escondido, mas tentador para os bots */}
            <div className="absolute opacity-0 -z-50 h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-widest font-medium text-[#084063] mb-2">Nome *</label>
                <input required type="text" id="name" name="name" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#084063] bg-white transition-colors" />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-widest font-medium text-[#084063] mb-2">Email *</label>
                <input required type="email" id="email" name="email" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#084063] bg-white transition-colors" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs uppercase tracking-widest font-medium text-[#084063] mb-2">Telemóvel</label>
                <input type="tel" id="phone" name="phone" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#084063] bg-white transition-colors" />
              </div>
              <div>
                <label htmlFor="guests" className="block text-xs uppercase tracking-widest font-medium text-[#084063] mb-2">Hóspedes (Máx 12)</label>
                <input type="number" min="1" max="12" id="guests" name="guests" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#084063] bg-white transition-colors" />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-xs uppercase tracking-widest font-medium text-[#084063] mb-2">Mensagem *</label>
              <textarea required id="message" name="message" rows={5} className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#084063] bg-white transition-colors resize-none"></textarea>
            </div>

            {/* Checkbox RGPD OBRIGATÓRIA */}
            <div className="flex items-start gap-3">
              <input type="checkbox" id="rgpd-contact" name="rgpd" required className="mt-1 h-4 w-4 border-stone-300 text-[#084063] focus:ring-[#084063]" />
              <label htmlFor="rgpd-contact" className="text-xs font-light text-stone-500 leading-relaxed mt-0.5">
                Autorizo o tratamento dos meus dados para efeitos de resposta ao meu pedido de contacto, de acordo com o RGPD.
              </label>
            </div>

            {statusMessage.text && (
              <div className={`p-4 text-sm font-light ${statusMessage.type === "success" ? "bg-green-50 text-green-900 border border-green-200" : "bg-red-50 text-red-900 border border-red-200"}`}>
                {statusMessage.text}
              </div>
            )}
            
            <button type="submit" disabled={isSubmitting} className="w-full px-8 py-4 bg-[#084063] text-white text-sm tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-70">
              {isSubmitting ? "A Enviar..." : "Enviar Pedido"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}