import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, guests, message } = await request.json();

    // 1. Email de confirmação elegante para o cliente
    const clientHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; background-color: #ffffff;">
        <div style="background-color: #112535; padding: 40px 20px; text-align: center;">
          <h1 style="color: #ffffff; font-weight: 300; letter-spacing: 4px; text-transform: uppercase; font-size: 20px; margin: 0;">Monte do Pinheirinho</h1>
        </div>
        <div style="padding: 40px 30px; color: #444444; line-height: 1.6;">
          <h2 style="font-weight: 300; font-size: 24px; color: #112535; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 30px;">Mensagem Recebida</h2>
          <p style="font-size: 16px;">Olá ${name},</p>
          <p style="font-size: 16px; color: #666666;">Agradecemos o seu contacto. Recebemos a sua mensagem e a nossa equipa irá responder-lhe com a maior brevidade possível.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; margin: 30px 0; border-left: 3px solid #112535;">
            <p style="font-size: 14px; color: #444; margin: 0; font-style: italic;">"${message}"</p>
          </div>
          
          <p style="font-size: 16px; color: #666666;">Até breve na planície alentejana.</p>
        </div>
        <div style="background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
          <p>&copy; ${new Date().getFullYear()} Monte do Pinheirinho. Santiago do Cacém, Portugal.</p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: 'Monte do Pinheirinho <reservas@montedopinheirinho.com>',
      to: email,
      replyTo: 'montedopinheirinho@gmail.com',
      subject: 'Recebemos a sua mensagem - Monte do Pinheirinho',
      html: clientHtml,
    });

    // 2. Alerta interno direto para o teu Gmail (com o botão Responder a funcionar para o cliente)
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #112535; border-bottom: 2px solid #112535; padding-bottom: 10px;">Novo Contacto / Mensagem do Site</h2>
        <ul style="list-style: none; padding: 0; line-height: 2;">
          <li><strong>Nome:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Telemóvel:</strong> ${phone || 'Não fornecido'}</li>
          <li><strong>Hóspedes previstos:</strong> ${guests || 'Não especificado'}</li>
        </ul>
        <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border: 1px solid #e2e8f0;">
          <p style="margin: 0; font-weight: bold; color: #112535;">Mensagem:</p>
          <p style="margin-top: 5px; color: #444; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="margin-top: 30px; font-size: 12px; color: #666;">
          <em>Dica: Podes clicar em "Responder" neste email e a resposta irá diretamente para o endereço do cliente (${email}).</em>
        </p>
      </div>
    `;

    await resend.emails.send({
      from: 'Site Monte do Pinheirinho <reservas@montedopinheirinho.com>',
      to: 'montedopinheirinho@gmail.com',
      replyTo: email,
      subject: `📩 NOVO CONTACTO: ${name}`,
      html: adminHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send contact email' }, { status: 500 });
  }
}