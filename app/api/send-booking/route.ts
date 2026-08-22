import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, booking_type, check_in, check_out, guests, notes, language, totalPrice, action_type } = await request.json();

    const isImmediateBooking = action_type === 'reservar';

    // Conteúdo do email para o cliente
    const clientSubject = isImmediateBooking 
      ? "Confirmação de Pré-Reserva & Dados de Pagamento - Monte do Pinheirinho"
      : "Recebemos o seu pedido de informações - Monte do Pinheirinho";

    const clientHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; background-color: #ffffff; color: #444444; line-height: 1.6;">
        <div style="background-color: #112535; padding: 40px 20px; text-align: center;">
          <h1 style="color: #ffffff; font-weight: 300; letter-spacing: 4px; text-transform: uppercase; font-size: 20px; margin: 0;">Monte do Pinheirinho</h1>
        </div>
        
        <div style="padding: 40px 30px;">
          <h2 style="font-weight: 300; font-size: 22px; color: #112535; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">
            ${isImmediateBooking ? "Detalhes da sua Pré-Reserva" : "Mensagem Recebida"}
          </h2>
          
          <p style="font-size: 16px;">Caro(a) <strong>${name}</strong>,</p>
          
          <p style="font-size: 15px; color: #666666;">
            ${isImmediateBooking 
              ? `Esperamos que este email o encontre bem. Agradecemos a sua pré-reserva para <strong>${booking_type}</strong> (${check_in} a ${check_out}). Para assegurar a sua estadia, pedimos que efetue o pagamento de 50% do valor total estimado (${totalPrice ? (totalPrice / 2).toFixed(2) + '€' : 'Sob consulta'}) no prazo de <strong>24 horas</strong>.`
              : `Agradecemos o seu contacto. Recebemos o seu pedido de informações e a nossa equipa irá responder-lhe com a maior brevidade possível.`
            }
          </p>

          ${isImmediateBooking ? `
            <div style="background-color: #f8fafc; padding: 20px; margin: 30px 0; border: 1px solid #e2e8f0;">
              <h3 style="color: #112535; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-top: 0;">Dados para Pagamento (Sinal 50%):</h3>
              <p style="font-family: monospace; font-size: 16px; color: #112535; margin: 10px 0;"><strong>PT50 0010 0000 56957580001 86</strong></p>
              <p style="font-size: 13px; color: #555; margin: 0;"><strong>Titular:</strong> DEK4TOURISM, UNIPESSOAL, LDA</p>
              <p style="font-size: 12px; color: #666; margin-top: 10px; font-style: italic;">Por favor, envie-nos o comprovativo de transferência em resposta a este email.</p>
            </div>
          ` : ''}

          <div style="background-color: #f8fafc; padding: 20px; margin: 30px 0; border-left: 3px solid #112535;">
            <p style="font-size: 13px; color: #444; margin: 0;">
              <strong>Informações Úteis da Estadia:</strong><br/>
              • <strong>Check-In:</strong> A partir das 14h<br/>
              • <strong>Check-Out:</strong> Até às 11h<br/>
              • <strong>Localização:</strong> Foros do Moinho, Santiago do Cacém (Próximo de Porto Covo e Vila Nova de Milfontes).
            </p>
          </div>

          <p style="font-size: 15px; color: #666666;">
            Se tiver alguma dúvida adicional, não hesite em responder diretamente a este email.
          </p>
        </div>

        <div style="background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
          <p>&copy; ${new Date().getFullYear()} Monte do Pinheirinho. Registo AL: 38186/AL</p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: 'Monte do Pinheirinho <reservas@montedopinheirinho.com>',
      to: email,
      replyTo: 'montedopinheirinho@gmail.com',
      subject: clientSubject,
      html: clientHtml,
    });

    // Alerta interno para o teu Gmail
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #112535; border-bottom: 2px solid #112535; padding-bottom: 10px;">
          ${isImmediateBooking ? "🚨 NOVA PRÉ-RESERVA (COM PEDIDO DE PAGAMENTO)" : "📩 NOVO PEDIDO DE INFORMAÇÕES"}
        </h2>
        <ul style="list-style: none; padding: 0; line-height: 2;">
          <li><strong>Ação do Cliente:</strong> ${isImmediateBooking ? "Reservar de Imediato" : "Pedir Informações"}</li>
          <li><strong>Tipologia:</strong> ${booking_type}</li>
          <li><strong>Nome:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Telemóvel:</strong> ${phone}</li>
          ${check_in ? `<li><strong>Check-in:</strong> ${check_in}</li>` : ''}
          ${check_out ? `<li><strong>Check-out:</strong> ${check_out}</li>` : ''}
          <li><strong>Hóspedes:</strong> ${guests}</li>
          <li><strong>Valor Estimado:</strong> ${totalPrice ? totalPrice + '€' : 'Sob consulta'}</li>
          <li><strong>Notas:</strong> ${notes || 'Nenhuma'}</li>
        </ul>
        <p style="margin-top: 30px; font-size: 12px; color: #666;">
          <em>Podes clicar em "Responder" neste email para falar diretamente com o cliente (${email}).</em>
        </p>
      </div>
    `;

    await resend.emails.send({
      from: 'Site Monte do Pinheirinho <reservas@montedopinheirinho.com>',
      to: 'montedopinheirinho@gmail.com',
      replyTo: email,
      subject: `${isImmediateBooking ? 'PRÉ-RESERVA' : '📩 INFO'}: ${name} (${booking_type})`,
      html: adminHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
  }
}