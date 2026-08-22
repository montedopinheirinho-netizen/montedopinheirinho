import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, check_in, check_out, guests, notes, language } = await request.json();

    const content = {
      pt: {
        subject: "Recebemos o seu pedido - Monte do Pinheirinho",
        title: "O Seu Refúgio Exclusivo",
        greeting: `Olá ${name},`,
        message: "Confirmamos a receção do seu pedido de reserva. A nossa equipa está a analisar a disponibilidade do nosso calendário para as seguintes datas:",
        dates: `${check_in} a ${check_out}`,
        footer: "Entraremos em contacto muito brevemente para finalizar os detalhes. Até lá, comece a sonhar com a planície alentejana.",
        button: "Explorar a Região",
      },
      en: {
        subject: "We received your request - Monte do Pinheirinho",
        title: "Your Exclusive Retreat",
        greeting: `Hello ${name},`,
        message: "We confirm the receipt of your booking request. Our team is currently reviewing our calendar's availability for the following dates:",
        dates: `${check_in} to ${check_out}`,
        footer: "We will reach out to you shortly to finalize the details. Until then, start dreaming about the Alentejo plains.",
        button: "Explore the Region",
      }
    };

    const t = language === 'en' ? content.en : content.pt;

    const htmlTemplate = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; background-color: #ffffff;">
        <div style="background-color: #112535; padding: 40px 20px; text-align: center;">
          <h1 style="color: #ffffff; font-weight: 300; letter-spacing: 4px; text-transform: uppercase; font-size: 20px; margin: 0;">Monte do Pinheirinho</h1>
        </div>
        <div style="padding: 40px 30px; color: #444444; line-height: 1.6;">
          <h2 style="font-weight: 300; font-size: 24px; color: #112535; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 30px;">${t.title}</h2>
          <p style="font-size: 16px;">${t.greeting}</p>
          <p style="font-size: 16px; color: #666666;">${t.message}</p>
          
          <div style="background-color: #f8fafc; padding: 20px; margin: 30px 0; text-align: center; border: 1px solid #e2e8f0;">
            <p style="font-size: 18px; font-weight: bold; color: #112535; margin: 0; letter-spacing: 1px;">${t.dates}</p>
          </div>
          
          <p style="font-size: 16px; color: #666666;">${t.footer}</p>
          
          <div style="text-align: center; margin-top: 40px;">
            <a href="https://montedopinheirinho.com/regiao" style="background-color: #112535; color: #ffffff; padding: 14px 28px; text-decoration: none; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; display: inline-block;">
              ${t.button}
            </a>
          </div>
        </div>
        <div style="background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
          <p>&copy; ${new Date().getFullYear()} Monte do Pinheirinho. Registo AL: 38186/AL</p>
        </div>
      </div>
    `;

    // 1. Email para o cliente (com o "carteiro fantasma")
    await resend.emails.send({
      from: 'Monte do Pinheirinho <reservas@montedopinheirinho.com>', 
      to: email, 
      replyTo: 'montedopinheirinho@gmail.com', // Se o cliente responder, vem parar a ti
      subject: t.subject,
      html: htmlTemplate,
    });

    const adminHtmlTemplate = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #112535; border-bottom: 2px solid #112535; padding-bottom: 10px;">Novo Pedido de Reserva</h2>
        <ul style="list-style: none; padding: 0; line-height: 2;">
          <li><strong>Nome:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Telemóvel:</strong> ${phone}</li>
          <li><strong>Check-in:</strong> ${check_in}</li>
          <li><strong>Check-out:</strong> ${check_out}</li>
          <li><strong>Hóspedes:</strong> ${guests}</li>
          <li><strong>Idioma Selecionado:</strong> ${language.toUpperCase()}</li>
          <li><strong>Notas Especiais:</strong> ${notes || 'Nenhuma nota adicionada.'}</li>
        </ul>
        <p style="margin-top: 30px; font-size: 12px; color: #666;">
          <em>Dica: Podes clicar em "Responder" neste email e a tua resposta será enviada diretamente para o endereço do cliente (${email}).</em>
        </p>
      </div>
    `;

    // 2. Alerta interno (Cai no teu Gmail)
    await resend.emails.send({
      from: 'Site Monte do Pinheirinho <reservas@montedopinheirinho.com>',
      to: 'montedopinheirinho@gmail.com',
      replyTo: email, // Permite responder diretamente ao cliente
      subject: `NOVO PEDIDO DE INFORMAÇÃO: ${name} (${check_in} a ${check_out})`,
      html: adminHtmlTemplate,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}