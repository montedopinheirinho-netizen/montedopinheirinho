import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data: bookings, error } = await supabase
    .from('booking_requests')
    .select('id, name, check_in, check_out, status')
    .eq('status', 'confirmado'); // Apenas reservas confirmadas bloqueiam o calendário

  if (error) {
    return new NextResponse('Erro ao gerar iCal', { status: 500 });
  }

  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Monte do Pinheirinho//Reservas Diretas//PT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH'
  ];

  bookings?.forEach((b) => {
    // Formato de datas iCal requer YYYYMMDD
    const dtStart = b.check_in.replace(/-/g, '');
    const dtEnd = b.check_out.replace(/-/g, '');
    
    icsContent.push(
      'BEGIN:VEVENT',
      `UID:booking-${b.id}@montedopinheirinho.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART;VALUE=DATE:${dtStart}`,
      `DTEND;VALUE=DATE:${dtEnd}`,
      `SUMMARY:Reservado - Monte do Pinheirinho`,
      `DESCRIPTION:Reserva direta confirmada para ${b.name}`,
      'END:VEVENT'
    );
  });

  icsContent.push('END:VCALENDAR');

  return new NextResponse(icsContent.join('\r\n'), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="calendar.ics"',
    },
  });
}