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
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const guests = parseInt(formData.get("guests") as string) || 0;
    const message = formData.get("message") as string;

    const { error } = await supabase.from("contacts").insert([{ name, email, phone, guests, message }]);

    if (error) {
      setStatusMessage({ type: "error", text: "Ocorreu um erro. Por favor, tente novamente ou use o nosso email direto." });
    } else {
      setStatusMessage({ type: "success", text: "Mensagem enviada com sucesso. Entraremos em contacto brevemente." });
      (e.target as HTMLFormElement).reset();
    }
    setIsSubmitting(false);
  };

  const locationQuery = "Monte+do+Pinheirinho+Foros+do+Moinho";

  return (
    <div className="flex flex-col w-full bg-white text-[#112535] min-h-screen pt-12">
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
                <p className="text-stone-500">info@montedopinheirinho.com</p>
              </div>
            </div>
          </div>
          
          <div>
            {/* Mapa Interativo Embutido */}
            <div className="w-full h-80 mb-6 relative border border-stone-200 bg-stone-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3140.0!2d-8.69!3d38.01!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDAwJzAwLjAiTiA4wrA0MScwMC4wIlc!5e0!3m2!1spt-PT!2spt!4v1690000000000!5m2!1spt-PT!2spt" 
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
              <a href={`https://maps.google.com/?q=${locationQuery}`} target="_blank" rel="noreferrer" className="border border-[#112535] text-[#112535] py-3 text-[10px] sm:text-xs tracking-widest uppercase text-center hover:bg-[#112535] hover:text-white transition-colors">Google Maps</a>
              <a href={`http://maps.apple.com/?q=${locationQuery}`} target="_blank" rel="noreferrer" className="border border-[#112535] text-[#112535] py-3 text-[10px] sm:text-xs tracking-widest uppercase text-center hover:bg-[#112535] hover:text-white transition-colors">Apple Maps</a>
              <a href={`https://waze.com/ul?q=${locationQuery}`} target="_blank" rel="noreferrer" className="border border-[#112535] text-[#112535] py-3 text-[10px] sm:text-xs tracking-widest uppercase text-center hover:bg-[#112535] hover:text-white transition-colors">Waze</a>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div className="bg-stone-50 p-8 md:p-12 border border-stone-200 flex flex-col justify-center">
          <h2 className="text-xl font-light tracking-widest uppercase mb-8">Envie uma Mensagem</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Nome *</label>
                <input required type="text" id="name" name="name" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535] bg-white transition-colors" />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Email *</label>
                <input required type="email" id="email" name="email" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535] bg-white transition-colors" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Telemóvel</label>
                <input type="tel" id="phone" name="phone" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535] bg-white transition-colors" />
              </div>
              <div>
                <label htmlFor="guests" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Hóspedes</label>
                <input type="number" min="1" id="guests" name="guests" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535] bg-white transition-colors" />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-xs uppercase tracking-widest font-medium text-[#112535] mb-2">Mensagem *</label>
              <textarea required id="message" name="message" rows={5} className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-[#112535] bg-white transition-colors resize-none"></textarea>
            </div>
            {statusMessage.text && (
              <div className={`p-4 text-sm font-light ${statusMessage.type === "success" ? "bg-green-50 text-green-900 border border-green-200" : "bg-red-50 text-red-900 border border-red-200"}`}>
                {statusMessage.text}
              </div>
            )}
            <button type="submit" disabled={isSubmitting} className="w-full px-8 py-4 bg-[#112535] text-white text-sm tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-70">
              {isSubmitting ? "A Enviar..." : "Enviar Pedido"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}